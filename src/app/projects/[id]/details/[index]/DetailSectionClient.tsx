"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import type { Project, ProjectDetailSection } from "@/types";
import ImageCarousel from "@/components/ui/ImageCarousel";

interface Props {
  project: Project;
  section: ProjectDetailSection;
  sectionIndex: number;
}

function extractContribution(content: string[]): {
  percentage: number | null;
  cleaned: string[];
} {
  const regex = /\(기여도\s*(\d+(?:\.\d+)?)%\)/;
  let percentage: number | null = null;
  const cleaned = content.map((item) => {
    const match = item.match(regex);
    if (match && percentage === null) {
      percentage = parseFloat(match[1]);
    }
    return item.replace(regex, "").replace(/\s{2,}/g, " ").trim();
  });
  return { percentage, cleaned };
}

function ContentPanel({
  section,
  leaving,
}: {
  section: ProjectDetailSection;
  leaving: boolean;
}) {
  const { percentage, cleaned } = extractContribution(section.content);

  return (
    <div
      className={`transition-opacity duration-200 ${leaving ? "opacity-0" : "opacity-100"}`}
    >
      <div className="flex flex-wrap items-center gap-2">
        <h1 className="text-xl font-bold text-gray-900">{section.title}</h1>
        {section.period && (
          <span className="text-sm text-gray-400">{section.period}</span>
        )}
      </div>

      {section.techStack && section.techStack.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {section.techStack.map((tech) => (
            <span
              key={tech}
              className="rounded bg-gray-100 px-2.5 py-1 text-xs text-gray-500"
            >
              {tech}
            </span>
          ))}
        </div>
      )}

      {percentage !== null && (
        <div className="mt-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-medium text-gray-500">기여도</span>
            <span className="text-xs font-semibold text-gray-700">{percentage}%</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-gray-100 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
              className="h-full rounded-full bg-blue-500"
            />
          </div>
        </div>
      )}

      {section.links && section.links.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {section.links.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600 transition-colors hover:bg-blue-100"
            >
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
              {link.label}
            </a>
          ))}
        </div>
      )}

      <ul className="mt-6 space-y-4">
        {cleaned.map((item, i) => (
          <motion.li
            key={item}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.05, duration: 0.4 }}
            className="flex items-start gap-3 text-sm text-gray-500 leading-relaxed"
          >
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-300" />
            {item}
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

export default function DetailSectionClient({
  project,
  section,
  sectionIndex,
}: Props) {
  const router = useRouter();
  const [leaving, setLeaving] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const pinterestKey = `/projects/${project.id}/details/${sectionIndex}`;

  const handleLeave = useCallback(() => {
    if (leaving) return;
    setLeaving(true);
    setTimeout(() => router.back(), 200);
  }, [leaving, router]);

  // Lock page scroll
  useEffect(() => {
    const html = document.documentElement;
    html.style.overflow = "hidden";
    return () => {
      html.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const onPopState = () => setLeaving(true);
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const hasImages = section.images && section.images.length > 0;

  return (
    <div className="h-screen pt-14 bg-white overflow-hidden">
      {/* ── Desktop: side-by-side ── */}
      <div className="hidden md:flex h-full">
        {/* Left — Image (70%) */}
        {hasImages && (
          <div className="w-[70%] h-full bg-gray-50 flex items-center">
            <div className="w-full">
              <ImageCarousel images={section.images!} alt={section.title} />
            </div>
          </div>
        )}

        {/* Right — Content (30%) */}
        <div
          data-pinterest-detail-key={pinterestKey}
          className={`${hasImages ? "w-[30%] border-l border-gray-200" : "w-full"} h-full overflow-y-auto`}
        >
          <div className="p-6 lg:p-8">
            <ContentPanel section={section} leaving={leaving} />
          </div>
        </div>
      </div>

      {/* ── Mobile: full-screen image + content bubble ── */}
      <div className="md:hidden h-full relative">
        {/* Image — full screen */}
        {hasImages && (
          <div className="h-full flex items-center bg-gray-50">
            <div className="w-full">
              <ImageCarousel images={section.images!} alt={section.title} />
            </div>
          </div>
        )}

        {/* Content bubble trigger */}
        <AnimatePresence>
          {!showContent && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => setShowContent(true)}
              className="absolute bottom-6 right-6 flex items-center gap-2 rounded-full bg-white/90 px-4 py-2.5 shadow-lg backdrop-blur-sm border border-gray-200 text-sm font-medium text-gray-700"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                />
              </svg>
              상세 보기
            </motion.button>
          )}
        </AnimatePresence>

        {/* Content overlay */}
        <AnimatePresence>
          {showContent && (
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="absolute inset-0 bg-white overflow-y-auto"
            >
              <div className="sticky top-0 z-10 flex items-center justify-between bg-white/90 backdrop-blur-sm px-5 py-3 border-b border-gray-100">
                <span className="text-sm font-medium text-gray-500">
                  {section.title}
                </span>
                <button
                  onClick={() => setShowContent(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-100 text-gray-400"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="p-5 pb-10">
                <ContentPanel section={section} leaving={leaving} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
