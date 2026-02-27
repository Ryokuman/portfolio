"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { fadeInUp, staggerContainer, fadeInLeft } from "@/lib/animations";
import type { Project } from "@/types";
import TechBadge from "@/components/ui/TechBadge";

interface Props {
  project: Project;
}

export default function ProjectDetailClient({ project }: Props) {
  return (
    <div>
      {/* Hero banner - same data-hero-key as card for ssgoi transition */}
      <div
        data-hero-key={`project-${project.id}`}
        className={`relative h-64 w-full bg-gradient-to-br ${project.gradient} md:h-80`}
      >
        {/* Video background */}
        {project.video && (
          <video
            src={project.video}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}

        {/* Image background */}
        {!project.video && project.thumbnail && (
          <img
            src={project.thumbnail}
            alt={project.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}

        {/* Decorative pattern fallback */}
        {!project.video && !project.thumbnail && (
          <div className="absolute inset-0 opacity-20">
            <div className="absolute right-12 top-12 h-48 w-48 rounded-full border-2 border-white/30" />
            <div className="absolute right-24 top-24 h-32 w-32 rounded-full border-2 border-white/20" />
            <div className="absolute bottom-12 left-12 h-24 w-24 rounded-lg border-2 border-white/20 rotate-12" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent" />

        {/* Back button on hero */}
        <div className="absolute left-6 top-6">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-1.5 rounded-full bg-black/30 px-3 py-1.5 text-sm text-white/80 backdrop-blur-sm transition-colors hover:bg-black/50 hover:text-white"
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
            돌아가기
          </Link>
        </div>

        {/* Title on hero */}
        <div className="absolute inset-x-0 bottom-0 px-6 pb-6 md:px-8">
          <div className="mx-auto max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-black/30 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur-sm">
                {project.primaryTech}
              </span>
              {project.role && (
                <span className="rounded-full bg-black/30 px-3 py-1 text-xs text-white/70 backdrop-blur-sm">
                  {project.role}
                </span>
              )}
            </div>
            <h1 className="mt-2 text-3xl font-bold text-white drop-shadow-lg md:text-4xl">
              {project.title}
            </h1>
            {project.period && (
              <p className="mt-1 text-sm text-white/60">{project.period}</p>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-12 md:px-8">
        <div className="mx-auto max-w-3xl">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.p
              variants={fadeInUp}
              className="text-gray-400 leading-relaxed"
            >
              {project.description}
            </motion.p>

            {/* Tech Stack */}
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
                <h2 className="text-lg font-semibold text-gray-200">
                  주요 성과
                </h2>
                <div className="mt-4 space-y-3">
                  {project.achievements.map((achievement) => (
                    <div
                      key={achievement}
                      className="flex items-start gap-2.5 text-sm font-medium text-emerald-400"
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

          {/* Detail Sections */}
          {project.details && project.details.length > 0 && (
            <div className="mt-14 space-y-8">
              {project.details.map((section, idx) => (
                <motion.div
                  key={section.title}
                  variants={fadeInLeft}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: idx * 0.05 }}
                  className="rounded-xl border border-gray-800 bg-gray-900/50 p-6"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-semibold text-gray-100">
                      {section.title}
                    </h3>
                    {section.period && (
                      <span className="text-sm text-gray-500">
                        {section.period}
                      </span>
                    )}
                  </div>

                  {section.techStack && section.techStack.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {section.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded bg-gray-800 px-2 py-0.5 text-xs text-gray-400"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  <ul className="mt-4 space-y-2.5">
                    {section.content.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm text-gray-400 leading-relaxed"
                      >
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gray-600" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
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
              className="inline-flex items-center gap-1.5 rounded-lg border border-gray-800 bg-gray-900 px-5 py-3 text-sm text-gray-300 transition-colors hover:border-blue-500/50 hover:text-blue-400"
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
              프로젝트 목록으로
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
