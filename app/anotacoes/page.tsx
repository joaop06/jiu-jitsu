import type { Metadata } from "next";
import { Suspense } from "react";
import { NotesScreen } from "@/components/notes/NotesScreen";

export const metadata: Metadata = {
  title: "Anotações",
};

export default function NotesPage() {
  return (
    <Suspense fallback={<p>Abrindo o caderno…</p>}>
      <NotesScreen />
    </Suspense>
  );
}
