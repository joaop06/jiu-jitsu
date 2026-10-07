import { STATUS_LABEL, type StudyStatus } from "@/lib/status";
import styles from "./StatusPill.module.css";

export function StatusPill({ status }: { status: StudyStatus }) {
  return (
    <span className={styles.pill} data-status={status}>
      {STATUS_LABEL[status]}
    </span>
  );
}
