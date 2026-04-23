import { notFound } from "next/navigation";
import { SsgoiTransition } from "@ssgoi/react";
import { projects } from "@/data/projects";
import { getRoute, getAllUuids } from "@/data/routes";
import HeroSection from "@/components/sections/HeroSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import CareerSection from "@/components/sections/CareerSection";
import ContactSection from "@/components/sections/ContactSection";
import ProjectDetailClient from "./ProjectDetailClient";
import DetailSectionClient from "./DetailSectionClient";
import PdfPortfolioClient from "./PdfPortfolioClient";
import PdfResumeClient from "./PdfResumeClient";

export function generateStaticParams() {
  return getAllUuids().map((uuid) => ({ uuid }));
}

interface Props {
  params: Promise<{ uuid: string }>;
}

export default async function UuidPage({ params }: Props) {
  const { uuid } = await params;
  const route = getRoute(uuid);

  if (!route) notFound();

  if (route.type === "home") {
    return (
      <SsgoiTransition id={`/${uuid}`}>
        <HeroSection />
        <ProjectsSection />
        <CareerSection />
        <ContactSection />
      </SsgoiTransition>
    );
  }

  if (route.type === "project") {
    const project = projects.find((p) => p.id === route.projectId);
    if (!project) notFound();
    return (
      <SsgoiTransition id={`/${uuid}`}>
        <ProjectDetailClient project={project} />
      </SsgoiTransition>
    );
  }

  if (route.type === "detail") {
    const project = projects.find((p) => p.id === route.projectId);
    if (!project) notFound();
    const section = project.details?.[route.detailIndex];
    if (!section) notFound();
    return (
      <SsgoiTransition id={`/${uuid}`}>
        <DetailSectionClient
          project={project}
          section={section}
          sectionIndex={route.detailIndex}
        />
      </SsgoiTransition>
    );
  }

  if (route.type === "pdf-portfolio") {
    return <PdfPortfolioClient />;
  }

  if (route.type === "pdf-resume") {
    return <PdfResumeClient />;
  }

  notFound();
}
