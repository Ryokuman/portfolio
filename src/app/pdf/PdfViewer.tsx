"use client";

import { useState, useMemo } from "react";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import ResumeDocument from "@/components/pdf/ResumeDocument";
import { useLocale, localeLabels, type Locale } from "@/i18n/context";
import { useProfile, useProjects, useCareer } from "@/i18n/useData";
import type { Profile, Project, CareerEntry } from "@/types";

type ResumeVariant = "fullstack" | "frontend";

const variantLabels: Record<ResumeVariant, string> = {
  fullstack: "Full Stack",
  frontend: "Frontend",
};

// Frontend version: emphasize frontend, de-emphasize backend-only items
function applyVariant(
  variant: ResumeVariant,
  profile: Profile,
  projects: Project[],
  workExperience: CareerEntry[],
): {
  profile: Profile;
  projects: Project[];
  workExperience: CareerEntry[];
} {
  if (variant === "fullstack") {
    return { profile, projects, workExperience };
  }

  // Frontend variant
  const feProfile: Profile = {
    ...profile,
    tagline: profile.tagline.replace("Full Stack", "Frontend"),
    techStack: profile.techStack.map((cat) => {
      if (cat.category.toLowerCase() === "backend") {
        return { ...cat, items: cat.items.filter((t) => ["Node.js"].includes(t)) };
      }
      return cat;
    }).filter((cat) => cat.items.length > 0),
  };

  const feProjects = projects.map((p) => {
    // Adjust roles
    const role = p.role?.replace("Full Stack Engineer", "Frontend Engineer")
      .replace("Full Stack Developer", "Frontend Developer")
      .replace("풀스택 개발자", "프론트엔드 개발자")
      .replace("Full Stack Mühendisi", "Frontend Mühendisi")
      .replace("Full Stack Geliştirici", "Frontend Geliştirici");

    // Filter techStack to frontend-focused
    const backendOnly = ["ElysiaJS", "Django", "Python", "Supabase"];
    const techStack = p.techStack.filter((t) => !backendOnly.includes(t));

    return { ...p, role, techStack: techStack.length > 0 ? techStack : p.techStack };
  });

  const feWork = workExperience.map((e) => {
    const title = e.title
      .replace("풀스택 개발자", "프론트엔드 개발자")
      .replace("Full Stack Developer", "Frontend Developer")
      .replace("Full Stack Geliştirici", "Frontend Geliştirici");

    // Filter descriptions to frontend-focused (keep items that don't mention pure backend)
    const backendKeywords = ["SaaS 서버", "SaaS server", "LLM-WORKER", "pipe 모델 아키텍처", "pipe model architecture"];
    const description = e.description.filter(
      (d) => !backendKeywords.some((kw) => d.includes(kw)),
    );

    const backendTech = ["ElysiaJS", "Django", "Python"];
    const techStack = e.techStack?.filter((t) => !backendTech.includes(t));

    return { ...e, title, description, techStack };
  });

  return { profile: feProfile, projects: feProjects, workExperience: feWork };
}

function ResumeContent() {
  const { locale, setLocale } = useLocale();
  const profile = useProfile();
  const projects = useProjects();
  const { workExperience, education, awards } = useCareer();
  const [showPreview, setShowPreview] = useState(true);
  const [variant, setVariant] = useState<ResumeVariant>("fullstack");

  const locales: Locale[] = ["ko", "en", "tr"];
  const variants: ResumeVariant[] = ["fullstack", "frontend"];

  const adjusted = useMemo(
    () => applyVariant(variant, profile, projects, workExperience),
    [variant, profile, projects, workExperience],
  );

  const docProps = {
    profile: adjusted.profile,
    projects: adjusted.projects,
    workExperience: adjusted.workExperience,
    education,
    awards,
  };

  const fileName = `${profile.name}_${variantLabels[variant].replace(" ", "")}_${locale.toUpperCase()}.pdf`;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Toolbar */}
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-3 shadow-sm">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-semibold text-gray-900">Resume PDF</h1>

          {/* Variant switcher */}
          <div className="flex items-center gap-1 rounded-full border border-gray-200 px-1 py-0.5">
            {variants.map((v) => (
              <button
                key={v}
                onClick={() => setVariant(v)}
                className={`rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors ${
                  variant === v
                    ? "bg-blue-600 text-white"
                    : "text-gray-400 hover:text-gray-700"
                }`}
              >
                {variantLabels[v]}
              </button>
            ))}
          </div>

          {/* Language switcher */}
          <div className="flex items-center gap-1 rounded-full border border-gray-200 px-1 py-0.5">
            {locales.map((l) => (
              <button
                key={l}
                onClick={() => setLocale(l)}
                className={`rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors ${
                  locale === l
                    ? "bg-gray-900 text-white"
                    : "text-gray-400 hover:text-gray-700"
                }`}
              >
                {localeLabels[l]}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-600 transition-colors hover:bg-gray-50"
          >
            {showPreview ? "Hide Preview" : "Show Preview"}
          </button>

          <PDFDownloadLink
            document={<ResumeDocument {...docProps} />}
            fileName={fileName}
            className="rounded-lg bg-blue-600 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            {({ loading }) => (loading ? "Generating..." : "Download PDF")}
          </PDFDownloadLink>
        </div>
      </div>

      {/* Preview */}
      {showPreview && (
        <div className="flex justify-center p-8">
          <div className="w-full max-w-4xl" style={{ height: "calc(100vh - 80px)" }}>
            <PDFViewer width="100%" height="100%" className="rounded-lg shadow-lg">
              <ResumeDocument {...docProps} />
            </PDFViewer>
          </div>
        </div>
      )}
    </div>
  );
}

export default function PdfViewer() {
  return <ResumeContent />;
}
