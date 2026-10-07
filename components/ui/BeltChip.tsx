import type { Belt } from "@/lib/belts";
import styles from "./BeltChip.module.css";

type BeltChipProps = {
  belt: Belt;
  label?: string;
  tone?: "paper" | "tatami";
};

export function BeltChip({ belt, label, tone = "paper" }: BeltChipProps) {
  return (
    <span className={`${styles.chip} ${tone === "tatami" ? styles.onTatami : ""}`}>
      <span className={`${styles.bar} ${styles[belt]}`} />
      {label ? <span>{label}</span> : null}
    </span>
  );
}
