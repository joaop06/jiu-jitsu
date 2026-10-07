"use client";

import { useState } from "react";
import { byUpdatedDesc } from "@/lib/study";
import { addTopic, useTatame } from "@/lib/store";
import { PageHeader } from "@/components/shell/PageHeader";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { TopicCard } from "@/components/study/TopicCard";
import { TopicForm } from "@/components/study/TopicForm";
import styles from "./TrailScreen.module.css";

export function TrailScreen() {
  const { topics } = useTatame();
  const [creating, setCreating] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const ordered = byUpdatedDesc(topics);

  return (
    <div className={styles.stack}>
      <PageHeader
        eyebrow="Estudo"
        title="Trilha"
        description="Os assuntos da avaliação, um tópico por vez."
        actions={
          <Button onClick={() => setCreating((open) => !open)}>{creating ? "Fechar" : "Novo tópico"}</Button>
        }
      />
      {creating ? (
        <TopicForm
          key={formKey}
          heading="Novo tópico"
          submitLabel="Criar tópico"
          onCancel={() => setCreating(false)}
          onSubmit={(values) => {
            addTopic(values);
            setFormKey((key) => key + 1);
            setCreating(false);
          }}
        />
      ) : null}
      {ordered.length === 0 && !creating ? (
        <EmptyState
          title="A trilha começa aqui"
          action={<Button onClick={() => setCreating(true)}>Criar o primeiro tópico</Button>}
        >
          Cada tópico guarda um objetivo e um estágio. O mural usa os mesmos registros.
        </EmptyState>
      ) : null}
      {ordered.length > 0 ? (
        <ul className={styles.grid}>
          {ordered.map((topic) => (
            <li key={topic.id}>
              <TopicCard topic={topic} />
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
