import type { Metadata } from "next";
import { TopicScreen } from "@/components/study/TopicScreen";

export const metadata: Metadata = {
  title: "Tópico",
};

export default function TopicPage() {
  return <TopicScreen />;
}
