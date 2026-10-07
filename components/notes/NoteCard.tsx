"use client";

import { formatWhen } from "@/lib/format";
import type { Note } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { ConfirmDelete } from "@/components/ui/ConfirmDelete";
import styles from "./NoteCard.module.css";

type NoteCardProps = {
  note: Note;
  topicTitle: string | null;
  onEdit: () => void;
  onDelete: () => void;
};

export function NoteCard({ note, topicTitle, onEdit, onDelete }: NoteCardProps) {
  const relation = note.topicId ? (topicTitle ?? "Tópico removido") : "Sem tópico";

  return (
    <article className={styles.card}>
      <h3 className={styles.title}>{note.title}</h3>
      <p className={styles.body}>{note.body.trim() || "Sem texto ainda."}</p>
      <p className={styles.meta}>
        {relation} · {formatWhen(note.updatedAt)}
      </p>
      <div className={styles.actions}>
        <Button variant="secondary" onClick={onEdit}>
          Editar
        </Button>
        <ConfirmDelete label="Excluir" onConfirm={onDelete} />
      </div>
    </article>
  );
}
