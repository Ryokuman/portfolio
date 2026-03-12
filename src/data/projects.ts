import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "llami",
    title: "LLAMI",
    role: "Full Stack Engineer",
    description:
      "POUL의 핵심 프로젝트로, AI 기술을 활용해 사용자들의 다양한 문제 해결을 지원하는 통합 플랫폼입니다. 모델스토어의 다양한 LLM과 봇 스토어의 캐릭터 챗 등 맞춤형 AI 서비스를 제공합니다.",
    featured: true,
    achievements: [
      "Toss Payments 우수사례 선정",
      "Bridge/ReverseBridge 시스템 설계로 React 문법만으로 네이티브 앱 개발",
      "17개 LLM API 통합 추상화 (llm-worker)",
      "pipe 모델로 스펙 변경 시 신속 대응 구현",
    ],
    techStack: ["Next.js", "TypeScript", "ElysiaJS", "Expo", "LegendApp-state"],
    primaryTech: "AI Platform",
    thumbnail: "/images/details/llami-chat-landing.png",
    gradient: "from-violet-600 via-blue-600 to-cyan-500",
    period: "2024.12 ~ 2025.08",
    details: [
      {
        title: "모델 스토어",
        period: "2025.02 ~ 2025.05",
        content: [
          "17개 모델마다 API 스펙(요청 형식, 스트리밍 방식, 응답 구조)이 전부 달라 모델별 개별 핸들러가 난립하는 문제 → pipe 패턴을 도입하여 모델별로 필요한 처리 단계만 조합, 신규 모델 추가 시 pipe만 추가하면 되는 구조로 개선 (기여도 80%)",
          "fetch ReadableStream 기반 스트리밍으로 모델 응답을 실시간 렌더링, 모델별로 다른 스트림 포맷을 pipe 단계에서 정규화하여 프론트는 단일 인터페이스로 처리",
          "function-call을 지원하는 모델들(OpenAI, Claude 등)의 서로 다른 호출 스펙을 통합 추상화하여, 프론트에서는 모델에 관계없이 동일한 컴포넌트로 function-call 결과를 렌더링",
          "모델별 크레딧 소모량 차등 적용 — Toss Payments 턴키 방식으로 결제 연동, 크레딧 충전 및 워크스페이스 공유 기능 구현",
        ],
        techStack: ["ElysiaJS", "TypeScript", "Next.js", "Valtio", "Supabase"],
        images: [
          "/images/details/model-store-promo.png",
          "/images/details/model-store-ui.png",
        ],
        links: [
          { label: "IT비즈뉴스 기사", url: "https://www.it-b.co.kr/news/articleView.html?idxno=82396" },
        ],
      },
      {
        title: "라미 앱",
        period: "2025.05 ~ 2025.06",
        content: [
          "사내에 RN 개발 경험이 있는 개발자가 부족한 상황 → 웹뷰 + postMessage 기반 Bridge 시스템을 설계하여, 웹 개발자도 네이티브 기능을 활용할 수 있는 구조 구현 (기여도 15%)",
          "Bridge: 웹뷰에서 native 함수 호출 요청 → native가 실행 후 state 변경 → context를 통해 구독 노드 자동 리렌더",
          "ReverseBridge: native가 webViewAction/webViewState를 역으로 웹뷰에 주입 → Proxy 기반 요청/응답 패턴으로 렌더링 최적화",
          "이미지 다운로드, 다국어(i18n), 모델 로드/다운로드 Alert, 채팅 사이드바 등 프론트엔드 핵심 기능 개발",
        ],
        techStack: ["Expo", "LegendApp-state", "TypeScript", "ONNX Runtime", "MMKV"],
        images: [
          "/images/details/llami-app-banner.png",
          "/images/details/llami-app-onboarding.png",
          "/images/details/llami-app-chat-main.png",
          "/images/details/llami-app-model-select.png",
          "/images/details/llami-app-conversation.png",
        ],
        links: [
          { label: "LLAMI 공식 보도자료", url: "https://business.llami.net/media-center/notice/notice-2" },
        ],
      },
      {
        title: "봇스토어",
        period: "2024.12 ~ 2025.01",
        content: [
          "다양한 카테고리(여성향/남성향/키즈/생산성)의 AI 챗봇을 탐색하고 실시간 대화할 수 있는 마켓플레이스 플랫폼 개발 (기여도 55.6%)",
          "태그 기반 필터링/정렬 시스템 구현 — BotCard, BotGrid, 검색/필터/태그 컴포넌트를 설계하여 카테고리별 봇 탐색 UX 구축",
          "일반 텍스트 모드와 캐릭터 이미지가 함께 나오는 비주얼 모드 채팅을 구현, 모드 간 전환 기능 개발",
          "유저가 직접 봇을 만들 수 있는 프롬프트 생성기 + 관리자 승인 시스템 제작",
          "게스트 20회 무료 체험 → 로그인 시 무제한 대화 전환 로직, OpenAI Assistant API 기반 스트리밍 채팅 및 히스토리 관리",
        ],
        techStack: ["Next.js", "TypeScript", "Valtio", "Radix UI"],
        images: [
          "/images/details/bot-store-promo-1.png",
          "/images/details/bot-store-promo-2.png",
          "/images/details/bot-store-promo-3.png",
          "/images/details/bot-store-categories-full.png",
          "/images/details/bot-store-visual-chat.png",
        ],
      },
      {
        title: "라미챗",
        period: "2024.06 ~ 2024.11",
        content: [
          "노코드 방식의 AI 챗봇 빌더 — 사용자가 5분 만에 맞춤형 챗봇을 생성하고 카카오톡, 인스타그램, 웹사이트 등에 연동할 수 있는 서비스 (기여도 18%)",
          "조직(워크스페이스) 단위 관리 시스템 설계 — 팀 초대, 권한 분리, 결제 연동을 포함한 조직 관리 전반 구현",
          "API 레포지토리/서비스 패턴으로 구조화 — 위젯 타입 정의, 태그/카테고리 시스템 설계",
          "API v1에서 일관성 없는 응답 구조와 확장성 한계 → v2 마이그레이션을 통해 표준화된 API 구조로 개선",
        ],
        techStack: ["Next.js", "TypeScript", "TailwindCSS", "Supabase"],
        images: [
          "/images/details/llami-chat-landing.png",
          "/images/details/llami-chat-builder-detail.png",
          "/images/details/llami-chat-dashboard.webp",
        ],
      },
    ],
  },
  {
    id: "cgv-assistant",
    title: "CGV-ASSISTANT",
    role: "Full Stack Engineer",
    description:
      "POUL과 CGV의 합동 프로젝트로, CGV가 지닌 유저 데이터(리뷰 등)과 SNS에 퍼져있는 여러 바이럴 데이터들을, AI를 활용 스크래핑 및 분석하여 유저의 특정 영화에 대한 전체적인 감정에 대해 한눈에 볼 수 있게 하는 분석 서비스입니다.",
    featured: true,
    achievements: [
      "메모리 사용량 약 300MB로 안정화 (싱글톤 패턴)",
      "렌더링 속도 10배 향상: 3000ms → 300ms",
      "API 복잡도 개선: O(n²) → O(n)",
      "병렬 처리로 렌더링 2배 향상: 52~6300ms → 2~3000ms",
      "일별 약 5000건 AI 데이터 분석",
      "일별 평균 2000건 데이터 스크래핑",
    ],
    techStack: ["Next.js", "TypeScript", "ElysiaJS", "Supabase"],
    primaryTech: "Data Analytics",
    thumbnail: "/images/projects/cgv-assistant.jpg",
    gradient: "from-red-600 via-rose-600 to-orange-500",
    period: "2024.06 ~ 2025.07",
    details: [
      {
        title: "메인 서비스",
        period: "2024.07 ~ 2025.02",
        content: [
          "CGV 영화관의 실관람평을 실시간으로 수집하고 AI로 감정/유해성을 자동 분석하는 모니터링 시스템 (기여도 30%)",
          "매일 아침 모니터링 중 백엔드 메모리가 8GB까지 치솟는 현상 발견 → 메모리 로거를 추가하여 tiktoken 인코더가 매 호출마다 새로 생성되는 것이 원인임을 파악 → 싱글톤 패턴으로 수정하여 약 300MB로 안정화",
          "CGV 측 요구사항: 날짜별 데이터 그래프 추가 → 기존 방식은 모든 리뷰를 가져와 분류/정렬하는 O(n²) 구조 → 캐싱 테이블을 도입하여 API 1회 호출, O(n)으로 개선 (렌더링 3000ms → 300ms)",
          "데이터 시각화 그래프 직접 구현 — AI 키워드 분석, 한줄평 자동 생성, 위험 리뷰 필터링 등 핵심 비즈니스 로직 설계 및 개발",
          "API 콜 병렬 처리 로직을 구현하여 렌더링 52~6300ms → 2~3000ms로 개선",
        ],
        images: [
          "/images/details/cgv-login.png",
          "/images/details/cgv-review-dashboard.png",
          "/images/details/cgv-analysis-dashboard.png",
          "/images/details/cgv-analysis-full.png",
          "/images/details/cgv-api-docs.png",
        ],
      },
      {
        title: "바이럴 서비스",
        period: "2025.03 ~ 2025.07",
        content: [
          "영화별 바이럴 데이터를 X, YouTube, 네이버 블로그 등 다양한 플랫폼에서 수집하여 감정/키워드 분석하는 서비스",
          "바이럴 분석 UI/UX 전체를 설계하고 구현 — 에그지수(자체 지표), 소셜 통계 차트, 감정 분석 시각화",
          "감정평가 시스템 구축 및 임베딩 처리 — 바이럴 스크래핑을 제외한 모든 비즈니스 로직 담당",
        ],
        images: [
          "/images/details/cgv-viral-list.png",
          "/images/details/cgv-viral-sentiment.png",
          "/images/details/cgv-viral-trend-detail.png",
          "/images/details/cgv-viral-analysis.png",
          "/images/details/cgv-viral-service.png",
          "/images/details/cgv-viral-trend.png",
        ],
      },
    ],
  },
  {
    id: "dynamos-v2",
    title: "DynaMOS v2",
    role: "Frontend Lead & Full Stack Developer",
    description:
      "제조업 ERP/MES 시스템의 프론트엔드 프레임워크를 설계하고 구축한 프로젝트입니다. 바이브코딩으로 만들어진 레거시 코드를 분석하여 프레임워크화하고, 선언적 컴포넌트 구조와 Valtio 기반 상태관리를 도입했습니다. 탭 시스템, 개인화(컬럼 커스터마이징), 즐겨찾기, LLM 채팅 인터페이스(스트리밍/히스토리/RAG 설정), 인라인 그리드 에디팅 등 전반적인 기능을 구현했습니다.",
    featured: true,
    achievements: [
      "합류 전 PR 0개 → 170개 PR 기반 개발 프로세스 도입",
      "PR 속도 25배 향상: 0.16/일 → 3.97/일",
      "페이지당 코드량 72% 감소: 441줄 → 122줄",
      "리렌더링 트리거 85% 감소: 12.3개 → 1.9개/페이지",
      "Worktree System 활용 QA 4일간 62개 PR 처리 (15.5 PR/일)",
      "PR 기반 개발 프로세스 도입 — .env 직접 커밋, main 직접 push 등 기존 관행 개선",
    ],
    techStack: [
      "Next.js",
      "TypeScript",
      "Valtio",
      "AG Grid",
      "Tailwind CSS",
      "Storybook",
      "Docker",
      "Jenkins",
    ],
    primaryTech: "Enterprise Framework",
    thumbnail: "/images/details/dynamos-dashboard.png",
    gradient: "from-sky-600 via-blue-600 to-indigo-600",
    period: "2025.12 ~ 현재",
    details: [
      {
        title: "프레임워크 설계 및 구축",
        period: "2026.01 ~ 2026.02",
        content: [
          "바이브코딩으로 생성된 레거시 코드를 분석 — 페이지당 useState 7개+, 훅 16~20개가 얽힌 블랙박스 구조로 유지보수 불가능 상태",
          "요구사항을 재정의하고 UI 컴포넌트(Tab, Filter, Grid, Buttons)를 코어 컴포넌트로 설계 — Props drilling 제거, Store를 통한 상태 공유",
          "선언적 구조 확립: config 파일(컬럼 정의) + 컴포넌트 조립만으로 페이지 완성 → 코어 컴포넌트 + 페이지 컨벤션을 기반으로 AI가 페이지를 자동 생성할 수 있는 수준의 예측 가능한 패턴 확립, 실제로 AI를 활용해 페이지를 일괄 생성한 사례 존재",
          "PR 속도 25배 향상 (198일간 31개 → 35일간 139개), 페이지당 평균 코드량 72% 감소 (441줄 → 122줄)",
        ],
        techStack: ["Next.js", "TypeScript", "Valtio", "AG Grid"],
        images: [
          "/images/details/dynamos-dashboard.png",
        ],
      },
      {
        title: "Valtio 기반 상태관리 & 렌더링 최적화",
        content: [
          "Valtio 프록시 패턴 도입 — dispatch 없이 store.value = x 직접 수정 가능, 17개 store(grid, tab, modal, filter 등)로 관심사 분리",
          "useSnapshot으로 구독한 값만 리렌더링하는 구조 설계 — 페이지 레벨 useState 0개 달성 (이전 평균 7개)",
          "ref()로 GridApi 등 non-reactive 객체 프록시 추적 방지, structuredClone으로 store 원본 오염 방지",
          "리렌더링 트리거 포인트 85% 감소 (12.3개 → 1.9개/페이지) — 120개+ 업무 페이지를 동시 탭으로 운영 가능한 성능 확보",
        ],
        techStack: ["Valtio", "TypeScript"],
      },
      {
        title: "Storybook 기반 프론트 주도 개발 환경",
        content: [
          "문제: 프론트 개발이 백엔드 API 완성까지 대기 — 프로젝트 일정 병목",
          "Storybook + Mock Backend 환경을 구축하여 백엔드 없이도 프론트 독립 개발 가능한 구조 확립",
          "프론트가 API 스펙(요청/응답 형태)을 먼저 정의하고 백엔드에 전달 — 프론트 리드로서 API 설계 의사결정 주도, 백엔드도 스펙만 맞추면 되어 양쪽 개발 효율화",
          "프론트 개발 속도가 더 빠른 상황에서 펜딩 없이 전체 기능을 선행 개발하고 mockdata만 백엔드에 전달하는 구조 → 전체 개발 속도 약 1.3배 향상 (PR 기준)",
          "Storybook을 통해 코어 컴포넌트 사용법을 문서화하고 팀원 온보딩 시 코드를 직접 실행하며 학습 가능한 환경 제공",
        ],
        techStack: ["Storybook", "Next.js", "Vite"],
      },
      {
        title: "개발 프로세스 체계화 & 프론트 리딩",
        content: [
          "합류 당시 상황: Git 브랜치 전략 부재, .env 직접 커밋, main 직접 push, PR/코드리뷰 문화 없음 → Git Flow(main/qa/dev) 브랜치 전략과 PR 기반 개발 프로세스를 도입하고 팀 전체에 정착",
          "Jira 프로젝트 초기 설정(보드, 워크플로우, 이슈 타입)부터 직접 구성 — 프론트 PM으로서 대표/수석과 우선순위 회의 후 업무 배분 및 일정 관리 주도",
          "17개 Valtio store, Provider 전체를 직접 설계·생성하여 프론트 상태관리 아키텍처 확립 — stores 커버리지 77.5%, providers 100%",
          "합류 후 전체 커밋의 66%, 라인 변경량의 63%를 기여 — 코어 아키텍처 설계부터 페이지 구현(54%)까지 프론트엔드 전반을 주도",
          "QA 기간 Worktree System을 활용하여 4일간 62개 PR 처리 (15.5 PR/일) — 멀티 브랜치 병렬 작업으로 QA 피드백 즉시 반영",
        ],
      },
    ],
  },
  {
    id: "worktree-system",
    title: "Claude Worktree System",
    role: "Creator & Solo Developer",
    description:
      "Git worktree 기반 멀티 브랜치 개발 환경을 웹 대시보드로 관리하는 오픈소스 DX(Developer Experience) 도구입니다. 브랜치별 독립 worktree 생성, dev 서버 원클릭 제어, 웹 터미널, AI 플랜 생성을 하나의 대시보드에서 처리합니다.",
    featured: true,
    achievements: [
      "브랜치 감지 → worktree 생성 → dev 서버 → 개발 → 완료까지 원스톱 관리",
      "xterm.js 멀티세션 웹 터미널 + Claude Code 연동",
      "양방향 플랜 동기화 (대시보드 ↔ worktree)",
      "PTY 세션 기반 서버 상태 관리로 stale 상태 문제 해결",
    ],
    techStack: [
      "Next.js",
      "TypeScript",
      "xterm.js",
      "node-pty",
      "WebSocket",
      "chokidar",
      "Tailwind CSS",
    ],
    primaryTech: "DX Tool",
    gradient: "from-orange-500 via-amber-500 to-yellow-500",
    githubUrl: "https://github.com/Ryokuman/claude-worktree-system",
    period: "2026.02 ~ 현재",
    details: [
      {
        title: "워크트리 대시보드",
        content: [
          "Git refs 변경을 chokidar로 실시간 감지하여 브랜치를 자동 분류 (active/deactive)",
          "웹 UI에서 워크트리 생성/삭제/완료 — 포트 자동 할당, .env 자동 생성",
          "Dev 서버 원클릭 시작/정지 + 헬스체크 모니터링 (10초 간격 polling)",
          "완료된 작업은 plan 아카이브와 함께 ended 목록으로 자동 이동",
        ],
        techStack: ["Next.js", "chokidar", "TypeScript"],
      },
      {
        title: "웹 터미널 & AI 연동",
        content: [
          "xterm.js + node-pty + WebSocket 기반 브라우저 터미널 — 워크트리별 멀티세션 지원",
          "100KB 스크롤백 버퍼 + 멀티뷰어 지원 — 여러 탭에서 같은 세션 실시간 공유",
          "Claude Code를 웹 터미널에서 실행하여 AI 기반 개발 플랜 자동 작성",
          "Git SSH 자동 설정 + 터미널 init 커맨드 주입으로 즉시 개발 가능",
        ],
        techStack: ["xterm.js", "node-pty", "WebSocket"],
      },
      {
        title: "플랜 시스템 & 양방향 동기화",
        content: [
          "JSON 인덱스(plan.json) + Markdown 스텝 파일 구조로 개발 플랜 관리",
          "구조화 뷰(진행바 + 상태 토글) / Raw 뷰(파일 직접 편집) 두 가지 모드 제공",
          "양방향 동기화: plan/active/{branch}/ ↔ {worktree}/.claude/plan/ — chokidar 감시 + 1초 디바운싱",
          "무한 루프 방지를 위한 sync lock(500ms 쿨다운) 설계",
        ],
        techStack: ["chokidar", "TypeScript"],
      },
      {
        title: "아키텍처 설계",
        content: [
          "Next.js App Router를 Custom HTTP 서버로 감싸고 WebSocket upgrade 핸들링",
          "PTY 세션을 서버 상태의 source of truth로 사용 — JSON 상태 불일치 문제 해결",
          "lsof 기반 orphan 프로세스 복구 — 크래시/재시작 시에도 기존 프로세스 재활용",
          "Task Lock 시스템으로 동일 워크트리 동시 조작 방지 (Promise 기반 큐)",
        ],
        techStack: ["Next.js", "WebSocket", "node-pty"],
      },
    ],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const regularProjects = projects.filter((p) => !p.featured);
