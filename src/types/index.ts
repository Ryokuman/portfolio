export interface Profile {
  name: string;
  tagline: string;
  bio: string[];
  techStack: TechCategory[];
  social: SocialLink[];
}

export interface TechCategory {
  category: string;
  items: string[];
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface ProjectDetailSection {
  title: string;
  period?: string;
  content: string[];
  techStack?: string[];
  image?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  role?: string;
  featured: boolean;
  achievements?: string[];
  techStack: string[];
  primaryTech: string;
  thumbnail?: string;
  video?: string;
  gradient: string;
  githubUrl?: string;
  period?: string;
  details?: ProjectDetailSection[];
}

export interface CareerEntry {
  id: string;
  type: "work" | "education" | "award";
  title: string;
  organization: string;
  period: string;
  description: string[];
  techStack?: string[];
}

export interface NavItem {
  label: string;
  href: string;
}
