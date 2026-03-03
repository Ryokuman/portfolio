"use client";

import { motion } from "motion/react";
import type { Project, ProjectDetailSection } from "@/types";

interface Props {
  project: Project;
  section: ProjectDetailSection;
  sectionIndex: number;
}

export default function DetailSectionClient({
  project,
  section,
  sectionIndex,
}: Props) {
  const pinterestKey = `/projects/${project.id}/details/${sectionIndex}`;

  return (
    <div className="min-h-screen bg-white">
      <div className="px-6 py-10 md:px-8">
        <div
          data-pinterest-detail-key={pinterestKey}
          className="mx-auto max-w-3xl rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm"
        >
          {section.image && (
            <div className="aspect-video w-full overflow-hidden">
              <img
                src={section.image}
                alt={section.title}
                className="h-full w-full object-cover"
              />
            </div>
          )}

          <div className="p-6 md:p-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="flex flex-wrap items-center gap-2"
            >
              <h1 className="text-xl font-bold text-gray-900">
                {section.title}
              </h1>
              {section.period && (
                <span className="text-sm text-gray-400">{section.period}</span>
              )}
            </motion.div>

            {section.techStack && section.techStack.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.4 }}
                className="mt-4 flex flex-wrap gap-1.5"
              >
                {section.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded bg-gray-100 px-2.5 py-1 text-xs text-gray-500"
                  >
                    {tech}
                  </span>
                ))}
              </motion.div>
            )}

            <ul className="mt-6 space-y-4">
              {section.content.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.05, duration: 0.4 }}
                  className="flex items-start gap-3 text-sm text-gray-500 leading-relaxed"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-300" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
