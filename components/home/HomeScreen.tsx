"use client";

import Link from "next/link";
import { formatWhen } from "@/lib/format";
import { countByStatus, latestTouched, recentNotes, trackLessons } from "@/lib/study";
import { useTatame } from "@/lib/store";
import { PageHeader } from "@/components/shell/PageHeader";
import { buttonClass } from "@/components/ui/Button";
import { ProgressMeter } from "@/components/ui/ProgressMeter";
import { StatusPill } from "@/components/ui/StatusPill";
import { STATUS_LABEL, STUDY_STATUSES } from "@/lib/status";
import styles from "./HomeScreen.module.css";

export function HomeScreen() {
  const { progress, notes } = useTatame();
  const lessons = trackLessons(progress);
  const counts = countByStatus(lessons);
  const latest = latestTouched(lessons);
  const focus = latest ?? lessons[0];
  const notesPreview = recentNotes(notes, 4);

  return (
    <div className={styles.stack}>
      <PageHeader
        eyebrow="Preparação"
        title="O tatame de hoje"
        description="A trilha da faixa azul, as anotações e o estágio de cada lição."
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
            {lessons.length} lições · {notes.length} {notes.length === 1 ? "anotação" : "anotações"}
          </p>
        </div>
        <ProgressMeter lessons={lessons} />
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
          <h2>{latest ? "Último estudo" : "Por onde começar"}</h2>
          {focus ? (
            <>
              <StatusPill status={focus.status} />
              <p className={styles.latestTitle}>{focus.title}</p>
              <p>{focus.goal}</p>
              <p className={styles.quiet}>
                {focus.updatedAt ? `Revisão em ${formatWhen(focus.updatedAt)}` : "Ainda sem revisão."}
              </p>
              <Link href={`/trilha/${focus.id}`} className={buttonClass("secondary")}>
                {latest ? "Continuar" : "Começar"}
              </Link>
            </>
          ) : null}
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
