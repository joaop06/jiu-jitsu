"use client";

import Link from "next/link";
import { formatWhen } from "@/lib/format";
import type { Topic } from "@/lib/types";
import { buttonClass } from "@/components/ui/Button";
import { ConfirmDelete } from "@/components/ui/ConfirmDelete";
import { StatusPill } from "@/components/ui/StatusPill";
import { deleteTopic } from "@/lib/store";
import styles from "./TopicCard.module.css";

export function TopicCard({ topic }: { topic: Topic }) {
  const goal = topic.goal.trim() || "Sem objetivo ainda.";

  return (
    <article className={styles.card} data-status={topic.status}>
      <StatusPill status={topic.status} />
      <h2>
        <Link href={`/trilha/${topic.id}`} className={styles.title}>
          {topic.title}
        </Link>
      </h2>
      <p className={styles.goal}>{goal}</p>
      <p className={styles.meta}>Revisão em {formatWhen(topic.updatedAt)}</p>
      <div className={styles.actions}>
        <Link href={`/trilha/${topic.id}`} className={buttonClass("secondary")}>
          Abrir
        </Link>
        <ConfirmDelete label="Excluir" onConfirm={() => deleteTopic(topic.id)} />
      </div>
    </article>
  );
}
