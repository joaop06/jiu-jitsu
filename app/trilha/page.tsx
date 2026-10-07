import type { Metadata } from "next";
import { TrailScreen } from "@/components/study/TrailScreen";

export const metadata: Metadata = {
  title: "Trilha",
};

export default function TrailPage() {
  return <TrailScreen />;
}
