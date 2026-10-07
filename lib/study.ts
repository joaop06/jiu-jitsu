import type { Note, Topic } from "@/lib/types";
import { STUDY_STATUSES, type StudyStatus } from "@/lib/status";

export function byUpdatedDesc<T extends { updatedAt: string }>(items: T[]) {
  return [...items].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export function countByStatus(topics: Topic[]): Record<StudyStatus, number> {
  const counts: Record<StudyStatus, number> = {
    to_study: 0,
    studying: 0,
    reviewed: 0,
    mastered: 0,
  };

  for (const topic of topics) counts[topic.status] += 1;
  return counts;
}

export function latestTopic(topics: Topic[]) {
  return byUpdatedDesc(topics)[0] ?? null;
}

export function recentNotes(notes: Note[], limit: number) {
  return byUpdatedDesc(notes).slice(0, limit);
}

export function topicsByStatus(topics: Topic[]) {
  const ordered = byUpdatedDesc(topics);
  return STUDY_STATUSES.map((status) => ({
    status,
    topics: ordered.filter((topic) => topic.status === status),
  }));
}
