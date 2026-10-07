"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { isLessonId, lessonById } from "@/lib/curriculum";
import { byUpdatedDesc } from "@/lib/study";
import { addNote, deleteNote, updateNote, useTatame } from "@/lib/store";
import { PageHeader } from "@/components/shell/PageHeader";
import { Field } from "@/components/ui/Field";
import { NoteCard } from "@/components/notes/NoteCard";
import { NoteEditor, lessonGroups } from "@/components/notes/NoteEditor";
import styles from "./NotesScreen.module.css";

export function NotesScreen() {
  const params = useSearchParams();
  const preset = params.get("topico");
  const { notes } = useTatame();
  const presetTopic = preset && isLessonId(preset) ? preset : null;
  const groups = lessonGroups();
  const [query, setQuery] = useState("");
  const [draftKey, setDraftKey] = useState(0);
  const [editingId, setEditingId] = useState<string | null>(null);

  const normalized = query.trim().toLocaleLowerCase("pt-BR");
  const visible = byUpdatedDesc(notes).filter((note) => {
    if (!normalized) return true;
    const haystack = `${note.title}\n${note.body}`.toLocaleLowerCase("pt-BR");
    return haystack.includes(normalized);
  });

  return (
    <div className={styles.stack}>
      <PageHeader
        eyebrow="Caderno"
        title="Anotações"
        description="Registros soltos ou ligados a uma lição da trilha."
      />
      {notes.length > 0 ? (
        <div className={styles.search}>
          <Field
            label="Buscar"
            tone="tatami"
            value={query}
            placeholder="Título ou trecho"
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
      ) : null}
      <NoteEditor
        key={`${presetTopic ?? "solta"}-${draftKey}`}
        heading="Nova anotação"
        submitLabel="Guardar anotação"
        groups={groups}
        initial={{ title: "", body: "", topicId: presetTopic }}
        onSubmit={(values) => {
          addNote(values);
          setDraftKey((key) => key + 1);
        }}
      />
      {notes.length === 0 ? <p className={styles.miss}>O caderno ainda espera o primeiro registro.</p> : null}
      {notes.length > 0 && visible.length === 0 ? (
        <p className={styles.miss}>Nenhuma anotação com esse termo.</p>
      ) : null}
      <ul className={styles.list}>
        {visible.map((note) => {
          const topicTitle = note.topicId ? (lessonById(note.topicId)?.title ?? null) : null;

          return (
            <li key={note.id}>
              {editingId === note.id ? (
                <NoteEditor
                  heading="Editar anotação"
                  submitLabel="Salvar anotação"
                  groups={groups}
                  initial={{ title: note.title, body: note.body, topicId: note.topicId }}
                  onCancel={() => setEditingId(null)}
                  onSubmit={(values) => {
                    updateNote(note.id, values);
                    setEditingId(null);
                  }}
                />
              ) : (
                <NoteCard
                  note={note}
                  topicTitle={topicTitle}
                  onEdit={() => setEditingId(note.id)}
                  onDelete={() => deleteNote(note.id)}
                />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
