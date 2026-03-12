import type { Profile } from "@/types";
import type { Locale } from "@/i18n/context";

type I18nProfile = Record<Locale, Profile>;

const profileI18n: I18nProfile = {
  ko: {
    name: "김용민",
    tagline: "Full Stack Developer",
    bio: [
      "4개의 개인, 협업 프로젝트 개발 경험이 있습니다.",
      "팀 상황에 따라 여러가지 포지션을 능동적으로 맡아 처리하며, 소셜네트워크부터 AI 기술까지 다양한 도메인에서 새로운 기술 스택에 빠르게 적응하고 프로젝트 전체를 완주한 경험이 있습니다.",
    ],
    techStack: [
      { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Expo"] },
      { category: "Backend", items: ["ElysiaJS", "Django", "Python", "Node.js"] },
      { category: "Infra / DB", items: ["Docker", "AWS", "PostgreSQL", "Supabase", "GitHub Actions"] },
    ],
    social: [
      { platform: "GitHub", url: "https://github.com/Ryokuman" },
      { platform: "Email", url: "mailto:ryokuman21@gmail.com" },
    ],
  },
  en: {
    name: "Yongmin Kim",
    tagline: "Full Stack Developer",
    bio: [
      "Experienced across 4 personal and collaborative projects.",
      "Adaptable to multiple roles depending on team needs — quickly learning new tech stacks across diverse domains from social networks to AI, and consistently delivering complete projects.",
    ],
    techStack: [
      { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Expo"] },
      { category: "Backend", items: ["ElysiaJS", "Django", "Python", "Node.js"] },
      { category: "Infra / DB", items: ["Docker", "AWS", "PostgreSQL", "Supabase", "GitHub Actions"] },
    ],
    social: [
      { platform: "GitHub", url: "https://github.com/Ryokuman" },
      { platform: "Email", url: "mailto:ryokuman21@gmail.com" },
    ],
  },
  tr: {
    name: "Yongmin Kim",
    tagline: "Full Stack Geliştirici",
    bio: [
      "4 kişisel ve ekip projesinde geliştirme deneyimim var.",
      "Ekip ihtiyaçlarına göre birden fazla role uyum sağlayarak, sosyal ağlardan yapay zekaya kadar çeşitli alanlarda yeni teknolojilere hızla adapte oldum ve projeleri başarıyla tamamladım.",
    ],
    techStack: [
      { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Expo"] },
      { category: "Backend", items: ["ElysiaJS", "Django", "Python", "Node.js"] },
      { category: "Altyapı / DB", items: ["Docker", "AWS", "PostgreSQL", "Supabase", "GitHub Actions"] },
    ],
    social: [
      { platform: "GitHub", url: "https://github.com/Ryokuman" },
      { platform: "Email", url: "mailto:ryokuman21@gmail.com" },
    ],
  },
};

export { profileI18n };

// Default export for backward compatibility
export const profile = profileI18n.ko;
