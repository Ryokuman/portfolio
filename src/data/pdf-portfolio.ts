// ── PDF Portfolio Data ──
// 포트폴리오
// 회사 프로젝트: DynaMOS, CGV | 사이드 프로젝트: Worktree, agent-hive

export type ProjectCategory = "work" | "side";

export interface ProjectSection {
  title: string;
  period?: string;
  /** 문제 정의 / 요구사항 */
  problem: string;
  /** 설계 및 구현 */
  actions: string[];
  /** 결과 */
  result?: string;
}

export interface PortfolioProject {
  id: string;
  category: ProjectCategory;
  title: string;
  period: string;
  org: string;
  tagline: string;
  highlights: string[];
  jdMatch: string[];
  sections: ProjectSection[];
}

export interface PortfolioData {
  cover: {
    name: string;
    position: string;
    tagline: string;
    contact: { email: string; github: string };
    intro: string;
  };
  projects: PortfolioProject[];
}

export const portfolioData: PortfolioData = {
  cover: {
    name: "김용민",
    position: "Frontend Developer 지원",
    tagline: "100페이지 ERP를 선언적 프레임워크로 표준화하고,\nDX 인프라를 설계해 팀 생산성을 끌어올린 개발자",
    contact: {
      email: "ryokuman21@gmail.com",
      github: "github.com/Ryokuman",
    },
    intro:
      "개발 환경 표준화(린트·포맷·컨벤션 자동화)부터 운영도구 플랫폼화까지,\n개발자가 비즈니스 로직에만 집중할 수 있는 환경을 직접 설계합니다.\nGit Flow·Jira·Storybook으로 팀 프로세스를 체계화하고,\nconfig 기반 선언적 프레임워크로 100페이지+ ERP를 표준화했습니다.\n\nReact · Next.js · TypeScript · Node.js · Storybook",
  },

  projects: [
    // ════════════════════════════════════════
    // 회사 프로젝트
    // ════════════════════════════════════════

    {
      id: "dynamos",
      category: "work",
      title: "DynaMOS v2",
      period: "2025.12 - 현재",
      org: "런업 · ERP/MES 내부 운영도구 · Frontend Lead",
      tagline:
        "100페이지+ ERP 운영도구를 선언적 프레임워크로 전환 → 일평균 4 PR 처리 체계 구축",
      highlights: [
        "config + 컴포넌트 조립만으로 페이지 완성하는 선언적 구조 → 코드량 72% 감소",
        "PR 0개 → Git Flow·Jira·Storybook 체계 도입, 35일간 139개 PR 정착",
        "ESLint·Prettier·lint-staged 자동화 + Storybook 선행 개발 체계 구축",
      ],
      jdMatch: [
        "내부 운영 도구 플랫폼화",
        "어드민 UX/UI 최적화",
        "반복적인 수작업 자동화",
      ],
      sections: [
        // ── 1. 프레임워크 설계 ──
        {
          title: "선언적 프레임워크 설계 — 100페이지를 config로 찍어내는 구조",
          period: "2026.01 ~ 2026.02",
          problem:
            "최소 100페이지 이상의 업무 화면을 빠르게 찍어내야 하는 상황.\n기존 레거시는 페이지당 useState 7개+, 훅 16~20개 — 수정하면 어디가 깨지는지 모름.\n새 사람이 와도 코드를 이해할 수 없어 온보딩 자체가 불가능.",
          actions: [
            "UI를 코어 컴포넌트(Tab, Filter, Grid, Buttons)로 분해.\n컴포넌트 갯수를 제한하여 AI든 사람이든 선택지를 좁히는 구조.",
            "config 파일(컬럼 정의) + 컴포넌트 조립만으로 페이지 완성.\nProps drilling 제거, Store를 통한 상태 공유.",
            "컨벤션·스니펫을 CLAUDE.md로 정리.\n원래 사람 온보딩용이었으나,\n패턴이 예측 가능하니 Claude Code로 다수 페이지 MVP 일괄 생성 가능.",
          ],
          result:
            "일평균 4 PR 처리 가능한 개발 체계 구축 (합류 전 0.16/일)\n페이지당 코드량 72% 감소 (441줄 → 122줄)\n개발자가 비즈니스 로직에만 집중할 수 있는 환경 — 온보딩 시간 대폭 단축",
        },
        // ── 2. Pipe-Phase 패턴 ──
        {
          title: "다수 그리드 요구사항 통합 — Pipe-Phase 패턴",
          problem:
            "페이지마다 그리드 요구사항이 전부 다름.\n읽기전용 / 인라인편집 / 셀렉트 / 체크박스 등 조합이 가지각색.\n하나의 컬럼 정의 함수에 if-else가 쌓이면서 수정할 때마다 사이드이펙트 발생.",
          actions: [
            "React setState(prev → next)에서 영감.\nColDef를 상태로 보고, 각 단계가 이전 결과를 받아 변환하는 Pipe-Phase 패턴 설계.\nStrategy 패턴 대비 Phase 간 순서 의존만 허용하여 안전성 확보.",
            "Pipe(변환 단위) → Phase(관심사 묶음) → Handler(순차 실행) 3층 구조.\n같은 Phase 안 pipe는 독립, Phase 간에만 순서 의존.",
            "그리드 타입별 프리셋:\nBaseGrid(1 Phase) / NormalGrid(3) / InlineGrid(5).\n페이지는 프리셋 선택 후 필요한 pipe만 교체·확장.",
          ],
          result:
            "예: editable pipe가 ColDef.editable = true 세팅\n→ style pipe가 이 값을 읽어 편집 불가=회색, 필수+비어있음=노란색 자동 적용.\npipe 추가/제거해도 다른 pipe에 영향 없음 → 기능 추가 시 사이드이펙트 없이 확장 가능.",
        },
        // ── 4. 프로세스 체계화 ──
        {
          title: "DX 인프라 구축 — Git Flow · Jira · Storybook · 린트 자동화",
          problem:
            "합류 시점 PR 0개 — .env를 커밋하고 main에 직접 push하는 환경.\n누가 뭘 바꿨는지 추적 불가, 같은 파일을 서로 고치다 충돌 반복.\nPM 부재로 우선순위가 없고, 프론트가 백엔드 API 완성을 기다리며 멈추는 병목.",
          actions: [
            "Git Flow(main/qa/dev) + PR 기반 코드리뷰를 직접 설계하고 도입.\n문제 상황을 공유하여 팀 설득.\n35일간 139개 PR로 프로세스 정착.",
            "Jira 프로젝트(보드·워크플로우·이슈 타입) 초기 설정을 직접 구성.\n프론트 PM으로서 대표/수석과 우선순위 회의 후 업무 배분.",
            "ESLint + Prettier + lint-staged 컨벤션 자동화.",
            "Storybook + Mock Backend로 선행 개발 체계 구축.\n프론트가 API 스펙을 먼저 정의, 백엔드 대기 없이 개발.",
          ],
          result:
            "전체 커밋 66%, 라인 변경량 63% 기여.\nStorybook 선행 개발로 백엔드 대기 병목 제거 — 프론트가 독립적으로 개발 가능한 체계.\nQA 기간 Worktree System 투입 → 4일간 62개 PR 처리 (15.5 PR/일)",
        },
      ],
    },

    // ── CGV-ASSISTANT ──
    {
      id: "cgv",
      category: "work",
      title: "CGV-ASSISTANT",
      period: "2024.06 - 2025.07",
      org: "POUL × CGV · 감정분석 대시보드 · Full Stack (바이럴 스크래핑 제외 전 비즈니스 로직 담당)",
      tagline:
        "프론트 렌더링 10배 향상 + 바이럴 분석 대시보드 설계 → Toss Payments 우수사례 선정",
      highlights: [
        "API 병렬 처리 + 데이터 시각화로 프론트 렌더링 10배 향상",
        "바이럴 분석 대시보드 전체 설계·구현 — CGV 비즈니스팀 직접 활용",
        "Toss Payments 우수사례 선정",
      ],
      jdMatch: [
        "운영 대시보드/리포트 개발",
        "비즈니스 요구사항 → 화면 설계",
      ],
      sections: [
        {
          title: "프론트 성능 최적화 & 데이터 시각화",
          period: "2024.07 ~ 2025.02",
          problem:
            "CGV 실관람평 실시간 수집 + AI 감정/유해성 분석 시스템.\n날짜별 데이터 그래프 추가 시 렌더링 3초+ 소요.\n대량 데이터를 효율적으로 시각화할 프론트 구조가 없었음.",
          actions: [
            "API 콜 병렬 처리 설계로 렌더링 3000ms → 300ms.",
            "데이터 시각화 그래프 직접 구현.\nAI 키워드 분석, 한줄평 자동 생성, 위험 리뷰 필터링 대시보드.",
            "일별 5000건 AI 분석 결과를 실시간 반영하는 대시보드 UI 설계.",
          ],
          result:
            "프론트 렌더링 10배 향상.\n일별 5000건 AI 분석 + 2000건 스크래핑 파이프라인 안정 운영.",
        },
        {
          title: "바이럴 분석 대시보드 설계",
          period: "2025.03 ~ 2025.07",
          problem:
            "X, YouTube, 네이버 블로그 등 바이럴 데이터 시각화 UI 부재.\n바이럴 스크래핑 제외 모든 비즈니스 로직 담당.\n상부에서 추상적인 기능 리스트만 넘겨받는 상황.",
          actions: [
            "v0로 CGV 톤앤매너에 맞는 디자인 프로토타입 생성.\nCGV 측 승인 즉시 개발 착수, 대기 시간 최소화.",
            "에그지수(CGV 자체 지표), 소셜 통계 차트, 감정 분석 시각화 등\n대시보드 UI/UX 전체 설계·구현.",
            "감정평가 시스템 구축 및 임베딩 처리.\n동작 중심 QA로 속도 확보 후 안정화 단계에서 코드 정리.",
          ],
          result:
            "바이럴 분석 대시보드 신규 구축 — CGV 비즈니스팀 직접 활용. Toss Payments 우수사례 선정",
        },
      ],
    },

    // ════════════════════════════════════════
    // 사이드 프로젝트
    // ════════════════════════════════════════

    {
      id: "worktree",
      category: "side",
      title: "Claude Worktree System",
      period: "2026.02 - 현재",
      org: "오픈소스 · 메인테이너 · github.com/Ryokuman/claude-worktree-system",
      tagline:
        "멀티 브랜치 병렬 작업 자동화 → DynaMOS QA에 실전 투입, 4일간 62개 PR 처리",
      highlights: [
        "브랜치별 독립 worktree + 플랜 파일로 병렬 작업 — 전환 오버헤드 제거",
        "웹 터미널에서 Claude Code 직접 실행, 멀티세션 동시 모니터링",
        "실전 투입: QA 기간 4일간 62개 PR 처리 (15.5 PR/일)",
      ],
      jdMatch: [
        "반복적인 수작업 자동화",
        "효율성과 자동화 개선",
      ],
      sections: [
        {
          title: "플랜 기반 컨텍스트 스위칭 & 대시보드",
          problem:
            "AI도 인간도 한 번에 담을 수 있는 컨텍스트에 한계가 있음.\nQA 기간 멀티 브랜치 병렬 작업 필요.\n브랜치 전환마다 의존성 재설치 → 서버 재시작 반복.\n진행 상황 트래킹할 통합 뷰 부재.",
          actions: [
            "핵심 관찰: 플랜을 잘 쪼개면 컨텍스트 스위칭이 발생해도\n\"이번 작업이 뭔지\"만 알면 됨.\n인간은 직관만 제공, 나머지는 텍스트(플랜)가 가져가는 구조.",
            "MD 기반 플랜 파일로 작업 분할.\n브랜치마다 독립 worktree + 플랜으로 병렬 작업 가능.",
            "Git refs 변경을 chokidar로 실시간 감지.\n웹 UI에서 worktree 생성/삭제/완료, 포트 자동 할당.",
            "진행률 바 + 상태 토글 구조화 뷰, 직접 편집 가능한 Raw 뷰.",
          ],
          result:
            "DynaMOS QA에 실전 투입 — 병렬 처리로 4일간 62개 PR 처리 (15.5 PR/일).\n개발자가 브랜치 전환 없이 여러 작업을 동시 진행 가능한 환경.",
        },
        {
          title: "웹 터미널 & Claude Code AI 연동",
          problem:
            "각 worktree에서 Claude Code 실행 시 터미널을 직접 열고 이동해야 하는 수작업.\n여러 worktree의 AI 작업을 동시에 모니터링할 수 없음.",
          actions: [
            "xterm.js + node-pty + WebSocket 기반 브라우저 터미널.\n워크트리별 멀티세션, 100KB 스크롤백.\n멀티뷰어로 여러 탭에서 같은 세션 실시간 공유.",
            "Claude Code를 웹 터미널에서 직접 실행.\nCLAUDE.md 컨텍스트 주입으로 프로젝트 컨벤션에 맞는 플랜 자동 작성.",
            "Git SSH 자동 설정 + 터미널 init 커맨드 주입.\n즉시 개발 가능 환경 구축.",
          ],
          result:
            "QA 피드백 → 해당 worktree에서 즉시 수정, 다른 브랜치는 중단 없이 병렬 진행.\n브랜치 전환 오버헤드 제거 — 개발자가 작업 컨텍스트를 잃지 않는 환경.",
        },
        {
          title: "양방향 플랜 동기화 & 아키텍처",
          problem:
            "대시보드에서 수정한 플랜과 worktree 내 로컬 플랜 파일 불일치.\n터미널 세션 크래시 시 프로세스 상태 유실.",
          actions: [
            "plan/active/{branch}/ ↔ {worktree}/.claude/plan/ 양방향 동기화.\nchokidar 감시 + 1초 디바운싱, sync lock(500ms)으로 무한 루프 방지.",
            "터미널 세션을 서버 상태의 source of truth로 설계.\nlsof 기반 orphan 프로세스 복구.\nTask Lock(Promise 기반 큐)으로 동시 조작 방지.",
            "Next.js App Router를 Custom HTTP 서버로 감싸고 WebSocket upgrade 핸들링.\nApp Router가 WS upgrade를 미지원하여 Custom Server 래핑 결정.",
          ],
          result:
            "Jira 등 외부 SSoT와 연결 가능한 확장 구조 확보. 오픈소스 공개 및 메인테이너 운영 중",
        },
      ],
    },

    // ── agent-hive ──
    {
      id: "agent-hive",
      category: "side",
      title: "agent-hive",
      period: "2026.03 - 현재 (v0.2.0)",
      org: "오픈소스 · 메인테이너 · github.com/Ryokuman/claude-colony",
      tagline:
        "이슈 → 코드 → 리뷰 → 머지 전체 사이클 자동화 — 어댑터 5개 플랫폼 구현 완료",
      highlights: [
        "Worker(코드 생성) + Reviewer(자동 리뷰) 패턴으로 개발 사이클 자동화",
        "GitHub/Jira/Notion/Obsidian/Local JSON 5개 플랫폼 어댑터 구현 완료",
        "인간은 방향 설정과 최종 머지만 담당하는 하네싱 구조",
      ],
      jdMatch: [
        "반복적인 수작업 자동화",
        "효율성과 자동화 개선",
      ],
      sections: [
        {
          title: "Worker-Reviewer 자동화 & 5개 플랫폼 어댑터",
          problem:
            "AI가 코드를 잘 짜지만,\n이슈 → 코드 → 리뷰 → 반영 전체 사이클을 사람이 관리하는 것이 병목.\n팀마다 GitHub, Jira, Notion 등 다른 이슈 트래킹을 쓰는데 이를 통합해야 함.",
          actions: [
            "Worker(코드 생성 → PR) + Reviewer(자동 리뷰 → 코멘트) 패턴.\n약 3라운드 핑퐁 후 인간 최종 승인. 인간은 방향 설정과 머지만 담당.",
            "어댑터 패턴으로 GitHub/Jira/Notion/Obsidian/Local JSON\n5개 플랫폼 이슈를 단일 인터페이스로 통합.",
            "플랫폼별 상태 머신 (todo → in-progress → reviewing → done)\n+ Obsidian vault 연동 장기 메모리 시스템.",
          ],
          result:
            "어댑터 5개 플랫폼 구현 완료, Worker-Reviewer 루프 동작 확인.\n기존 Git 저장소에 attach하여 이슈 → PR → 리뷰 자동 수행.",
        },
      ],
    },
  ],
};
