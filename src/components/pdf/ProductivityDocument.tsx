import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Link,
} from "@react-pdf/renderer";

// Register Korean font
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

const colors = {
  primary: "#2563eb",
  text: "#1f2937",
  textSecondary: "#6b7280",
  textLight: "#9ca3af",
  border: "#e5e7eb",
  bg: "#f3f4f6",
  white: "#ffffff",
  emerald: "#059669",
  red: "#dc2626",
  beforeBg: "#fef2f2",
  afterBg: "#f0fdf4",
};

const s = StyleSheet.create({
  page: {
    fontFamily: "Pretendard",
    fontSize: 9,
    color: colors.text,
    padding: "32 36",
    lineHeight: 1.5,
  },

  // Header
  header: {
    marginBottom: 16,
    borderBottom: `1.5 solid ${colors.primary}`,
    paddingBottom: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: 700,
    color: colors.text,
    lineHeight: 1.2,
    marginBottom: 4,
  },
  tagline: {
    fontSize: 11,
    color: colors.primary,
    fontWeight: 600,
    lineHeight: 1.2,
    marginBottom: 8,
  },
  bio: {
    fontSize: 8.5,
    color: colors.textSecondary,
    lineHeight: 1.6,
  },
  contactRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 6,
  },
  contactLink: {
    fontSize: 8,
    color: colors.primary,
    textDecoration: "none",
  },

  // Section
  sectionTitle: {
    fontSize: 12,
    fontWeight: 700,
    color: colors.primary,
    marginTop: 16,
    marginBottom: 8,
    borderBottom: `0.5 solid ${colors.border}`,
    paddingBottom: 3,
  },

  // Why Me
  whyMeBox: {
    backgroundColor: colors.bg,
    padding: "8 12",
    borderRadius: 4,
    marginBottom: 4,
  },
  whyMeText: {
    fontSize: 8.5,
    color: colors.text,
    lineHeight: 1.7,
  },

  // Case Study
  caseTitle: {
    fontSize: 10,
    fontWeight: 700,
    color: colors.text,
    marginTop: 10,
    marginBottom: 6,
  },
  caseSubtitle: {
    fontSize: 8,
    fontWeight: 600,
    color: colors.textLight,
    marginBottom: 2,
  },
  labelBefore: {
    fontSize: 7.5,
    fontWeight: 600,
    color: colors.red,
    marginBottom: 2,
    marginTop: 4,
  },
  labelDecision: {
    fontSize: 7.5,
    fontWeight: 600,
    color: colors.primary,
    marginBottom: 2,
    marginTop: 4,
  },
  labelAfter: {
    fontSize: 7.5,
    fontWeight: 600,
    color: colors.emerald,
    marginBottom: 2,
    marginTop: 4,
  },
  caseText: {
    fontSize: 8.5,
    color: colors.textSecondary,
    lineHeight: 1.6,
    paddingLeft: 8,
  },
  metricRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginTop: 3,
    paddingLeft: 8,
  },
  metricBadge: {
    fontSize: 7.5,
    fontWeight: 600,
    color: colors.emerald,
    backgroundColor: colors.afterBg,
    padding: "2 6",
    borderRadius: 3,
  },

  // Leadership
  leadershipItem: {
    fontSize: 8.5,
    color: colors.textSecondary,
    lineHeight: 1.6,
    paddingLeft: 8,
    marginBottom: 2,
  },

  // Skills
  skillRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 4,
  },
  skillName: {
    fontSize: 8.5,
    fontWeight: 600,
    color: colors.text,
    width: 80,
  },
  skillContext: {
    fontSize: 8,
    color: colors.textSecondary,
    flex: 1,
  },
});

// ─── Data ───

