"use client";

import { useSyncExternalStore } from "react";
import { isLessonId } from "@/lib/curriculum";
import { isStudyStatus, type StudyStatus } from "@/lib/status";
import type { Note, ProgressEntry, Snapshot } from "@/lib/types";

const STORAGE_KEY = "tatame.v2";
const LEGACY_KEY = "tatame.v1";

const EMPTY: Snapshot = { progress: {}, notes: [] };

let memory: Snapshot = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isProgressEntry(value: unknown): value is ProgressEntry {
  if (!isRecord(value)) return false;
  return typeof value.status === "string" && isStudyStatus(value.status) && typeof value.updatedAt === "string";
}

function lessonTopicId(value: unknown) {
  return typeof value === "string" && isLessonId(value) ? value : null;
}

function isNote(value: unknown): value is Note {
  if (!isRecord(value)) return false;
  return (
    typeof value.id === "string" &&
    typeof value.title === "string" &&
    typeof value.body === "string" &&
    (typeof value.topicId === "string" || value.topicId === null) &&
    typeof value.createdAt === "string" &&
    typeof value.updatedAt === "string"
  );
}

function toNote(value: Note): Note {
  return { ...value, topicId: lessonTopicId(value.topicId) };
}

function parseProgress(value: unknown) {
  if (!isRecord(value)) return {};
  const progress: Record<string, ProgressEntry> = {};
  for (const [id, entry] of Object.entries(value)) {
    if (isLessonId(id) && isProgressEntry(entry)) progress[id] = entry;
  }
  return progress;
}

function parseNotes(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value.filter(isNote).map(toNote);
}

function parseSnapshot(raw: string | null): Snapshot | null {
  if (!raw) return null;

  try {
    const data: unknown = JSON.parse(raw);
    if (!isRecord(data)) return EMPTY;
    return {
      progress: parseProgress(data.progress),
      notes: parseNotes(data.notes),
    };
  } catch {
    return EMPTY;
  }
}

function parseLegacyNotes(raw: string | null) {
  if (!raw) return [];

  try {
    const data: unknown = JSON.parse(raw);
    if (!isRecord(data) || !Array.isArray(data.notes)) return [];
    return data.notes.filter(isNote).map((note) => ({ ...note, topicId: null }));
  } catch {
    return [];
  }
}

function safeGet(key: string) {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function write(snapshot: Snapshot) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
  } catch {
    // A interface segue nesta sessão mesmo se o navegador recusar a gravação.
  }
}

function readSnapshot(): Snapshot {
  if (typeof window === "undefined") return EMPTY;
  if (loaded) return memory;

  const stored = parseSnapshot(safeGet(STORAGE_KEY));
  if (stored) {
    memory = stored;
    loaded = true;
    return memory;
  }

  const notes = parseLegacyNotes(safeGet(LEGACY_KEY));
  memory = { progress: {}, notes };
  loaded = true;
  if (notes.length > 0) write(memory);
  return memory;
}

function commit(recipe: (current: Snapshot) => Snapshot) {
  if (typeof window === "undefined") return;
  const next = recipe(readSnapshot());
  memory = next;
  loaded = true;
  write(next);
  for (const listener of listeners) listener();
}

function handleStorage(event: StorageEvent) {
  if (event.key !== STORAGE_KEY) return;
  loaded = false;
  for (const listener of listeners) listener();
}

if (typeof window !== "undefined" && !window.__tatameStoreBound) {
  window.__tatameStoreBound = true;
  window.addEventListener("storage", handleStorage);
}

declare global {
  interface Window {
    __tatameStoreBound?: boolean;
  }
}

export function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getSnapshot() {
  return readSnapshot();
}

export function getServerSnapshot() {
  return EMPTY;
}

export function useTatame() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

function now() {
  return new Date().toISOString();
}

export function setLessonStatus(id: string, status: StudyStatus) {
  if (!isLessonId(id)) return;
  commit((current) => ({
    ...current,
    progress: {
      ...current.progress,
      [id]: { status, updatedAt: now() },
    },
  }));
}

export function addNote(input: { title: string; body: string; topicId: string | null }) {
  const title = input.title.trim();
  if (!title) return;
  const stamp = now();
  const note: Note = {
    id: crypto.randomUUID(),
    title,
    body: input.body.trim(),
    topicId: lessonTopicId(input.topicId),
    createdAt: stamp,
    updatedAt: stamp,
  };
  commit((current) => ({ ...current, notes: [note, ...current.notes] }));
}

export function updateNote(id: string, patch: Partial<Pick<Note, "title" | "body" | "topicId">>) {
  commit((current) => ({
    ...current,
    notes: current.notes.map((note) => {
      if (note.id !== id) return note;
      const title = patch.title !== undefined ? patch.title.trim() : note.title;
      if (!title) return note;
      return {
        ...note,
        title,
        body: patch.body !== undefined ? patch.body.trim() : note.body,
        topicId: patch.topicId !== undefined ? lessonTopicId(patch.topicId) : note.topicId,
        updatedAt: now(),
      };
    }),
  }));
}

export function deleteNote(id: string) {
  commit((current) => ({
    ...current,
    notes: current.notes.filter((note) => note.id !== id),
  }));
}
