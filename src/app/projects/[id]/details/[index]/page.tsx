import { SsgoiTransition } from "@ssgoi/react";
import { projects } from "@/data/projects";
import DetailSectionClient from "./DetailSectionClient";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return projects.flatMap((project) =>
    (project.details ?? []).map((_, index) => ({
      id: project.id,
      index: String(index),
    })),
  );
}

export default async function DetailSectionPage({
  params,
}: {
  params: Promise<{ id: string; index: string }>;
}) {
  const { id, index: indexStr } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) notFound();

  const idx = parseInt(indexStr, 10);
  const section = project.details?.[idx];
  if (!section) notFound();

  return (
    <SsgoiTransition id={`/projects/${id}/details/${idx}`}>
      <DetailSectionClient
        project={project}
        section={section}
        sectionIndex={idx}
      />
    </SsgoiTransition>
  );
}