const cases = [
  {
    title: "DynaMOS v2 — 레거시 → 프레임워크",
    subtitle: "제조업 ERP/MES 프론트엔드 (런업 · 2025.12~현재)",
    before: [
      "페이지당 useState 7개+, 훅 16~20개가 얽힌 구조 — 문서화 없이 아무도 손댈 수 없는 상태",
      "Git 브랜치 전략 부재, .env 직접 커밋, main 직접 push, PR/코드리뷰 문화 없음",
    ],
    decision: [
      "레거시를 분석하여 요구사항을 재정의하고, 선언적 컴포넌트 구조(config + 코어 컴포넌트 조립)를 설계",
      "Valtio 선택: ref()로 렌더링 제어가 편하고, 사용법이 단순하여 전역 상태관리 경험 없는 팀원의 러닝커브를 최소화",
      "Storybook + Mock 환경으로 프론트 선행 개발 체계 구축 — 백엔드 대기 병목 제거",
    ],
    metrics: [
      "PR 속도 25배 (0.16/일 → 3.97/일)",
      "코드량 72%↓ (441줄 → 122줄)",
      "리렌더 85%↓ (12.3 → 1.9개)",
      "개발속도 1.3배↑ (Storybook)",
      "AI 페이지 자동생성 가능",
    ],
  },
  {
    title: "LLAMI 모델스토어 — 17개 API 통합",
    subtitle: "AI 플랫폼 (POUL · 2025.02~2025.05)",
    before: [
      "17개 LLM 모델마다 API 스펙(요청 형식, 스트리밍, 응답 구조)이 전부 달라 모델별 개별 핸들러가 난립",
    ],
    decision: [
      "pipe 패턴 도입 — 모델별로 필요한 처리 단계만 조합하는 구조로 설계, 신규 모델 추가 시 pipe만 추가",
      "fetch ReadableStream 기반 스트리밍으로 실시간 렌더링, pipe 단계에서 스트림 포맷을 정규화하여 프론트는 단일 인터페이스",
    ],
    metrics: [
      "17개 모델 단일 인터페이스 처리",
      "Toss Payments 우수사례 선정",
      "신규 모델 추가 = pipe 1개",
    ],
  },
  {
    title: "CGV-ASSISTANT — 성능 문제 진단 & 해결",
    subtitle: "데이터 분석 서비스 (POUL × CGV · 2024.06~2025.07)",
    before: [
      "매일 아침 백엔드 메모리 8GB까지 치솟는 현상",
      "날짜별 데이터 그래프에서 모든 리뷰를 가져와 분류/정렬하는 O(n²) 구조 — 렌더링 3000ms",
    ],
    decision: [
      "메모리 로거를 직접 추가하여 tiktoken 인코더가 매 호출마다 새로 생성되는 것을 특정 → 싱글톤 패턴 적용",
      "캐싱 테이블 도입으로 API 1회 호출, O(n)으로 개선",
      "API 콜 병렬 처리 로직 구현",
    ],
    metrics: [
      "메모리 300MB 안정화",
      "렌더링 10배↑ (3000→300ms)",
      "O(n²) → O(n)",
      "일 5000건 AI 분석",
    ],
  },
];

const leadershipItems = [
  "3인 프론트팀 리드: 코어 컴포넌트 + 페이지 컨벤션으로 구조화 → 업무 분산 및 객관적 평가 가능",
  "PR 0개 → 170개: Git Flow(main/qa/dev) + PR 기반 개발 프로세스 도입 및 팀 정착",
  "Storybook으로 코어 컴포넌트 문서화 → 코드를 직접 실행하며 학습 가능한 온보딩 환경 제공",
  "QA 기간 Worktree System 활용: 4일간 62개 PR 처리 (15.5 PR/일) — 멀티 브랜치 병렬 작업",
  "전체 커밋의 66%, 라인 변경량의 63%를 기여 — 아키텍처 설계부터 페이지 구현까지 주도",
];

const skills = [
  { name: "Valtio", context: "구독 단위 최적화 + ref()로 렌더링 제어 + 낮은 러닝커브" },
  { name: "AG Grid", context: "120개+ 업무 페이지를 인라인 에디팅으로 운영하는 ERP 요구사항" },
  { name: "Storybook", context: "프론트 선행 개발 환경 + 코어 컴포넌트 문서화/온보딩" },
  { name: "Next.js", context: "App Router 기반 SSR/CSR 혼합, 정적 내보내기(static export)" },
  { name: "TypeScript", context: "config 기반 선언적 구조의 타입 안전성 보장" },
  { name: "Docker", context: "Jenkins CI/CD 파이프라인 + 개발/QA/운영 환경 분리" },
];

