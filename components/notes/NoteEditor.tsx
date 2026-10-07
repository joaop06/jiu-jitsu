"use client";

import { useState, type FormEvent } from "react";
import type { Topic } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { IconButton } from "@/components/ui/IconButton";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { IconClose } from "@/components/icons";
import styles from "../study/forms.module.css";

export type NoteValues = {
  title: string;
  body: string;
  topicId: string | null;
};

type NoteEditorProps = {
  heading: string;
  submitLabel: string;
  topics: Topic[];
  initial?: NoteValues;
  onSubmit: (values: NoteValues) => void;
  onCancel?: () => void;
};

export function NoteEditor({
  heading,
  submitLabel,
  topics,
  initial,
  onSubmit,
  onCancel,
}: NoteEditorProps) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [body, setBody] = useState(initial?.body ?? "");
  const [topicId, setTopicId] = useState(initial?.topicId ?? "");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!title.trim()) {
      setError("Dê um título à anotação.");
      return;
    }
    setError("");
    onSubmit({
      title: title.trim(),
      body: body.trim(),
      topicId: topicId || null,
    });
  }

  return (
    <form className={`notebook ${styles.sheet}`} onSubmit={handleSubmit}>
      <div className={styles.head}>
        <h2>{heading}</h2>
        {onCancel ? (
          <IconButton label="Fechar formulário" onClick={onCancel}>
            <IconClose />
          </IconButton>
        ) : null}
      </div>
      <div className={styles.grid}>
        <Field
          label="Título"
          value={title}
          maxLength={160}
          autoComplete="off"
          error={error}
          onChange={(event) => {
            setTitle(event.target.value);
            if (error) setError("");
          }}
        />
        <Textarea
          label="Texto"
          value={body}
          maxLength={8000}
          rows={6}
          placeholder="O que você quer lembrar na hora do treino."
          onChange={(event) => setBody(event.target.value)}
        />
        <div className={styles.select}>
          <Select label="Tópico" value={topicId} onChange={(event) => setTopicId(event.target.value)}>
            <option value="">Sem tópico</option>
            {topics.map((topic) => (
              <option key={topic.id} value={topic.id}>
                {topic.title}
              </option>
            ))}
          </Select>
        </div>
        <div className={styles.actions}>
          <Button type="submit">{submitLabel}</Button>
          {onCancel ? (
            <Button variant="quiet" onClick={onCancel}>
              Cancelar
            </Button>
          ) : null}
        </div>
      </div>
    </form>
  );
}
