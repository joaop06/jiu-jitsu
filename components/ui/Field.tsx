"use client";

import { useId, type InputHTMLAttributes } from "react";
import styles from "./field.module.css";

type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  tone?: "paper" | "tatami";
};

export function Field({ label, error, tone = "paper", ...props }: FieldProps) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div className={styles.wrap}>
      <label htmlFor={id} className={`${styles.label} ${tone === "tatami" ? styles.onTatami : ""}`}>
        {label}
      </label>
      <input
        {...props}
        id={id}
        className={styles.control}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
      />
      {error ? (
        <p id={errorId} role="alert" className={styles.error}>
          {error}
        </p>
      ) : null}
    </div>
  );
}
