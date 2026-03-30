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
  career: string;
  projects: string;
  sideProjects: string;
  techStack: string;
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
    career: "경력",
    projects: "대표 프로젝트",
    sideProjects: "사이드 프로젝트",
    techStack: "기술 스택",
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
    career: "Experience",
    projects: "Key Projects",
    sideProjects: "Side Projects",
    techStack: "Tech Stack",
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
    career: "Deneyim",
    projects: "Öne Çıkan Projeler",
    sideProjects: "Yan Projeler",
    techStack: "Teknoloji Yığını",
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
  "dynamos" | "cgv" | "llami" | "worktree",
  { title: string; periodKey: keyof (typeof labels)["ko"] }
> = {
  dynamos: { title: "DynaMOS v2", periodKey: "dynamosPeriod" },
  cgv: { title: "CGV-ASSISTANT", periodKey: "cgvPeriod" },
  llami: { title: "LLAMI", periodKey: "llamiPeriod" },
  worktree: { title: "Claude Worktree System", periodKey: "worktreePeriod" },
};

// ── Colors & Styles ──

const c = {
  black: "#1a1a1a",
  text: "#333333",
  textSub: "#555555",
  textLight: "#888888",
  accent: "#2a7d6e",
  accentLight: "#e8f4f1",
  border: "#e0e0e0",
  bg: "#f5f5f5",
  white: "#ffffff",
};

