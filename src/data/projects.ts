import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "dynamos-platform",
    title: "DynaMOS Platform",
    role: "AI-native Full Stack Developer",
    description:
      "115개 target 업무 화면을 v1 baseline, generated v2 page, backend contract, QA coverage로 연결해 전환한 업무 화면 플랫폼입니다. 반복되는 filter, grid, button, modal, API 동작을 프론트엔드 프레임워크와 생성기, 단일 화면 검증 runtime, SSoT 기반 coverage 관리로 나누어 다뤘습니다.",
    featured: true,
    achievements: [
      "115개 target page의 v1 baseline screenshot과 JSON linkage를 연결",
      "Store + Context 기반 화면 프레임워크와 snapshot 기반 page generation pipeline 적용",
      "filter/grid/button/API parity 이슈를 issue/task/coverage 단위로 분해",
      "frontend, snapshot, backend, ops repo를 연결해 화면 동작과 응답 조건을 함께 검증",
    ],
    techStack: [
      "Next.js",
      "TypeScript",
      "Valtio",
      "AG Grid",
      "Java",
      "MyBatis",
      "Vite",
      "Agent Browser",
    ],
    primaryTech: "Enterprise Platform",
    thumbnail: "/details/dynamos-dashboard.png",
    gradient: "from-sky-600 via-blue-600 to-indigo-600",
    period: "2025.12 ~ 현재",
    details: [
      {
        title: "해결한 문제",
        content: [
          "업무 화면 수가 많아질수록 수동 구현과 수동 검증의 품질 편차가 커지는 문제가 있었습니다.",
          "같은 유형의 화면이라도 filter field, grid column, button action, popup, API query 조건이 달라서 화면 단위 구현만으로는 변경 이유와 검증 상태를 추적하기 어려웠습니다.",
          "반복 화면 전환을 단일 구현 문제가 아니라 생성, 조립, 검증, evidence 추적 문제로 분리했습니다.",
        ],
        techStack: ["ERP/MES", "QA Coverage", "SSoT"],
        images: ["/details/dynamos-dashboard.png"],
      },
      {
        title: "만든 구조",
        content: [
          "v1 업무 화면에서 snapshot data를 수집하고, dynamos-snapshot으로 v2 page source를 생성했습니다.",
          "생성된 화면은 dynamos-front의 Store + Context 기반 화면 프레임워크에서 filter, grid, button 구조로 조립했습니다.",
          "dynavite 또는 Next runtime에서 생성 화면을 확인하고, L0~L7 coverage, issue, task, QA evidence로 상태를 추적했습니다.",
        ],
        techStack: ["dynamos-snapshot", "Store + Context", "dynavite"],
        images: ["/details/dynamos-dashboard.png"],
      },
      {
        title: "담당 범위",
        content: [
          "frontend framework와 generated page 검증뿐 아니라 dynamos-front, dynamos-snapshot, dynamos-back, dynamos-ops를 함께 다뤘습니다.",
          "공통 모달 그리드 버튼, 엑셀 업로드 미리보기, date-range filter contract, grid fixed column, custom button 생성 기준, save/delete override, 품목/설비 조회 응답 조건을 연결했습니다.",
          "화면에서 보이는 동작과 backend 응답 조건, QA coverage가 따로 놀지 않도록 issue/task 단위로 분해해 추적했습니다.",
        ],
        techStack: ["Frontend", "Backend Contract", "Ops"],
      },
      {
        title: "이슈와 검증 근거",
        content: [
          "direct URL capture가 실제 v1 사용 경로와 맞지 않는 문제는 로그인 후 메뉴 anchor 기준 capture로 보정했습니다.",
          "loading 상태로 남는 page, filter/grid/button/API parity 불일치, custom button과 Excel action 누락, backend response condition mismatch를 capture, generation, runtime, query contract 기준으로 나누어 해결했습니다.",
          "검증 근거는 115/115 v1 baseline screenshot, 115/115 JSON linkage, final visual review 115/115 visual-pass candidate, authored PR 기록입니다.",
        ],
        techStack: ["Visual Evidence", "Issue Tracking", "PR Evidence"],
      },
    ],
  },
  {
    id: "new-human-orchestrator",
    title: "New-Human Orchestrator",
    role: "AX System Designer",
    description:
      "여러 제품 프로젝트를 agent, SSoT, task silo, PR review loop로 반복 생산하고 검증하기 위한 개인 AX 개발 운영 시스템입니다. 제품 요구사항, task 계약, 구현 branch, 검증 evidence, PR review, 피드백 승격을 하나의 운영 흐름으로 묶었습니다.",
    featured: true,
    achievements: [
      "0~3계층 구조로 공통 운영 규칙과 프로젝트 내부 자료를 분리",
      "task request부터 PR review loop와 SSoT 승격 후보 정리까지 운영 흐름 설계",
      "task silo execution policy, branch base policy, feedback/personality loop 정리",
      "ONJUMP, Quiza, DynaMOS 같은 실제 제품 프로젝트 운영에 적용",
    ],
    techStack: [
      "Agent Orchestration",
      "SSoT",
      "Git Worktree",
      "GitHub PR",
      "Codex",
      "Obsidian",
    ],
    primaryTech: "Agentic AX",
    gradient: "from-slate-950 via-blue-900 to-cyan-700",
    period: "2026.02 ~ 현재",
    details: [
      {
        title: "해결한 문제",
        content: [
          "agent가 프로젝트를 넘나들며 작업할수록 공통 운영 규칙과 프로젝트 내부 자료가 섞이는 문제가 있었습니다.",
          "root system에 프로젝트별 task 원문과 QA 결과가 들어가면 공통 규칙이 오염되고, project SSoT 없이 구현하면 repo, branch, secret, runtime, 검증 기준을 추정하게 됩니다.",
          "공통 규칙, 프로젝트 registry, 프로젝트 내부 SSoT, silo local workspace를 계층으로 분리했습니다.",
        ],
        techStack: ["Layer Policy", "SSoT", "Agent Safety"],
      },
      {
        title: "운영 구조",
        content: [
          "0계층은 공통 운영 규칙, repo skill, agent prompt, branch policy를 담고, 1계층은 project registry와 SSoT 위치를 가리킵니다.",
          "2계층은 프로젝트 내부 issue/task/QA/decision/coverage를 관리하고, 3계층은 silo local workspace와 PR 전 임시 상태를 담당합니다.",
          "task request에서 project SSoT 확인, silo 준비, repo clone/branch 생성, 구현과 검증, PR review loop, SSoT 승격 후보 정리로 이어지는 흐름을 설계했습니다.",
        ],
        techStack: ["Task Silo", "Review Loop", "Branch Policy"],
      },
      {
        title: "담당 범위",
        content: [
          "계층 정책, SSoT schema 초안, task silo execution policy, Codex PR review gate, feedback/personality loop, repo skill 구조를 설계했습니다.",
          "단일 피드백이 곧바로 장기 규칙이 되지 않도록 feedback/personality evidence와 승인 절차를 분리했습니다.",
          "vaultcraft는 별도 대표 프로젝트가 아니라 이 운영 시스템의 전신이자 일부 근거로만 사용합니다.",
        ],
        techStack: ["Prompt System", "Repo Skill", "Feedback Loop"],
      },
      {
        title: "제품 적용",
        content: [
          "이 프로젝트의 full-stack 성격은 제품 화면을 직접 만드는 방식이 아니라, 여러 제품의 요구사항, 코드 변경, 검증 evidence, PR 통합을 연결하는 개발 운영 layer에 있습니다.",
          "ONJUMP, Quiza, DynaMOS 같은 실제 제품 프로젝트에 적용되며, task 작성 방식과 branch base, review gate, evidence 저장 위치를 반복 가능한 규칙으로 정리했습니다.",
          "구현 결과가 PR과 evidence로 승격되는 흐름을 만들어 사람의 판단 지점을 줄이고 추적 가능성을 높였습니다.",
        ],
        techStack: ["Product Ops", "Evidence", "PR Handoff"],
      },
    ],
  },
  {
    id: "stackstory",
    title: "StackStory",
    role: "Full-stack Testing Tool Builder",
    description:
      "화면 액션, API 호출, Docker DB row 변화를 한 화면에서 확인하는 FE + BE + DB E2E 테스팅 라이브러리입니다. UI 성공 메시지만 믿지 않고 실제 DB 변화까지 확인하도록 만들어 agent가 생성한 기능의 회귀 위험을 줄였습니다.",
    featured: true,
    achievements: [
      "Vite UI, harness server, product API, Docker Postgres, DB Inspector 구조 설계",
      "local Docker DB와 allowlist 기반 inspector로 production DB 접근 위험 분리",
      "mutation 실패, malformed JSON, body size limit, snapshot row count 이슈 보강",
      "UI, API, DB mutation을 함께 확인하는 개발용 테스트 surface 제공",
    ],
    techStack: ["Vite", "TypeScript", "Docker", "Postgres", "Vitest", "API Harness"],
    primaryTech: "Full-stack E2E",
    gradient: "from-emerald-600 via-teal-600 to-cyan-500",
    githubUrl: "https://github.com/Ryokuman/onjump-vite-db-harness",
    period: "2026",
    details: [
      {
        title: "해결한 문제",
        content: [
          "UI의 성공 메시지만으로는 실제 데이터가 저장되었는지 확인할 수 없었습니다.",
          "AI agent가 만든 기능은 화면에서는 성공처럼 보여도 API request body, backend validation, DB row mutation 중 하나가 어긋날 수 있습니다.",
          "production DB나 실제 secret을 건드리지 않고도 반복 검증할 수 있는 local full-stack surface가 필요했습니다.",
        ],
        techStack: ["UI", "API", "Database"],
      },
      {
        title: "테스트 구조",
        content: [
          "Vite UI, harness server, product API, Docker Postgres, DB Inspector, seed/reset/snapshot 흐름으로 구성했습니다.",
          "사용자는 UI에서 액션을 실행하고, harness는 API 호출과 DB 상태 변화를 추적하며, inspector는 allowlist 기반으로 row 변화를 보여줍니다.",
          "Storybook이 컴포넌트 상태를 보여주듯, StackStory는 제품 기능의 화면, request, server 처리, database mutation을 함께 보게 만드는 도구입니다.",
        ],
        techStack: ["Vite", "Docker Postgres", "DB Inspector"],
      },
      {
        title: "이슈 보강",
        content: [
          "mutation 실패 시 UI가 성공 메시지를 보여줄 수 있는 문제를 request helper로 정리했습니다.",
          "malformed JSON이 서버 오류처럼 보이는 문제는 400으로, request body 제한이 없어 메모리 사용 위험이 커지는 문제는 413과 body size limit으로 분리했습니다.",
          "snapshot row count가 불안정한 문제는 row count 일관성 보장 작업으로 보강했습니다.",
        ],
        techStack: ["Error Handling", "Snapshot", "Safety"],
      },
      {
        title: "공개 안전선",
        content: [
          "StackStory는 production DB 도구나 arbitrary SQL 실행 도구가 아닙니다.",
          "핵심은 local Docker DB와 allowlist 기반 inspector를 사용해 UI와 API와 DB 변화를 함께 검증하는 개발용 테스트 도구라는 점입니다.",
          "merged PR #1~#3은 완료 근거로 사용하고, closed PR은 완료 기능이 아니라 전환 시도 이력으로만 설명합니다.",
        ],
        techStack: ["PR Evidence", "Safe Tooling", "Local Runtime"],
      },
    ],
  },
  {
    id: "onjump",
    title: "ONJUMP",
    role: "Full-stack Product Builder",
    description:
      "건강 목표 생성, 식단/운동 기록, 일별 수행 상태를 다루는 건강관리 제품입니다. 제품 repo, 기능 submodule, API/page 구현, DB seed와 test input 분리를 연결해 화면과 데이터 저장이 함께 검증되는 full-stack task 흐름을 적용했습니다.",
    featured: true,
    achievements: [
      "제품 repo, 기능 submodule, API/page/style 작업을 분리한 task silo 흐름 적용",
      "DB seed와 test input을 분리해 반복 검증 가능한 task 계약 작성",
      "식단 로그, 빠른 체크, 목표 생성 흐름을 사용자 목적 기준 full-stack task로 정리",
      "공유 스타일 모듈과 product repo gitlink pin 방식 정리",
    ],
    techStack: ["TypeScript", "Expo", "API Server", "Postgres", "Tailwind CSS", "Git Submodule"],
    primaryTech: "Health Product",
    gradient: "from-fuchsia-600 via-rose-500 to-orange-400",
    period: "2026",
    details: [
      {
        title: "해결한 문제",
        content: [
          "건강관리 제품의 기능은 화면 입력만으로 끝나지 않고 API 저장, DB 상태, 날짜별 조회 조건이 함께 맞아야 합니다.",
          "요구사항이 불분명한 상태에서 page-first로 구현하면 backend contract와 seed data, action payload가 섞이고 검증이 화면 성공 여부에만 의존하게 됩니다.",
          "제품 기능을 사용자 목적 기준의 full-stack task로 분해했습니다.",
        ],
        techStack: ["Product Flow", "API", "DB State"],
      },
      {
        title: "제품 구조",
        content: [
          "product repo는 apps/app, apps/fe, apps/api, packages/domain을 가진 monorepo로 두었습니다.",
          "기능 단위 구현은 task silo와 submodule로 분리하고, 제품 repo는 모든 실험 구현을 직접 흡수하지 않고 검토된 commit을 pin하는 host 역할을 합니다.",
          "기능별 BE/FE/page/style 작업은 독립적으로 검증하고, 제품 기준선에는 확인된 결과만 연결합니다.",
        ],
        techStack: ["Monorepo", "Submodule", "Task Silo"],
      },
      {
        title: "담당 범위",
        content: [
          "project contract 작성, DB schema 기준과 seed/test input 분리, 식단 로그와 빠른 체크 task 계약, 목표 생성 BE와 기본 UI 계약을 맡았습니다.",
          "submodule host 방식과 공유 스타일 모듈 기준을 정리했습니다.",
          "TASK-0036 API, page repo, style module PR과 product repo PR을 통해 API runtime, page 구조, Tailwind 공유 스타일 모듈이 연결된 근거가 있습니다.",
        ],
        techStack: ["Contract", "Style Module", "PR Evidence"],
      },
      {
        title: "운영 안전선",
        content: [
          "제품별 시나리오를 범용 harness repo에 넣으려는 위험, schema/API/auth/design 계약이 없는 값을 task에서 추정하는 위험을 분리했습니다.",
          "초기 DB mock data와 test input을 섞는 위험, UX를 먼저 확정해 backend 저장 계약 검증이 흐려지는 문제를 project SSoT 확인과 seed/action payload 분리로 정리했습니다.",
          "공개 문안에서는 private task 원문과 내부 경로, 출시/운영 사용자 수를 주장하지 않습니다.",
        ],
        techStack: ["SSoT", "Seed Data", "Test Input"],
      },
    ],
  },
  {
    id: "quiza",
    title: "Quiza",
    role: "AI Product Builder",
    description:
      "로그인, 온보딩, 학습 로드맵, 문제 세션, Gemini 기반 채점과 조언을 연결한 AI 학습 제품입니다. World/MiniKit 전제를 제거하고 provider identity, 학습 도메인, AI scoring/advice 흐름을 일반 웹앱과 App Store 방향에 맞게 재정리했습니다.",
    featured: true,
    achievements: [
      "User와 UserIdentity를 분리해 provider별 장기 식별자 기반 인증 구조 정리",
      "World 인증과 MiniKit 결제 실행 경로 제거 후 일반 웹앱/App Store 방향 재설계",
      "Gemini 기반 essay grading, scoring engine, learning advice 흐름 구현",
      "roadmap, session, question, answer, stats, advice 도메인을 제품 흐름으로 연결",
    ],
    techStack: ["Next.js", "NestJS", "Prisma", "Gemini", "OAuth", "TypeScript"],
    primaryTech: "AI Learning Product",
    gradient: "from-violet-600 via-indigo-600 to-sky-500",
    period: "2026",
    details: [
      {
        title: "해결한 문제",
        content: [
          "AI 기능을 단순 생성 API 호출로만 붙이면 제품의 학습 흐름과 계정 구조가 불안정해집니다.",
          "로그인 provider, 학습 도메인, 목표, 로드맵, 문제 세션, 답변, 채점, 통계, 조언이 함께 이어져야 합니다.",
          "World/MiniKit 같은 특정 플랫폼 전제가 남아 있으면 일반 웹앱과 App Store 방향으로 확장하기 어렵습니다.",
        ],
        techStack: ["AI Product", "Auth", "Learning Flow"],
      },
      {
        title: "제품 구조",
        content: [
          "Next.js client와 NestJS server를 기준으로 구성했습니다.",
          "auth는 User와 UserIdentity(provider, provider_user_id)로 분리해 provider별 장기 식별자를 관리합니다.",
          "learning domain은 domain/tag/goal/roadmap/session/question/answer/stats/advice로 나누고, AI layer는 Gemini generation, scoring, essay grading, learning advice, embedding 기반 template reuse와 fallback 경로를 포함합니다.",
        ],
        techStack: ["Next.js", "NestJS", "Gemini"],
      },
      {
        title: "담당 범위",
        content: [
          "소셜 인증 identity 기반 로그인, Google/Apple/Kakao 로그인 화면 연결, World 인증과 MiniKit 결제 실행 경로 제거를 맡았습니다.",
          "Gemini scoring engine과 essay grading, learning advice, AI 로드맵과 템플릿 재활용 연결을 구현했습니다.",
          "backend code path는 auth, gemini, roadmap, sessions, questions, answers, advice 중심으로, frontend code path는 src/api, src/app, src/components, src/lib 중심으로 확인되어 있습니다.",
        ],
        techStack: ["Social Auth", "Gemini Scoring", "Roadmap"],
      },
      {
        title: "전환과 안전선",
        content: [
          "World/MiniKit 의존성 제거, world_id 보존과 신규 장기 식별자 분리, 객관식 정답 저장 형식 혼재, 체크포인트 통과 기준 불일치 문제를 정리했습니다.",
          "Gemini 생성 문제와 seed/placeholder 정답 규약 정렬은 AI 생성, 채점, 조언, 템플릿 재활용 흐름을 분리해 다뤘습니다.",
          "공개 문안에서는 실제 OAuth provider 운영 E2E나 App Store 출시 완료를 주장하지 않고, provider UI와 identity 구조, dev/smoke 검증 범위, unit/smoke/build 기록, merged PR 근거를 기준으로 설명합니다.",
        ],
        techStack: ["Platform Migration", "Dev Smoke", "PR Evidence"],
      },
    ],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const regularProjects = projects.filter((p) => !p.featured);
