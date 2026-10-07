"use client";

import { useSyncExternalStore } from "react";
import { isStudyStatus } from "@/lib/status";
import type { Note, Snapshot, Topic } from "@/lib/types";
import type { StudyStatus } from "@/lib/status";

const STORAGE_KEY = "tatame.v1";

const EMPTY: Snapshot = { topics: [], notes: [] };

let memory: Snapshot = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isTopic(value: unknown): value is Topic {
  if (!isRecord(value)) return false;
  return (
    typeof value.id === "string" &&
    typeof value.title === "string" &&
    typeof value.goal === "string" &&
    typeof value.status === "string" &&
    isStudyStatus(value.status) &&
    typeof value.createdAt === "string" &&
    typeof value.updatedAt === "string"
  );
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

function parse(raw: string | null): Snapshot {
  if (!raw) return EMPTY;

  try {
    const data: unknown = JSON.parse(raw);
    if (!isRecord(data)) return EMPTY;
    const topics = Array.isArray(data.topics) ? data.topics.filter(isTopic) : [];
    const notes = Array.isArray(data.notes) ? data.notes.filter(isNote) : [];
    if (topics.length === 0 && notes.length === 0) return EMPTY;
    return { topics, notes };
  } catch {
    return EMPTY;
  }
}

function safeGet() {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function readSnapshot(): Snapshot {
  if (typeof window === "undefined") return EMPTY;
  if (loaded) return memory;
  memory = parse(safeGet());
  loaded = true;
  return memory;
}

function commit(recipe: (current: Snapshot) => Snapshot) {
  if (typeof window === "undefined") return;
  const next = recipe(readSnapshot());
  memory = next;
  loaded = true;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // A interface segue nesta sessão mesmo se o navegador recusar a gravação.
  }
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

export function addTopic(input: { title: string; goal: string; status: StudyStatus }) {
  const title = input.title.trim();
  if (!title) return;
  const stamp = now();
  const topic: Topic = {
    id: crypto.randomUUID(),
    title,
    goal: input.goal.trim(),
    status: input.status,
    createdAt: stamp,
    updatedAt: stamp,
  };
  commit((current) => ({ ...current, topics: [topic, ...current.topics] }));
}

export function updateTopic(
  id: string,
  patch: Partial<Pick<Topic, "title" | "goal" | "status">>,
) {
  commit((current) => ({
    ...current,
    topics: current.topics.map((topic) => {
      if (topic.id !== id) return topic;
      const title = patch.title !== undefined ? patch.title.trim() : topic.title;
      if (!title) return topic;
      return {
        ...topic,
        title,
        goal: patch.goal !== undefined ? patch.goal.trim() : topic.goal,
        status: patch.status ?? topic.status,
        updatedAt: now(),
      };
    }),
  }));
}

export function deleteTopic(id: string) {
  commit((current) => ({
    topics: current.topics.filter((topic) => topic.id !== id),
    notes: current.notes.map((note) => (note.topicId === id ? { ...note, topicId: null } : note)),
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
    topicId: input.topicId,
    createdAt: stamp,
    updatedAt: stamp,
  };
  commit((current) => ({ ...current, notes: [note, ...current.notes] }));
}

export function updateNote(
  id: string,
  patch: Partial<Pick<Note, "title" | "body" | "topicId">>,
) {
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
        topicId: patch.topicId !== undefined ? patch.topicId : note.topicId,
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
