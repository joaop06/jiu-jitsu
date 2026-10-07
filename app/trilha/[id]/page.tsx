import type { Metadata } from "next";
import { TopicScreen } from "@/components/study/TopicScreen";

export const metadata: Metadata = {
  title: "Lição",
};

export default function TopicPage() {
  return <TopicScreen />;
}
