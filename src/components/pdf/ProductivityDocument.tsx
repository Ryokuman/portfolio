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
import type { PdfContent, CompanyConfig } from "@/data/pdf-resume";

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

// ── Section labels per locale ──

const labels: Record<Locale, {
  greeting: string;
  intro: string;
  projects: string;
  education: string;
  gender: string;
  present: string;
  language: string;
  runupName: string;
  poulName: string;
  dynamosPeriod: string;
  cgvPeriod: string;
  llamiPeriod: string;
  worktreePeriod: string;
}> = {
  ko: {
    greeting: "김용민입니다.",
    intro: "소개",
    projects: "경력",
    education: "학력",
    gender: "남",
    present: "현재",
    language: "언어",
    runupName: "주식회사 런업",
    poulName: "주식회사 피오유엘 (POUL)",
    dynamosPeriod: "2025.12 - 현재 · 런업",
    cgvPeriod: "2024.06 - 2025.07 · POUL × CGV",
    llamiPeriod: "2024.12 - 2025.08 · POUL",
    worktreePeriod: "2026.02 - 현재 · 오픈소스",
  },
  en: {
    greeting: "Yongmin Kim",
    intro: "About",
    projects: "Experience",
    education: "Education",
    gender: "M",
    present: "Present",
    language: "Languages",
    runupName: "Runup Inc.",
    poulName: "POUL Inc.",
    dynamosPeriod: "2025.12 - Present · Runup",
    cgvPeriod: "2024.06 - 2025.07 · POUL × CGV",
    llamiPeriod: "2024.12 - 2025.08 · POUL",
    worktreePeriod: "2026.02 - Present · Open Source",
  },
  tr: {
    greeting: "Yongmin Kim",
    intro: "Hakkımda",
    projects: "Deneyim",
    education: "Eğitim",
    gender: "E",
    present: "Devam",
    language: "Diller",
    runupName: "Runup A.Ş.",
    poulName: "POUL A.Ş.",
    dynamosPeriod: "2025.12 - Devam · Runup",
    cgvPeriod: "2024.06 - 2025.07 · POUL × CGV",
    llamiPeriod: "2024.12 - 2025.08 · POUL",
    worktreePeriod: "2026.02 - Devam · Açık Kaynak",
  },
};

// ── Project metadata (titles & periods are proper nouns / dates, not translated) ──

const projectMeta: Record<
  "dynamos" | "generator" | "dynavite" | "agentSilo" | "cgv" | "llami" | "worktree",
  {
    title: string;
    periodKey: keyof (typeof labels)["ko"];
    logo: string;
    logoBg: string;
    surface: string;
    logoPadding: number;
    logoFit?: "contain" | "cover";
  }
> = {
  dynamos: { title: "DynaMOS", periodKey: "dynamosPeriod", logo: "/logo/dyna-mos.png", logoBg: "#ffffff", surface: "#ffffff", logoPadding: 3 },
  generator: { title: "DynaMOS Generator", periodKey: "dynamosPeriod", logo: "/logo/dynamos-generator.png", logoBg: "#ffffff", surface: "#ffffff", logoPadding: 3 },
  dynavite: { title: "dynaVite", periodKey: "dynamosPeriod", logo: "/logo/dyna-vite.png", logoBg: "#ffffff", surface: "#ffffff", logoPadding: 3 },
  agentSilo: { title: "Agent Silo System", periodKey: "dynamosPeriod", logo: "/logo/agent-silo-system.png", logoBg: "#ffffff", surface: "#ffffff", logoPadding: 3 },
  cgv: { title: "CGV-ASSISTANT", periodKey: "cgvPeriod", logo: "/logo/cgv.png", logoBg: "#ffffff", surface: "#ffffff", logoPadding: 3 },
  llami: { title: "LLAMI", periodKey: "llamiPeriod", logo: "/logo/llami.png", logoBg: "#ffffff", surface: "#ffffff", logoPadding: 1, logoFit: "cover" },
  worktree: { title: "Claude Worktree System", periodKey: "worktreePeriod", logo: "/logo/agent-silo-system.png", logoBg: "#ffffff", surface: "#ffffff", logoPadding: 3 },
};

// ── Colors & Styles ──

const c = {
  black: "#111111",
  text: "#2f3137",
  textSub: "#5f5d58",
  textLight: "#8a8982",
  accent: "#c98218",
  accentDark: "#9d6414",
  accentLight: "#f6e7c7",
  border: "#e7dfd2",
  bg: "#f5f5f5",
  white: "#ffffff",
};

