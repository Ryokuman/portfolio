import { projects } from "./projects";

// ── Route types ──

export type RouteType = "project" | "detail" | "pdf-portfolio" | "pdf-resume";

export interface ProjectRoute {
  type: "project";
  projectId: string;
}

export interface DetailRoute {
  type: "detail";
  projectId: string;
  detailIndex: number;
}

export interface PdfRoute {
  type: "pdf-portfolio" | "pdf-resume";
}

export type RouteEntry = ProjectRoute | DetailRoute | PdfRoute;

// ── UUID mappings ──

const routeMap: Record<string, RouteEntry> = {
  // Projects
  "a69d5303-a08e-43dc-a549-4412d330e5c0": { type: "project", projectId: "llami" },
  "b9d08e90-d6f3-4499-88fe-e3331867e60d": { type: "project", projectId: "cgv-assistant" },
  "dc215fcc-d29e-4c8d-830c-e08d5f9cbccc": { type: "project", projectId: "dynamos-v2" },
  "50f1bfce-7c0c-4842-a854-997fe56b0b99": { type: "project", projectId: "worktree-system" },

  // LLAMI details
  "29992f4c-bf83-4fca-9959-b67192917a74": { type: "detail", projectId: "llami", detailIndex: 0 },
  "b1c7d022-9fb3-4029-9b5a-f7960a15a119": { type: "detail", projectId: "llami", detailIndex: 1 },
  "234e9c09-1db8-42c3-85ad-a17a830837e2": { type: "detail", projectId: "llami", detailIndex: 2 },
  "403218dd-0cbe-4377-ba44-3ae180696f75": { type: "detail", projectId: "llami", detailIndex: 3 },

  // CGV-ASSISTANT details
  "fe9b2e55-40cc-4d72-9354-17ad4d55f9d4": { type: "detail", projectId: "cgv-assistant", detailIndex: 0 },
  "27deae86-1b40-41a6-9bcf-1bc6ebb8b1db": { type: "detail", projectId: "cgv-assistant", detailIndex: 1 },

  // DynaMOS v2 details
  "4160b107-4888-4fab-aca9-8e7330ef4cc9": { type: "detail", projectId: "dynamos-v2", detailIndex: 0 },
  "30314bf9-55d0-498c-9378-ef421b937903": { type: "detail", projectId: "dynamos-v2", detailIndex: 1 },
  "157d142d-883b-4fae-8a54-9dc8ed4161c2": { type: "detail", projectId: "dynamos-v2", detailIndex: 2 },
  "1a3c7912-4e70-4a4a-82f9-d1150153a535": { type: "detail", projectId: "dynamos-v2", detailIndex: 3 },

  // Worktree System details
  "9a86756b-709c-4277-a101-3140c728da78": { type: "detail", projectId: "worktree-system", detailIndex: 0 },
  "27cc90b6-bade-427c-83ed-7b23189e4c7f": { type: "detail", projectId: "worktree-system", detailIndex: 1 },
  "2b2798d3-332f-46df-b906-ee74c0fad38e": { type: "detail", projectId: "worktree-system", detailIndex: 2 },
  "fda42d88-36c5-4936-bf2c-06f80b181157": { type: "detail", projectId: "worktree-system", detailIndex: 3 },

  // PDF pages
  "d4ef43df-8a69-4600-8009-915049263059": { type: "pdf-portfolio" },
  "4c318439-2d3c-40fe-b1cd-7036ec9c1375": { type: "pdf-resume" },
};

// ── Lookup helpers ──

export function getRoute(uuid: string): RouteEntry | undefined {
  return routeMap[uuid];
}

export function getAllUuids(): string[] {
  return Object.keys(routeMap);
}

// ── Reverse lookup: get UUID from semantic key ──

const projectUuidMap: Record<string, string> = {};
const detailUuidMap: Record<string, Record<number, string>> = {};
const pdfUuidMap: Record<string, string> = {};

for (const [uuid, entry] of Object.entries(routeMap)) {
  if (entry.type === "project") {
    projectUuidMap[entry.projectId] = uuid;
  } else if (entry.type === "detail") {
    if (!detailUuidMap[entry.projectId]) detailUuidMap[entry.projectId] = {};
    detailUuidMap[entry.projectId][entry.detailIndex] = uuid;
  } else {
    pdfUuidMap[entry.type] = uuid;
  }
}

export function getProjectUuid(projectId: string): string {
  return projectUuidMap[projectId];
}

export function getDetailUuid(projectId: string, detailIndex: number): string {
  return detailUuidMap[projectId]?.[detailIndex];
}

export function getPdfUuid(type: "pdf-portfolio" | "pdf-resume"): string {
  return pdfUuidMap[type];
}
