import type { StudyStatus } from "@/lib/status";

export type ProgressEntry = {
  status: StudyStatus;
  updatedAt: string;
};

export type Note = {
  id: string;
  title: string;
  body: string;
  topicId: string | null;
  createdAt: string;
  updatedAt: string;
};

export type Snapshot = {
  progress: Record<string, ProgressEntry>;
  notes: Note[];
};
