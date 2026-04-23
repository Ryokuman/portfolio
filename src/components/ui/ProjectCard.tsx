"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { scaleIn } from "@/lib/animations";
import type { Project } from "@/types";
import basePath from "@/lib/basePath";
import { getProjectUuid } from "@/data/routes";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const hasMedia = project.video || project.thumbnail;

  return (
    <Link href={`/${getProjectUuid(project.id)}`}>
      <motion.div
        variants={scaleIn}
        whileHover={{ y: -6, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="group relative cursor-pointer overflow-hidden rounded-2xl shadow-sm border border-gray-200"
        onMouseEnter={() => videoRef.current?.play()}
        onMouseLeave={() => {
          if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
          }
        }}
      >
        <div
          data-hero-key={`project-${project.id}`}
          className={`relative aspect-[4/3] w-full bg-gradient-to-br ${project.gradient}`}
        >
          {project.video && (
            <video
              ref={videoRef}
              src={`${basePath}${project.video}`}
              muted
              loop
              playsInline
              preload="metadata"
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

          {!hasMedia && (
            <div className="absolute inset-0 opacity-20">
              <div className="absolute right-6 top-6 h-32 w-32 rounded-full border-2 border-white/30" />
              <div className="absolute right-12 top-12 h-20 w-20 rounded-full border-2 border-white/20" />
              <div className="absolute bottom-8 left-8 h-16 w-16 rounded-lg border-2 border-white/20 rotate-12" />
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-gray-700 backdrop-blur-sm">
              {project.primaryTech}
            </span>
          </div>

          {project.video && (
            <div className="absolute right-4 top-4 opacity-0 transition-opacity group-hover:opacity-100">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/30 backdrop-blur-sm">
                <div className="ml-0.5 h-0 w-0 border-y-[5px] border-l-[8px] border-y-transparent border-l-white" />
              </div>
            </div>
          )}

          <div className="absolute inset-x-0 bottom-0 p-5">
            <h3 className="text-xl font-bold text-white drop-shadow-lg">
              {project.title}
            </h3>
            <p className="mt-1 text-sm text-white/80">{project.period}</p>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
