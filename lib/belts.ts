export const BELTS = ["white", "blue", "purple", "brown", "black"] as const;

export type Belt = (typeof BELTS)[number];

export const BELT_LABEL: Record<Belt, string> = {
  white: "Branca",
  blue: "Azul",
  purple: "Roxa",
  brown: "Marrom",
  black: "Preta",
};