const s = StyleSheet.create({
  page: {
    fontFamily: "Pretendard",
    fontSize: 8.4,
    color: c.text,
    padding: "34 36",
    lineHeight: 1.5,
  },
  layout: {
    flexDirection: "column",
  },
  topRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 28,
  },
  heroColumn: {
    width: 320,
  },
  contactColumn: {
    width: 126,
    flexShrink: 0,
  },
  bodyColumn: {
    marginLeft: 138,
  },
  contactRule: {
    height: 1,
    backgroundColor: c.textLight,
    marginBottom: 4,
  },
  profileWrap: {
    width: 98,
    height: 98,
    backgroundColor: c.accentLight,
    borderRadius: 8,
    padding: 5,
    marginBottom: 10,
  },
  profileImage: {
    width: 88,
    height: 88,
    borderRadius: 2,
    objectFit: "cover",
    opacity: 0.92,
  },
  headerBlock: {
    marginBottom: 0,
  },
  bigTitle: {
    fontSize: 34,
    fontWeight: 700,
    color: c.black,
    lineHeight: 1.1,
    marginBottom: 8,
  },
  fieldText: {
    fontSize: 10,
    color: c.textSub,
    lineHeight: 1.35,
    marginBottom: 16,
  },
  tagline: {
    fontSize: 8.5,
    color: c.textSub,
    lineHeight: 1.6,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 7.2,
    color: c.textSub,
    marginBottom: 1.5,
    lineHeight: 1.25,
  },
  positionLabel: {
    alignSelf: "flex-start",
    fontSize: 8.5,
    fontWeight: 600,
    color: c.black,
    backgroundColor: c.accent,
    borderRadius: 12,
    padding: "4 18",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 8.2,
    fontWeight: 500,
    color: c.black,
    paddingTop: 3,
    borderTop: `1 solid ${c.textLight}`,
    marginBottom: 12,
  },
  subSectionTitle: {
    fontSize: 11,
    fontWeight: 600,
    color: c.accent,
    marginTop: 14,
    marginBottom: 6,
  },
  introText: {
    fontSize: 9,
    color: c.text,
    lineHeight: 1.5,
    width: 300,
  },
  careerEntry: { marginBottom: 14 },
  careerRow: {
    flexDirection: "row",
    gap: 10,
    alignItems: "flex-start",
  },
  careerLogo: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginTop: 2,
    objectFit: "contain",
    border: `1 solid ${c.border}`,
  },
  careerInfo: { flex: 1 },
  careerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 1,
  },
  careerCompany: { fontSize: 11, fontWeight: 700, color: c.black },
  careerPeriod: { fontSize: 9, color: c.textLight },
  careerRole: { fontSize: 9.5, color: c.textSub, marginBottom: 6 },
  projectSummary: {
    fontSize: 9,
    fontWeight: 500,
    color: c.textSub,
    marginBottom: 4,
  },
  careerDesc: { fontSize: 9, color: c.text, lineHeight: 1.65 },
  companyEntry: { marginBottom: 16 },
  companyHeader: {
    flexDirection: "row",
    gap: 9,
    alignItems: "flex-start",
    marginBottom: 7,
  },
  companyLogo: {
    width: 24,
    height: 24,
    borderRadius: 2,
    marginTop: 1,
    objectFit: "contain",
    border: `1 solid ${c.border}`,
    padding: 2,
  },
  companyInfo: { flex: 1 },
  companyNameRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 1,
  },
  companyName: { fontSize: 10.4, fontWeight: 700, color: c.black },
  companyRole: { fontSize: 8.2, color: c.textSub, marginBottom: 3 },
  companySummary: { fontSize: 8, color: c.textSub, lineHeight: 1.4 },
  projectList: {
    marginLeft: 32,
    paddingLeft: 19,
  },
  nestedProject: {
    position: "relative",
    marginBottom: 8,
  },
  projectBody: {
    padding: "2 0 6 0",
    borderBottom: `1 solid ${c.border}`,
  },
  projectLogo: {
    position: "absolute",
    left: -31,
    top: 5,
    width: 20,
    height: 20,
    borderRadius: 2,
    objectFit: "contain",
    border: `1 solid ${c.border}`,
  },
  projectTitleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 3,
  },
  projectTitle: { fontSize: 9.3, fontWeight: 700, color: c.black },
  eduEntry: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 10,
    marginTop: 4,
    marginBottom: 0,
    opacity: 0.72,
  },
  eduRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  eduLogo: { width: 16, height: 16, marginTop: 2, opacity: 0.72 },
  eduName: { fontSize: 8.2, fontWeight: 600, color: c.textSub },
  eduDept: { fontSize: 7.4, color: c.textLight },
  techGroup: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 4,
    gap: 8,
  },
  techGroupLabel: {
    fontSize: 8.5,
    fontWeight: 600,
    color: c.accent,
    width: 52,
    paddingTop: 3,
  },
  techRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    flex: 1,
  },
  techBadge: {
    fontSize: 8.5,
    color: c.accent,
    backgroundColor: c.accentLight,
    padding: "3 8",
    borderRadius: 4,
  },
  contactRow: { gap: 1 },
  contactLink: {
    fontSize: 7.4,
    color: c.textSub,
    textDecoration: "none",
    marginBottom: 2,
  },
  fitnessBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0fdf4",
    border: "1 solid #bbf7d0",
    borderRadius: 6,
    padding: "8 14",
    marginBottom: 16,
    gap: 16,
  },
  fitnessTotal: { fontSize: 10, fontWeight: 700, color: "#166534" },
  fitnessStats: { flexDirection: "row", gap: 12 },
  fitnessStat: { fontSize: 9, color: "#15803d", fontWeight: 500 },
});

