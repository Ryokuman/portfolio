import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Link,
} from "@react-pdf/renderer";
import type { PortfolioData, PortfolioProject } from "@/data/pdf-portfolio";
import type { Locale } from "@/i18n/context";

const uiLabels: Record<Locale, {
  problem: string;
  solution: string;
  result: string;
  workProjects: string;
  sideProjects: string;
  workCategory: string;
  sideCategory: string;
  footer: string;
}> = {
  ko: {
    problem: "문제 정의",
    solution: "설계 및 구현",
    result: "결과",
    workProjects: "회사 프로젝트",
    sideProjects: "사이드 프로젝트",
    workCategory: "회사 프로젝트",
    sideCategory: "사이드 프로젝트",
    footer: "김용민 — Portfolio",
  },
  en: {
    problem: "Problem",
    solution: "Solution",
    result: "Result",
    workProjects: "Work Projects",
    sideProjects: "Side Projects",
    workCategory: "Work Project",
    sideCategory: "Side Project",
    footer: "Yongmin Kim — Portfolio",
  },
  tr: {
    problem: "Sorun",
    solution: "Çözüm",
    result: "Sonuç",
    workProjects: "İş Projeleri",
    sideProjects: "Yan Projeler",
    workCategory: "İş Projesi",
    sideCategory: "Yan Proje",
    footer: "Yongmin Kim — Portfolyo",
  },
};

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

const c = {
  navy: "#1B2A4A",         // 남색 — 제목, 강조 (10%)
  blue: "#2563EB",         // 파랑 — 섹션 제목, 포인트 (20%)
  blueLight: "#EFF6FF",    // 연파랑 — 태그 배경, 결과 배경 (10%)
  gray: "#64748B",         // 회색 — 본문, 보조, 구분선 (60%)
  grayLight: "#94A3B8",    // 연회색 — 라벨, 기간
  grayBorder: "#E2E8F0",   // 구분선
  text: "#334155",         // 본문 텍스트
  bg: "#F8FAFC",           // 배경
};

const s = StyleSheet.create({
  page: {
    fontFamily: "Pretendard",
    fontSize: 9,
    color: c.text,
    padding: "32 40",
    lineHeight: 1.5,
  },

  // ── Cover ──
  coverPage: {
    fontFamily: "Pretendard",
    fontSize: 9,
    color: c.text,
    padding: "40 44",
    lineHeight: 1.6,
    justifyContent: "center",
  },
  coverPosition: {
    fontSize: 11,
    fontWeight: 600,
    color: c.blue,
    marginBottom: 8,
  },
  coverName: {
    fontSize: 32,
    fontWeight: 700,
    color: c.navy,
    lineHeight: 1.3,
    marginBottom: 14,
  },
  coverTagline: {
    fontSize: 14,
    fontWeight: 500,
    color: c.navy,
    lineHeight: 1.6,
    marginBottom: 20,
  },
  coverIntro: {
    fontSize: 10,
    color: c.text,
    lineHeight: 1.8,
    marginBottom: 32,
    maxWidth: 440,
  },
  coverContact: {
    flexDirection: "row",
    gap: 16,
  },
  coverContactText: {
    fontSize: 9,
    color: c.grayLight,
  },
  coverDivider: {
    width: 40,
    height: 3,
    backgroundColor: c.blue,
    marginBottom: 20,
  },

  // ── TOC ──
  tocSection: {
    marginTop: 40,
  },
  tocTitle: {
    fontSize: 12,
    fontWeight: 700,
    color: c.navy,
    marginBottom: 10,
  },
  tocRow: {
    flexDirection: "row",
    borderBottom: `1 solid ${c.grayBorder}`,
    paddingVertical: 8,
    gap: 12,
  },
  tocLabel: {
    fontSize: 9,
    fontWeight: 600,
    color: c.navy,
    width: 145,
  },
  tocDesc: {
    fontSize: 8.5,
    color: c.gray,
    flex: 1,
  },

  // ── Project Header ──
  categoryLabel: {
    fontSize: 8,
    fontWeight: 600,
    color: c.grayLight,
    marginBottom: 4,
  },
  projectOrg: {
    fontSize: 8.5,
    color: c.grayLight,
    marginBottom: 3,
  },
  projectTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: c.navy,
    marginBottom: 6,
  },
  projectPeriod: {
    fontSize: 8.5,
    color: c.grayLight,
    marginTop: 12,
    marginBottom: 4,
  },
  projectTagline: {
    fontSize: 10,
    fontWeight: 500,
    color: c.gray,
    lineHeight: 1.5,
    marginBottom: 6,
  },
  highlightRow: {
    backgroundColor: c.blueLight,
    borderRadius: 4,
    padding: "6 10",
    marginBottom: 12,
  },
  highlightBullet: {
    fontSize: 8.5,
    fontWeight: 500,
    color: c.navy,
    lineHeight: 1.6,
    marginBottom: 1,
  },
  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 18,
  },
  tag: {
    fontSize: 7.5,
    fontWeight: 500,
    color: c.blue,
    backgroundColor: c.blueLight,
    padding: "2.5 8",
    borderRadius: 3,
    marginRight: 5,
    marginBottom: 4,
  },

  // ── Section ──
  sectionBlock: {
    marginTop: 12,
    marginBottom: 10,
    paddingBottom: 6,
    borderBottom: `0.5 solid ${c.grayBorder}`,
  },
  sectionTitle: {
    fontSize: 10.5,
    fontWeight: 700,
    color: c.blue,
    marginBottom: 2,
  },
  sectionPeriod: {
    fontSize: 8,
    color: c.grayLight,
    marginBottom: 4,
  },
  subLabel: {
    fontSize: 7.5,
    fontWeight: 600,
    color: c.grayLight,
    letterSpacing: 0.5,
    marginBottom: 2,
    marginTop: 4,
  },
  problemText: {
    fontSize: 8.5,
    color: c.text,
    lineHeight: 1.6,
    marginBottom: 1,
  },
  bullet: {
    fontSize: 8.5,
    color: c.text,
    lineHeight: 1.6,
    paddingLeft: 6,
    marginBottom: 1,
  },
  resultText: {
    fontSize: 8.5,
    fontWeight: 500,
    color: c.navy,
    lineHeight: 1.6,
    backgroundColor: c.blueLight,
    padding: "4 10",
    borderRadius: 4,
    marginTop: 2,
  },

  // ── Footer ──
  footer: {
    position: "absolute",
    bottom: 28,
    left: 40,
    right: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerText: {
    fontSize: 7.5,
    color: c.grayLight,
  },
});

