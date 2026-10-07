"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import styles from "./ConfirmDelete.module.css";

type ConfirmDeleteProps = {
  label: string;
  onConfirm: () => void;
};

export function ConfirmDelete({ label, onConfirm }: ConfirmDeleteProps) {
  const [open, setOpen] = useState(false);

  if (!open) {
    return (
      <Button variant="quiet" onClick={() => setOpen(true)}>
        {label}
      </Button>
    );
  }

  return (
    <span className={styles.row}>
      <Button variant="danger" onClick={onConfirm}>
        Confirmar exclusão
      </Button>
      <Button variant="quiet" onClick={() => setOpen(false)}>
        Cancelar
      </Button>
    </span>
  );
}
