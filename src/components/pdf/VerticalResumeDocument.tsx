/* eslint-disable jsx-a11y/alt-text -- @react-pdf/renderer Image does not support the browser img alt prop. */
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Link,
  Image,
} from "@react-pdf/renderer";
import type { Locale } from "@/i18n/context";
import type { CompanyConfig, PdfContent, PdfVariant } from "@/data/pdf-resume";

Font.register({
  family: "Pretendard",
  fonts: [
    {
      src: "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/packages/pretendard/dist/public/static/Pretendard-Regular.otf",
      fontWeight: 400,
    },
    {
      src: "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/packages/pretendard/dist/public/static/Pretendard-Medium.otf",
      fontWeight: 500,
    },
    {
      src: "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/packages/pretendard/dist/public/static/Pretendard-SemiBold.otf",
      fontWeight: 600,
    },
    {
      src: "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/packages/pretendard/dist/public/static/Pretendard-Bold.otf",
      fontWeight: 700,
    },
  ],
});

type ProjectKey =
  | "dynamos"
  | "generator"
  | "dynavite"
  | "agentSilo"
  | "cgv"
  | "llami"
  | "worktree";

const labels: Record<Locale, {
  contact: string;
  technicalSkills: string;
  languages: string;
  education: string;
  summary: string;
  experience: string;
  projects: string;
  runup: string;
  poul: string;
  present: string;
  korean: string;
  english: string;
  turkish: string;
}> = {
  ko: {
    contact: "CONTACT",
    technicalSkills: "TECHNICAL SKILLS",
    languages: "LANGUAGES",
    education: "EDUCATION",
    summary: "PROFESSIONAL SUMMARY",
    experience: "PROFESSIONAL EXPERIENCE",
    projects: "PROJECTS",
    runup: "주식회사 런업",
    poul: "주식회사 피오유엘 (POUL)",
    present: "현재",
    korean: "Korean — Native",
    english: "English — Working proficiency",
    turkish: "Turkish — Conversational",
  },
  en: {
    contact: "CONTACT",
    technicalSkills: "TECHNICAL SKILLS",
    languages: "LANGUAGES",
    education: "EDUCATION",
    summary: "PROFESSIONAL SUMMARY",
    experience: "PROFESSIONAL EXPERIENCE",
    projects: "PROJECTS",
    runup: "Runup Inc.",
    poul: "POUL Inc.",
    present: "Present",
    korean: "Korean — Native",
    english: "English — Working proficiency",
    turkish: "Turkish — Conversational",
  },
  tr: {
    contact: "CONTACT",
    technicalSkills: "TECHNICAL SKILLS",
    languages: "LANGUAGES",
    education: "EDUCATION",
    summary: "PROFESSIONAL SUMMARY",
    experience: "PROFESSIONAL EXPERIENCE",
    projects: "PROJECTS",
    runup: "Runup A.S.",
    poul: "POUL A.S.",
    present: "Devam",
    korean: "Korece — Ana dil",
    english: "Ingilizce — Calisma yetkinligi",
    turkish: "Turkce — Konusma seviyesi",
  },
};

const projectTitles: Record<ProjectKey, string> = {
  dynamos: "DynaMOS Platform",
  generator: "DynaMOS Generator",
  dynavite: "dynaVite",
  agentSilo: "Agent Silo System",
  cgv: "CGV-ASSISTANT",
  llami: "LLAMI",
  worktree: "Claude Worktree System",
};

const projectPeriods: Record<ProjectKey, Record<Locale, string>> = {
  dynamos: { ko: "2025.12 - 현재", en: "2025.12 - Present", tr: "2025.12 - Devam" },
  generator: { ko: "2025.12 - 현재", en: "2025.12 - Present", tr: "2025.12 - Devam" },
  dynavite: { ko: "2025.12 - 현재", en: "2025.12 - Present", tr: "2025.12 - Devam" },
  agentSilo: { ko: "2025.12 - 현재", en: "2025.12 - Present", tr: "2025.12 - Devam" },
  cgv: { ko: "2024.06 - 2025.07", en: "2024.06 - 2025.07", tr: "2024.06 - 2025.07" },
  llami: { ko: "2024.12 - 2025.08", en: "2024.12 - 2025.08", tr: "2024.12 - 2025.08" },
  worktree: { ko: "2026.02 - 현재", en: "2026.02 - Present", tr: "2026.02 - Devam" },
};

const c = {
  navy: "#111827",
  navyMuted: "#94a3b8",
  navyRule: "#334155",
  blue: "#2563eb",
  text: "#273142",
  muted: "#64748b",
  light: "#e2e8f0",
  border: "#dbe3ee",
  white: "#ffffff",
};

