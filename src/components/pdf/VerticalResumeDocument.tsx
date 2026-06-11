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
    "100개+ ERP/MES 업무 화면을 빠르게 전환해야 했지만, 화면마다 상태관리·필터·그리드·버튼 구현 방식이 달라 개발 속도와 품질이 흔들렸습니다.",
    "화면을 더 많이 직접 구현하는 방식으로는 반복 병목을 줄이기 어렵다고 보고, Tab/Filter/Grid/Buttons를 core component로 분리하고 Store + Context 기반 페이지 구조로 전환했습니다.",
    "컬럼·필터·버튼 정의를 config로 분리하고 Storybook + Mock Backend를 붙여, API 완성 전에도 화면과 요청/응답 스펙을 먼저 고정할 수 있게 만들었습니다.",
    "FE 메뉴 119개, snapshot page 115개, backend endpoint 54개, MyBatis statement 1,386개, page-query mapping 161개를 추적 가능한 전환 단위로 정리했습니다.",
    "산식 기준 페이지당 코드량은 441줄에서 122줄로 72% 줄었고, rerender trigger는 12.3개/page에서 1.9개/page로 약 85% 감소했습니다.",
  ],
  generator: [
    "V1 화면 정보를 사람이 읽고 V2 코드로 옮기는 작업이 레거시 전환 속도의 반복 병목이었습니다.",
    "V1 HTML/JS/widgetprop/elements 데이터를 분석하고, snapshot data를 converter와 renderer 단계로 분리해 V2 index.tsx와 config.ts 초안을 생성하도록 만들었습니다.",
    "버튼, 필터, 그리드, modal, required 상태를 생성 규칙 안으로 옮겨 레거시 전환을 수동 복원 작업이 아니라 규칙 기반 생성 문제로 바꿨습니다.",
    "snapshot page 115개 규모의 화면을 page generation pipeline의 입력/출력 단위로 관리했습니다.",
  ],
  dynavite: [
    "generated page 하나를 확인하려고 전체 Next 앱, 인증, 세션, backend API를 모두 띄워야 해서 사일로 내부 QA 루프가 느려졌습니다.",
    "생성 화면 검증을 전체 앱 실행이 아니라 page 단위 surface 확인으로 줄이기 위해 VITE_PAGE_ID 기반 단일 page harness를 만들었습니다.",
    "mock auth, mock API, session cookie/localStorage/header 주입을 구성해 filter/grid/button surface를 단일 runtime에서 확인하도록 바꿨습니다.",
    "검증 범위를 전체 앱 실행에서 page-level runtime 1개로 줄여 API 완성 전 화면 QA가 가능하게 했습니다.",
  ],
  agentSilo: [
    "여러 이슈를 한 에이전트가 직접 수정하면 SSoT, 작업 브랜치, 검증 경계가 섞이고 실패한 실험을 되돌리기 어려워졌습니다.",
    "메인 오케스트레이터가 task/issue/page 단위로 사일로를 만들고, 필요한 repo만 격리 clone한 뒤 보호 브랜치가 아닌 새 작업 브랜치에서 수정하도록 운영 규칙을 설계했습니다.",
    "사일로 안에서는 개발자 에이전트가 구현하고, QA 에이전트가 agent-browser 등으로 검증하며, 리뷰 에이전트가 scope/branch/secret/SSoT 승격 후보를 점검하도록 역할을 분리했습니다.",
    "변경 범위를 1 silo = 1 task branch 단위로 제한하고, PR 본문에는 SSoT 승격 후보와 비승격 항목을 2개 그룹으로 분리해 남기는 보고 흐름을 구축했습니다.",
  ],
  cgv: [
    "CGV 실관람평과 바이럴 데이터를 매일 운영자가 확인해야 했지만, 메모리 증가와 느린 리뷰 조회 API 때문에 분석 대시보드의 안정성과 응답성이 흔들렸습니다.",
    "운영 병목을 화면 문제가 아니라 backend 호출 흐름 문제로 보고, memory logger로 tiktoken encoder가 요청마다 재생성되는 지점을 추적했습니다.",
    "encoder 생성 흐름을 singleton 구조로 바꾸고, 날짜별 그래프 조회는 cache table 기반 조회와 API 병렬화로 전환했습니다.",
    "기존 문안 기준 메모리는 8GB에서 약 300MB로 약 96% 감소했고, 그래프 렌더링은 3000ms에서 300ms로 10배 개선했습니다.",
    "리뷰 수집, AI 감정/유해성 분석, 위험 리뷰 필터링, 한줄평 생성, 바이럴 트렌드 화면을 연결해 매일 확인 가능한 분석 서비스로 제품화했습니다.",
  ],
  llami: [
    "모델마다 인증, 요청 포맷, 스트리밍 이벤트, function-call 응답이 달라 신규 모델 추가 때마다 handler와 UI 분기가 늘어나는 문제가 있었습니다.",
    "요청 생성, stream parsing, token/credit 계산, function-call 정규화를 pipe 단계로 분리해 모델별 차이를 조합 가능한 처리 단위로 전환했습니다.",
    "모델 응답을 단일 인터페이스로 정규화해 프론트가 모델 차이를 몰라도 같은 컴포넌트로 렌더링하도록 구성했습니다.",
    "native app 기준 활성 모델 20개(remote 18개, local 2개)를 확인했고, Model Store/Bot Store/LLAMI Chat/Expo App을 같은 모델 사용 경험 위에 연결했습니다.",
  ],
  worktree: [
    "여러 브랜치를 동시에 처리할 때마다 서버 재시작, 의존성 설치, 터미널 이동, 작업 맥락 복구가 반복되는 문제가 있었습니다.",
    "branch별 dev server, web terminal, plan, health check를 한곳에서 관리하는 worktree dashboard를 구축했습니다.",
    "PTY session을 server state의 source of truth로 두고 plan을 양방향 동기화해, 사람과 AI가 같은 작업 맥락을 유지하면서 QA 피드백을 병렬로 처리할 수 있게 만들었습니다.",
    "DynaMOS QA 운영 문안 기준 4일간 62개 PR, 15.5 PR/day 처리 흐름을 지원하는 병렬 작업 환경으로 정리했습니다.",
  ],
};

function projectList(_variant: PdfVariant, config: CompanyConfig): ProjectKey[] {
  return config.projectOrder;
}

function chunkProjects(projects: ProjectKey[], size: number) {
  const chunks: ProjectKey[][] = [];
  for (let index = 0; index < projects.length; index += size) {
    chunks.push(projects.slice(index, index + size));
  }
  return chunks;
}

function projectBullets(locale: Locale, id: ProjectKey, detail: string) {
  if (locale === "ko") return koProjectBullets[id];
  return firstSentences(detail, id === "dynamos" || id === "agentSilo" ? 4 : 3);
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
  const continuationProjectPages = chunkProjects(projects.slice(3), 2);
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

      {continuationProjectPages.map((pageProjects) => (
        <Page key={pageProjects.join("-")} size="A4" style={s.page}>
          {renderSidebar(true)}
          <View style={s.continuationMain}>
            <Text style={s.name}>Yongmin Kim</Text>
            <Text style={s.continuationLabel}>{l.projects}</Text>
            <View style={s.section}>
              <Text style={s.sectionTitle}>{l.projects}</Text>
              {pageProjects.map(renderProject)}
            </View>
          </View>
        </Page>
      ))}
    </Document>
  );
}