// ── Project Pages ──

function ProjectPages({
  project,
  startPage,
  labels,
}: {
  project: PortfolioProject;
  startPage: number;
  labels: typeof uiLabels[Locale];
}) {
  const isWork = project.category === "work";

  return (
    <Page size="A4" style={s.page} wrap>
      {/* Header */}
      <View fixed={false}>
        <Text style={[s.categoryLabel, { color: c.grayLight }]}>
          {isWork ? labels.workCategory : labels.sideCategory}
        </Text>
        <Text style={s.projectOrg}>{project.org}</Text>
        <Text style={s.projectTitle}>{project.title}</Text>
        <Text style={s.projectPeriod}>{project.period}</Text>
        <Text style={s.projectTagline}>{project.tagline}</Text>
        {project.highlights && project.highlights.length > 0 && (
          <View style={s.highlightRow}>
            {project.highlights.map((h, idx) => (
              <Text key={idx} style={s.highlightBullet}>
                • {h}
              </Text>
            ))}
          </View>
        )}
        <View style={s.tagRow}>
          {project.jdMatch.map((tag) => (
            <Text
              key={tag}
              style={s.tag}
            >
              {tag}
            </Text>
          ))}
        </View>
      </View>

      {/* Sections */}
      {project.sections.map((section, i) => (
        <View key={i} style={s.sectionBlock} wrap={false}>
          <Text style={s.sectionTitle}>{section.title}</Text>
          {section.period && (
            <Text style={s.sectionPeriod}>{section.period}</Text>
          )}

          {/* 문제 정의 */}
          <Text style={s.subLabel}>{labels.problem}</Text>
          <Text style={s.problemText}>{section.problem}</Text>

          {/* 설계 및 구현 */}
          <Text style={s.subLabel}>{labels.solution}</Text>
          {section.actions.map((action, j) => (
            <Text key={j} style={s.bullet}>
              • {action}
            </Text>
          ))}

          {/* 결과 */}
          {section.result && (
            <>
              <Text style={s.subLabel}>{labels.result}</Text>
              <Text style={s.resultText}>{section.result}</Text>
            </>
          )}
        </View>
      ))}

      {/* Footer */}
      <View style={s.footer} fixed>
        <Text style={s.footerText}>{labels.footer}</Text>
        <Text
          style={s.footerText}
          render={({ pageNumber }) => `${pageNumber}`}
        />
      </View>
    </Page>
  );
}

// ── Main Document ──

interface PortfolioDocumentProps {
  data: PortfolioData;
  locale?: Locale;
}

export default function PortfolioDocument({ data, locale = "ko" }: PortfolioDocumentProps) {
  const labels = uiLabels[locale];
  const workProjects = data.projects.filter((p) => p.category === "work");
  const sideProjects = data.projects.filter((p) => p.category === "side");

  return (
    <Document>
      {/* Cover */}
      <Page size="A4" style={s.coverPage}>
        <Text style={s.coverPosition}>{data.cover.position}</Text>
        <View style={s.coverDivider} />
        <Text style={s.coverName}>{data.cover.name}</Text>
        <Text style={s.coverTagline}>{data.cover.tagline}</Text>
        <Text style={s.coverIntro}>{data.cover.intro}</Text>

        <View style={s.coverContact}>
          <Link
            src={`mailto:${data.cover.contact.email}`}
            style={s.coverContactText}
          >
            {data.cover.contact.email}
          </Link>
          <Link
            src={`https://${data.cover.contact.github}`}
            style={s.coverContactText}
          >
            {data.cover.contact.github}
          </Link>
        </View>

        {/* TOC */}
        <View style={s.tocSection}>
          <Text style={s.tocTitle}>{labels.workProjects}</Text>
          {workProjects.map((p, i) => (
            <View key={p.id} style={s.tocRow}>
              <Text style={s.tocLabel}>{`${i + 1}. ${p.title}`}</Text>
              <Text style={s.tocDesc}>{p.tagline}</Text>
            </View>
          ))}

          <Text style={[s.tocTitle, { marginTop: 16 }]}>
            {labels.sideProjects}
          </Text>
          {sideProjects.map((p, i) => (
            <View key={p.id} style={s.tocRow}>
              <Text style={s.tocLabel}>{`${i + 1}. ${p.title}`}</Text>
              <Text style={s.tocDesc}>{p.tagline}</Text>
            </View>
          ))}
        </View>

        <View style={s.footer} fixed>
          <Text style={s.footerText}>{labels.footer}</Text>
          <Text style={s.footerText}>1</Text>
        </View>
      </Page>

      {/* Project Pages */}
      {data.projects.map((project, i) => (
        <ProjectPages
          key={project.id}
          project={project}
          startPage={i + 2}
          labels={labels}
        />
      ))}
    </Document>
  );
}
