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
      "Bridge/ReverseBridge 시스템 설계로 RN 없이 앱 개발",
      "17개 LLM API 통합 추상화 (llm-worker)",
      "pipe 모델로 스펙 변경 시 신속 대응 구현",
    ],
    techStack: ["Next.js", "TypeScript", "ElysiaJS", "Expo", "LegendApp-state"],
    primaryTech: "AI Platform",
    thumbnail: "/images/projects/llami.jpg",
    gradient: "from-violet-600 via-blue-600 to-cyan-500",
    period: "2024.12 ~ 2025.08",
    details: [
      {
        title: "모델 스토어",
        period: "2025.03 ~ 2025.05",
        content: [
          "다양한 LLM 모델들의 서로 다른 API 스펙을 하나의 통일된 인터페이스로 추상화하는 SaaS 프로젝트, llm-worker 개발",
          "ElysiaJS + TypeScript 기반의 서버 아키텍처 구축",
          "각 스펙 별 API의 복잡한 요구사항을 보다 유연하게 처리하기 위해 확장 가능한 pipe 모델을 설계 및 적용",
          "해당 SaaS 프로젝트는 이후 전반적인 llami 생태계의 LLM을 활용하는 핵심 서비스들에서 범용적으로 사용",
          "function-call 추가 및 UI 구현",
        ],
        techStack: ["ElysiaJS", "TypeScript"],
      },
      {
        title: "라미 앱",
        period: "2024.06 ~ 2025.08",
        content: [
          "전반적인 UI/UX를 설계하고 구현",
          "빠른 개발을 위해 브릿지/리버스브릿지 시스템을 사용",
          "사내에 RN 개발에 대한 지식이 있는 개발자가 거의 없었기에, postMessage를 활용, 웹뷰와 네이티브 사이의 정보 전달을 실현",
          "리버스브릿지 시스템을 활용하여 렌더링 주기를 최적화",
        ],
        techStack: ["Expo", "LegendApp-state", "TypeScript"],
      },
      {
        title: "봇스토어",
        period: "2024.12 ~ 2025.02",
        content: [
          "UI/UX, 비즈니스 로직 구현",
          "봇 생성 유저들을 위한 봇 생성용 프롬프트 생성기 및 봇 승인 시스템 제작",
        ],
        techStack: ["Next.js", "TypeScript"],
      },
      {
        title: "Bridge/ReverseBridge 시스템",
        content: [
          "프로젝트 시작 시에, RN 관련 개발지식이 없는 개발자들도 존재하였음. 이에 따라 빠른 개발을 위해서 웹뷰를 활용하여 개발함으로써, 보다 빠르게 개발하기로 함",
          "웹뷰를 활용할 경우 native의 기능들을 사용할 수 없기 때문에, postMessage를 사용하여 함수를 실행 및 결과를 전달하는 방식을 채택 (마치 NextJS처럼, native를 백엔드와 비슷하게 활용)",
          "Bridge: 웹뷰 → 함수 요청 (postMessage) → native 함수 실행. 이후 action의 영향으로 state 값이 변경, context를 통해 구독중인 모든 노드가 리렌더",
          "ReverseBridge: webViewAction + webViewState를 역으로 네이티브에 주입해 줌으로써 렌더링 최적화가 가능하게 함. Proxy를 활용한 요청/응답 패턴 구현",
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
    period: "2024.07 ~ 2025.05",
    details: [
      {
        title: "메인 서비스",
        period: "2024.07 ~ 2025.02",
        content: [
          "메모리 사용량을 체크하는 로그를 추가하여 실제 비즈니스 로직에서 메모리 누수를 발견하고 개선 — tiktoken 인코더를 싱글톤 패턴으로 수정하여 메모리 사용량을 약 300MB로 안정화",
          "데이터 시각화 그래프 구현, 캐싱 테이블을 도입하여 API 콜 최적화 — 렌더링 속도 약 10배 향상 (3000ms → 300ms), API 콜 횟수 최적화로 알고리즘 복잡도 개선 O(n²) → O(n)",
          "API 콜 병렬 처리 로직을 구현하여 렌더링 성능을 대폭 개선 — 렌더링 속도 약 2배 향상 (52~6300ms → 2~3000ms)",
          "AI를 활용한 키워드 분석 및 한줄평 생성 등 AI 분석 로직을 설계 및 구현 — 일별 데이터 분석량 약 5000건 처리",
          "위험 리뷰 필터링 시스템 및 특별관별 데이터 필터링 등의 핵심 비즈니스 로직을 설계하고 개발 — 일별 평균 2000건의 데이터 스크래핑 처리",
          "일별 데이터를 활용, 자동으로 보고서를 전송하는 리포트 시스템 유지 보수 및 V2 개발",
        ],
      },
      {
        title: "메모리 누수 해결 과정",
        content: [
          "매일 아침 진행하는 모니터링 중, 백엔드에서 예상 외의 메모리 사용량을 확인 (실제 사용량 8GB까지 상승)",
          "원인 파악을 위해 로그 및 LLM 사용량 등을 확인했으나 해당하지 않음",
          "메모리 총 사용량 로거를 추가 및 로그 상세화를 통해 한줄평 생성 시 메모리가 지속적으로 발생하는 것을 발견",
          "기존 코드 분석 결과 tiktoken 인코더가 호출될 때마다 새로 생성되고 있었으며, 크론잡이 여러번 발생하면서 인코더 자체의 메모리 점유율이 계단식으로 증가",
          "싱글톤 패턴으로 수정함에 따라서 메모리 사용량을 획기적으로 줄일 수 있었음",
        ],
      },
      {
        title: "캐싱 테이블 도입",
        content: [
          "CGV 측에서 각 날짜별 데이터 그래프를 추가해달라는 요구사항",
          "기존 방식: 특정 영화의 모든 리뷰 가져옴 → 긍정/부정/중립 분류 O(n) → 날짜별 정렬 O(n) — 결과적으로 O(n²)의 시간 복잡도",
          "캐싱 테이블을 활용한 개선으로 API 콜 1회, O(n)의 시간 복잡도로 개선",
        ],
      },
      {
        title: "바이럴 서비스",
        period: "2024.03 ~ 2025.05",
        content: [
          "전반적인 UI/UX를 설계하고 구현",
          "바이럴 스크래핑을 제외한 모든 비즈니스 로직을 개발",
        ],
      },
    ],
  },
  {
    id: "dynamos-v2",
    title: "DynaMOS v2",
    role: "Frontend Lead & Full Stack Developer",
    description:
      "제조업 ERP/MES 시스템의 프론트엔드 프레임워크를 설계하고 구축한 프로젝트입니다. 바이브코딩으로 만들어진 레거시 코드를 분석하여 프레임워크화하고, 선언적 컴포넌트 구조와 Valtio 기반 상태관리를 도입하여 개발 생산성을 25배 향상시켰습니다.",
    featured: true,
    achievements: [
      "PR 속도 25배 향상: 0.16/일 → 3.97/일",
      "페이지당 코드량 72% 감소: 441줄 → 122줄",
      "리렌더링 트리거 85% 감소: 12.3개 → 1.9개/페이지",
      "124개 업무 페이지 운영 중 (레거시 48개 → 프레임워크 기반 124개)",
      "AI 활용 페이지 생성 가능한 선언적 구조 확립",
    ],
    techStack: [
      "Next.js",
      "TypeScript",
      "Valtio",
      "AG Grid",
      "Tailwind CSS",
      "Docker",
      "Jenkins",
    ],
    primaryTech: "Enterprise Framework",
    gradient: "from-sky-600 via-blue-600 to-indigo-600",
    period: "2025.12 ~ 현재",
    details: [
      {
        title: "프레임워크 설계 및 구축",
        period: "2026.01 ~ 2026.02",
        content: [
          "바이브코딩으로 생성된 레거시 코드를 분석 — 페이지당 useState 7개+, 훅 16~20개가 얽힌 블랙박스 구조로 유지보수 불가능 상태",
          "요구사항을 재정의하고 UI 컴포넌트(Tab, Filter, Grid, Buttons)를 코어 컴포넌트로 설계 — Props drilling 제거, Store를 통한 상태 공유",
          "선언적 구조 확립: config 파일(컬럼 정의) + 컴포넌트 조립만으로 페이지 완성 → AI가 바로 생성 가능한 수준의 예측 가능한 패턴",
          "PR 속도 25배 향상 (198일간 31개 → 35일간 139개), 페이지당 평균 코드량 72% 감소 (441줄 → 122줄)",
        ],
        techStack: ["Next.js", "TypeScript", "Valtio", "AG Grid"],
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
        title: "온보딩 & 개발 생산성",
        content: [
          "Before: 한 파일에 useState 15개 + useCallback + useRef + useQuery 직접 관리, 함수 체이닝 이해 없이 수정 불가",
          "After: <Tab> → <Filter/> → <Grid/> → <Buttons/> 선언적 구조 — 내부 로직 몰라도 페이지 파악 3초, config 작성만으로 개발 완료",
          "AI(Claude Code) 활용하여 초기 페이지 생성 가능 — QA 페이지 10개를 2일 내 작업 완료 (PR #116~#138)",
          "미사용 컴포넌트 26개 제거, hydration 에러 해결, duplicated queryKey 해결 등 코드베이스 정리",
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
  {
    id: "sns-star",
    title: "SNS STAR",
    role: "Full Stack Developer (외주)",
    description:
      "유저의 요청을 받아서 자동적으로 원청(타 소셜 마케팅 프로젝트)에 요청을 넣어주는 소셜 마케팅 자동화 프로젝트입니다. 디자인부터 개발 및 유저 피드백 수용, 고객 응대까지 모든 포지션을 소화했습니다.",
    featured: false,
    techStack: ["React", "Django", "Docker", "AWS", "RDS", "PostgreSQL"],
    primaryTech: "Marketing",
    gradient: "from-emerald-600 via-teal-600 to-cyan-500",
    period: "2023.07 ~ 2024.03",
    details: [
      {
        title: "주요 작업",
        content: [
          "유저의 요청을 받아서 자동적으로 원청(타 소셜 마케팅 프로젝트)에 요청을 넣어주는 프로젝트",
          "디자인부터 개발 및 유저 피드백 수용 및 고객 응대까지 모든 포지션 소화",
        ],
        techStack: ["React", "Django", "Docker", "AWS", "RDS", "PostgreSQL"],
      },
    ],
  },
  {
    id: "rebike",
    title: "reBike",
    role: "Backend Developer (팀 프로젝트)",
    description:
      "이미지상의 쓰레기들을 YOLOV5를 활용하여 파악 및 재료를 분석하여 올바른 분리수거 방법을 가르쳐주는 웹 프로젝트입니다. 한국 공학대학교 Silicon Valley BootCamp 참가 프로젝트로, 최우수상을 수상했습니다.",
    featured: false,
    achievements: ["한국 공학대학교 Silicon Valley Boot Camp 최우수"],
    techStack: ["React", "Django", "Docker", "AWS", "RDS", "PyTorch", "YOLOV5"],
    primaryTech: "AI / CV",
    gradient: "from-amber-600 via-yellow-600 to-lime-500",
    period: "2022.07 ~ 2022.08",
    details: [
      {
        title: "주요 작업",
        content: [
          "백엔드 전반을 맡았으며 첫 팀 프로젝트로써 기본적인 개발에 대한 지식 습득",
          "YOLOV5를 활용하여 이미지상의 쓰레기 파악 및 재료 분석",
          "올바른 분리수거 방법을 가르쳐주는 웹 서비스 구현",
        ],
        techStack: ["React", "Django", "Docker", "AWS", "RDS", "PyTorch"],
      },
    ],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const regularProjects = projects.filter((p) => !p.featured);
