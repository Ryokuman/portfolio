import SectionHeading from "@/components/ui/SectionHeading";
import TimelineItem from "@/components/ui/TimelineItem";
import { workExperience, education, awards } from "@/data/career";

export default function CareerSection() {
  return (
    <section id="career" className="px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          title="Career"
          subtitle="경력, 학력, 수상을 소개합니다"
        />

        {workExperience.length > 0 && (
          <div className="mb-12">
            <h3 className="mb-6 text-lg font-semibold text-gray-700">
              Experience
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
              Awards
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
              Education
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
