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

  // Header
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  headerLeft: {
    flex: 1,
  },
  profileImage: {
    width: 72,
    height: 72,
    borderRadius: 36,
  },
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
  infoRow: {
    flexDirection: "row",
    gap: 12,
  },
  infoText: {
    fontSize: 9,
    color: c.textLight,
  },

  // 포지션
  positionLabel: {
    fontSize: 10,
    fontWeight: 600,
    color: c.accent,
    marginBottom: 4,
  },

  // 소개
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

  // 경력
  careerEntry: {
    marginBottom: 14,
  },
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
  careerInfo: {
    flex: 1,
  },
  careerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 1,
  },
  careerCompany: {
    fontSize: 11,
    fontWeight: 700,
    color: c.black,
  },
  careerPeriod: {
    fontSize: 9,
    color: c.textLight,
  },
  careerRole: {
    fontSize: 9.5,
    color: c.textSub,
    marginBottom: 6,
  },
  projectSummary: {
    fontSize: 9.5,
    fontWeight: 500,
    color: c.textSub,
    marginBottom: 4,
  },
  careerDesc: {
    fontSize: 9.5,
    color: c.text,
    lineHeight: 1.8,
  },

  // 학력
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
  eduLogo: {
    width: 28,
    height: 28,
    marginTop: 2,
  },
  eduName: {
    fontSize: 11,
    fontWeight: 700,
    color: c.black,
  },
  eduDept: {
    fontSize: 9.5,
    color: c.textSub,
  },

  // 기술 스택
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

  // Contact
  contactRow: {
    flexDirection: "row",
    gap: 16,
  },
  contactLink: {
    fontSize: 9,
    color: c.textLight,
    textDecoration: "none",
  },
});

// ── 버전별 콘텐츠 ──

type Variant = "startup" | "enterprise";
type Company = "default" | "zeta";

