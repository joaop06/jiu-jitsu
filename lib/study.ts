import { LESSONS } from "@/lib/curriculum";
import type { Note, ProgressEntry } from "@/lib/types";
import { STUDY_STATUSES, type StudyStatus } from "@/lib/status";

export type TrackedLesson = {
  id: string;
  title: string;
  goal: string;
  status: StudyStatus;
  updatedAt: string | null;
};

export function trackLessons(progress: Record<string, ProgressEntry>): TrackedLesson[] {
  return LESSONS.map((lesson) => {
    const entry = progress[lesson.id];
    return {
      id: lesson.id,
      title: lesson.title,
      goal: lesson.goal,
      status: entry?.status ?? "to_study",
      updatedAt: entry?.updatedAt ?? null,
    };
  });
}

export function byUpdatedDesc<T extends { updatedAt: string }>(items: T[]) {
  return [...items].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export function countByStatus(lessons: TrackedLesson[]): Record<StudyStatus, number> {
  const counts: Record<StudyStatus, number> = {
    to_study: 0,
    studying: 0,
    reviewed: 0,
    mastered: 0,
  };

  for (const lesson of lessons) counts[lesson.status] += 1;
  return counts;
}

export function latestTouched(lessons: TrackedLesson[]) {
  return lessons
    .filter((lesson) => lesson.updatedAt)
    .sort((a, b) => (b.updatedAt ?? "").localeCompare(a.updatedAt ?? ""))[0] ?? null;
}

export function recentNotes(notes: Note[], limit: number) {
  return byUpdatedDesc(notes).slice(0, limit);
}

export function lessonsByStatus(lessons: TrackedLesson[]) {
  return STUDY_STATUSES.map((status) => ({
    status,
    lessons: lessons.filter((lesson) => lesson.status === status),
  }));
}
