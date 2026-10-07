import type { ReactNode } from "react";
import { BELTS } from "@/lib/belts";
import { BeltChip } from "@/components/ui/BeltChip";
import styles from "./EmptyState.module.css";

type EmptyStateProps = {
  title: string;
  children: ReactNode;
  action?: ReactNode;
};

export function EmptyState({ title, children, action }: EmptyStateProps) {
  return (
    <section className={`notebook ${styles.box}`}>
      <div className={styles.belts} aria-hidden="true">
        {BELTS.map((belt) => (
          <BeltChip key={belt} belt={belt} />
        ))}
      </div>
      <h2>{title}</h2>
      <p className={styles.copy}>{children}</p>
      {action}
    </section>
  );
}
