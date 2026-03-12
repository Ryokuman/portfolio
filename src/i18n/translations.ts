import type { Locale } from "./context";

const translations = {
  // Navigation
  "nav.about": { ko: "About", en: "About", tr: "Hakkımda" },
  "nav.projects": { ko: "Projects", en: "Projects", tr: "Projeler" },
  "nav.career": { ko: "Career", en: "Career", tr: "Kariyer" },
  "nav.contact": { ko: "Contact", en: "Contact", tr: "İletişim" },

  // Hero
  "hero.portfolio": { ko: "Portfolio", en: "Portfolio", tr: "Portföy" },

  // Projects section
  "projects.title": { ko: "Projects", en: "Projects", tr: "Projeler" },
  "projects.subtitle": {
    ko: "클릭하여 자세한 내용을 확인하세요",
    en: "Click to see the details",
    tr: "Detaylar için tıklayın",
  },
  "projects.back": {
    ko: "프로젝트 목록으로",
    en: "Back to projects",
    tr: "Projelere dön",
  },
  "projects.achievements": {
    ko: "주요 성과",
    en: "Key Achievements",
    tr: "Başarılar",
  },
  "projects.details": {
    ko: "상세 내용",
    en: "Details",
    tr: "Detaylar",
  },

  // Career section
  "career.title": { ko: "Career", en: "Career", tr: "Kariyer" },
  "career.subtitle": {
    ko: "경력, 학력, 수상을 소개합니다",
    en: "Experience, education, and awards",
    tr: "Deneyim, eğitim ve ödüller",
  },
  "career.experience": { ko: "Experience", en: "Experience", tr: "Deneyim" },
  "career.awards": { ko: "Awards", en: "Awards", tr: "Ödüller" },
  "career.education": { ko: "Education", en: "Education", tr: "Eğitim" },
  "career.type.work": { ko: "Work", en: "Work", tr: "İş" },
  "career.type.education": { ko: "Education", en: "Education", tr: "Eğitim" },
  "career.type.award": { ko: "Award", en: "Award", tr: "Ödül" },

  // Contact section
  "contact.title": { ko: "Contact", en: "Contact", tr: "İletişim" },
  "contact.subtitle": {
    ko: "함께 이야기 나눠요",
    en: "Let's have a chat",
    tr: "İletişime geçelim",
  },

  // Detail page
  "detail.contribution": { ko: "기여도", en: "Contribution", tr: "Katkı" },
  "detail.viewDetail": { ko: "상세 보기", en: "View details", tr: "Detaylar" },
  "detail.backToList": {
    ko: "프로젝트 목록",
    en: "Project list",
    tr: "Proje listesi",
  },
} as const;

type TranslationKey = keyof typeof translations;

export function t(key: TranslationKey, locale: Locale): string {
  return translations[key]?.[locale] ?? translations[key]?.ko ?? key;
}

export default translations;