const content = {
  startup: {
    position: "프론트엔드 중심 풀스택 개발자",
    tagline:
      "팀에 없던 구조와 프로세스를 직접 만들어 정착시켜 온 개발자입니다.",
    intro:
      "합류한 팀의 코드베이스를 관찰하고, 반복되는 병목의 윤곽을 파악하여 구조·프로세스·도구를 직접 만들어 해결합니다. Git Flow와 코드리뷰 문화를 도입하고, Storybook 기반 선행 개발 환경을 구축하여 백엔드 의존 없이 프론트가 먼저 움직이는 체계를 만들었습니다. 도구가 없으면 직접 만들고, 구조가 예측 가능해지면 AI를 활용한 자동화까지 도입합니다.",
    career: {
      runup:
        "ERP/MES 프론트엔드를 처음부터 설계·구축하여 PR 속도 약 25배 향상, 코드량 약 70% 감소를 달성했습니다. 선언적 아키텍처 설계부터 Git Flow/PR 프로세스, AI 자동화 도입까지 주도했습니다.",
      poul: "CGV 합작 감정 분석 서비스, AI 플랫폼 LLAMI 등 다수 프로젝트를 풀스택으로 개발했습니다. 서비스가 Toss Payments 우수사례에 선정되었습니다.",
    },
    projects: {
      dynamos: `• 페이지마다 useState/훅 난립, 문서화 없음 → 신규 인원이 건드릴 수 없는 구조\n• 요구사항을 재정의하고 선언적 프레임워크를 처음부터 설계·구축\n• Valtio 도입: ref()로 렌더링 제어 + 팀 러닝커브 최소화\n• Storybook + Mock으로 백엔드 의존 없이 프론트 선행 개발 체계 확립\n• PR 프로세스 없던 팀에 Git Flow + 코드리뷰 도입 → 구조 안정화 후 AI 페이지 자동생성\n• PR 속도 약 25배 향상, 코드량 약 70% 감소, 리렌더링 약 85% 감소`,
      cgv: `• 매일 아침 반복되던 메모리 폭주 → 메모리 로거 직접 작성하여 원인 추적\n• tiktoken 인코더 싱글톤 미적용이 근본 원인 → 적용 후 안정화\n• 날짜별 API 비효율 조회 구조를 캐싱 테이블로 개선, 렌더링 속도 약 10배 향상\n• 바이럴 분석 UI/UX 전체 설계, 감정 분석 시각화 구현`,
      llami: `• 다수 LLM API의 서로 다른 스펙(인증, 포맷, 스트리밍)을 pipe 패턴으로 통합\n• 신규 모델 추가 시 pipe 하나만 작성 → 확장 비용 최소화\n• 웹뷰 기반 Bridge/ReverseBridge로 React 문법만으로 네이티브 기능 활용\n• AI 챗봇 마켓플레이스(봇스토어) 프론트엔드 전체 설계·개발\n• Toss Payments 우수사례 선정`,
      worktree: `• QA 중 멀티 브랜치 병렬 작업 병목 → 적절한 도구가 없어 직접 설계·개발\n• xterm.js + Claude Code 연동으로 AI 기반 개발 플랜 자동 작성\n• chokidar + sync lock으로 대시보드 ↔ worktree 양방향 플랜 동기화`,
    },
  },
  enterprise: {
    position: "프론트엔드 개발자",
    tagline:
      "코드베이스를 읽고, 구조적 병목을 파악하고, 실질적인 개선을 만드는 개발자입니다.",
    intro:
      "합류한 프로젝트의 코드를 먼저 읽고, 반복되는 문제의 윤곽을 파악한 뒤 움직입니다. 짧고 읽히는 코드를 선호하고, 핫픽스 남발보다 원인을 끝까지 파고들어 해결하는 쪽을 택합니다. PR은 작게 쪼개되 히스토리를 체계적으로 관리하고, 길어지는 논의는 이슈 티켓으로 빼고, 컨벤션은 린터로 자동화하여 팀이 코드에 집중할 수 있는 환경을 만듭니다.",
    career: {
      runup:
        "레거시 코드 분석 후 선언적 프레임워크를 설계하여 PR 속도 약 25배 향상, 코드량 약 70% 감소를 달성했습니다. PR 프로세스와 코드리뷰 문화를 도입하고, Storybook 기반 문서화를 구축했습니다.",
      poul: "CGV 합작 서비스에서 메모리 폭주와 렌더링 병목을 직접 추적하여 해결했습니다. LLAMI에서 LLM API 통합 아키텍처를 설계했으며, 서비스가 Toss Payments 우수사례에 선정되었습니다.",
    },
    projects: {
      dynamos: `• 기존 코드 분석: 페이지마다 useState/훅 난립, 문서화 없음, 유지보수 불가 구조\n• 요구사항 재정의 → config + 코어 컴포넌트 조립 기반 선언적 구조 설계\n• Valtio 선택 근거: 프록시 구독으로 렌더링 세밀 제어 + 팀 러닝커브 최소화\n• Storybook + Mock으로 백엔드 의존 제거, API 스펙을 프론트가 선정의\n• Git Flow + 코드리뷰 도입, 구조 안정화 후 AI 페이지 자동생성 워크플로우 확장\n• PR 속도 약 25배 향상, 코드량 약 70% 감소, 리렌더링 약 85% 감소`,
      cgv: `• 매일 아침 반복되던 메모리 폭주 → 메모리 로거 직접 작성하여 원인 추적\n• tiktoken 인코더 싱글톤 미적용이 근본 원인 → 적용 후 안정화\n• 날짜별 API 비효율 조회 구조를 캐싱 테이블로 개선, 렌더링 속도 약 10배 향상\n• 바이럴 분석 UI/UX 전체 설계, 감정 분석 시각화 구현`,
      llami: `• 다수 LLM API의 서로 다른 스펙을 분석하여 공통 패턴 추출, pipe 패턴으로 추상화\n• 신규 모델 추가 시 pipe 하나만 작성 → 확장 비용 최소화\n• 웹뷰 기반 Bridge/ReverseBridge로 React 문법만으로 네이티브 기능 활용\n• Toss Payments 우수사례 선정`,
      worktree: `• QA 중 멀티 브랜치 병렬 작업 병목 → 적절한 도구가 없어 직접 설계·개발\n• xterm.js + Claude Code 연동 AI 플랜 자동 작성, 양방향 플랜 동기화\n• PTY 세션 서버 관리, lsof 기반 orphan 프로세스 복구`,
    },
  },
};

// ── 기업별 프로젝트 오버라이드 ──

const companyOverrides: Record<
  Exclude<Company, "default">,
  { projects: Partial<(typeof content)["startup"]["projects"]> }