// ─── Component ───

export default function ProductivityDocument() {
  return (
    <Document>
      <Page size="A4" style={s.page}>
        {/* Header */}
        <View style={s.header}>
          <Text style={s.name}>김용민</Text>
          <Text style={s.tagline}>엔지니어링으로 생산성을 만드는 프론트엔드 리드</Text>
          <Text style={s.bio}>
            블랙박스를 열어 구조화하고, 반복 비용을 제거하여 팀 전체의 개발 속도를 끌어올립니다.
          </Text>
          <Text style={s.bio}>
            아무도 손대지 못하던 레거시를 프레임워크로, PR 0개였던 팀에 170개 PR 기반 문화를 만들었습니다.
          </Text>
          <View style={s.contactRow}>
            <Link src="https://github.com/Ryokuman" style={s.contactLink}>
              GitHub: github.com/Ryokuman
            </Link>
            <Link src="mailto:ryokuman21@gmail.com" style={s.contactLink}>
              Email: ryokuman21@gmail.com
            </Link>
          </View>
        </View>

        {/* Why Me */}
        <Text style={s.sectionTitle}>왜 김용민인가</Text>
        <View style={s.whyMeBox}>
          <Text style={s.whyMeText}>
            생산성 높은 코드는 &quot;누가 짜느냐&quot;가 아니라 &quot;어떤 구조 위에서 짜느냐&quot;로 결정됩니다.{"\n"}
            저는 기존 코드를 분석하여 문제의 원인을 특정하고, 반복 가능한 구조를 설계하여{"\n"}
            팀 전체가 빠르게 개발할 수 있는 환경을 만듭니다.{"\n"}
            그 구조 위에서 AI 도구를 활용하면, 페이지 자동 생성까지 가능해집니다.
          </Text>
        </View>

        {/* Cases */}
        <Text style={s.sectionTitle}>생산성을 만든 사례</Text>
        {cases.map((c) => (
          <View key={c.title} wrap={false}>
            <Text style={s.caseTitle}>{c.title}</Text>
            <Text style={s.caseSubtitle}>{c.subtitle}</Text>

            <Text style={s.labelBefore}>BEFORE</Text>
            {c.before.map((b) => (
              <Text key={b} style={s.caseText}>• {b}</Text>
            ))}

            <Text style={s.labelDecision}>판단</Text>
            {c.decision.map((d) => (
              <Text key={d} style={s.caseText}>→ {d}</Text>
            ))}

            <Text style={s.labelAfter}>AFTER</Text>
            <View style={s.metricRow}>
              {c.metrics.map((m) => (
                <Text key={m} style={s.metricBadge}>{m}</Text>
              ))}
            </View>
          </View>
        ))}
      </Page>

      <Page size="A4" style={s.page}>
        {/* Leadership */}
        <Text style={s.sectionTitle}>팀 생산성 리더십</Text>
        {leadershipItems.map((item) => (
          <Text key={item} style={s.leadershipItem}>• {item}</Text>
        ))}

        {/* Skills */}
        <Text style={[s.sectionTitle, { marginTop: 20 }]}>기술 스택 — 선택 근거</Text>
        {skills.map((sk) => (
          <View key={sk.name} style={s.skillRow}>
            <Text style={s.skillName}>{sk.name}</Text>
            <Text style={s.skillContext}>{sk.context}</Text>
          </View>
        ))}

        {/* Contact */}
        <Text style={[s.sectionTitle, { marginTop: 20 }]}>Contact</Text>
        <View style={s.contactRow}>
          <Link src="https://github.com/Ryokuman" style={s.contactLink}>
            GitHub: github.com/Ryokuman
          </Link>
          <Link src="mailto:ryokuman21@gmail.com" style={s.contactLink}>
            Email: ryokuman21@gmail.com
          </Link>
        </View>
      </Page>
    </Document>
  );
}
