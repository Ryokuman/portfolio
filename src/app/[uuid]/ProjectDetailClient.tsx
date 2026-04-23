"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import type { Project } from "@/types";
import TechBadge from "@/components/ui/TechBadge";
import Card from "@/components/ui/Card";
import basePath from "@/lib/basePath";
import { useT } from "@/i18n/useT";
import { useProject } from "@/i18n/useData";
import { getDetailUuid } from "@/data/routes";

interface Props {
  project: Project;
}

export default function ProjectDetailClient({ project: serverProject }: Props) {
  const [leaving, setLeaving] = useState(false);
  const t = useT();
  const project = useProject(serverProject.id) ?? serverProject;

  useEffect(() => {
    const onPopState = () => setLeaving(true);
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  return (
    <div>
      {/* Hero banner */}
      <div
        data-hero-key={`project-${project.id}`}
        className={`relative h-64 w-full bg-gradient-to-br ${project.gradient} md:h-80`}
      >
        {project.video && (
          <video
            src={`${basePath}${project.video}`}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
        {!project.video && project.thumbnail && (
          <img
            src={`${basePath}${project.thumbnail}`}
            alt={project.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
        {!project.video && !project.thumbnail && (
          <div className="absolute inset-0 opacity-20">
            <div className="absolute right-12 top-12 h-48 w-48 rounded-full border-2 border-white/30" />
            <div className="absolute right-24 top-24 h-32 w-32 rounded-full border-2 border-white/20" />
            <div className="absolute bottom-12 left-12 h-24 w-24 rounded-lg border-2 border-white/20 rotate-12" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />

        <div
          className={`absolute inset-x-0 bottom-0 px-6 pb-6 md:px-8 transition-opacity duration-200 ${leaving ? "opacity-0" : "opacity-100"}`}
        >
          <div className="mx-auto max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-gray-700 backdrop-blur-sm">
                {project.primaryTech}
              </span>
              {project.role && (
                <span className="rounded-full bg-white/70 px-3 py-1 text-xs text-gray-500 backdrop-blur-sm">
                  {project.role}
                </span>
              )}
            </div>
            <h1 className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl">
              {project.title}
            </h1>
            {project.period && (
              <p className="mt-1 text-sm text-gray-500">{project.period}</p>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div
        className={`px-6 py-12 md:px-8 transition-opacity duration-200 ${leaving ? "opacity-0" : "opacity-100"}`}
      >
        <div className="mx-auto max-w-3xl">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.p
              variants={fadeInUp}
              className="text-gray-500 leading-relaxed"
            >
              {project.description}
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="mt-5 flex flex-wrap gap-2"
            >
              {project.techStack.map((tech) => (
                <TechBadge key={tech} name={tech} />
              ))}
            </motion.div>

            {/* Achievements */}
            {project.achievements && project.achievements.length > 0 && (
              <motion.div variants={fadeInUp} className="mt-10">
                <h2 className="text-lg font-semibold text-gray-800">
                  {t("projects.achievements")}
                </h2>
                <div className="mt-4 space-y-3">
                  {project.achievements.map((achievement) => (
                    <div
                      key={achievement}
                      className="flex items-start gap-2.5 text-sm font-medium text-emerald-600"
                    >
                      <svg
                        className="mt-0.5 h-4 w-4 shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                        />
                      </svg>
                      {achievement}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Detail Sections — Card grid */}
          {project.details && project.details.length > 0 && (
            <div className="mt-14">
              <h2 className="text-lg font-semibold text-gray-800 mb-5">
                {t("projects.details")}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.details.map((section, idx) => (
                  <motion.div
                    key={section.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ delay: idx * 0.06, duration: 0.4 }}
                  >
                    <Card
                      link={`/${getDetailUuid(project.id, idx)}`}
                      title={section.title}
                      period={section.period}
                      badge={section.techStack?.[0]}
                      image={section.images?.[0]}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom back link */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <Link
              href="/#projects"
              className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-5 py-3 text-sm text-gray-600 transition-colors hover:border-blue-300 hover:text-blue-600"
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
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
              {t("projects.back")}
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
