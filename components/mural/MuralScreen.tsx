"use client";

import Link from "next/link";
import { STATUS_LABEL } from "@/lib/status";
import { topicsByStatus } from "@/lib/study";
import { useTatame } from "@/lib/store";
import { PageHeader } from "@/components/shell/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { buttonClass } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { MuralCard } from "@/components/mural/MuralCard";
import styles from "./MuralScreen.module.css";

export function MuralScreen() {
  const { topics } = useTatame();
  const columns = topicsByStatus(topics);

  return (
    <div>
      <PageHeader
        eyebrow="Progresso"
        title="Mural"
        description="A mesma trilha, organizada pelo estágio de cada tópico."
      />
      {topics.length === 0 ? (
        <EmptyState
          title="O mural acompanha a trilha"
          action={
            <Link href="/trilha" className={buttonClass("primary")}>
              Criar o primeiro tópico
            </Link>
          }
        >
          Quando houver tópicos, eles aparecem aqui em quatro estágios: a estudar, em estudo,
          revisado e domínio.
        </EmptyState>
      ) : (
        <div className={styles.board}>
          {columns.map((column) => (
            <section key={column.status} className={styles.column} data-status={column.status}>
              <header className={styles.head}>
                <h2>{STATUS_LABEL[column.status]}</h2>
                <Badge tone={column.status === "mastered" ? "gold" : "neutral"}>{column.topics.length}</Badge>
              </header>
              {column.topics.length === 0 ? (
                <p className={styles.empty}>Nada neste estágio.</p>
              ) : (
                <ul className={styles.list}>
                  {column.topics.map((topic) => (
                    <li key={topic.id}>
                      <MuralCard topic={topic} />
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
