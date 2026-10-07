"use client";

import { CHAPTERS } from "@/lib/curriculum";
import { trackLessons } from "@/lib/study";
import { useTatame } from "@/lib/store";
import { PageHeader } from "@/components/shell/PageHeader";
import { TopicCard } from "@/components/study/TopicCard";
import styles from "./TrailScreen.module.css";

export function TrailScreen() {
  const { progress } = useTatame();
  const tracked = new Map(trackLessons(progress).map((lesson) => [lesson.id, lesson]));

  return (
    <div className={styles.stack}>
      <PageHeader
        eyebrow="Estudo"
        title="Trilha"
        description="A avaliação de faixa azul, uma lição por vez."
      />
      {CHAPTERS.map((chapter) => (
        <section key={chapter.id} className={styles.chapter} aria-labelledby={`capitulo-${chapter.id}`}>
          <div className={styles.chapterHead}>
            <h2 id={`capitulo-${chapter.id}`}>{chapter.title}</h2>
            <p>{chapter.lead}</p>
          </div>
          {chapter.groups.map((group) => (
            <div key={group.title ?? chapter.id} className={styles.group}>
              {group.title ? <h3>{group.title}</h3> : null}
              <ul className={styles.grid}>
                {group.lessons.map((lesson) => {
                  const item = tracked.get(lesson.id);
                  if (!item) return null;
                  return (
                    <li key={lesson.id}>
                      <TopicCard lesson={item} />
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </section>
      ))}
    </div>
  );
}
