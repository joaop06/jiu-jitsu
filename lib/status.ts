export const STUDY_STATUSES = ["to_study", "studying", "reviewed", "mastered"] as const;

export type StudyStatus = (typeof STUDY_STATUSES)[number];

export const STATUS_LABEL: Record<StudyStatus, string> = {
  to_study: "A estudar",
  studying: "Em estudo",
  reviewed: "Revisado",
  mastered: "Domínio",
};

export function isStudyStatus(value: string): value is StudyStatus {
  return (STUDY_STATUSES as readonly string[]).includes(value);
}