> = {
  zeta: {
    projects: {
      llami: `• 다수 LLM API를 pipe 패턴으로 통합, 신규 모델 추가 시 pipe 하나만 작성\n• OpenAI Assistant API 기반 실시간 스트리밍 채팅 및 대화 히스토리 관리\n• 텍스트/캐릭터 비주얼 듀얼 모드 채팅 — 대화 상태를 유지하면서 UI 모드만 전환하는 구조 설계\n• 웹뷰 기반 Bridge/ReverseBridge로 React 문법만으로 네이티브 기능 활용\n• Toss Payments 우수사례 선정`,
    },
  },
};

export type { Variant, Company };

export default function ProductivityDocument({
  variant = "startup",
  company = "default",
  showLanguage = false,
}: {
  variant?: Variant;
  company?: Company;
  showLanguage?: boolean;
}) {
  const base = content[variant];
  const override = company !== "default" ? companyOverrides[company] : null;
  const v = {
    ...base,
    projects: { ...base.projects, ...override?.projects },
  };

  return (
    <Document>
      <Page size="A4" style={s.page}>
        {/* 헤더 */}
        <View style={s.headerRow}>
          <View style={s.headerLeft}>
            <Text style={s.positionLabel}>{v.position}</Text>
            <Text style={s.bigTitle}>김용민입니다.</Text>
            <Text style={s.tagline}>{v.tagline}</Text>
            <View style={s.infoRow}>
              <Text style={s.infoText}>1998.07.18</Text>
              <Text style={s.infoText}>남</Text>
              <Text style={s.infoText}>ryokuman21@gmail.com</Text>
              <Text style={s.infoText}>github.com/Ryokuman</Text>
            </View>
          </View>
          <Image
            style={s.profileImage}
            src="http://localhost:4000/images/profile.jpg"
          />
        </View>

        {/* 소개 */}
        <Text style={s.sectionTitle}>소개</Text>
        <Text style={s.introText}>{v.intro}</Text>

        {/* 경력 */}
        <Text style={s.sectionTitle}>경력</Text>

        <View style={s.careerEntry}>
          <View style={s.careerRow}>
            <Image
              style={s.careerLogo}
              src="http://localhost:4000/images/runup.png"
            />
            <View style={s.careerInfo}>
              <View style={s.careerHeader}>
                <Text style={s.careerCompany}>주식회사 런업</Text>
                <Text style={s.careerPeriod}>2025.12 - 현재</Text>
              </View>
              <Text style={s.careerRole}>
                {variant === "startup" ? "풀스택 개발자" : "프론트엔드 개발자"}
              </Text>
              <Text style={s.careerDesc}>{v.career.runup}</Text>
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
                <Text style={s.careerCompany}>주식회사 피오유엘 (POUL)</Text>
                <Text style={s.careerPeriod}>2024.06 - 2025.08</Text>
              </View>
              <Text style={s.careerRole}>풀스택 개발자</Text>
              <Text style={s.careerDesc}>{v.career.poul}</Text>
            </View>
          </View>
        </View>

        {/* 대표 프로젝트 */}
        <Text style={s.sectionTitle}>대표 프로젝트</Text>

        <View style={s.careerEntry}>
          <View style={s.careerHeader}>
            <Text style={s.careerCompany}>DynaMOS v2</Text>
            <Text style={s.careerPeriod}>2025.12 - 현재 · 런업</Text>
          </View>
          <Text style={s.projectSummary}>
            레거시 구조를 선언적 프레임워크로 전환하여 팀 개발 속도를 끌어올린
            프로젝트
          </Text>
          <Text style={s.careerDesc}>{v.projects.dynamos}</Text>
        </View>

        {company === "zeta" ? (
          <>
            <View style={s.careerEntry}>
              <View style={s.careerHeader}>
                <Text style={s.careerCompany}>LLAMI</Text>
                <Text style={s.careerPeriod}>2024.12 - 2025.08 · POUL</Text>
              </View>
              <Text style={s.projectSummary}>
                다수의 LLM API를 단일 인터페이스로 통합한 AI 플랫폼
              </Text>
              <Text style={s.careerDesc}>{v.projects.llami}</Text>
            </View>

            <View style={s.careerEntry}>
              <View style={s.careerHeader}>
                <Text style={s.careerCompany}>CGV-ASSISTANT</Text>
                <Text style={s.careerPeriod}>
                  2024.06 - 2025.07 · POUL × CGV
                </Text>
              </View>
              <Text style={s.projectSummary}>
                반복되는 메모리 폭주를 직접 추적하여 안정화한 프로젝트
              </Text>
              <Text style={s.careerDesc}>{v.projects.cgv}</Text>
            </View>
          </>
        ) : (
          <>
            <View style={s.careerEntry}>
              <View style={s.careerHeader}>
                <Text style={s.careerCompany}>CGV-ASSISTANT</Text>
                <Text style={s.careerPeriod}>
                  2024.06 - 2025.07 · POUL × CGV
                </Text>
              </View>
              <Text style={s.projectSummary}>
                반복되는 메모리 폭주를 직접 추적하여 안정화한 프로젝트
              </Text>
              <Text style={s.careerDesc}>{v.projects.cgv}</Text>
            </View>

            <View style={s.careerEntry}>
              <View style={s.careerHeader}>
                <Text style={s.careerCompany}>LLAMI</Text>
                <Text style={s.careerPeriod}>2024.12 - 2025.08 · POUL</Text>
              </View>
              <Text style={s.projectSummary}>
                다수의 LLM API를 단일 인터페이스로 통합한 AI 플랫폼
              </Text>
              <Text style={s.careerDesc}>{v.projects.llami}</Text>
            </View>
          </>
        )}

        {/* 사이드 프로젝트 */}
        <Text style={s.subSectionTitle}>사이드 프로젝트</Text>

        <View style={s.careerEntry}>
          <View style={s.careerHeader}>
            <Text style={s.careerCompany}>Claude Worktree System</Text>
            <Text style={s.careerPeriod}>2026.02 - 현재 · 오픈소스</Text>
          </View>
          <Text style={s.projectSummary}>
            기존 도구로 해결되지 않는 병렬 개발 문제를 직접 해결한 시스템
          </Text>
          <Text style={s.careerDesc}>{v.projects.worktree}</Text>
        </View>

        {/* 기술 스택 */}
        <Text style={s.sectionTitle}>기술 스택</Text>
        <View style={s.techGroup}>
          <Text style={s.techGroupLabel}>Core</Text>
          <View style={s.techRow}>
            <Text style={s.techBadge}>TypeScript</Text>
            <Text style={s.techBadge}>React</Text>
            <Text style={s.techBadge}>Next.js</Text>
          </View>
        </View>
        <View style={s.techGroup}>
          <Text style={s.techGroupLabel}>State</Text>
          <View style={s.techRow}>
            <Text style={s.techBadge}>Valtio</Text>
          </View>
        </View>
        <View style={s.techGroup}>
          <Text style={s.techGroupLabel}>UI</Text>
          <View style={s.techRow}>
            <Text style={s.techBadge}>Tailwind CSS</Text>
            <Text style={s.techBadge}>AG Grid</Text>
            <Text style={s.techBadge}>Storybook</Text>
            <Text style={s.techBadge}>Expo</Text>
          </View>
        </View>
        <View style={s.techGroup}>
          <Text style={s.techGroupLabel}>Backend</Text>
          <View style={s.techRow}>
            <Text style={s.techBadge}>ElysiaJS</Text>
            <Text style={s.techBadge}>Node.js</Text>
            <Text style={s.techBadge}>Supabase</Text>
          </View>
        </View>
        <View style={s.techGroup}>
          <Text style={s.techGroupLabel}>Infra · DX</Text>
          <View style={s.techRow}>
            <Text style={s.techBadge}>Docker</Text>
            <Text style={s.techBadge}>AWS</Text>
            <Text style={s.techBadge}>Jenkins</Text>
            <Text style={s.techBadge}>GitHub Actions</Text>
            <Text style={s.techBadge}>Claude Code</Text>
          </View>
        </View>

        {/* 언어 */}
        {showLanguage && (
          <View style={s.techGroup}>
            <Text style={s.techGroupLabel}>언어</Text>
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

        {/* 학력 */}
        <Text style={s.sectionTitle}>학력</Text>
        <View style={s.eduEntry}>
          <View style={s.eduRow}>
            <Image
              style={s.eduLogo}
              src="http://localhost:4000/images/sku.svg"
            />
            <View>
              <Text style={s.eduName}>성결대학교</Text>
              <Text style={s.eduDept}>컴퓨터공학과 (중퇴)</Text>
            </View>
          </View>
          <Text style={s.careerPeriod}>2017 - 2023</Text>
        </View>
      </Page>
    </Document>
  );
}
