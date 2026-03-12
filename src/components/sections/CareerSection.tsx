"use client";

import SectionHeading from "@/components/ui/SectionHeading";
import TimelineItem from "@/components/ui/TimelineItem";
import { useT } from "@/i18n/useT";
import { useCareer } from "@/i18n/useData";

export default function CareerSection() {
  const t = useT();
  const { workExperience, awards, education } = useCareer();

  return (
    <section id="career" className="px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          title={t("career.title")}
          subtitle={t("career.subtitle")}
        />

        {workExperience.length > 0 && (
          <div className="mb-12">
            <h3 className="mb-6 text-lg font-semibold text-gray-700">
              {t("career.experience")}
            </h3>
            <div>
              {workExperience.map((entry) => (
                <TimelineItem key={entry.id} entry={entry} />
              ))}
            </div>
          </div>
        )}

        {awards.length > 0 && (
          <div className="mb-12">
            <h3 className="mb-6 text-lg font-semibold text-gray-700">
              {t("career.awards")}
            </h3>
            <div>
              {awards.map((entry) => (
                <TimelineItem key={entry.id} entry={entry} />
              ))}
            </div>
          </div>
        )}

        {education.length > 0 && (
          <div>
            <h3 className="mb-6 text-lg font-semibold text-gray-700">
              {t("career.education")}
            </h3>
            <div>
              {education.map((entry) => (
                <TimelineItem key={entry.id} entry={entry} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
