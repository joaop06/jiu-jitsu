"use client";

import { useState, type FormEvent } from "react";
import { STATUS_LABEL, STUDY_STATUSES, isStudyStatus, type StudyStatus } from "@/lib/status";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { IconButton } from "@/components/ui/IconButton";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { IconClose } from "@/components/icons";
import styles from "./forms.module.css";

export type TopicValues = {
  title: string;
  goal: string;
  status: StudyStatus;
};

type TopicFormProps = {
  heading: string;
  submitLabel: string;
  initial?: TopicValues;
  onSubmit: (values: TopicValues) => void;
  onCancel?: () => void;
};

export function TopicForm({ heading, submitLabel, initial, onSubmit, onCancel }: TopicFormProps) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [goal, setGoal] = useState(initial?.goal ?? "");
  const [status, setStatus] = useState<StudyStatus>(initial?.status ?? "to_study");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!title.trim()) {
      setError("Dê um título ao tópico.");
      return;
    }
    setError("");
    onSubmit({ title: title.trim(), goal: goal.trim(), status });
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
          maxLength={120}
          autoComplete="off"
          error={error}
          onChange={(event) => {
            setTitle(event.target.value);
            if (error) setError("");
          }}
        />
        <Textarea
          label="Objetivo"
          value={goal}
          maxLength={600}
          rows={4}
          placeholder="O que este tópico precisa mostrar na avaliação?"
          onChange={(event) => setGoal(event.target.value)}
        />
        <div className={styles.select}>
          <Select
            label="Status"
            value={status}
            onChange={(event) => {
              if (isStudyStatus(event.target.value)) setStatus(event.target.value);
            }}
          >
            {STUDY_STATUSES.map((item) => (
              <option key={item} value={item}>
                {STATUS_LABEL[item]}
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
