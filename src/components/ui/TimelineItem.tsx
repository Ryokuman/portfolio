"use client";

import { motion } from "motion/react";
import { fadeInLeft } from "@/lib/animations";
import type { CareerEntry } from "@/types";

interface TimelineItemProps {
  entry: CareerEntry;
}

const typeLabels: Record<CareerEntry["type"], string> = {
  work: "Work",
  education: "Education",
  award: "Award",
};

const typeColors: Record<CareerEntry["type"], string> = {
  work: "bg-blue-500",
  education: "bg-emerald-500",
  award: "bg-amber-500",
};

export default function TimelineItem({ entry }: TimelineItemProps) {
  return (
    <motion.div
      variants={fadeInLeft}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="relative pl-8 pb-8 last:pb-0"
    >
      {/* Timeline line */}
      <div className="absolute left-[11px] top-2 bottom-0 w-px bg-gray-200 last:hidden" />

      {/* Timeline dot */}
      <div
        className={`absolute left-0 top-2 h-6 w-6 rounded-full ${typeColors[entry.type]} flex items-center justify-center`}
      >
        <div className="h-2 w-2 rounded-full bg-white" />
      </div>

      <div className="rounded-lg border border-gray-200 bg-gray-50 p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded bg-gray-200 px-2 py-0.5 text-xs text-gray-600">
            {typeLabels[entry.type]}
          </span>
          <span className="text-sm text-gray-400">{entry.period}</span>
        </div>

        <div className="mt-2 flex items-center gap-3">
          {entry.logo && (
            <img
              src={entry.logo}
              alt={entry.organization}
              className="h-10 w-10 shrink-0 rounded-lg object-contain bg-white border border-gray-100 p-1"
            />
          )}
          <div>
            <h3 className="font-semibold text-gray-900">{entry.title}</h3>
            <p className="text-sm text-gray-500">{entry.organization}</p>
          </div>
        </div>

        <ul className="mt-3 space-y-1">
          {entry.description.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 text-sm text-gray-500"
            >
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gray-300" />
              {item}
            </li>
          ))}
        </ul>

        {entry.techStack && entry.techStack.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {entry.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded bg-gray-200 px-2 py-0.5 text-xs text-gray-500"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
