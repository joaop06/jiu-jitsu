"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { BELT_LABEL, BELTS } from "@/lib/belts";
import { BeltChip } from "@/components/ui/BeltChip";
import { IconHome, IconMural, IconNotes, IconTrail } from "@/components/icons";
import styles from "./AppShell.module.css";

const NAV = [
  { href: "/", label: "Início", Icon: IconHome },
  { href: "/trilha", label: "Trilha", Icon: IconTrail },
  { href: "/anotacoes", label: "Anotações", Icon: IconNotes },
  { href: "/mural", label: "Mural", Icon: IconMural },
] as const;

function isCurrent(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className={styles.shell}>
      <a className={styles.skip} href="#conteudo">
        Ir para o conteúdo
      </a>
      <aside className={styles.sidebar}>
        <Link href="/" className={styles.brand}>
          <span className={styles.brandMark} aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          <span>
            <span className={styles.brandName}>Tatame</span>
            <span className={styles.brandTag}>Estudo de jiu-jitsu</span>
          </span>
        </Link>
        <nav className={styles.nav} aria-label="Seções">
          {NAV.map(({ href, label, Icon }) => (
            <Link
              key={href}
              href={href}
              className={styles.link}
              aria-current={isCurrent(pathname, href) ? "page" : undefined}
            >
              <Icon />
              {label}
            </Link>
          ))}
        </nav>
        <div className={styles.legend}>
          <p className={styles.legendTitle}>Faixas</p>
          <ul>
            {BELTS.map((belt) => (
              <li key={belt}>
                <BeltChip belt={belt} label={BELT_LABEL[belt]} />
              </li>
            ))}
          </ul>
          <p className={styles.hint}>Salvo neste navegador.</p>
        </div>
      </aside>
      <main id="conteudo" className={styles.main}>
        <div className={styles.frame}>{children}</div>
      </main>
    </div>
  );
}
