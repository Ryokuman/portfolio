import type { Locale } from "./context";

// Per-project i18n overrides: description, achievements, detail content.
// The 2026-07-06 full-stack project body is currently approved only in Korean.
// Keep overrides empty so stale EN/TR copy from older project positioning does not
// replace the new representative project data.

type ProjectI18n = {
  description?: string;
  role?: string;
  achievements?: string[];
  details?: {
    title?: string;
    content?: string[];
  }[];
};

const projectsI18n: Record<string, Record<Locale, ProjectI18n>> = {
  "dynamos-platform": { ko: {}, en: {}, tr: {} },
  "new-human-orchestrator": { ko: {}, en: {}, tr: {} },
  stackstory: { ko: {}, en: {}, tr: {} },
  onjump: { ko: {}, en: {}, tr: {} },
  quiza: { ko: {}, en: {}, tr: {} },
};

export default projectsI18n;
