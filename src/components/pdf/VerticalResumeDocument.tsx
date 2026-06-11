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
import type { CompanyConfig, PdfContent } from "@/data/pdf-resume";

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
  dynamos: "DynaMOS",
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
  projectBulletRow: {
    flexDirection: "row",
    marginBottom: 1.6,
  },
  projectBulletMarker: {
    width: 6,
    fontSize: 7.1,
    color: c.text,
    lineHeight: 1.34,
  },
  projectBulletBody: {
    flex: 1,
    fontSize: 7.1,
    color: c.text,
    lineHeight: 1.34,
  },
  projectEntry: {
    marginBottom: 6,
  },
  projectSummary: {
    fontSize: 7.2,
    color: c.muted,
    marginBottom: 2,
  },
});

interface VerticalResumeDocumentProps {
  data: PdfContent;
  config: CompanyConfig;
  locale: Locale;
  imageBase?: string;
}

function firstSentences(value: string, count = 2) {
  return value
    .split("\n")
    .map((line) => line.replace(/^•\s*/, "").trim())
    .filter(Boolean)
    .slice(0, count);
}

function projectList(config: CompanyConfig): ProjectKey[] {
  return config.projectOrder;
}

export default function VerticalResumeDocument({
  data,
  config,
  locale,
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
  const projects = projectList(config);
  const firstPageProjects = projects.slice(0, 4);
  const continuationProjects = projects.slice(4);
  const renderSidebar = () => (
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
    </View>
  );

  const renderEmptySidebar = () => <View style={s.sidebar} />;

  const renderProjectBullet = (line: string) => (
    <View key={line} style={s.projectBulletRow}>
      <Text style={s.projectBulletMarker}>•</Text>
      <Text style={s.projectBulletBody}>{line}</Text>
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
        {firstSentences(project.detail, Number.POSITIVE_INFINITY).map((line) => (
          renderProjectBullet(line)
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
          {renderEmptySidebar()}
          <View style={s.continuationMain}>
            <View style={s.section}>
              {continuationProjects.map(renderProject)}
            </View>
          </View>
        </Page>
      )}
    </Document>
  );
}