const s = StyleSheet.create({
  page: {
    fontFamily: "Pretendard",
    fontSize: 9.5,
    color: c.text,
    padding: "40 44",
    lineHeight: 1.6,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  headerLeft: { flex: 1 },
  profileImage: { width: 72, height: 72, borderRadius: 36 },
  bigTitle: {
    fontSize: 28,
    fontWeight: 700,
    color: c.black,
    lineHeight: 1.3,
    marginBottom: 10,
  },
  tagline: {
    fontSize: 10,
    color: c.textSub,
    lineHeight: 1.6,
    marginBottom: 8,
  },
  infoRow: { flexDirection: "row", gap: 12 },
  infoText: { fontSize: 9, color: c.textLight },
  positionLabel: {
    fontSize: 10,
    fontWeight: 600,
    color: c.accent,
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 700,
    color: c.accent,
    marginTop: 20,
    marginBottom: 8,
  },
  subSectionTitle: {
    fontSize: 11,
    fontWeight: 600,
    color: c.accent,
    marginTop: 14,
    marginBottom: 6,
  },
  introText: {
    fontSize: 9.5,
    color: c.text,
    lineHeight: 1.8,
    marginBottom: 16,
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
    fontSize: 9.5,
    fontWeight: 500,
    color: c.textSub,
    marginBottom: 4,
  },
  careerDesc: { fontSize: 9.5, color: c.text, lineHeight: 1.8 },
  eduEntry: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 10,
  },
  eduRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  eduLogo: { width: 28, height: 28, marginTop: 2 },
  eduName: { fontSize: 11, fontWeight: 700, color: c.black },
  eduDept: { fontSize: 9.5, color: c.textSub },
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
  contactRow: { flexDirection: "row", gap: 16 },
  contactLink: {
    fontSize: 9,
    color: c.textLight,
    textDecoration: "none",
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
}

export default function ProductivityDocument({
  data,
  config,
  locale,
  showLanguage = false,
}: ProductivityDocumentProps) {
  const l = labels[locale];
  const fitness = config.showFitness ? config.fitness?.[locale] : null;

  // Split projects into main (first 3 from projectOrder) and side (worktree)
  const mainProjects = config.projectOrder.filter((id) => id !== "worktree");
  const sideProjects = config.projectOrder.filter((id) => id === "worktree");

  const techGroups: { label: string; items: string[] }[] = [
    { label: "Core", items: data.techStack.core },
    { label: "State", items: data.techStack.state },
    { label: "UI", items: data.techStack.ui },
    { label: "Backend", items: data.techStack.backend },
    { label: "Infra · DX", items: data.techStack.infra },
  ];

  return (
    <Document>
      <Page size="A4" style={s.page}>
        {/* Header */}
        <View style={s.headerRow}>
          <View style={s.headerLeft}>
            <Text style={s.positionLabel}>{data.position}</Text>
            <Text style={s.bigTitle}>{l.greeting}</Text>
            <Text style={s.tagline}>{data.tagline}</Text>
            <View style={s.infoRow}>
              <Text style={s.infoText}>1998.07.18</Text>
              <Text style={s.infoText}>{l.gender}</Text>
              <Text style={s.infoText}>ryokuman21@gmail.com</Text>
              <Text style={s.infoText}>github.com/Ryokuman</Text>
            </View>
          </View>
          <Image style={s.profileImage} src={config.profileImage} />
        </View>

        {/* Fitness highlight (planfit) */}
        {fitness && (
          <View style={s.fitnessBox}>
            <Text style={s.fitnessTotal}>{fitness.total}</Text>
            <View style={s.fitnessStats}>
              {fitness.stats.map((stat) => (
                <Text key={stat} style={s.fitnessStat}>{stat}</Text>
              ))}
            </View>
          </View>
        )}

        {/* Intro */}
        <Text style={s.sectionTitle}>{l.intro}</Text>
        <Text style={s.introText}>{data.intro}</Text>

        {/* Career */}
        <Text style={s.sectionTitle}>{l.career}</Text>

        <View style={s.careerEntry}>
          <View style={s.careerRow}>
            <Image
              style={s.careerLogo}
              src="http://localhost:4000/images/runup.png"
            />
            <View style={s.careerInfo}>
              <View style={s.careerHeader}>
                <Text style={s.careerCompany}>{l.runupName}</Text>
                <Text style={s.careerPeriod}>
                  2025.12 - {l.present}
                </Text>
              </View>
              <Text style={s.careerRole}>{data.career.runup.role}</Text>
              <Text style={s.careerDesc}>{data.career.runup.summary}</Text>
            </View>
          </View>
        </View>

        <View style={s.careerEntry}>
          <View style={s.careerRow}>
            <Image
              style={s.careerLogo}
              src="http://localhost:4000/images/poul.png"
            />
            <View style={s.careerInfo}>
              <View style={s.careerHeader}>
                <Text style={s.careerCompany}>{l.poulName}</Text>
                <Text style={s.careerPeriod}>2024.06 - 2025.08</Text>
              </View>
              <Text style={s.careerRole}>{data.career.poul.role}</Text>
              <Text style={s.careerDesc}>{data.career.poul.summary}</Text>
            </View>
          </View>
        </View>

        {/* Main Projects */}
        <Text style={s.sectionTitle}>{l.projects}</Text>

        {mainProjects.map((id) => {
          const meta = projectMeta[id];
          const proj = data.projects[id];
          return (
            <View key={id} style={s.careerEntry}>
              <View style={s.careerHeader}>
                <Text style={s.careerCompany}>{meta.title}</Text>
                <Text style={s.careerPeriod}>{l[meta.periodKey]}</Text>
              </View>
              <Text style={s.projectSummary}>{proj.summary}</Text>
              <Text style={s.careerDesc}>{proj.detail}</Text>
            </View>
          );
        })}

        {/* Side Projects */}
        {sideProjects.length > 0 && (
          <>
            <Text style={s.subSectionTitle}>{l.sideProjects}</Text>
            {sideProjects.map((id) => {
              const meta = projectMeta[id];
              const proj = data.projects[id];
              return (
                <View key={id} style={s.careerEntry}>
                  <View style={s.careerHeader}>
                    <Text style={s.careerCompany}>{meta.title}</Text>
                    <Text style={s.careerPeriod}>{l[meta.periodKey]}</Text>
                  </View>
                  <Text style={s.projectSummary}>{proj.summary}</Text>
                  <Text style={s.careerDesc}>{proj.detail}</Text>
                </View>
              );
            })}
          </>
        )}

        {/* Tech Stack */}
        <Text style={s.sectionTitle}>{l.techStack}</Text>
        {techGroups.map((g) => (
          <View key={g.label} style={s.techGroup}>
            <Text style={s.techGroupLabel}>{g.label}</Text>
            <View style={s.techRow}>
              {g.items.map((item) => (
                <Text key={item} style={s.techBadge}>{item}</Text>
              ))}
            </View>
          </View>
        ))}

        {/* Language */}
        {showLanguage && (
          <View style={s.techGroup}>
            <Text style={s.techGroupLabel}>{l.language}</Text>
            <View style={s.techRow}>
              <Text style={s.techBadge}>Korean</Text>
              <Text style={s.techBadge}>English</Text>
              <Text style={s.techBadge}>Turkish</Text>
            </View>
          </View>
        )}

        {/* Contact */}
        <View style={[s.contactRow, { marginTop: 16 }]}>
          <Link src="https://github.com/Ryokuman" style={s.contactLink}>
            GitHub: github.com/Ryokuman
          </Link>
          <Link src="mailto:ryokuman21@gmail.com" style={s.contactLink}>
            Email: ryokuman21@gmail.com
          </Link>
        </View>

        {/* Education */}
        <Text style={s.sectionTitle}>{l.education}</Text>
        <View style={s.eduEntry}>
          <View style={s.eduRow}>
            <Image
              style={s.eduLogo}
              src="http://localhost:4000/images/sku.svg"
            />
            <View>
              <Text style={s.eduName}>{data.education.name}</Text>
              <Text style={s.eduDept}>{data.education.dept}</Text>
            </View>
          </View>
          <Text style={s.careerPeriod}>2017 - 2023</Text>
        </View>
      </Page>
    </Document>
  );
}
