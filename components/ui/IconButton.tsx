import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./IconButton.module.css";

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  children: ReactNode;
};

export function IconButton({ label, children, type = "button", ...props }: IconButtonProps) {
  return (
    <button type={type} className={styles.button} aria-label={label} {...props}>
      {children}
    </button>
  );
}
