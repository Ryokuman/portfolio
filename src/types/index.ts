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

export interface Project {
  id: string;
  title: string;
  description: string;
  featured: boolean;
  achievements?: string[];
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  period?: string;
}

export interface CareerEntry {
  id: string;
  type: "work" | "education" | "certification";
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
