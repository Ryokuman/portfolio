"use client";

import { motion } from "motion/react";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { profile } from "@/data/profile";
import SectionHeading from "@/components/ui/SectionHeading";
import SocialLink from "@/components/ui/SocialLink";

export default function ContactSection() {
  return (
    <section id="contact" className="px-6 py-24">
      <div className="mx-auto max-w-3xl text-center">
        <SectionHeading
          title="Contact"
          subtitle="함께 이야기 나눠요"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-wrap justify-center gap-4"
        >
          {profile.social.map((link) => (
            <motion.div key={link.platform} variants={fadeInUp}>
              <SocialLink platform={link.platform} url={link.url} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
