"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { chapterOf, lessonById, type Block } from "@/lib/curriculum";
import { formatWhen } from "@/lib/format";
import { byUpdatedDesc } from "@/lib/study";
import { STATUS_LABEL, STUDY_STATUSES, isStudyStatus } from "@/lib/status";
import { addNote, setLessonStatus, useTatame } from "@/lib/store";
import { PageHeader } from "@/components/shell/PageHeader";
import { buttonClass } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Select } from "@/components/ui/Select";
import { NoteEditor, lessonGroups } from "@/components/notes/NoteEditor";
import styles from "./TopicScreen.module.css";

function LessonBlocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className={styles.lesson}>
      {blocks.map((block, index) => {
        if (block.kind === "text") {
          return <p key={index}>{block.body}</p>;
        }
        if (block.kind === "heading") {
          return (
            <h3 key={index} className={styles.blockTitle}>
              {block.text}
            </h3>
          );
        }
        if (block.kind === "list") {
          return (
            <ul key={index} className={styles.list}>
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          );
        }
        return (
          <section key={index} className={styles.technique}>
            <h3>{block.name}</h3>
            <ol className={styles.steps}>
              {block.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            {block.mistake ? <p className={styles.mistake}>Erro comum: {block.mistake}</p> : null}
          </section>
        );
      })}
    </div>
  );
}

export function TopicScreen() {
  const params = useParams<{ id: string }>();
  const id = typeof params.id === "string" ? params.id : "";
  const lesson = lessonById(id);
  const chapter = lesson ? chapterOf(lesson.id) : null;
  const { progress, notes } = useTatame();
  const [composerKey, setComposerKey] = useState(0);
  const status = progress[id]?.status ?? "to_study";
  const updatedAt = progress[id]?.updatedAt ?? null;

  if (!lesson || !chapter) {
    return (
      <div>
        <PageHeader eyebrow="Lição" title="Não encontrada" description="Essa lição não está na trilha." />
        <EmptyState
          title="Nada por aqui"
          action={
            <Link href="/trilha" className={buttonClass("primary")}>
              Voltar à trilha
            </Link>
          }
        >
          Escolha uma lição da avaliação de faixa azul.
        </EmptyState>
      </div>
    );
  }

  const linked = byUpdatedDesc(notes.filter((note) => note.topicId === lesson.id));

  return (
    <div className={styles.stack}>
      <div>
        <Link href="/trilha" className={styles.back}>
          ← Voltar à trilha
        </Link>
        <PageHeader eyebrow={chapter.title} title={lesson.title} description={lesson.goal} />
      </div>
      <section className={`notebook ${styles.review}`}>
        <div className={styles.status}>
          <Select
            label="Estágio"
            value={status}
            onChange={(event) => {
              if (isStudyStatus(event.target.value)) setLessonStatus(lesson.id, event.target.value);
            }}
          >
            {STUDY_STATUSES.map((item) => (
              <option key={item} value={item}>
                {STATUS_LABEL[item]}
              </option>
            ))}
          </Select>
        </div>
        <p className={styles.meta}>{updatedAt ? `Última revisão em ${formatWhen(updatedAt)}` : "Ainda sem revisão."}</p>
      </section>
      <article className={`notebook ${styles.reader}`}>
        <LessonBlocks blocks={lesson.blocks} />
      </article>
      <section className={`notebook ${styles.notes}`}>
        <h2>Anotações desta lição</h2>
        {linked.length === 0 ? (
          <p className={styles.meta}>Nenhuma anotação ligada a esta lição.</p>
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
        <Link href={`/anotacoes?topico=${lesson.id}`} className={buttonClass("secondary")}>
          Abrir no caderno
        </Link>
      </section>
      <NoteEditor
        key={`${lesson.id}-${composerKey}`}
        heading="Nova anotação"
        submitLabel="Guardar anotação"
        groups={lessonGroups()}
        initial={{ title: "", body: "", topicId: lesson.id }}
        onSubmit={(values) => {
          addNote(values);
          setComposerKey((key) => key + 1);
        }}
      />
    </div>
  );
}
