import type { ReactNode } from "react";

type IconProps = {
  size?: number;
};

function Stroke({ size = 20, children }: IconProps & { children: ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

export function IconHome() {
  return (
    <Stroke>
      <path d="M4 11.5 12 4l8 7.5" />
      <path d="M7 10.5V20h10v-9.5" />
    </Stroke>
  );
}

export function IconTrail() {
  return (
    <Stroke>
      <circle cx="6.5" cy="6.5" r="2.2" />
      <circle cx="17.5" cy="17.5" r="2.2" />
      <path d="M8.5 8c3.2.4 4.2 7.2 7.4 8" />
    </Stroke>
  );
}

export function IconNotes() {
  return (
    <Stroke>
      <path d="M7 4.5h8.5L19 8v11.5H7z" />
      <path d="M15 4.5V8h4" />
      <path d="M10 12h6" />
      <path d="M10 15.5h4" />
    </Stroke>
  );
}

export function IconMural() {
  return (
    <Stroke>
      <rect x="4" y="4" width="6.5" height="6.5" rx="1" />
      <rect x="13.5" y="4" width="6.5" height="6.5" rx="1" />
      <rect x="4" y="13.5" width="6.5" height="6.5" rx="1" />
      <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1" />
    </Stroke>
  );
}

export function IconClose() {
  return (
    <Stroke size={16}>
      <path d="M6 6l12 12" />
      <path d="M18 6 6 18" />
    </Stroke>
  );
}
