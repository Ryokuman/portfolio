import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "project-1",
    title: "Featured Project",
    description:
      "프로젝트에 대한 상세 설명을 여기에 작성하세요. 어떤 문제를 해결했는지, 어떤 기술을 활용했는지 설명합니다.",
    featured: true,
    achievements: ["생산성 40% 향상", "500+ 사용자 도입"],
    techStack: ["Next.js", "TypeScript", "PostgreSQL"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/ryokuman/project-1",
    period: "2024 - Present",
  },
  {
    id: "project-2",
    title: "Another Featured Project",
    description:
      "또 다른 주요 프로젝트 설명입니다. 특별한 성과나 기여 사항을 강조합니다.",
    featured: true,
    achievements: ["배포 시간 60% 단축", "자동화 파이프라인 구축"],
    techStack: ["React", "Node.js", "AWS"],
    githubUrl: "https://github.com/ryokuman/project-2",
    period: "2023 - 2024",
  },
  {
    id: "project-3",
    title: "Side Project",
    description: "개인 프로젝트에 대한 간단한 설명입니다.",
    featured: false,
    techStack: ["React", "Firebase"],
    githubUrl: "https://github.com/ryokuman/project-3",
  },
  {
    id: "project-4",
    title: "Open Source Contribution",
    description: "오픈소스 기여 프로젝트 설명입니다.",
    featured: false,
    techStack: ["TypeScript", "Node.js"],
    githubUrl: "https://github.com/ryokuman/project-4",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const regularProjects = projects.filter((p) => !p.featured);
