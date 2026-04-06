// ── PDF Portfolio Data ──
// 포트폴리오
// 회사 프로젝트: DynaMOS, CGV | 사이드 프로젝트: Worktree, agent-hive

import type { Locale } from "@/i18n/context";

export type ProjectCategory = "work" | "side";

export interface ProjectSection {
  title: string;
  period?: string;
  problem: string;
  actions: string[];
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

const portfolioLocales: Record<Locale, PortfolioData> = {
  // ════════════════════════════════════════
  // 한국어
  // ════════════════════════════════════════
  ko: {
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
  },

  // ════════════════════════════════════════
  // English
  // ════════════════════════════════════════
  en: {
    cover: {
      name: "Yongmin Kim",
      position: "Frontend Developer Application",
      tagline: "Developer who standardized a 100+ page ERP with a declarative framework\nand built DX infrastructure to boost team productivity",
      contact: {
        email: "ryokuman21@gmail.com",
        github: "github.com/Ryokuman",
      },
      intro:
        "From standardizing dev environments (lint · format · convention automation) to platforming operational tooling,\nI design environments where developers can focus solely on business logic.\nI systematize team processes with Git Flow · Jira · Storybook,\nand standardized a 100+ page ERP with a config-driven declarative framework.\n\nReact · Next.js · TypeScript · Node.js · Storybook",
    },
    projects: [
      {
        id: "dynamos",
        category: "work",
        title: "DynaMOS v2",
        period: "2025.12 - Present",
        org: "Runup · ERP/MES Internal Ops Tool · Frontend Lead",
        tagline:
          "Migrated 100+ page ERP ops tool to declarative framework → Built system handling avg 4 PRs/day",
        highlights: [
          "Config + component assembly completes pages declaratively → 72% reduction in code volume",
          "PR 0 → Introduced Git Flow · Jira · Storybook, established 139 PRs over 35 days",
          "ESLint · Prettier · lint-staged automation + Storybook-first development pipeline",
        ],
        jdMatch: [
          "Internal ops tool platformization",
          "Admin UX/UI optimization",
          "Repetitive manual task automation",
        ],
        sections: [
          {
            title: "Declarative Framework Design — Config-driven page generation at scale",
            period: "2026.01 ~ 2026.02",
            problem:
              "Needed to rapidly produce 100+ business screens.\nLegacy had 7+ useState, 16–20 hooks per page — impossible to modify safely.\nNew team members couldn't understand the code, making onboarding infeasible.",
            actions: [
              "Decomposed UI into core components (Tab, Filter, Grid, Buttons).\nLimited component count to narrow choices for both AI and humans.",
              "Pages completed via config file (column definitions) + component assembly.\nEliminated props drilling, shared state via Store.",
              "Documented conventions and snippets in CLAUDE.md.\nOriginally for human onboarding — but with predictable patterns, Claude Code can batch-generate MVP pages.",
            ],
            result:
              "Built development system capable of avg 4 PRs/day (vs 0.16/day before joining)\n72% reduction in code per page (441 → 122 lines)\nEnvironment where developers focus solely on business logic — onboarding time drastically reduced",
          },
          {
            title: "Unified Multi-Grid Requirements — Pipe-Phase Pattern",
            problem:
              "Every page had different grid requirements.\nRead-only / inline edit / select / checkbox combinations varied widely.\nif-else accumulating in a single column definition function caused side effects on every change.",
            actions: [
              "Inspired by React setState(prev → next).\nTreated ColDef as state, designed Pipe-Phase pattern where each stage receives and transforms the previous result.\nVs Strategy pattern: only allows order dependency between Phases for safety.",
              "3-layer structure: Pipe (transform unit) → Phase (concern group) → Handler (sequential execution).\nPipes within same Phase are independent; only inter-Phase ordering is allowed.",
              "Grid type presets:\nBaseGrid(1 Phase) / NormalGrid(3) / InlineGrid(5).\nPages select preset then swap/extend only needed pipes.",
            ],
            result:
              "e.g. editable pipe sets ColDef.editable = true\n→ style pipe reads this value: non-editable=gray, required+empty=yellow auto-applied.\nAdding/removing pipes doesn't affect others → extensible without side effects.",
          },
          {
            title: "DX Infrastructure — Git Flow · Jira · Storybook · Lint Automation",
            problem:
              "0 PRs on joining — .env committed, pushing directly to main.\nNo way to track who changed what, repeated conflicts on same files.\nNo PM meant no priorities; frontend blocked waiting for backend APIs.",
            actions: [
              "Designed and introduced Git Flow (main/qa/dev) + PR-based code review.\nShared problem situation to persuade team.\n139 PRs over 35 days to establish process.",
              "Set up Jira project (board · workflow · issue types) from scratch.\nAs frontend PM, held priority meetings with CEO/senior and distributed tasks.",
              "ESLint + Prettier + lint-staged convention automation.",
              "Storybook + Mock Backend for ahead-of-API development.\nFrontend defines API specs first, develops without waiting for backend.",
            ],
            result:
              "66% of total commits, 63% of line changes contributed.\nStorybook-first development eliminated backend-wait bottleneck — frontend can develop independently.\nWorktree System deployed during QA → 62 PRs in 4 days (15.5 PRs/day)",
          },
        ],
      },
      {
        id: "cgv",
        category: "work",
        title: "CGV-ASSISTANT",
        period: "2024.06 - 2025.07",
        org: "POUL × CGV · Sentiment Analysis Dashboard · Full Stack (all business logic except viral scraping)",
        tagline:
          "10x frontend rendering improvement + viral analysis dashboard design → Selected as Toss Payments best case",
        highlights: [
          "10x frontend rendering via API parallelization + data visualization",
          "Full design & implementation of viral analysis dashboard — used by CGV business team",
          "Selected as Toss Payments best practice",
        ],
        jdMatch: [
          "Operations dashboard/report development",
          "Business requirements → UI design",
        ],
        sections: [
          {
            title: "Frontend Performance Optimization & Data Visualization",
            period: "2024.07 ~ 2025.02",
            problem:
              "Real-time collection of CGV reviews + AI sentiment/toxicity analysis system.\nAdding date-based data graphs caused 3s+ rendering time.\nNo frontend structure to efficiently visualize large-scale data.",
            actions: [
              "Designed parallel API call processing: rendering 3000ms → 300ms.",
              "Implemented data visualization graphs.\nAI keyword analysis, one-line review auto-generation, dangerous review filtering dashboard.",
              "Designed dashboard UI reflecting real-time results of 5,000 daily AI analyses.",
            ],
            result:
              "10x frontend rendering improvement.\nStable operation of pipeline: 5,000 AI analyses + 2,000 scraping records/day.",
          },
          {
            title: "Viral Analysis Dashboard Design",
            period: "2025.03 ~ 2025.07",
            problem:
              "No viral data visualization UI for X, YouTube, Naver Blog.\nResponsible for all business logic except viral scraping.\nReceived only abstract feature lists from above.",
            actions: [
              "Generated design prototype matching CGV's tone & manner with v0.\nStarted development immediately upon CGV approval, minimizing waiting time.",
              "Full UI/UX design & implementation of dashboard:\nEgg Index (CGV's proprietary metric), social stats charts, sentiment analysis visualization.",
              "Built sentiment evaluation system and embedding processing.\nFast QA via behavior-first testing, then code cleanup in stabilization phase.",
            ],
            result:
              "Built new viral analysis dashboard — directly used by CGV business team. Selected as Toss Payments best practice.",
          },
        ],
      },
      {
        id: "worktree",
        category: "side",
        title: "Claude Worktree System",
        period: "2026.02 - Present",
        org: "Open Source · Maintainer · github.com/Ryokuman/claude-worktree-system",
        tagline:
          "Automated multi-branch parallel work → Deployed in DynaMOS QA, processed 62 PRs in 4 days",
        highlights: [
          "Independent worktree per branch + plan files for parallel work — zero context-switch overhead",
          "Run Claude Code directly from web terminal, monitor multiple sessions simultaneously",
          "Production deployment: 62 PRs processed in 4-day QA period (15.5 PRs/day)",
        ],
        jdMatch: [
          "Repetitive manual task automation",
          "Efficiency and automation improvement",
        ],
        sections: [
          {
            title: "Plan-Based Context Switching & Dashboard",
            problem:
              "Both AI and humans have limits on how much context they can hold.\nNeeded multi-branch parallel work during QA.\nBranch switching required reinstalling dependencies → repeated server restarts.\nNo unified view to track progress.",
            actions: [
              "Key insight: if plans are well-divided, context switching only needs to know 'what this task is'.\nHumans provide intuition only; the rest is carried by text (plans).",
              "MD-based plan files to split tasks.\nIndependent worktree + plan per branch enables parallel work.",
              "Real-time detection of Git refs changes via chokidar.\nWeb UI for creating/deleting/completing worktrees, automatic port assignment.",
              "Progress bar + status toggle structured view, editable Raw view.",
            ],
            result:
              "Deployed in DynaMOS QA — parallel processing handled 62 PRs in 4 days (15.5 PRs/day).\nEnvironment where developers can work on multiple tasks simultaneously without branch switching.",
          },
          {
            title: "Web Terminal & Claude Code AI Integration",
            problem:
              "Running Claude Code in each worktree required manually opening and navigating to terminals.\nCouldn't monitor AI work across multiple worktrees simultaneously.",
            actions: [
              "Browser terminal based on xterm.js + node-pty + WebSocket.\nMulti-session per worktree, 100KB scrollback.\nMulti-viewer for real-time session sharing across multiple tabs.",
              "Run Claude Code directly in web terminal.\nCLAUDE.md context injection for auto-generating plans matching project conventions.",
              "Git SSH auto-setup + terminal init command injection.\nInstant development-ready environment.",
            ],
            result:
              "QA feedback → immediate fix in corresponding worktree, other branches continue uninterrupted in parallel.\nEliminated branch-switch overhead — developers don't lose task context.",
          },
          {
            title: "Bidirectional Plan Sync & Architecture",
            problem:
              "Mismatch between plans edited in dashboard and local plan files in worktree.\nProcess state lost on terminal session crash.",
            actions: [
              "Bidirectional sync: plan/active/{branch}/ ↔ {worktree}/.claude/plan/.\nchokidar watch + 1s debounce, sync lock (500ms) to prevent infinite loops.",
              "Designed terminal sessions as source of truth for server state.\nlsof-based orphan process recovery.\nTask Lock (Promise-based queue) to prevent concurrent operations.",
              "Wrapped Next.js App Router with Custom HTTP Server to handle WebSocket upgrades.\nApp Router doesn't support WS upgrade, hence Custom Server wrapping.",
            ],
            result:
              "Extensible architecture ready to connect with external SSoT like Jira. Published as open source and actively maintained.",
          },
        ],
      },
      {
        id: "agent-hive",
        category: "side",
        title: "agent-hive",
        period: "2026.03 - Present (v0.2.0)",
        org: "Open Source · Maintainer · github.com/Ryokuman/claude-colony",
        tagline:
          "Automated full cycle: issue → code → review → merge — 5 platform adapters implemented",
        highlights: [
          "Worker (code generation) + Reviewer (auto review) pattern to automate development cycle",
          "5 platform adapters implemented: GitHub/Jira/Notion/Obsidian/Local JSON",
          "Humans handle only direction-setting and final merge in harnessing structure",
        ],
        jdMatch: [
          "Repetitive manual task automation",
          "Efficiency and automation improvement",
        ],
        sections: [
          {
            title: "Worker-Reviewer Automation & 5 Platform Adapters",
            problem:
              "AI writes code well, but humans managing the full issue → code → review → apply cycle is the bottleneck.\nTeams use different issue tracking tools (GitHub, Jira, Notion) — need unified integration.",
            actions: [
              "Worker (code generation → PR) + Reviewer (auto review → comment) pattern.\n~3 rounds of ping-pong, then human final approval. Humans only set direction and merge.",
              "Adapter pattern unifying GitHub/Jira/Notion/Obsidian/Local JSON\n5 platform issues through a single interface.",
              "Per-platform state machine (todo → in-progress → reviewing → done)\n+ Obsidian vault integration for long-term memory system.",
            ],
            result:
              "5 platform adapters implemented, Worker-Reviewer loop verified.\nAttach to existing Git repos to automatically perform issue → PR → review.",
          },
        ],
      },
    ],
  },

  // ════════════════════════════════════════
  // Türkçe
  // ════════════════════════════════════════
  tr: {
    cover: {
      name: "Yongmin Kim",
      position: "Frontend Geliştirici Başvurusu",
      tagline: "100+ sayfalık ERP'yi deklaratif çerçeve ile standartlaştıran\nve takım verimliliğini artırmak için DX altyapısı kuran geliştirici",
      contact: {
        email: "ryokuman21@gmail.com",
        github: "github.com/Ryokuman",
      },
      intro:
        "Geliştirme ortamı standardizasyonundan (lint·format·kural otomasyonu) operasyonel araç platformlaştırmasına kadar,\ngeliştiricilerin yalnızca iş mantığına odaklanabildiği ortamlar tasarlarım.\nGit Flow·Jira·Storybook ile takım süreçlerini sistemleştiriyor,\nconfig tabanlı deklaratif çerçeve ile 100+ sayfalık ERP'yi standartlaştırdım.\n\nReact · Next.js · TypeScript · Node.js · Storybook",
    },
    projects: [
      {
        id: "dynamos",
        category: "work",
        title: "DynaMOS v2",
        period: "2025.12 - Devam",
        org: "Runup · ERP/MES Dahili Operasyon Aracı · Frontend Lead",
        tagline:
          "100+ sayfalık ERP operasyon aracını deklaratif çerçeveye taşıdı → Günlük ortalama 4 PR işleyen sistem kurdu",
        highlights: [
          "Config + bileşen birleştirmesiyle sayfalar deklaratif olarak tamamlanıyor → Kod hacminde %72 azalma",
          "0 PR → Git Flow·Jira·Storybook sistemi kuruldu, 35 günde 139 PR yerleştirildi",
          "ESLint·Prettier·lint-staged otomasyonu + Storybook öncelikli geliştirme altyapısı",
        ],
        jdMatch: [
          "Dahili operasyon araçlarının platformlaştırılması",
          "Admin UX/UI optimizasyonu",
          "Tekrarlayan manuel görevlerin otomasyonu",
        ],
        sections: [
          {
            title: "Deklaratif Çerçeve Tasarımı — Config ile Seri Sayfa Üretim Yapısı",
            period: "2026.01 ~ 2026.02",
            problem:
              "100'den fazla iş ekranını hızla üretmek gerekiyordu.\nMevcut legacy, sayfa başına 7+ useState, 16-20 hook içeriyordu — bir şeyi değiştirince neyin bozulduğu bilinemiyordu.\nYeni kişi geldiğinde kodu anlayamıyor, onboarding yapılamıyordu.",
            actions: [
              "UI'yı temel bileşenlere (Tab, Filter, Grid, Buttons) ayrıştırdım.\nBileşen sayısını sınırlayarak AI ve insanlar için seçenek alanını daralttım.",
              "Config dosyası (sütun tanımları) + bileşen birleştirmesiyle sayfalar tamamlandı.\nProps drilling kaldırıldı, Store üzerinden durum paylaşımı yapıldı.",
              "Kural ve şablonlar CLAUDE.md'ye derlendi.\nBaşlangıçta insan onboarding'i için tasarlandı;\nancak örüntüler öngörülebilir olduğundan Claude Code ile toplu MVP sayfası üretimi mümkün hale geldi.",
            ],
            result:
              "Günlük ortalama 4 PR işleyebilen geliştirme sistemi kuruldu (öncesi: 0,16/gün)\nSayfa başına kod hacmi %72 azaldı (441 satır → 122 satır)\nGeliştiricilerin yalnızca iş mantığına odaklanabildiği ortam — onboarding süresi büyük ölçüde kısaldı",
          },
          {
            title: "Çoklu Grid Gereksinimlerinin Birleştirilmesi — Pipe-Phase Deseni",
            problem:
              "Her sayfanın grid gereksinimleri birbirinden farklıydı.\nSalt okunur / satır içi düzenleme / select / checkbox kombinasyonları çeşit çeşitti.\nTek bir sütun tanım fonksiyonunda if-else birikmesi, her değişiklikte yan etkilere neden oluyordu.",
            actions: [
              "React setState(prev → next)'ten ilham alındı.\nColDef bir durum olarak değerlendirildi, her aşamanın önceki sonucu alıp dönüştürdüğü Pipe-Phase deseni tasarlandı.\nStrateji desenine kıyasla yalnızca Phase'ler arası sıra bağımlılığına izin verildi.",
              "3 katmanlı yapı: Pipe (dönüşüm birimi) → Phase (ilgi alanı grubu) → Handler (sıralı çalıştırma).\nAynı Phase içindeki pipe'lar bağımsız; yalnızca Phase'ler arası sıra bağımlılığı var.",
              "Grid tipi ön ayarları:\nBaseGrid(1 Phase) / NormalGrid(3) / InlineGrid(5).\nSayfalar ön ayarı seçip yalnızca gerekli pipe'ları değiştiriyor/genişletiyor.",
            ],
            result:
              "Örn. editable pipe ColDef.editable = true ayarlıyor\n→ style pipe bu değeri okuyarak düzenlenemez=gri, zorunlu+boş=sarı otomatik uyguluyor.\nPipe eklemek/çıkarmak diğer pipe'ları etkilemiyor → yan etkisiz genişletilebilir yapı.",
          },
          {
            title: "DX Altyapısı — Git Flow · Jira · Storybook · Lint Otomasyonu",
            problem:
              "Katılım anında 0 PR — .env commit edilmiş, doğrudan main'e push yapılıyordu.\nKimin neyi değiştirdiği takip edilemiyordu, aynı dosyalar tekrar tekrar çakışıyordu.\nPM yokluğunda öncelik belirsizdi; frontend backend API'sini bekleyip duruyordu.",
            actions: [
              "Git Flow (main/qa/dev) + PR tabanlı kod incelemesini bizzat tasarlayıp hayata geçirdim.\nSorunu paylaşarak takımı ikna ettim.\n35 günde 139 PR ile süreç yerleşti.",
              "Jira projesini (pano · iş akışı · sorun türleri) sıfırdan yapılandırdım.\nFrontend PM olarak CEO/kıdemli ile öncelik toplantısı yapıp görevleri dağıttım.",
              "ESLint + Prettier + lint-staged kural otomasyonu.",
              "Storybook + Mock Backend ile API öncesi geliştirme altyapısı kuruldu.\nFrontend API spesifikasyonlarını önce tanımlıyor, backend beklenmeden geliştirme yapılıyor.",
            ],
            result:
              "Toplam commit'lerin %66'sı, satır değişimlerinin %63'ü katkım.\nStorybook öncelikli geliştirme ile backend bekleme darboğazı ortadan kalktı — frontend bağımsız geliştirme yapabilir.\nQA döneminde Worktree Sistemi devreye alındı → 4 günde 62 PR işlendi (15,5 PR/gün)",
          },
        ],
      },
      {
        id: "cgv",
        category: "work",
        title: "CGV-ASSISTANT",
        period: "2024.06 - 2025.07",
        org: "POUL × CGV · Duygu Analizi Panosu · Full Stack (viral scraping dışındaki tüm iş mantığı)",
        tagline:
          "Frontend render 10 kat hızlandırma + viral analiz panosu tasarımı → Toss Payments en iyi örnek seçildi",
        highlights: [
          "API paralel işleme + veri görselleştirme ile frontend render 10 kat hızlandı",
          "Viral analiz panosunun tamamı tasarlandı ve geliştirildi — CGV iş ekibi doğrudan kullanıyor",
          "Toss Payments en iyi örnek seçildi",
        ],
        jdMatch: [
          "Operasyon panosu/rapor geliştirme",
          "İş gereksinimleri → Ekran tasarımı",
        ],
        sections: [
          {
            title: "Frontend Performans Optimizasyonu & Veri Görselleştirme",
            period: "2024.07 ~ 2025.02",
            problem:
              "CGV gerçek izleme yorumu anlık toplama + AI duygu/zararlılık analiz sistemi.\nTarihe göre veri grafikleri eklendiğinde render 3sn+ sürüyordu.\nBüyük ölçekli veriyi verimli görselleştirecek frontend yapısı yoktu.",
            actions: [
              "API çağrılarının paralel işlenmesini tasarladım: render 3000ms → 300ms.",
              "Veri görselleştirme grafikleri bizzat geliştirdim.\nAI anahtar kelime analizi, tek satır yorum otomatik üretimi, tehlikeli yorum filtreleme panosu.",
              "Günlük 5.000 AI analizi sonucunu anlık yansıtan pano UI tasarımı.",
            ],
            result:
              "Frontend render 10 kat hızlandı.\nGünlük 5.000 AI analizi + 2.000 scraping kayıt boru hattı kararlı şekilde çalışıyor.",
          },
          {
            title: "Viral Analiz Panosu Tasarımı",
            period: "2025.03 ~ 2025.07",
            problem:
              "X, YouTube, Naver Blog gibi viral veri görselleştirme UI'ı yoktu.\nViral scraping dışındaki tüm iş mantığından sorumluydum.\nÜst kademeden yalnızca soyut özellik listeleri geliyordu.",
            actions: [
              "v0 ile CGV'nin ton ve tarzına uygun tasarım prototipi oluşturuldu.\nCGV onayının ardından hemen geliştirmeye başlandı, bekleme süresi minimize edildi.",
              "Yumurta endeksi (CGV'nin özel metriği), sosyal istatistik grafikleri, duygu analizi görselleştirme vb.\nPanonun tüm UI/UX'i tasarlandı ve geliştirildi.",
              "Duygu değerlendirme sistemi ve embedding işlemi kuruldu.\nDavranış odaklı QA ile hız sağlandı, stabilizasyon aşamasında kod temizlendi.",
            ],
            result:
              "Yeni viral analiz panosu kuruldu — CGV iş ekibi doğrudan kullanıyor. Toss Payments en iyi örnek seçildi.",
          },
        ],
      },
      {
        id: "worktree",
        category: "side",
        title: "Claude Worktree System",
        period: "2026.02 - Devam",
        org: "Açık Kaynak · Geliştirici · github.com/Ryokuman/claude-worktree-system",
        tagline:
          "Çok dallı paralel çalışma otomasyonu → DynaMOS QA'ya uygulandı, 4 günde 62 PR işlendi",
        highlights: [
          "Dal başına bağımsız worktree + plan dosyaları ile paralel çalışma — bağlam geçişi yükü sıfır",
          "Web terminalinden Claude Code doğrudan çalıştırma, çoklu oturumu eş zamanlı izleme",
          "Gerçek ortam kullanımı: 4 günlük QA döneminde 62 PR işlendi (15,5 PR/gün)",
        ],
        jdMatch: [
          "Tekrarlayan manuel görevlerin otomasyonu",
          "Verimlilik ve otomasyon geliştirme",
        ],
        sections: [
          {
            title: "Plan Tabanlı Bağlam Geçişi & Pano",
            problem:
              "Hem AI hem insanlar aynı anda taşıyabilecekleri bağlam miktarı konusunda kısıtlıdır.\nQA döneminde çok dallı paralel çalışma gerekiyordu.\nDal değiştirme bağımlılıkların yeniden kurulmasını gerektiriyordu → sunucu yeniden başlatma tekrarlanıyordu.\nİlerlemeyi takip edecek birleşik görünüm yoktu.",
            actions: [
              "Temel gözlem: planlar iyi bölünürse bağlam geçişinde yalnızca 'bu görev ne' bilinmesi yeterli.\nİnsanlar yalnızca sezgiyi sağlar; gerisi metne (planlara) bırakılır.",
              "MD tabanlı plan dosyaları ile görevler parçalara ayrıldı.\nDal başına bağımsız worktree + plan ile paralel çalışma mümkün hale geldi.",
              "Git refs değişiklikleri chokidar ile anlık izlendi.\nWeb UI'dan worktree oluşturma/silme/tamamlama, otomatik port atama.",
              "İlerleme çubuğu + durum geçiş yapılandırılmış görünüm, doğrudan düzenlenebilir Ham görünüm.",
            ],
            result:
              "DynaMOS QA'ya uygulandı — paralel işleme ile 4 günde 62 PR işlendi (15,5 PR/gün).\nGeliştiricilerin dal değiştirmeden birden fazla görevi eş zamanlı yürütebildiği ortam.",
          },
          {
            title: "Web Terminali & Claude Code AI Entegrasyonu",
            problem:
              "Her worktree'de Claude Code çalıştırmak için terminal açıp gezmek gerekiyordu.\nBirden fazla worktree'nin AI çalışmalarını eş zamanlı izlemek mümkün değildi.",
            actions: [
              "xterm.js + node-pty + WebSocket tabanlı tarayıcı terminali.\nWorktree başına çok oturum, 100KB kaydırma geçmişi.\nÇok görüntüleyici ile birden fazla sekmede aynı oturumun anlık paylaşımı.",
              "Claude Code web terminalinden doğrudan çalıştırıldı.\nCLAUDE.md bağlamı enjeksiyonu ile proje kurallarına uygun plan otomatik oluşturuldu.",
              "Git SSH otomatik kurulumu + terminal başlangıç komutu enjeksiyonu.\nAnında geliştirmeye hazır ortam.",
            ],
            result:
              "QA geri bildirimi → ilgili worktree'de anında düzeltme, diğer dallar kesintisiz paralel çalışmaya devam etti.\nDal geçiş yükü ortadan kalktı — geliştiriciler görev bağlamını kaybetmiyor.",
          },
          {
            title: "Çift Yönlü Plan Senkronizasyonu & Mimari",
            problem:
              "Panoda düzenlenen planlar ile worktree içindeki yerel plan dosyaları arasında uyuşmazlık.\nTerminal oturumu çökmesinde süreç durumu kayboluyor.",
            actions: [
              "plan/active/{branch}/ ↔ {worktree}/.claude/plan/ çift yönlü senkronizasyon.\nchokidar izleme + 1 saniyelik debounce, sonsuz döngüyü önlemek için sync lock (500ms).",
              "Terminal oturumları sunucu durumunun gerçek kaynağı olarak tasarlandı.\nlsof tabanlı yetim süreç kurtarma.\nEş zamanlı işlemleri önlemek için Görev Kilidi (Promise tabanlı kuyruk).",
              "Next.js App Router özel HTTP sunucusuyla sarıldı ve WebSocket yükseltmesi işlendi.\nApp Router WS yükseltmesini desteklemediğinden Özel Sunucu sarmalama kararı verildi.",
            ],
            result:
              "Jira gibi harici SSoT ile bağlanabilecek genişletilebilir mimari elde edildi. Açık kaynak olarak yayınlandı ve aktif olarak sürdürülüyor.",
          },
        ],
      },
      {
        id: "agent-hive",
        category: "side",
        title: "agent-hive",
        period: "2026.03 - Devam (v0.2.0)",
        org: "Açık Kaynak · Geliştirici · github.com/Ryokuman/claude-colony",
        tagline:
          "Issue → kod → inceleme → birleştirme tam döngüsü otomasyonu — 5 platform adaptörü tamamlandı",
        highlights: [
          "Worker (kod üretimi) + Reviewer (otomatik inceleme) deseni ile geliştirme döngüsü otomasyonu",
          "GitHub/Jira/Notion/Obsidian/Local JSON 5 platform adaptörü tamamlandı",
          "İnsanlar yalnızca yön belirleme ve son birleştirme ile sorumlu",
        ],
        jdMatch: [
          "Tekrarlayan manuel görevlerin otomasyonu",
          "Verimlilik ve otomasyon geliştirme",
        ],
        sections: [
          {
            title: "Worker-Reviewer Otomasyonu & 5 Platform Adaptörü",
            problem:
              "AI kod yazmada iyi ama issue → kod → inceleme → uygulama döngüsünü insanın yönetmesi darboğaz.\nTakımlar GitHub, Jira, Notion gibi farklı issue takip araçları kullanıyor; bunların entegre edilmesi gerekiyor.",
            actions: [
              "Worker (kod üretimi → PR) + Reviewer (otomatik inceleme → yorum) deseni.\n~3 tur gidiş-dönüş, ardından insan son onayı. İnsanlar yalnızca yön belirliyor ve birleştiriyor.",
              "GitHub/Jira/Notion/Obsidian/Local JSON\n5 platform issue'sunu tek arayüzde birleştiren adaptör deseni.",
              "Platform bazlı durum makinesi (todo → devam ediyor → incelemede → tamamlandı)\n+ Obsidian vault entegrasyonu ile uzun vadeli bellek sistemi.",
            ],
            result:
              "5 platform adaptörü tamamlandı, Worker-Reviewer döngüsü çalışır durumda doğrulandı.\nMevcut Git depolarına eklenip issue → PR → inceleme otomatik yürütülüyor.",
          },
        ],
      },
    ],
  },
};

export function getPortfolioData(locale: Locale): PortfolioData {
  return portfolioLocales[locale] ?? portfolioLocales.ko;
}

export const portfolioData = portfolioLocales.ko;
