import type { CareerEntry } from "@/types";

export const career: CareerEntry[] = [
  {
    id: "poul",
    type: "work",
    title: "풀스택 개발자",
    organization: "POUL",
    period: "2024.07 ~ 2025.08",
    description: [
      "CGV-ASSISTANT: CGV 협업 SI 프로젝트 — 영화 감정 분석 서비스 풀스택 개발",
      "LLAMI: AI 통합 플랫폼 — 모델스토어, 라미앱, 봇스토어 풀스택 개발",
      "LLM-WORKER: 17개 LLM API 추상화 SaaS 서버 개발",
      "LLAMI-APP: Expo 기반 앱 프론트엔드 — Bridge/ReverseBridge 시스템 설계",
    ],
    techStack: ["Next.js", "TypeScript", "ElysiaJS", "Expo", "Supabase"],
  },
  {
    id: "edu-1",
    type: "education",
    title: "컴퓨터공학과 학사 (중퇴)",
    organization: "성결대학교",
    period: "2017.02 ~ 2023.08",
    description: [],
  },
  {
    id: "award-1",
    type: "award",
    title: "Silicon Valley Boot Camp 최우수",
    organization: "한국 공학대학교",
    period: "2022",
    description: ["reBike 프로젝트로 최우수상 수상"],
  },
];

export const workExperience = career.filter((e) => e.type === "work");
export const education = career.filter((e) => e.type === "education");
export const awards = career.filter((e) => e.type === "award");
