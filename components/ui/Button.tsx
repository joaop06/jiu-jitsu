import type { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.css";

const VARIANTS = {
  primary: styles.primary,
  secondary: styles.secondary,
  danger: styles.danger,
  quiet: styles.quiet,
} as const;

export type ButtonVariant = keyof typeof VARIANTS;

export function buttonClass(variant: ButtonVariant = "primary") {
  return `${styles.base} ${VARIANTS[variant]}`;
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

export function Button({ variant = "primary", type = "button", className, ...props }: ButtonProps) {
  const classes = [buttonClass(variant), className].filter(Boolean).join(" ");
  return <button type={type} className={classes} {...props} />;
}
