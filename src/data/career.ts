import type { CareerEntry } from "@/types";

export const career: CareerEntry[] = [
  {
    id: "runup",
    type: "work",
    title: "프론트엔드 리드",
    organization: "주식회사 런업",
    logo: "/images/runup.png",
    period: "2025.12 ~ 현재",
    description: [
      "DynaMOS v2: 제조업 ERP/MES 프론트엔드 프레임워크 설계 및 구축",
      "runup/core UI 프레임워크 설계 — 선언적 컴포넌트 구조로 페이지 구성 패턴 표준화",
      "코어 컴포넌트 기반 AI 활용 자동화 도입",
      "PR 기반 개발 프로세스 도입 및 팀 개발 문화 개선",
    ],
    techStack: ["Next.js", "TypeScript", "Valtio", "AG Grid", "Storybook"],
  },
  {
    id: "poul",
    type: "work",
    title: "풀스택 개발자",
    organization: "주식회사 피오유엘 (POUL)",
    logo: "/images/poul.webp",
    period: "2024.06 ~ 2025.08",
    description: [
      "CGV-ASSISTANT: CGV 협업 SI 프로젝트 — 영화 리뷰 감정 분석 및 바이럴 모니터링 서비스 풀스택 개발",
      "LLAMI 모델스토어: 17개 LLM API 통합 플랫폼 메인 개발 (기여도 80%)",
      "LLAMI 봇스토어: AI 챗봇 마켓플레이스 플랫폼 메인 개발 (기여도 55.6%)",
      "LLAMI 라미챗: 노코드 AI 챗봇 빌더 — 조직/결제 시스템 개발 (기여도 18%)",
      "LLAMI 앱: Expo 기반 온디바이스 AI 앱 — Bridge/ReverseBridge 시스템 설계 (기여도 15%)",
      "LLM-WORKER: 17개 LLM API 추상화 SaaS 서버 — pipe 모델 아키텍처 설계",
    ],
    techStack: ["Next.js", "TypeScript", "ElysiaJS", "Expo", "Supabase", "Valtio"],
  },
  {
    id: "edu-1",
    type: "education",
    title: "컴퓨터공학과 학사 (중퇴)",
    organization: "성결대학교",
    logo: "/images/sku.svg",
    period: "2017.02 ~ 2023.08",
    description: [],
  },
  {
    id: "award-1",
    type: "award",
    title: "Silicon Valley Boot Camp 최우수",
    organization: "한국 공학대학교",
    logo: "/images/tku.svg",
    period: "2022",
    description: ["reBike 프로젝트로 최우수상 수상"],
  },
];

export const workExperience = career.filter((e) => e.type === "work");
export const education = career.filter((e) => e.type === "education");
export const awards = career.filter((e) => e.type === "award");