const s = StyleSheet.create({
  page: {
    flexDirection: "row",
    fontFamily: "Pretendard",
    fontSize: 8.2,
    color: c.text,
    lineHeight: 1.42,
  },
  sidebar: {
    width: 166,
    minHeight: "100%",
    backgroundColor: c.navy,
    color: c.white,
    padding: "26 18 22",
  },
  main: {
    flex: 1,
    padding: "28 30 24",
  },
  continuationMain: {
    flex: 1,
    padding: "28 30 24",
  },
  photo: {
    width: 80,
    height: 92,
    objectFit: "cover",
    marginBottom: 14,
  },
  sideSection: {
    marginBottom: 16,
  },
  sideTitle: {
    fontSize: 8,
    fontWeight: 700,
    color: c.white,
    letterSpacing: 0.8,
    paddingBottom: 4,
    marginBottom: 7,
    borderBottom: `1 solid ${c.navyRule}`,
  },
  sideText: {
    fontSize: 7.1,
    color: c.light,
    marginBottom: 3,
    lineHeight: 1.35,
  },
  sideLink: {
    fontSize: 7.1,
    color: c.light,
    textDecoration: "none",
    marginBottom: 3,
  },
  skillGroup: {
    marginBottom: 7,
  },
  skillLabel: {
    fontSize: 7.4,
    fontWeight: 700,
    color: c.white,
    marginBottom: 2,
  },
  skillText: {
    fontSize: 6.9,
    color: c.navyMuted,
    lineHeight: 1.32,
  },
  name: {
    fontSize: 23,
    fontWeight: 700,
    color: c.navy,
    lineHeight: 1.18,
    marginBottom: 8,
  },
  position: {
    fontSize: 10,
    color: c.blue,
    fontWeight: 600,
    marginBottom: 15,
  },
  section: {
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 9,
    fontWeight: 700,
    color: c.blue,
    letterSpacing: 1.0,
    paddingBottom: 4,
    marginBottom: 7,
    borderBottom: `1 solid ${c.border}`,
  },
  summaryText: {
    fontSize: 8.2,
    color: c.text,
    lineHeight: 1.5,
  },
  entry: {
    marginBottom: 11,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 2,
  },
  entryTitle: {
    fontSize: 9.3,
    fontWeight: 700,
    color: c.navy,
  },
  entryPeriod: {
    fontSize: 7.5,
    color: c.muted,
  },
  entryRole: {
    fontSize: 8,
    color: c.muted,
    marginBottom: 4,
  },
  bullet: {
    fontSize: 7.1,
    color: c.text,
    marginBottom: 1.6,
    lineHeight: 1.34,
  },
  projectEntry: {
    marginBottom: 7,
  },
  projectSummary: {
    fontSize: 7.2,
    color: c.muted,
    marginBottom: 2,
  },
  continuationLabel: {
    fontSize: 8,
    color: c.muted,
    marginBottom: 12,
  },
});

interface VerticalResumeDocumentProps {
  data: PdfContent;
  config: CompanyConfig;
  locale: Locale;
  variant: PdfVariant;
  imageBase?: string;
}

function firstSentences(value: string, count = 2) {
  return value
    .split("\n")
    .map((line) => line.replace(/^•\s*/, "").trim())
    .filter(Boolean)
    .slice(0, count);
}

