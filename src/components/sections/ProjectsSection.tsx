"use client";

import { motion } from "motion/react";
import { staggerContainer } from "@/lib/animations";
import { featuredProjects, regularProjects } from "@/data/projects";
import SectionHeading from "@/components/ui/SectionHeading";
import FeaturedProjectCard from "@/components/ui/FeaturedProjectCard";
import ProjectCard from "@/components/ui/ProjectCard";

export default function ProjectsSection() {
  return (
    <section id="projects" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          title="Projects"
          subtitle="주요 프로젝트와 성과를 소개합니다"
        />

        {/* Featured projects */}
        {featuredProjects.length > 0 && (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid gap-6 md:grid-cols-2"
          >
            {featuredProjects.map((project) => (
              <FeaturedProjectCard key={project.id} project={project} />
            ))}
          </motion.div>
        )}

        {/* Regular projects */}
        {regularProjects.length > 0 && (
          <>
            <h3 className="mt-16 mb-6 text-lg font-semibold text-gray-300">
              Other Projects
            </h3>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              {regularProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}
