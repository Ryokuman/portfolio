"use client";

import { useMemo } from "react";
import { useLocale } from "./context";
import { profileI18n } from "@/data/profile";
import { projects } from "@/data/projects";
import { career, workExperience, education, awards } from "@/data/career";
import projectsI18n from "./projects";
import careerI18n from "./career";
import type { Project, CareerEntry } from "@/types";

export function useProfile() {
  const { locale } = useLocale();
  return profileI18n[locale] ?? profileI18n.ko;
}

export function useProjects(): Project[] {
  const { locale } = useLocale();
  return useMemo(() => {
    if (locale === "ko") return projects;
    return projects.map((p) => {
      const i18n = projectsI18n[p.id]?.[locale];
      if (!i18n) return p;
      return {
        ...p,
        description: i18n.description ?? p.description,
        role: i18n.role ?? p.role,
        achievements: i18n.achievements ?? p.achievements,
        details: p.details?.map((d, i) => {
          const di = i18n.details?.[i];
          if (!di) return d;
          return {
            ...d,
            title: di.title ?? d.title,
            content: di.content ?? d.content,
          };
        }),
      };
    });
  }, [locale]);
}

export function useProject(id: string): Project | undefined {
  const allProjects = useProjects();
  return allProjects.find((p) => p.id === id);
}

function translateCareer(entries: CareerEntry[], locale: string): CareerEntry[] {
  if (locale === "ko") return entries;
  return entries.map((e) => {
    const i18n = careerI18n[e.id]?.[locale as keyof typeof careerI18n[string]];
    if (!i18n) return e;
    return {
      ...e,
      title: i18n.title ?? e.title,
      organization: i18n.organization ?? e.organization,
      description: i18n.description ?? e.description,
    };
  });
}

export function useCareer() {
  const { locale } = useLocale();
  return useMemo(
    () => ({
      career: translateCareer(career, locale),
      workExperience: translateCareer(workExperience, locale),
      education: translateCareer(education, locale),
      awards: translateCareer(awards, locale),
    }),
    [locale],
  );
}
