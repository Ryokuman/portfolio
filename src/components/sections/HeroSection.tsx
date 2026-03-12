"use client";

import { motion } from "motion/react";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import TechBadge from "@/components/ui/TechBadge";
import basePath from "@/lib/basePath";
import { useT } from "@/i18n/useT";
import { useProfile } from "@/i18n/useData";

export default function HeroSection() {
  const t = useT();
  const profile = useProfile();

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6"
    >
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/4 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute right-1/4 top-1/2 h-64 w-64 rounded-full bg-cyan-500/5 blur-3xl" />
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative mx-auto max-w-3xl text-center"
      >
        <motion.div variants={fadeInUp} className="mb-6">
          <img
            src={`${basePath}/images/profile.png`}
            alt={profile.name}
            className="mx-auto h-28 w-28 rounded-full object-cover ring-4 ring-white shadow-lg"
          />
        </motion.div>

        <motion.p
          variants={fadeInUp}
          className="text-sm font-medium tracking-widest text-blue-600 uppercase"
        >
          {t("hero.portfolio")}
        </motion.p>

        <motion.h1
          variants={fadeInUp}
          className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
        >
          <span className="bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 bg-clip-text text-transparent">
            {profile.name}
          </span>
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          className="mt-4 text-lg text-gray-500 sm:text-xl"
        >
          {profile.tagline}
        </motion.p>

        <motion.div variants={fadeInUp} className="mt-6 space-y-2">
          {profile.bio.map((paragraph) => (
            <p key={paragraph} className="text-gray-400 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </motion.div>

        {/* Tech stack */}
        <motion.div variants={fadeInUp} className="mt-10 space-y-4">
          {profile.techStack.map((category) => (
            <div key={category.category}>
              <p className="mb-2 text-xs font-medium tracking-wider text-gray-400 uppercase">
                {category.category}
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {category.items.map((tech) => (
                  <TechBadge key={tech} name={tech} />
                ))}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div variants={fadeInUp} className="mt-16">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="mx-auto h-10 w-6 rounded-full border-2 border-gray-300 p-1"
          >
            <div className="h-2 w-full rounded-full bg-gray-300" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
