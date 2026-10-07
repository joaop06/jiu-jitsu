"use client";

import { useId, type ReactNode, type SelectHTMLAttributes } from "react";
import styles from "./field.module.css";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  hideLabel?: boolean;
  children: ReactNode;
};

export function Select({ label, hideLabel = false, children, ...props }: SelectProps) {
  const id = useId();

  return (
    <div className={styles.wrap}>
      <label htmlFor={id} className={hideLabel ? "srOnly" : styles.label}>
        {label}
      </label>
      <select {...props} id={id} className={`${styles.control} ${styles.select}`}>
        {children}
      </select>
    </div>
  );
}
