"use client";

import { motion } from "motion/react";
import { staggerContainer } from "@/lib/animations";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectCard from "@/components/ui/ProjectCard";
import { useT } from "@/i18n/useT";
import { useProjects } from "@/i18n/useData";

export default function ProjectsSection() {
  const t = useT();
  const projects = useProjects();

  return (
    <section id="projects" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          title={t("projects.title")}
          subtitle={t("projects.subtitle")}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid gap-6 sm:grid-cols-2"
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
