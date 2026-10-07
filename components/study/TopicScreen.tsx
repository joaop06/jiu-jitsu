"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { formatWhen } from "@/lib/format";
import { byUpdatedDesc } from "@/lib/study";
import { addNote, deleteTopic, updateTopic, useTatame } from "@/lib/store";
import { PageHeader } from "@/components/shell/PageHeader";
import { buttonClass } from "@/components/ui/Button";
import { ConfirmDelete } from "@/components/ui/ConfirmDelete";
import { EmptyState } from "@/components/ui/EmptyState";
import { NoteEditor } from "@/components/notes/NoteEditor";
import { TopicForm } from "@/components/study/TopicForm";
import styles from "./TopicScreen.module.css";

export function TopicScreen() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = typeof params.id === "string" ? params.id : "";
  const { topics, notes } = useTatame();
  const topic = topics.find((item) => item.id === id) ?? null;
  const [composerKey, setComposerKey] = useState(0);

  if (!topic) {
    return (
      <div>
        <PageHeader
          eyebrow="Tópico"
          title="Não encontrado"
          description="Esse registro saiu do caderno deste navegador."
        />
        <EmptyState
          title="Nada por aqui"
          action={
            <Link href="/trilha" className={buttonClass("primary")}>
              Voltar à trilha
            </Link>
          }
        >
          O tópico pode ter sido excluído.
        </EmptyState>
      </div>
    );
  }

  const linked = byUpdatedDesc(notes.filter((note) => note.topicId === topic.id));

  return (
    <div className={styles.stack}>
      <div>
        <Link href="/trilha" className={styles.back}>
          ← Voltar à trilha
        </Link>
        <PageHeader
          eyebrow="Tópico"
          title={topic.title}
          description={topic.goal.trim() || "Sem objetivo descrito."}
        />
      </div>
      <TopicForm
        key={topic.id}
        heading="Editar tópico"
        submitLabel="Salvar tópico"
        initial={{ title: topic.title, goal: topic.goal, status: topic.status }}
        onSubmit={(values) => updateTopic(topic.id, values)}
      />
      <section className={`notebook ${styles.review}`}>
        <p>Última revisão em {formatWhen(topic.updatedAt)}</p>
        <ConfirmDelete
          label="Excluir tópico"
          onConfirm={() => {
            deleteTopic(topic.id);
            router.push("/trilha");
          }}
        />
      </section>
      <section className={`notebook ${styles.notes}`}>
        <h2>Anotações deste tópico</h2>
        {linked.length === 0 ? (
          <p className={styles.meta}>Nenhuma anotação ligada a este tópico.</p>
        ) : (
          <ul>
            {linked.map((note) => (
              <li key={note.id} className={styles.note}>
                <h3>{note.title}</h3>
                <p>{note.body.trim() || "Sem texto ainda."}</p>
                <p className={styles.when}>{formatWhen(note.updatedAt)}</p>
              </li>
            ))}
          </ul>
        )}
        <Link href={`/anotacoes?topico=${topic.id}`} className={buttonClass("secondary")}>
          Abrir no caderno
        </Link>
      </section>
      <NoteEditor
        key={`${topic.id}-${composerKey}`}
        heading="Nova anotação"
        submitLabel="Guardar anotação"
        topics={topics}
        initial={{ title: "", body: "", topicId: topic.id }}
        onSubmit={(values) => {
          addNote(values);
          setComposerKey((key) => key + 1);
        }}
      />
    </div>
  );
}
