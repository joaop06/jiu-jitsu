import type { StudyStatus } from "@/lib/status";

export type Topic = {
  id: string;
  title: string;
  goal: string;
  status: StudyStatus;
  createdAt: string;
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
  topics: Topic[];
  notes: Note[];
};
