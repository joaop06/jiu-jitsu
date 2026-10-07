import type { Metadata } from "next";
import { MuralScreen } from "@/components/mural/MuralScreen";

export const metadata: Metadata = {
  title: "Mural",
};

export default function MuralPage() {
  return <MuralScreen />;
}
