"use client";

import Link from "next/link";
import { formatWhen } from "@/lib/format";
import { STATUS_LABEL, STUDY_STATUSES, isStudyStatus } from "@/lib/status";
import { updateTopic } from "@/lib/store";
import type { Topic } from "@/lib/types";
import { Select } from "@/components/ui/Select";
import styles from "./MuralCard.module.css";

export function MuralCard({ topic }: { topic: Topic }) {
  return (
    <article className={styles.card}>
      <h3>
        <Link href={`/trilha/${topic.id}`} className={styles.title}>
          {topic.title}
        </Link>
      </h3>
      <p className={styles.goal}>{topic.goal.trim() || "Sem objetivo ainda."}</p>
      <p className={styles.meta}>Revisão em {formatWhen(topic.updatedAt)}</p>
      <Select
        label={`Status de ${topic.title}`}
        hideLabel
        value={topic.status}
        onChange={(event) => {
          if (isStudyStatus(event.target.value)) {
            updateTopic(topic.id, { status: event.target.value });
          }
        }}
      >
        {STUDY_STATUSES.map((status) => (
          <option key={status} value={status}>
            {STATUS_LABEL[status]}
          </option>
        ))}
      </Select>
    </article>
  );
}