const koProjectBullets: Record<ProjectKey, string[]> = {
  dynamos: [
    "X: 100개+ ERP/MES 화면에서 상태관리, 필터, 그리드, 버튼, API 계약이 화면마다 흩어져 신규 화면 구현과 QA가 매번 반복 비용으로 돌아왔습니다.",
    "Y: Tab/Filter/Grid/Buttons를 core component로 분리하고 Store + Context, config 조립, Storybook + Mock Backend 검증 흐름으로 전환했습니다.",
    "Z: FE 메뉴 119개, snapshot page 115개, backend endpoint 54개, MyBatis statement 1,386개, page-query mapping 161개를 추적 가능한 전환 단위로 정리했습니다.",
    "Z: 산식 기준 페이지당 코드량은 441줄 -> 122줄로 72% 감소, rerender trigger는 12.3개 -> 1.9개/page로 85% 감소했습니다.",
  ],
  generator: [
    "X: V1 HTML/JS/widgetprop/elements 정보를 사람이 읽고 V2 index.tsx/config.ts로 옮기는 작업이 레거시 전환의 반복 병목이었습니다.",
    "Y: snapshot data를 converter와 renderer 단계로 분리해 버튼, 필터, 그리드, modal, required 상태를 생성 규칙 안으로 옮겼습니다.",
    "Z: snapshot page 115개 규모의 화면을 수동 복원 대상이 아니라 page generation pipeline의 입력/출력 단위로 관리했습니다.",
  ],
  dynavite: [
    "X: generated page 하나를 확인하려고 전체 Next 앱, 인증, 세션, backend API를 모두 띄워야 해 사일로 QA feedback loop가 길어졌습니다.",
    "Y: VITE_PAGE_ID 기반 단일 page harness에 mock auth, mock API, session cookie/localStorage/header 주입을 구성했습니다.",
    "Z: filter/grid/button surface 검증 범위를 전체 앱 실행에서 page-level runtime 1개로 줄여 API 완성 전 화면 QA가 가능하게 했습니다.",
  ],
  agentSilo: [
    "X: 여러 이슈를 한 작업공간에서 처리하면 branch, 검증 기준, SSoT 승격 후보가 섞여 실패한 실험을 분리하기 어려웠습니다.",
    "Y: task/issue/page 단위로 격리 clone과 새 작업 브랜치를 만들고, 개발자/QA/리뷰 3-role workflow로 책임을 나눴습니다.",
    "Z: 변경 blast radius를 1 silo = 1 task branch 단위로 제한하고, PR 본문에서 SSoT 승격 후보와 비승격 항목을 2개 그룹으로 분리하도록 표준화했습니다.",
  ],
  cgv: [
    "X: CGV 리뷰/바이럴 분석 대시보드에서 tiktoken encoder 재생성과 느린 날짜별 조회 때문에 메모리와 응답성이 흔들렸습니다.",
    "Y: memory logger로 원인을 추적한 뒤 encoder singleton, cache table, 독립 API 병렬 호출 구조로 병목을 분리했습니다.",
    "Z: 기존 문안 기준 메모리는 8GB -> 약 300MB로 96% 감소했고, 그래프 렌더링은 3000ms -> 300ms로 10배 개선했습니다.",
  ],
  llami: [
    "X: 모델마다 인증, 요청 포맷, streaming event, function-call 응답이 달라 LLM API가 늘수록 handler와 UI 분기가 증가했습니다.",
    "Y: remote/local model 선택, worker 호출, stream parsing, token/credit 갱신, Bridge/ReverseBridge 흐름을 product surface와 분리했습니다.",
    "Z: native app 기준 활성 모델 20개(remote 18개, local 2개)를 확인했고, Model Store/Bot Store/LLAMI Chat/Expo App을 같은 모델 사용 경험 위에 연결했습니다.",
  ],
  worktree: [
    "X: QA 기간 여러 branch를 처리할 때 server restart, terminal 이동, plan 복구가 반복되어 작업 전환 비용이 커졌습니다.",
    "Y: branch별 worktree, dev server, web terminal, health check, Markdown plan sync를 하나의 dashboard 운영 흐름으로 묶었습니다.",
    "Z: DynaMOS QA 운영 문안 기준 4일간 62개 PR, 15.5 PR/day 처리 흐름을 지원하는 병렬 작업 환경으로 정리했습니다.",
  ],
};

function projectList(variant: PdfVariant, config: CompanyConfig): ProjectKey[] {
  const preferred: Record<PdfVariant, ProjectKey[]> = {
    frontend: ["dynamos", "generator", "dynavite", "agentSilo", "worktree"],
    fullstack: ["dynamos", "agentSilo", "cgv", "llami", "worktree"],
    backend: ["cgv", "llami", "dynamos", "agentSilo"],
  };
  const active = new Set(config.projectOrder);
  return preferred[variant].filter((id) => active.has(id));
}

function projectBullets(locale: Locale, id: ProjectKey, detail: string) {
  if (locale === "ko") return koProjectBullets[id];
  return firstSentences(detail, id === "dynamos" ? 3 : 2).map((line, index) => {
    const prefix = index === 0 ? "X" : index === 1 ? "Y" : "Z";
    return `${prefix}: ${line}`;
  });
}

