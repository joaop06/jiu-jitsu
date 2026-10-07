"use client";

import Link from "next/link";
import { formatWhen } from "@/lib/format";
import type { TrackedLesson } from "@/lib/study";
import { buttonClass } from "@/components/ui/Button";
import { StatusPill } from "@/components/ui/StatusPill";
import styles from "./TopicCard.module.css";

export function TopicCard({ lesson }: { lesson: TrackedLesson }) {
  return (
    <article className={styles.card} data-status={lesson.status}>
      <StatusPill status={lesson.status} />
      <h3>
        <Link href={`/trilha/${lesson.id}`} className={styles.title}>
          {lesson.title}
        </Link>
      </h3>
      <p className={styles.goal}>{lesson.goal}</p>
      <p className={styles.meta}>
        {lesson.updatedAt ? `Revisão em ${formatWhen(lesson.updatedAt)}` : "Ainda sem revisão"}
      </p>
      <div className={styles.actions}>
        <Link href={`/trilha/${lesson.id}`} className={buttonClass("secondary")}>
          Abrir
        </Link>
      </div>
    </article>
  );
}
