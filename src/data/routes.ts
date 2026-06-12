// ── Route types ──

export type RouteType = "home" | "project" | "detail" | "pdf-portfolio" | "pdf-resume";

export interface ProjectRoute {
  type: "project";
  projectId: string;
}

export interface DetailRoute {
  type: "detail";
  projectId: string;
  detailIndex: number;
}

export interface HomeRoute {
  type: "home";
}

export interface PdfRoute {
  type: "pdf-portfolio" | "pdf-resume";
}

export type RouteEntry = HomeRoute | ProjectRoute | DetailRoute | PdfRoute;

// ── UUID mappings ──

const routeMap: Record<string, RouteEntry> = {
  // Home
  "9f6ee8d3-12b4-4b28-80a8-6530187cf787": { type: "home" },

  // Projects
  "a69d5303-a08e-43dc-a549-4412d330e5c0": { type: "project", projectId: "llami" },
  "b9d08e90-d6f3-4499-88fe-e3331867e60d": { type: "project", projectId: "cgv-assistant" },
  "dc215fcc-d29e-4c8d-830c-e08d5f9cbccc": { type: "project", projectId: "dynamos-v2" },
  "50f1bfce-7c0c-4842-a854-997fe56b0b99": { type: "project", projectId: "worktree-system" },
  "dc1511f0-c537-459b-a548-a2a3599928a0": { type: "project", projectId: "agent-silo-system" },
  "8a91f805-4efe-4c62-bcca-24e805cd248a": { type: "project", projectId: "quiza" },
  "11a676ab-5354-4b11-b455-52cafd9807d1": { type: "project", projectId: "onjump" },

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

  // Agent Silo System details
  "5025433a-210b-40bf-9f14-2e676916886e": { type: "detail", projectId: "agent-silo-system", detailIndex: 0 },
  "2e0d9cc7-b74b-4448-ad95-058ac58bacc1": { type: "detail", projectId: "agent-silo-system", detailIndex: 1 },

  // Quiza details
  "f32ecb74-8a8f-4dc2-aba2-08da6a827871": { type: "detail", projectId: "quiza", detailIndex: 0 },
  "039b5b3e-4c0d-42b1-9547-8ba2c8ddc646": { type: "detail", projectId: "quiza", detailIndex: 1 },

  // OnJump details
  "4db83359-e7e1-4df3-908b-a2a1fc940c13": { type: "detail", projectId: "onjump", detailIndex: 0 },
  "394a2325-aba4-442f-9a9c-f7f3b479e011": { type: "detail", projectId: "onjump", detailIndex: 1 },

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

let homeUuid = "";
const projectUuidMap: Record<string, string> = {};
const detailUuidMap: Record<string, Record<number, string>> = {};
const pdfUuidMap: Record<string, string> = {};

for (const [uuid, entry] of Object.entries(routeMap)) {
  if (entry.type === "home") {
    homeUuid = uuid;
  } else if (entry.type === "project") {
    projectUuidMap[entry.projectId] = uuid;
  } else if (entry.type === "detail") {
    if (!detailUuidMap[entry.projectId]) detailUuidMap[entry.projectId] = {};
    detailUuidMap[entry.projectId][entry.detailIndex] = uuid;
  } else {
    pdfUuidMap[entry.type] = uuid;
  }
}

export function getHomeUuid(): string {
  return homeUuid;
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
