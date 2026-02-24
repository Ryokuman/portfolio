import type { CareerEntry } from "@/types";

export const career: CareerEntry[] = [
  {
    id: "work-1",
    type: "work",
    title: "Senior Developer",
    organization: "Company Name",
    period: "2023 - Present",
    description: [
      "내부 도구 개발 리드",
      "배포 파이프라인 개선",
      "팀 생산성 향상 주도",
    ],
    techStack: ["React", "TypeScript", "AWS"],
  },
  {
    id: "work-2",
    type: "work",
    title: "Frontend Developer",
    organization: "Previous Company",
    period: "2021 - 2023",
    description: [
      "웹 애플리케이션 프론트엔드 개발",
      "UI/UX 개선 및 성능 최적화",
    ],
    techStack: ["React", "Next.js", "Tailwind CSS"],
  },
  {
    id: "edu-1",
    type: "education",
    title: "컴퓨터공학 학사",
    organization: "University Name",
    period: "2017 - 2021",
    description: ["관련 교과 이수", "졸업 프로젝트 수행"],
  },
];

export const workExperience = career.filter((e) => e.type === "work");
export const education = career.filter((e) => e.type === "education");
export const certifications = career.filter(
  (e) => e.type === "certification"
);
