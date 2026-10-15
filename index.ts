import { PART_INFO, type Chapter } from './chapters';
import { chapters as chaptersPart1 } from './chapters1';
import { chaptersPart2 } from './chapters2';
import { chaptersPart3 } from './chapters3';
import { chaptersPart4 } from './chapters4';

export const ALL_CHAPTERS: Chapter[] = [
  ...chaptersPart1,
  ...chaptersPart2,
  ...chaptersPart3,
  ...chaptersPart4,
];

export { PART_INFO };
export type { Chapter } from './chapters';
