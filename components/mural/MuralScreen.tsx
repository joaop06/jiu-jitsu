"use client";

import { lessonsByStatus, trackLessons } from "@/lib/study";
import { STATUS_LABEL } from "@/lib/status";
import { useTatame } from "@/lib/store";
import { PageHeader } from "@/components/shell/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { MuralCard } from "@/components/mural/MuralCard";
import styles from "./MuralScreen.module.css";

export function MuralScreen() {
  const { progress } = useTatame();
  const columns = lessonsByStatus(trackLessons(progress));

  return (
    <div>
      <PageHeader
        eyebrow="Progresso"
        title="Mural"
        description="A trilha, organizada pelo estágio de cada lição."
      />
      <div className={styles.board}>
        {columns.map((column) => (
          <section key={column.status} className={styles.column} data-status={column.status}>
            <header className={styles.head}>
              <h2>{STATUS_LABEL[column.status]}</h2>
              <Badge tone={column.status === "mastered" ? "gold" : "neutral"}>{column.lessons.length}</Badge>
            </header>
            {column.lessons.length === 0 ? (
              <p className={styles.empty}>Nada neste estágio.</p>
            ) : (
              <ul className={styles.list}>
                {column.lessons.map((lesson) => (
                  <li key={lesson.id}>
                    <MuralCard lesson={lesson} />
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
