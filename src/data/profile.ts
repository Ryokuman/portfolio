import type { Profile } from "@/types";

export const profile: Profile = {
  name: "Your Name",
  tagline: "Full-Stack Developer",
  bio: [
    "안녕하세요! 다양한 웹 기술을 활용하여 사용자 경험을 개선하는 데 관심이 많은 개발자입니다.",
    "효율적인 시스템 설계와 생산성 향상에 집중하며, 팀과 함께 성장하는 것을 좋아합니다.",
  ],
  techStack: [
    {
      category: "Frontend",
      items: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    },
    {
      category: "Backend",
      items: ["Node.js", "Python", "PostgreSQL"],
    },
    {
      category: "DevOps",
      items: ["Docker", "AWS", "GitHub Actions"],
    },
  ],
  social: [
    { platform: "GitHub", url: "https://github.com/ryokuman" },
    { platform: "LinkedIn", url: "https://linkedin.com/in/" },
    { platform: "Email", url: "mailto:your@email.com" },
  ],
};
