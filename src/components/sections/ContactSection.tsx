"use client";

import { motion } from "motion/react";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import SectionHeading from "@/components/ui/SectionHeading";
import SocialLink from "@/components/ui/SocialLink";
import { useT } from "@/i18n/useT";
import { useProfile } from "@/i18n/useData";

export default function ContactSection() {
  const t = useT();
  const profile = useProfile();

  return (
    <section id="contact" className="px-6 py-24">
      <div className="mx-auto max-w-3xl text-center">
        <SectionHeading
          title={t("contact.title")}
          subtitle={t("contact.subtitle")}
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
