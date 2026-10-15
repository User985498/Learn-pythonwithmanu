export type Block =
  | { type: 'h1'; en: string; fr: string }
  | { type: 'h2'; en: string; fr: string }
  | { type: 'h3'; en: string; fr: string }
  | { type: 'p'; en: string; fr: string }
  | { type: 'ul'; en: string[]; fr: string[] }
  | { type: 'code'; lang?: string; en: string; fr: string }
  | { type: 'tip'; en: string; fr: string }
  | { type: 'note'; en: string; fr: string }
  | { type: 'warning'; en: string; fr: string }
  | { type: 'exercise'; en: string; fr: string; solutionEn?: string; solutionFr?: string }
  | { type: 'quote'; en: string; fr: string };

export type Chapter = {
  id: string;
  number: number;
  part: 1 | 2 | 3 | 4;
  icon: string;
  titleEn: string;
  titleFr: string;
  descEn: string;
  descFr: string;
  blocks: Block[];
};

export const PART_INFO: Record<1 | 2 | 3 | 4, { en: string; fr: string }> = {
  1: { en: 'Part I — Fundamentals', fr: 'Partie I — Les bases' },
  2: { en: 'Part II — Intermediate', fr: 'Partie II — Niveau intermédiaire' },
  3: { en: 'Part III — Advanced', fr: 'Partie III — Niveau avancé' },
  4: { en: 'Part IV — Pro & Real World', fr: 'Partie IV — Pro & monde réel' },
};
