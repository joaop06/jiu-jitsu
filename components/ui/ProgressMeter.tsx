import { countByStatus } from "@/lib/study";
import { STATUS_LABEL, STUDY_STATUSES } from "@/lib/status";
import type { Topic } from "@/lib/types";
import styles from "./ProgressMeter.module.css";

export function ProgressMeter({ topics }: { topics: Topic[] }) {
  const counts = countByStatus(topics);
  const total = topics.length;
  const summary = STUDY_STATUSES.map(
    (status) => `${counts[status]} ${STATUS_LABEL[status].toLocaleLowerCase("pt-BR")}`,
  ).join(", ");

  return (
    <div className={styles.wrap}>
      <div
        className={styles.track}
        role="img"
        aria-label={total === 0 ? "Nenhum tópico na trilha" : `Progresso: ${summary}`}
      >
        {STUDY_STATUSES.map((status) => (
          <span key={status} data-status={status} style={{ flex: `${counts[status]} 1 0` }} />
        ))}
      </div>
      <ul className={styles.legend}>
        {STUDY_STATUSES.map((status) => (
          <li key={status}>
            <span className={styles.swatch} data-status={status} />
            <span>{STATUS_LABEL[status]}</span>
            <strong>{counts[status]}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}
