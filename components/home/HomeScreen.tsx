"use client";

import Link from "next/link";
import { formatWhen } from "@/lib/format";
import { STATUS_LABEL, STUDY_STATUSES } from "@/lib/status";
import { countByStatus, latestTopic, recentNotes } from "@/lib/study";
import { useTatame } from "@/lib/store";
import { PageHeader } from "@/components/shell/PageHeader";
import { buttonClass } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { ProgressMeter } from "@/components/ui/ProgressMeter";
import { StatusPill } from "@/components/ui/StatusPill";
import styles from "./HomeScreen.module.css";

export function HomeScreen() {
  const { topics, notes } = useTatame();
  const blank = topics.length === 0 && notes.length === 0;

  if (blank) {
    return (
      <div>
        <PageHeader
          eyebrow="Preparação"
          title="O tatame de hoje"
          description="A trilha, as anotações e o estágio de cada assunto da avaliação."
        />
        <EmptyState
          title="O caderno ainda está em branco"
          action={
            <Link href="/trilha" className={buttonClass("primary")}>
              Criar o primeiro tópico
            </Link>
          }
        >
          Crie o primeiro tópico da trilha. A partir daí, o resumo, as anotações e o mural passam a
          mostrar a sua preparação.
        </EmptyState>
      </div>
    );
  }

  const counts = countByStatus(topics);
  const latest = latestTopic(topics);
  const notesPreview = recentNotes(notes, 4);

  return (
    <div className={styles.stack}>
      <PageHeader
        eyebrow="Preparação"
        title="O tatame de hoje"
        description="A trilha, as anotações e o estágio de cada assunto da avaliação."
        actions={
          <Link href="/trilha" className={buttonClass("primary")}>
            Abrir a trilha
          </Link>
        }
      />
      <section className={`notebook ${styles.progress}`}>
        <div className={styles.sectionHead}>
          <h2>Como está a preparação</h2>
          <p>
            {topics.length} {topics.length === 1 ? "tópico" : "tópicos"} · {notes.length}{" "}
            {notes.length === 1 ? "anotação" : "anotações"}
          </p>
        </div>
        <ProgressMeter topics={topics} />
      </section>
      <div className={styles.stats}>
        {STUDY_STATUSES.map((status) => (
          <Link key={status} href="/mural" className={styles.stat} data-status={status}>
            <span className={styles.statValue}>{counts[status]}</span>
            <span className={styles.statLabel}>{STATUS_LABEL[status]}</span>
          </Link>
        ))}
      </div>
      <div className={styles.split}>
        <section className={`notebook ${styles.panel}`}>
          <h2>Último estudo</h2>
          {latest ? (
            <>
              <StatusPill status={latest.status} />
              <p className={styles.latestTitle}>{latest.title}</p>
              <p>{latest.goal.trim() || "Sem objetivo ainda."}</p>
              <p className={styles.quiet}>Revisão em {formatWhen(latest.updatedAt)}</p>
              <Link href={`/trilha/${latest.id}`} className={buttonClass("secondary")}>
                Continuar
              </Link>
            </>
          ) : (
            <p className={styles.quiet}>A trilha ainda espera o primeiro tópico.</p>
          )}
        </section>
        <section className={`notebook ${styles.panel}`}>
          <h2>Anotações recentes</h2>
          {notesPreview.length === 0 ? (
            <p className={styles.quiet}>O caderno ainda espera o primeiro registro.</p>
          ) : (
            <ul className={styles.notes}>
              {notesPreview.map((note) => (
                <li key={note.id}>
                  <Link href="/anotacoes" className={styles.noteLink}>
                    {note.title}
                  </Link>
                  <span className={styles.noteMeta}>{formatWhen(note.updatedAt)}</span>
                </li>
              ))}
            </ul>
          )}
          <Link href="/anotacoes" className={buttonClass("secondary")}>
            Abrir o caderno
          </Link>
        </section>
      </div>
    </div>
  );
}