// ── Component ──

interface ProductivityDocumentProps {
  data: PdfContent;
  config: CompanyConfig;
  locale: Locale;
  showLanguage?: boolean;
  imageBase?: string;
}

export default function ProductivityDocument({
  data,
  config,
  locale,
  imageBase = "",
}: ProductivityDocumentProps) {
  const l = labels[locale];
  const activeProjects = new Set(config.projectOrder);
  const periodOnly = (period: string) => period.split(" · ")[0];
  const companySections = [
    {
      key: "runup",
      name: l.runupName,
      period: `2025.12 - ${l.present}`,
      logo: "/logo/runup.png",
      role: data.career.runup.role,
      summary: data.career.runup.summary,
      projects: ["dynamos", "generator", "dynavite", "agentSilo"] as const,
    },
    {
      key: "poul",
      name: l.poulName,
      period: "2024.06 - 2025.08",
      logo: "/logo/poul.png",
      role: data.career.poul.role,
      summary: data.career.poul.summary,
      projects: ["cgv", "llami"] as const,
    },
  ];

  return (
    <Document>
      <Page size="A4" style={s.page}>
        <View style={s.layout}>
          <View style={s.topRow}>
            <View style={s.heroColumn}>
              <View style={s.headerBlock}>
                <Text style={s.bigTitle}>{l.greeting}</Text>
                <Text style={s.fieldText}>{data.position}</Text>
                <Text style={s.introText}>{data.intro}</Text>
              </View>
            </View>

            <View style={s.contactColumn}>
              <View style={s.contactRule} />
              <Text style={s.infoText}>Contact</Text>
              <View style={s.contactRow}>
                <Text style={s.infoText}>1998.07.18</Text>
                <Text style={s.infoText}>{l.gender}</Text>
                <Link src="mailto:ryokuman21@gmail.com" style={s.contactLink}>
                  ryokuman21@gmail.com
                </Link>
                <Link src="https://github.com/Ryokuman" style={s.contactLink}>
                  github.com/Ryokuman
                </Link>
              </View>
            </View>
          </View>

          <View style={s.bodyColumn}>
            <Text style={s.sectionTitle}>{l.projects}</Text>

            {companySections.map((company) => {
              const projects = company.projects.filter((id) => activeProjects.has(id));
              if (projects.length === 0) return null;

              return (
                <View key={company.key} style={s.companyEntry}>
                  <View style={s.companyHeader}>
                    <Image
                      style={s.companyLogo}
                      src={`${imageBase}${company.logo}`}
                    />
                    <View style={s.companyInfo}>
                      <View style={s.companyNameRow}>
                        <Text style={s.companyName}>{company.name}</Text>
                        <Text style={s.careerPeriod}>{company.period}</Text>
                      </View>
                      <Text style={s.companyRole}>{company.role}</Text>
                      <Text style={s.companySummary}>{company.summary}</Text>
                    </View>
                  </View>

                  <View style={s.projectList}>
                    {projects.map((id) => {
                      const meta = projectMeta[id];
                      const proj = data.projects[id];
                      if (!proj) return null;
                      return (
                        <View key={id} style={s.nestedProject} wrap={false}>
                          <Image
                            style={[
                              s.projectLogo,
                              {
                                backgroundColor: meta.logoBg,
                                padding: meta.logoPadding,
                                objectFit: meta.logoFit ?? "contain",
                              },
                            ]}
                            src={`${imageBase}${meta.logo}`}
                          />
                          <View style={[s.projectBody, { backgroundColor: meta.surface }]}>
                            <View style={s.projectTitleRow}>
                              <Text style={s.projectTitle}>{meta.title}</Text>
                              <Text style={s.careerPeriod}>
                                {periodOnly(l[meta.periodKey])}
                              </Text>
                            </View>
                            <Text style={s.projectSummary}>{proj.summary}</Text>
                            <Text style={s.careerDesc}>{proj.detail}</Text>
                          </View>
                        </View>
                      );
                    })}
                  </View>
                </View>
              );
            })}

            <Text style={s.sectionTitle}>{l.education}</Text>
            <View style={s.eduEntry}>
              <View style={s.eduRow}>
                <Image
                  style={s.eduLogo}
                  src={`${imageBase}/logo/sku.svg`}
                />
                <View>
                  <Text style={s.eduName}>{data.education.name}</Text>
                  <Text style={s.eduDept}>{data.education.dept}</Text>
                </View>
              </View>
              <Text style={[s.infoText, { color: c.textLight }]}>2017 - 2023</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
