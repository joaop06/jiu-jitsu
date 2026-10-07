"use client";

import Link from "next/link";
import { formatWhen } from "@/lib/format";
import { STATUS_LABEL, STUDY_STATUSES, isStudyStatus } from "@/lib/status";
import { setLessonStatus } from "@/lib/store";
import type { TrackedLesson } from "@/lib/study";
import { Select } from "@/components/ui/Select";
import styles from "./MuralCard.module.css";

export function MuralCard({ lesson }: { lesson: TrackedLesson }) {
  return (
    <article className={styles.card}>
      <h3>
        <Link href={`/trilha/${lesson.id}`} className={styles.title}>
          {lesson.title}
        </Link>
      </h3>
      <p className={styles.goal}>{lesson.goal}</p>
      <p className={styles.meta}>
        {lesson.updatedAt ? `Revisão em ${formatWhen(lesson.updatedAt)}` : "Ainda sem revisão"}
      </p>
      <Select
        label={`Status de ${lesson.title}`}
        hideLabel
        value={lesson.status}
        onChange={(event) => {
          if (isStudyStatus(event.target.value)) {
            setLessonStatus(lesson.id, event.target.value);
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
