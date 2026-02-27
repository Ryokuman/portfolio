import type { Profile } from "@/types";

export const profile: Profile = {
  name: "김용민",
  tagline: "Full Stack Developer",
  bio: [
    "4개의 개인, 협업 프로젝트 개발 경험이 있습니다.",
    "팀 상황에 따라 여러가지 포지션을 능동적으로 맡아 처리하며, 소셜네트워크부터 AI 기술까지 다양한 도메인에서 새로운 기술 스택에 빠르게 적응하고 프로젝트 전체를 완주한 경험이 있습니다.",
  ],
  techStack: [
    {
      category: "Frontend",
      items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Expo"],
    },
    {
      category: "Backend",
      items: ["ElysiaJS", "Django", "Python", "Node.js"],
    },
    {
      category: "Infra / DB",
      items: ["Docker", "AWS", "PostgreSQL", "Supabase", "GitHub Actions"],
    },
  ],
  social: [
    { platform: "GitHub", url: "https://github.com/Ryokuman" },
    { platform: "Email", url: "mailto:ryokuman21@gmail.com" },
  ],
};