export default function VerticalResumeDocument({
  data,
  config,
  locale,
  variant,
  imageBase = "",
}: VerticalResumeDocumentProps) {
  const l = labels[locale];
  const techGroups = [
    { label: "Core", items: data.techStack.core },
    { label: "State", items: data.techStack.state },
    { label: "UI", items: data.techStack.ui },
    { label: "Backend", items: data.techStack.backend },
    { label: "Infra", items: data.techStack.infra },
  ];
  const projects = projectList(variant, config);
  const firstPageProjects = projects.slice(0, 3);
  const continuationProjects = projects.slice(3);
  const renderSidebar = (compact = false) => (
    <View style={s.sidebar}>
      <Image style={s.photo} src={`${imageBase}${config.profileImage}`} />

      <View style={s.sideSection}>
        <Text style={s.sideTitle}>{l.contact}</Text>
        <Text style={s.sideText}>Seoul, South Korea</Text>
        <Link src="mailto:ryokuman21@gmail.com" style={s.sideLink}>
          ryokuman21@gmail.com
        </Link>
        <Link src="https://github.com/Ryokuman" style={s.sideLink}>
          github.com/Ryokuman
        </Link>
        <Link src="https://ryokuman.github.io/portfolio/" style={s.sideLink}>
          ryokuman.github.io/portfolio
        </Link>
      </View>

      <View style={s.sideSection}>
        <Text style={s.sideTitle}>{l.technicalSkills}</Text>
        {techGroups.map((group) => (
          <View key={group.label} style={s.skillGroup}>
            <Text style={s.skillLabel}>{group.label}</Text>
            <Text style={s.skillText}>{group.items.join(", ")}</Text>
          </View>
        ))}
      </View>

      {!compact && (
        <>
          <View style={s.sideSection}>
            <Text style={s.sideTitle}>{l.languages}</Text>
            <Text style={s.sideText}>{l.korean}</Text>
            <Text style={s.sideText}>{l.english}</Text>
            <Text style={s.sideText}>{l.turkish}</Text>
          </View>

          <View style={s.sideSection}>
            <Text style={s.sideTitle}>{l.education}</Text>
            <Text style={s.sideText}>{data.education.name}</Text>
            <Text style={s.sideText}>{data.education.dept}</Text>
            <Text style={s.sideText}>2017 - 2023</Text>
          </View>
        </>
      )}
    </View>
  );

  const renderProject = (id: ProjectKey) => {
    const project = data.projects[id];
    if (!project) return null;

    return (
      <View key={id} style={s.projectEntry}>
        <View style={s.row}>
          <Text style={s.entryTitle}>{projectTitles[id]}</Text>
          <Text style={s.entryPeriod}>{projectPeriods[id][locale]}</Text>
        </View>
        <Text style={s.projectSummary}>{project.summary}</Text>
        {projectBullets(locale, id, project.detail).map((line) => (
          <Text key={line} style={s.bullet}>• {line}</Text>
        ))}
      </View>
    );
  };

  return (
    <Document>
      <Page size="A4" style={s.page}>
        {renderSidebar()}

        <View style={s.main}>
          <Text style={s.name}>Yongmin Kim</Text>
          <Text style={s.position}>{data.position}</Text>

          <View style={s.section}>
            <Text style={s.sectionTitle}>{l.summary}</Text>
            <Text style={s.summaryText}>{data.intro.replace(/\n/g, " ")}</Text>
          </View>

          <View style={s.section}>
            <Text style={s.sectionTitle}>{l.experience}</Text>

            <View style={s.entry}>
              <View style={s.row}>
                <Text style={s.entryTitle}>{l.runup}</Text>
                <Text style={s.entryPeriod}>2025.12 - {l.present}</Text>
              </View>
              <Text style={s.entryRole}>{data.career.runup.role}</Text>
              <Text style={s.bullet}>• {data.career.runup.summary}</Text>
            </View>

            <View style={s.entry}>
              <View style={s.row}>
                <Text style={s.entryTitle}>{l.poul}</Text>
                <Text style={s.entryPeriod}>2024.06 - 2025.08</Text>
              </View>
              <Text style={s.entryRole}>{data.career.poul.role}</Text>
              <Text style={s.bullet}>• {data.career.poul.summary}</Text>
            </View>
          </View>

          <View style={s.section}>
            <Text style={s.sectionTitle}>{l.projects}</Text>
            {firstPageProjects.map(renderProject)}
          </View>
        </View>
      </Page>

      {continuationProjects.length > 0 && (
        <Page size="A4" style={s.page}>
          {renderSidebar(true)}
          <View style={s.continuationMain}>
            <Text style={s.name}>Yongmin Kim</Text>
            <Text style={s.continuationLabel}>{l.projects}</Text>
            <View style={s.section}>
              <Text style={s.sectionTitle}>{l.projects}</Text>
              {continuationProjects.map(renderProject)}
            </View>
          </View>
        </Page>
      )}
    </Document>
  );
}
