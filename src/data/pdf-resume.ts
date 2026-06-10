// ── PDF Resume Data ──
// Priority: content[variant][locale] → companyOverrides[company][variant][locale]

import type { Locale } from "@/i18n/context";

export type PdfVariant = "fullstack" | "backend" | "frontend";
export type Company = "default" | "zeta" | "planfit";

export interface PdfContent {
  position: string;
  tagline: string;
  intro: string;
  career: {
    runup: { role: string; summary: string };
    poul: { role: string; summary: string };
  };
  projects: {
    dynamos: { summary: string; detail: string };
    generator?: { summary: string; detail: string };
    dynavite?: { summary: string; detail: string };
    agentSilo?: { summary: string; detail: string };
    cgv: { summary: string; detail: string };
    llami: { summary: string; detail: string };
    worktree: { summary: string; detail: string };
  };
  education: { name: string; dept: string };
  techStack: {
    core: string[];
    state: string[];
    ui: string[];
    backend: string[];
    infra: string[];
  };
}

export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends (infer U)[]
    ? U[]
    : T[K] extends object
      ? DeepPartial<T[K]>
      : T[K];
};

// ── Base content: content[variant][locale] ──

const content: Record<PdfVariant, Record<Locale, PdfContent>> = {
  // ════════════════════════════════════════
  // FULLSTACK
  // ════════════════════════════════════════
  fullstack: {
    ko: {
      position: "풀스택 개발자",
      tagline: "",
      intro: "화면, API, QA, 개발 프로세스의 반복 병목을\n시스템으로 전환해 제품 개발 속도를 높이는 개발자입니다.",
      career: {
        runup: {
          role: "프로덕트 엔지니어 리드 / 풀스택 개발자",
          summary: "100개+ ERP/MES 화면 전환 압력을 화면 프레임워크, 생성기, QA runtime, worktree 운영 시스템으로 나누어 구조화했습니다.",
        },
        poul: {
          role: "풀스택 개발자",
          summary: "CGV-ASSISTANT와 LLAMI에서 운영 분석, API 안정화, LLM 통합, 제품 화면 구현을 하나의 서비스 흐름으로 연결했습니다.",
        },
      },
      projects: {
        dynamos: {
          summary: "화면 개발, 레거시 전환, QA 병렬 운영을 하나의 개발 시스템으로 묶은 프로젝트",
          detail: "• 100개+ 업무 화면을 빠르게 전환해야 했지만 화면마다 상태관리·필터·그리드·버튼 구현 방식이 달라 개발 속도와 품질이 흔들렸음\n• core component와 Store + Context 기반 페이지 구조를 설계해 화면 개발을 반복 구현이 아니라 표준 패턴 조립으로 전환\n• 컬럼·필터·버튼 정의를 config로 분리하고 Storybook + Mock Backend를 붙여 API 완성 전에도 화면과 요청/응답 스펙을 먼저 고정하는 흐름 구축",
        },
        generator: {
          summary: "V1 화면 정보를 V2 index.tsx/config.ts 초안으로 변환하는 page generator",
          detail: "• V1 화면 정보를 사람이 읽고 V2 코드로 옮기는 작업이 레거시 전환 속도의 반복 병목이었음\n• V1 HTML/JS/widgetprop/elements 데이터를 분석해 V2 index.tsx와 config.ts 초안을 생성하는 DynaMOS Generator 파이프라인 구축\n• 레거시 전환을 수동 복원 작업이 아니라 규칙 기반 생성 문제로 바꿔 화면 전환 비용을 낮춤",
        },
        dynavite: {
          summary: "generated page를 전체 앱 없이 검증하는 사일로 QA runtime",
          detail: "• generated page 하나를 확인하려고 전체 Next 앱, 인증, 세션, backend API를 모두 띄워야 해 사일로 내부 QA 루프가 느렸음\n• dynaVite runtime에 mock auth/API/session을 주입해 page 단위로 filter/grid/button surface를 빠르게 확인하도록 구성\n• 생성된 화면의 검증 단위를 전체 앱에서 단일 page harness로 줄여 QA 피드백 속도를 높임",
        },
        agentSilo: {
          summary: "브랜치별 QA 피드백을 병렬 처리하기 위한 에이전트 사일로 운영 시스템",
          detail: "• 여러 브랜치의 QA 피드백을 동시에 처리할 때 server 재시작, terminal 이동, 작업 맥락 복구가 반복됐음\n• branch별 dev server, web terminal, plan, health check를 관리하는 에이전트 사일로 운영 흐름으로 정리\n• 각 사일로가 독립적으로 구현·검증·보고하도록 만들어 QA 피드백을 병렬로 처리할 수 있게 구성",
        },
        cgv: {
          summary: "운영 분석 서비스의 메모리/API 병목을 추적하고 대시보드로 제품화한 프로젝트",
          detail: "• 매일 아침 백엔드 메모리가 8GB까지 증가하는 문제가 반복되어 메모리 로거로 호출 흐름을 추적\n• tiktoken 인코더가 요청마다 재생성되는 원인을 찾아 싱글톤 구조로 전환하고 백엔드 메모리 사용량을 안정화\n• 날짜별 그래프가 전체 리뷰를 매번 분류·정렬하던 흐름을 캐싱 테이블 기반 조회와 API 병렬화로 바꿔 운영 대시보드 응답성을 개선\n• 리뷰 수집, AI 감정/유해성 분석, 위험 리뷰 필터링, 한줄평 생성, 바이럴 트렌드 화면을 연결해 매일 확인 가능한 분석 서비스로 제품화",
        },
        llami: {
          summary: "17개 LLM API 차이를 통합하고 여러 product surface를 구현한 AI 플랫폼",
          detail: "• 모델마다 인증, 요청 포맷, 스트리밍 이벤트, function-call 응답이 달라 신규 모델 추가 때마다 handler가 늘어나는 문제가 있었음\n• 요청 생성, stream parsing, token/credit 계산, function-call 정규화를 pipe 단계로 분리해 모델별 차이를 조합 가능한 처리 단위로 전환\n• 모델 응답을 단일 인터페이스로 정규화해 프론트가 모델 차이를 몰라도 같은 컴포넌트로 렌더링하도록 구성\n• 이 구조 위에서 모델스토어, 봇스토어, 라미챗, Expo 앱까지 여러 product surface를 구현",
        },
        worktree: {
          summary: "QA 병렬 처리와 작업 컨텍스트 유실 문제를 해결하기 위해 만든 개발 운영 시스템",
          detail: "• 여러 브랜치를 동시에 처리할 때 서버 재시작·의존성 설치·작업 맥락 복구가 반복되던 문제를 worktree 대시보드로 시스템화\n• 브랜치별 dev server, web terminal, plan, health check를 한곳에서 관리해 QA 피드백을 병렬로 처리\n• PTY 세션을 서버 상태의 source of truth로 두고, plan 양방향 동기화로 dashboard와 worktree 내부 작업 맥락 불일치 해결",
        },
      },
      education: { name: "성결대학교", dept: "컴퓨터공학과 (중퇴)" },
      techStack: {
        core: ["TypeScript", "React", "Next.js"],
        state: ["Valtio"],
        ui: ["Tailwind CSS", "AG Grid", "Storybook", "Expo"],
        backend: ["ElysiaJS", "Node.js", "Supabase"],
        infra: ["Docker", "AWS", "Jenkins", "GitHub Actions", "Claude Code"],
      },
    },

    en: {
      position: "Full Stack Developer",
      tagline: "A developer who builds structures and processes that didn't exist before.",
      intro: "I observe a team's codebase, identify recurring bottlenecks, and build structures, processes, and tools to solve them. I introduced Git Flow and code review culture, built a Storybook-based pre-development environment so frontend could move independently of backend. When tools don't exist, I build them — and once structures become predictable, I bring in AI-powered automation.",
      career: {
        runup: {
          role: "Product Engineering Lead / Full Stack Developer",
          summary: "Designed and built ERP/MES frontend from scratch — achieved ~25x PR velocity improvement and ~70% code reduction. Led declarative architecture design, Git Flow/PR process, and AI automation.",
        },
        poul: {
          role: "Full Stack Developer",
          summary: "Full-stack development of CGV collaboration sentiment analysis service, AI platform LLAMI, and more. Service selected as Toss Payments best practice.",
        },
      },
      projects: {
        dynamos: {
          summary: "Transformed legacy structure into a declarative framework, accelerating team development",
          detail: "• Pages riddled with useState/hooks, no documentation → untouchable by new members\n• Redefined requirements and designed declarative framework from scratch\n• Introduced Valtio: ref() for render control + minimized team learning curve\n• Storybook + Mock for frontend-first development without backend dependency\n• Introduced Git Flow + code review to team with no PR process → AI page auto-generation after stabilization\n• ~25x PR velocity improvement, ~70% code reduction, ~85% fewer re-renders",
        },
        cgv: {
          summary: "Tracked down recurring memory explosions and stabilized the service",
          detail: "• Daily morning memory spikes → wrote custom memory logger to trace root cause\n• tiktoken encoder missing singleton pattern was the root cause → applied and stabilized\n• Replaced inefficient date-based API queries with caching table, ~10x rendering speed improvement\n• Designed complete viral analysis UI/UX and sentiment visualization",
        },
        llami: {
          summary: "AI platform unifying multiple LLM APIs into a single interface",
          detail: "• Unified different LLM API specs (auth, format, streaming) with pipe pattern\n• Adding new model = writing one pipe → minimal extension cost\n• Bridge/ReverseBridge on webview — native features with React syntax only\n• Designed and built entire AI chatbot marketplace (Bot Store) frontend\n• Selected as Toss Payments best practice",
        },
        worktree: {
          summary: "Built a system to solve parallel development bottlenecks no existing tool could handle",
          detail: "• Multi-branch parallel work bottleneck during QA → no suitable tool existed, built from scratch\n• xterm.js + Claude Code integration for AI-powered development plan generation\n• chokidar + sync lock for bidirectional dashboard ↔ worktree plan sync",
        },
      },
      education: { name: "Sungkyul University", dept: "Computer Science (Withdrawn)" },
      techStack: {
        core: ["TypeScript", "React", "Next.js"],
        state: ["Valtio"],
        ui: ["Tailwind CSS", "AG Grid", "Storybook", "Expo"],
        backend: ["ElysiaJS", "Node.js", "Supabase"],
        infra: ["Docker", "AWS", "Jenkins", "GitHub Actions", "Claude Code"],
      },
    },

    tr: {
      position: "Full Stack Geliştirici",
      tagline: "Ekipte olmayan yapı ve süreçleri sıfırdan kuran bir geliştirici.",
      intro: "Ekibin kod tabanını gözlemler, tekrarlanan darboğazları tespit eder ve çözmek için yapılar, süreçler ve araçlar inşa ederim. Git Flow ve kod inceleme kültürünü tanıttım, Storybook tabanlı ön geliştirme ortamı kurarak frontend'in backend'den bağımsız hareket etmesini sağladım. Araç yoksa kendim yaparım — yapılar öngörülebilir hale gelince AI otomasyonu devreye sokarım.",
      career: {
        runup: {
          role: "Product Engineering Lead / Full Stack Geliştirici",
          summary: "ERP/MES frontend'ini sıfırdan tasarlayıp geliştirdi — PR hızında ~25 kat artış ve ~%70 kod azaltma. Bildirimsel mimari, Git Flow/PR süreci ve AI otomasyon liderliği.",
        },
        poul: {
          role: "Full Stack Geliştirici",
          summary: "CGV işbirliği duygu analizi servisi, AI platformu LLAMI ve daha fazlasını full-stack olarak geliştirdi. Servis Toss Payments en iyi uygulama seçildi.",
        },
      },
      projects: {
        dynamos: {
          summary: "Legacy yapıyı bildirimsel framework'e dönüştürerek ekip geliştirme hızını artırdı",
          detail: "• Her sayfada useState/hook karmaşası, dokümantasyon yok → yeni üyelerin dokunamayacağı yapı\n• Gereksinimleri yeniden tanımlayıp bildirimsel framework'ü sıfırdan tasarladı\n• Valtio tanıtımı: ref() ile render kontrolü + ekip öğrenme eğrisini minimize\n• Storybook + Mock ile backend bağımlılığı olmadan frontend ön geliştirme\n• PR süreci olmayan ekibe Git Flow + kod inceleme → stabilizasyon sonrası AI sayfa otomatik oluşturma\n• PR hızında ~25 kat artış, ~%70 kod azaltma, ~%85 daha az yeniden render",
        },
        cgv: {
          summary: "Tekrarlayan bellek patlamalarını takip edip servisi stabilize etti",
          detail: "• Her sabah tekrarlayan bellek patlaması → özel bellek logger yazarak kök neden takibi\n• tiktoken kodlayıcıda singleton eksikliği kök neden → uygulandı ve stabilize edildi\n• Verimsiz tarih bazlı API sorgularını önbellek tablosuyla değiştirdi, ~10 kat render hızı artışı\n• Viral analiz UI/UX tasarımı ve duygu görselleştirmesi",
        },
        llami: {
          summary: "Birden fazla LLM API'sini tek arayüzde birleştiren AI platformu",
          detail: "• Farklı LLM API spesifikasyonlarını (kimlik doğrulama, format, akış) pipe deseniyle birleştirdi\n• Yeni model ekleme = bir pipe yazmak → minimum genişleme maliyeti\n• Webview üzerinde Bridge/ReverseBridge — sadece React söz dizimiyle native özellikler\n• AI chatbot pazarı (Bot Store) frontend tasarımı ve geliştirmesi\n• Toss Payments en iyi uygulama seçildi",
        },
        worktree: {
          summary: "Mevcut araçların çözemediği paralel geliştirme darboğazını çözen sistem",
          detail: "• QA'da çoklu branch paralel çalışma darboğazı → uygun araç yok, sıfırdan tasarladı\n• xterm.js + Claude Code entegrasyonu ile AI destekli geliştirme planı oluşturma\n• chokidar + sync lock ile pano ↔ worktree çift yönlü plan senkronizasyonu",
        },
      },
      education: { name: "Sungkyul Üniversitesi", dept: "Bilgisayar Mühendisliği (Ayrıldı)" },
      techStack: {
        core: ["TypeScript", "React", "Next.js"],
        state: ["Valtio"],
        ui: ["Tailwind CSS", "AG Grid", "Storybook", "Expo"],
        backend: ["ElysiaJS", "Node.js", "Supabase"],
        infra: ["Docker", "AWS", "Jenkins", "GitHub Actions", "Claude Code"],
      },
    },
  },

  // ════════════════════════════════════════
  // BACKEND
  // ════════════════════════════════════════
  backend: {
    ko: {
      position: "백엔드 개발자",
      tagline: "API, 데이터 처리, LLM 통합의 반복 병목을 구조화하고 자동화 시스템으로 전환하는 개발자입니다.",
      intro: "API, 데이터 처리, LLM 통합의 반복 병목을\n구조화하고 자동화 시스템으로 전환하는 개발자입니다.",
      career: {
        runup: {
          role: "프로덕트 엔지니어 리드 / 풀스택 개발자",
          summary: "ERP/MES 레거시 backend contract를 분석해 generated page의 API 호출 정책과 맞추는 변환·검증 흐름을 구축했습니다.",
        },
        poul: {
          role: "풀스택 개발자",
          summary: "CGV 서비스의 메모리/API 병목을 안정화하고, LLAMI에서 17개 LLM API를 pipe 기반 통합 구조로 정리했습니다.",
        },
      },
      projects: {
        dynamos: {
          summary: "레거시 backend contract와 generated frontend API 호출 정책을 맞춘 프로젝트",
          detail: "• V1/V2 전환 과정에서 화면 생성만으로는 부족했고, Spring/MyBatis endpoint method와 mapper statement가 FE 호출 방식과 맞아야 했음\n• dynamosconvert의 /mos/request method와 create/modify/remove mapper prefix를 조사해 PUT/POST/deleteList 사용 정책을 분류\n• V1 snapshot data에서 page source를 생성할 때 backend query contract와 어긋나는 stale method output을 찾아 page generator 정책 보정 근거 마련\n• Storybook + Mock Backend로 실제 API 완성 전에도 요청/응답 형태를 먼저 고정해 backend 연동 리스크를 줄이는 흐름 구축",
        },
        cgv: {
          summary: "메모리 폭주와 리뷰 조회 API 병목을 구조적으로 안정화한 프로젝트",
          detail: "• 매일 아침 반복되던 8GB 메모리 증가를 메모리 로거로 추적하고 tiktoken 인코더가 요청마다 재생성되는 원인을 확인\n• 인코더 생성 흐름을 싱글톤 구조로 전환해 백엔드 메모리 사용량을 약 300MB 수준으로 안정화\n• 날짜별 리뷰 그래프 API가 전체 리뷰를 매번 가져와 분류·정렬하는 O(n²) 구조임을 확인하고 캐싱 테이블 기반 조회 구조로 전환\n• 독립 API 호출을 병렬화해 초기 렌더링 지연을 줄이고, 운영자가 매일 보는 분석 대시보드의 응답성을 개선",
        },
        llami: {
          summary: "17개 LLM API의 요청·스트리밍·응답 차이를 pipe 구조로 통합한 프로젝트",
          detail: "• 모델마다 인증, 요청 포맷, streaming event, 응답 구조, function-call 스펙이 달라 신규 모델 추가 시 handler가 계속 늘어나는 문제가 있었음\n• 요청 생성, stream parsing, token/credit 계산, function-call 정규화를 pipe 단계로 분리해 모델별 차이를 조합 가능한 처리 단위로 전환\n• ReadableStream 응답을 표준 이벤트로 변환해 프론트가 모델 차이를 몰라도 단일 인터페이스로 렌더링하도록 구성\n• 모델별 크레딧 차등 소모와 결제 흐름을 연결해 모델 사용, 충전, workspace 공유 흐름 구현",
        },
        worktree: {
          summary: "브랜치별 dev server와 terminal 상태를 안정적으로 관리하는 개발 운영 시스템",
          detail: "• 여러 worktree의 dev server 상태가 JSON 기록과 실제 프로세스 사이에서 어긋나는 문제를 PTY 세션 중심으로 재설계\n• Node.js Custom HTTP Server와 WebSocket upgrade로 브라우저 터미널을 제공하고, PTY 세션을 서버 상태의 source of truth로 사용\n• lsof 기반 orphan process 탐지/복구로 crash/restart 이후에도 기존 process를 재활용할 수 있게 구성\n• chokidar + sync lock으로 dashboard plan과 worktree 내부 plan의 양방향 동기화를 안정화",
        },
      },
      education: { name: "성결대학교", dept: "컴퓨터공학과 (중퇴)" },
      techStack: {
        core: ["TypeScript", "Node.js", "ElysiaJS"],
        state: ["Valtio"],
        ui: ["React", "Next.js"],
        backend: ["Supabase", "PostgreSQL", "Python"],
        infra: ["Docker", "AWS", "Jenkins", "GitHub Actions", "Claude Code"],
      },
    },

    en: {
      position: "Backend Developer",
      tagline: "A developer who traces root causes of recurring bottlenecks and solves them structurally.",
      intro: "I traced memory explosion root causes with custom loggers, improved O(n²) APIs with caching tables, and unified 17 different LLM API specs with the pipe pattern. With frontend experience, I design API specs from the consumer's perspective — and once structures stabilize, I bring in AI automation.",
      career: {
        runup: {
          role: "Product Engineering Lead / Full Stack Developer",
          summary: "Designed and built ERP/MES frontend framework, leading API spec design. Created Storybook + Mock environment where frontend pre-defines API specs, improving overall development velocity.",
        },
        poul: {
          role: "Full Stack Developer",
          summary: "Designed pipe pattern architecture unifying 17 LLM APIs. Traced and resolved memory explosion and rendering bottlenecks in CGV collaboration service. Selected as Toss Payments best practice.",
        },
      },
      projects: {
        dynamos: {
          summary: "Frontend framework design that secured API spec initiative",
          detail: "• Built Storybook + Mock Backend → frontend defines API spec (request/response) first, delivers to backend\n• Designed 17 Valtio stores — aligned frontend state with API response structure, minimizing transformation logic\n• Declarative config + core components → predictable page patterns → AI page auto-generation\n• ~25x PR velocity improvement, ~70% code reduction",
        },
        cgv: {
          summary: "Traced memory explosion and API bottleneck from root cause to resolution",
          detail: "• Daily morning memory spikes (8GB) → wrote custom memory logger to trace root cause\n• tiktoken encoder recreated per call was the root cause → singleton pattern, stabilized to ~300MB\n• Date-based full review query O(n²) → caching table for O(n), rendering 3000ms → 300ms\n• API call parallelization: rendering 52~6300ms → 2~3000ms",
        },
        llami: {
          summary: "Backend architecture unifying 17 LLM APIs with pipe pattern",
          detail: "• Abstracted different API specs (auth, request format, streaming, response) with pipe pattern\n• Adding new model = writing one pipe → minimal extension cost\n• ReadableStream-based streaming for real-time model response delivery, format normalization at pipe stage\n• Unified function-call spec abstraction across models → frontend uses single interface regardless of model\n• Selected as Toss Payments best practice",
        },
        worktree: {
          summary: "PTY session-based server state management and process recovery system",
          detail: "• Node.js Custom HTTP Server + WebSocket upgrade for PTY session management\n• PTY sessions as source of truth for server state — resolved JSON state inconsistency\n• lsof-based orphan process detection and recovery — reuses existing processes on crash/restart\n• chokidar + sync lock (500ms) for bidirectional plan sync, preventing infinite loops",
        },
      },
      education: { name: "Sungkyul University", dept: "Computer Science (Withdrawn)" },
      techStack: {
        core: ["TypeScript", "Node.js", "ElysiaJS"],
        state: ["Valtio"],
        ui: ["React", "Next.js"],
        backend: ["Supabase", "PostgreSQL", "Python"],
        infra: ["Docker", "AWS", "Jenkins", "GitHub Actions", "Claude Code"],
      },
    },

    tr: {
      position: "Backend Geliştirici",
      tagline: "Tekrarlayan darboğazların kök nedenini takip edip yapısal olarak çözen bir geliştirici.",
      intro: "Bellek patlamalarının kök nedenini özel logger ile takip ettim, O(n²) API'leri önbellek tablolarıyla iyileştirdim ve 17 farklı LLM API spesifikasyonunu pipe deseniyle birleştirdim. Frontend deneyimimle API spesifikasyonlarını tüketici perspektifinden tasarlarım — yapılar stabilize olunca AI otomasyonu devreye sokarım.",
      career: {
        runup: {
          role: "Product Engineering Lead / Full Stack Geliştirici",
          summary: "ERP/MES frontend framework tasarlayıp API spesifikasyon tasarımını yönetti. Storybook + Mock ortamıyla frontend'in API spesifikasyonunu ön tanımlaması sağlandı.",
        },
        poul: {
          role: "Full Stack Geliştirici",
          summary: "17 LLM API'yi pipe deseniyle birleştiren mimariyi tasarladı. CGV işbirliği servisindeki bellek patlaması ve render darboğazlarını çözdü. Toss Payments en iyi uygulama seçildi.",
        },
      },
      projects: {
        dynamos: {
          summary: "API spesifikasyon inisiyatifini ele geçiren frontend framework tasarımı",
          detail: "• Storybook + Mock Backend → frontend API spesifikasyonunu önce tanımlar, backend'e iletir\n• 17 Valtio store tasarımı — frontend state ile API yanıt yapısını hizalayarak dönüşüm mantığını minimize\n• Bildirimsel config + çekirdek bileşenler → öngörülebilir sayfa desenleri → AI sayfa otomatik oluşturma\n• PR hızında ~25 kat artış, ~%70 kod azaltma",
        },
        cgv: {
          summary: "Bellek patlaması ve API darboğazını kök nedenden çözüme takip etti",
          detail: "• Her sabah bellek patlaması (8GB) → özel bellek logger ile kök neden takibi\n• tiktoken kodlayıcı her çağrıda yeniden oluşturuluyor → singleton deseni, ~300MB'ye stabilize\n• Tarih bazlı tam inceleme sorgusu O(n²) → önbellek tablosu ile O(n), render 3000ms → 300ms\n• API çağrı paralelleştirmesi: render 52~6300ms → 2~3000ms",
        },
        llami: {
          summary: "17 LLM API'yi pipe deseniyle birleştiren backend mimarisi",
          detail: "• Farklı API spesifikasyonlarını (kimlik doğrulama, istek formatı, akış, yanıt) pipe deseniyle soyutladı\n• Yeni model ekleme = bir pipe yazmak → minimum genişleme maliyeti\n• ReadableStream tabanlı akış ile gerçek zamanlı model yanıt iletimi, pipe aşamasında format normalleştirme\n• Modeller arası function-call spesifikasyonu birleşik soyutlama → frontend model fark etmeksizin tek arayüz\n• Toss Payments en iyi uygulama seçildi",
        },
        worktree: {
          summary: "PTY oturum tabanlı sunucu durumu yönetimi ve süreç kurtarma sistemi",
          detail: "• Node.js Custom HTTP Server + WebSocket upgrade ile PTY oturum yönetimi\n• PTY oturumları sunucu durumunun kaynağı — JSON durum tutarsızlığı çözüldü\n• lsof tabanlı yetim süreç tespiti ve kurtarma — çökme/yeniden başlatmada mevcut süreçleri yeniden kullanır\n• chokidar + sync lock (500ms) ile çift yönlü plan senkronizasyonu, sonsuz döngü önleme",
        },
      },
      education: { name: "Sungkyul Üniversitesi", dept: "Bilgisayar Mühendisliği (Ayrıldı)" },
      techStack: {
        core: ["TypeScript", "Node.js", "ElysiaJS"],
        state: ["Valtio"],
        ui: ["React", "Next.js"],
        backend: ["Supabase", "PostgreSQL", "Python"],
        infra: ["Docker", "AWS", "Jenkins", "GitHub Actions", "Claude Code"],
      },
    },
  },

  // ════════════════════════════════════════
  // FRONTEND
  // ════════════════════════════════════════
  frontend: {
    ko: {
      position: "프론트엔드 개발자",
      tagline: "반복되는 화면 개발 병목을 프레임워크·생성기·검증 시스템으로 전환해 개발 속도를 높이는 개발자입니다.",
      intro: "반복되는 화면 개발 병목을\n프레임워크·생성기·검증 시스템으로 전환해 개발 속도를 높이는 개발자입니다.",
      career: {
        runup: {
          role: "프로덕트 엔지니어 리드 / 프론트엔드 개발자",
          summary: "100개+ ERP/MES 화면 개발 압력을 프레임워크, page generator, generated page QA runtime으로 나누어 해결했습니다.",
        },
        poul: {
          role: "프론트엔드 개발자",
          summary: "CGV 분석 대시보드와 LLAMI 봇스토어/앱에서 데이터 탐색, 채팅, WebView bridge 흐름을 제품 화면으로 구현했습니다.",
        },
      },
      projects: {
        dynamos: {
          summary: "100개+ ERP/MES 화면 개발 병목을 프론트엔드 플랫폼으로 전환한 프로젝트",
          detail: "• 화면마다 useState, hook, props 전달, 필터/그리드/버튼 구현 방식이 달라 신규 개발자가 화면 하나를 수정하려면 전체 흐름을 읽어야 했음\n• core component와 Store + Context 기반 페이지 구조를 설계해 props drilling과 페이지별 상태 혼선을 줄임\n• 컬럼·필터·버튼 정의를 config로 분리해 화면은 코어 컴포넌트 조립만 남기는 선언적 구조로 전환\n• Storybook + Mock Backend로 API 완성 전에도 화면과 요청/응답 스펙을 먼저 고정하는 프론트 선행 개발 흐름 구축",
        },
        generator: {
          summary: "V1 화면 정보를 V2 index.tsx/config.ts 초안으로 변환하는 page generator",
          detail: "• V1 화면 정보를 사람이 읽고 V2 코드로 옮기는 작업이 화면 전환 속도의 반복 병목이었음\n• V1 HTML/JS/widgetprop/elements 데이터를 분석해 V2 index.tsx와 config.ts 초안을 생성하는 DynaMOS Generator 파이프라인 구축\n• 레거시 화면 복원을 수작업이 아니라 생성 가능한 페이지 패턴으로 전환",
        },
        dynavite: {
          summary: "generated page를 전체 앱 없이 검증하는 사일로 QA runtime",
          detail: "• generated page 검증을 위해 전체 Next 앱, 인증, 세션, backend API를 모두 띄워야 해 사일로 내부 QA 루프가 느렸음\n• mock auth/API/session을 주입한 dynaVite runtime으로 page 단위 filter/grid/button surface를 빠르게 확인하도록 구성\n• 생성된 화면 검증을 전체 앱 실행에서 단일 page harness 검증으로 줄임",
        },
        agentSilo: {
          summary: "브랜치별 QA 피드백을 병렬 처리하기 위한 에이전트 사일로 운영 시스템",
          detail: "• 여러 브랜치의 QA 피드백을 동시에 처리할 때 server 재시작, terminal 이동, 작업 맥락 복구가 반복되던 문제를 에이전트 사일로 운영 흐름으로 정리\n• branch별 dev server, web terminal, plan, health check를 관리해 각 사일로가 독립적으로 구현·검증·보고할 수 있게 구성",
        },
        cgv: {
          summary: "CGV 리뷰/바이럴 분석 결과를 운영자가 보는 대시보드 화면으로 제품화한 프로젝트",
          detail: "• 실관람평, AI 감정/유해성 분석, 위험 리뷰, 한줄평, 바이럴 지표가 흩어져 있어 운영자가 매일 확인할 화면 흐름이 필요했음\n• 날짜별 그래프, AI 키워드 분석, 위험 리뷰 필터링, 바이럴 감정/트렌드 화면을 설계·구현\n• API 병렬 처리와 캐싱 구조 개선에 맞춰 대량 리뷰 데이터를 빠르게 탐색할 수 있는 화면 구조 구성\n• 데이터 수집부터 운영 화면까지 이어지는 분석 대시보드를 0→1로 구현",
        },
        llami: {
          summary: "챗봇 탐색, 실시간 채팅, 앱 bridge까지 AI 서비스 화면을 0→1로 구현한 프로젝트",
          detail: "• 봇스토어에서 카테고리/태그 기반 탐색을 위해 BotCard, BotGrid, 검색/필터/태그 컴포넌트 구조를 설계\n• 텍스트 채팅과 캐릭터 비주얼 채팅을 같은 대화 상태 위에서 전환되도록 구현해 탐색→체험→대화 흐름 연결\n• 게스트 체험, 로그인 전환, 대화 히스토리, 스트리밍 응답을 연결해 챗봇 마켓플레이스의 핵심 사용 흐름 구현\n• Expo 앱에서는 WebView postMessage 기반 Bridge/ReverseBridge를 설계해 웹 개발자가 네이티브 기능을 호출하고 상태를 구독할 수 있게 함",
        },
        worktree: {
          summary: "QA 병렬 처리와 브랜치 전환 컨텍스트 유실을 줄이기 위해 만든 개발 대시보드",
          detail: "• 여러 브랜치를 동시에 처리할 때 서버 재시작, 의존성 설치, 터미널 이동, 작업 맥락 복구가 반복되던 문제를 worktree 운영 시스템으로 전환\n• 브랜치별 dev server, web terminal, plan, health check를 한 화면에서 관리하는 대시보드 구축\n• Claude Code를 worktree별 터미널에서 실행하고 plan을 양방향 동기화해 사람과 AI가 같은 작업 맥락을 유지하도록 구성\n• QA 피드백을 해당 worktree에서 바로 처리하고 다른 브랜치는 중단 없이 병렬 진행하는 흐름 구축",
        },
      },
      education: { name: "성결대학교", dept: "컴퓨터공학과 (중퇴)" },
      techStack: {
        core: ["TypeScript", "React", "Next.js"],
        state: ["Valtio"],
        ui: ["Tailwind CSS", "AG Grid", "Storybook", "Expo"],
        backend: ["Node.js"],
        infra: ["Docker", "AWS", "GitHub Actions", "Claude Code"],
      },
    },

    en: {
      position: "Frontend Developer",
      tagline: "I turn complex frontend systems into readable development flows.",
      intro: "I read legacy code and recurring bottlenecks first, then build declarative structures, small PR workflows, documentation, and automation so teams can keep improving. In DynaMOS v2 I reorganized the framework and development process; in CGV-ASSISTANT and LLAMI I traced real product UI and performance issues through to delivery.",
      career: {
        runup: {
          role: "Product Engineering Lead / Frontend Developer",
          summary: "Analyzed legacy code and designed declarative framework — ~25x PR velocity improvement, ~70% code reduction. Introduced PR process, code review culture, and Storybook-based documentation.",
        },
        poul: {
          role: "Frontend Developer",
          summary: "Traced and resolved rendering bottlenecks in CGV collaboration service. Designed and built the entire chatbot marketplace frontend for LLAMI. Selected as Toss Payments best practice.",
        },
      },
      projects: {
        dynamos: {
          summary: "Transformed legacy structure into a declarative framework, accelerating team development",
          detail: "• Legacy analysis: pages with useState/hooks everywhere, no documentation, unmaintainable\n• Redefined requirements → declarative structure with config + core component composition\n• Valtio choice: proxy subscription for fine-grained render control + minimized team learning curve\n• Storybook + Mock removed backend dependency, frontend pre-defines API spec\n• Git Flow + code review, then AI page auto-generation workflow after stabilization\n• ~25x PR velocity improvement, ~70% code reduction, ~85% fewer re-renders",
        },
        cgv: {
          summary: "Tracked down recurring memory explosions and stabilized the service",
          detail: "• Daily morning memory spikes → wrote custom memory logger to trace root cause\n• tiktoken encoder missing singleton pattern was the root cause → applied and stabilized\n• Replaced inefficient date-based API queries with caching table, ~10x rendering speed improvement\n• Designed complete viral analysis UI/UX and sentiment visualization",
        },
        llami: {
          summary: "Designed and built the entire AI chatbot marketplace frontend",
          detail: "• Tag-based filtering/sorting — BotCard, BotGrid, search/filter/tag components for category browsing UX\n• Dual chat: text mode and character visual mode — UI mode switches while maintaining conversation state\n• Bridge/ReverseBridge on webview — native features with React syntax only\n• OpenAI Assistant API-based streaming chat with conversation history management\n• Selected as Toss Payments best practice",
        },
        worktree: {
          summary: "Built a system to solve parallel development bottlenecks no existing tool could handle",
          detail: "• Multi-branch parallel work bottleneck during QA → no suitable tool existed, built from scratch\n• xterm.js multi-session web terminal + Claude Code integration for AI plan generation\n• Dashboard worktree create/delete/complete, one-click dev server management\n• Structured view (progress bar + status toggle) and editable Raw view",
        },
      },
      education: { name: "Sungkyul University", dept: "Computer Science (Withdrawn)" },
      techStack: {
        core: ["TypeScript", "React", "Next.js"],
        state: ["Valtio"],
        ui: ["Tailwind CSS", "AG Grid", "Storybook", "Expo"],
        backend: ["Node.js"],
        infra: ["Docker", "AWS", "GitHub Actions", "Claude Code"],
      },
    },

    tr: {
      position: "Frontend Geliştirici",
      tagline: "Karmaşık frontend yapılarını okunabilir geliştirme akışlarına dönüştürürüm.",
      intro: "Önce legacy kodu ve tekrarlayan darboğazları okur, ardından bildirimsel yapılar, küçük PR akışları, dokümantasyon ve otomasyonla ekibin sürekli iyileştirebileceği bir düzen kurarım. DynaMOS v2'de framework ve geliştirme sürecini düzenledim; CGV-ASSISTANT ve LLAMI'de gerçek ürün UI'ı ve performans sorunlarını teslimata kadar takip ettim.",
      career: {
        runup: {
          role: "Product Engineering Lead / Frontend Geliştirici",
          summary: "Legacy kodu analiz edip bildirimsel framework tasarladı — PR hızında ~25 kat artış, ~%70 kod azaltma. PR süreci, kod inceleme kültürü ve Storybook dokümantasyonu tanıttı.",
        },
        poul: {
          role: "Frontend Geliştirici",
          summary: "CGV işbirliği servisinde render darboğazlarını takip edip çözdü. LLAMI için chatbot pazarı frontend'ini tasarlayıp geliştirdi. Toss Payments en iyi uygulama seçildi.",
        },
      },
      projects: {
        dynamos: {
          summary: "Legacy yapıyı bildirimsel framework'e dönüştürerek ekip geliştirme hızını artırdı",
          detail: "• Legacy analiz: her sayfada useState/hook, dokümantasyon yok, bakım yapılamaz\n• Gereksinimleri yeniden tanımlama → config + çekirdek bileşen montajıyla bildirimsel yapı\n• Valtio tercihi: proxy aboneliği ile ince taneli render kontrolü + ekip öğrenme eğrisini minimize\n• Storybook + Mock ile backend bağımlılığı kaldırıldı, frontend API spesifikasyonunu ön tanımlar\n• Git Flow + kod inceleme, sonra stabilizasyon sonrası AI sayfa otomatik oluşturma\n• PR hızında ~25 kat artış, ~%70 kod azaltma, ~%85 daha az yeniden render",
        },
        cgv: {
          summary: "Tekrarlayan bellek patlamalarını takip edip servisi stabilize etti",
          detail: "• Her sabah bellek patlaması → özel bellek logger ile kök neden takibi\n• tiktoken kodlayıcıda singleton eksikliği kök neden → uygulandı ve stabilize edildi\n• Verimsiz tarih bazlı API sorgularını önbellek tablosuyla değiştirdi, ~10 kat render hızı artışı\n• Viral analiz UI/UX tasarımı ve duygu görselleştirmesi",
        },
        llami: {
          summary: "AI chatbot pazarı frontend tasarımı ve geliştirmesinin tamamı",
          detail: "• Etiket tabanlı filtreleme/sıralama — BotCard, BotGrid, arama/filtre/etiket bileşenleri\n• Çift mod sohbet: metin modu ve karakter görsel modu — sohbet durumunu koruyarak UI modu geçişi\n• Webview üzerinde Bridge/ReverseBridge — sadece React söz dizimiyle native özellikler\n• OpenAI Assistant API tabanlı akış sohbet ve konuşma geçmişi yönetimi\n• Toss Payments en iyi uygulama seçildi",
        },
        worktree: {
          summary: "Mevcut araçların çözemediği paralel geliştirme darboğazını çözen sistem",
          detail: "• QA'da çoklu branch paralel çalışma darboğazı → uygun araç yok, sıfırdan tasarladı\n• xterm.js çoklu oturum web terminali + Claude Code entegrasyonu ile AI plan oluşturma\n• Pano üzerinden worktree oluşturma/silme/tamamlama, tek tıkla dev sunucu yönetimi\n• İlerleme çubuğu + durum değiştirme yapılandırılmış görünüm ve düzenlenebilir Ham görünüm",
        },
      },
      education: { name: "Sungkyul Üniversitesi", dept: "Bilgisayar Mühendisliği (Ayrıldı)" },
      techStack: {
        core: ["TypeScript", "React", "Next.js"],
        state: ["Valtio"],
        ui: ["Tailwind CSS", "AG Grid", "Storybook", "Expo"],
        backend: ["Node.js"],
        infra: ["Docker", "AWS", "GitHub Actions", "Claude Code"],
      },
    },
  },
};

// ── Company overrides (partial, merged on top of content[variant][locale]) ──

// ── Shared LLAMI overrides (used by both zeta and planfit) ──

const llamiChatOverride = {
  fullstack: {
    ko: "• 다수 LLM API를 pipe 패턴으로 통합, 신규 모델 추가 시 pipe 하나만 작성\n• OpenAI Assistant API 기반 실시간 스트리밍 채팅 및 대화 히스토리 관리\n• 텍스트/캐릭터 비주얼 듀얼 모드 채팅 — 대화 상태를 유지하면서 UI 모드만 전환하는 구조 설계\n• 웹뷰 기반 Bridge/ReverseBridge로 React 문법만으로 네이티브 기능 활용\n• Toss Payments 우수사례 선정",
    en: "• Unified multiple LLM APIs with pipe pattern, adding new model = writing one pipe\n• OpenAI Assistant API-based real-time streaming chat with conversation history management\n• Text/character visual dual-mode chat — UI mode switches while maintaining conversation state\n• Bridge/ReverseBridge on webview — native features with React syntax only\n• Selected as Toss Payments best practice",
    tr: "• Birden fazla LLM API'yi pipe deseniyle birleştirdi, yeni model = bir pipe yazmak\n• OpenAI Assistant API tabanlı gerçek zamanlı akış sohbet ve konuşma geçmişi yönetimi\n• Metin/karakter görsel çift mod sohbet — sohbet durumunu koruyarak UI modu geçişi\n• Webview üzerinde Bridge/ReverseBridge — sadece React söz dizimiyle native özellikler\n• Toss Payments en iyi uygulama seçildi",
  },
  frontend: {
    ko: "• 태그 기반 필터링/정렬 — BotCard, BotGrid, 검색/필터/태그 컴포넌트로 카테고리 탐색 UX 설계\n• OpenAI Assistant API 기반 실시간 스트리밍 채팅 및 대화 히스토리 관리\n• 텍스트/캐릭터 비주얼 듀얼 모드 채팅 — 대화 상태를 유지하면서 UI 모드만 전환하는 구조 설계\n• 웹뷰 기반 Bridge/ReverseBridge로 React 문법만으로 네이티브 기능 활용\n• Toss Payments 우수사례 선정",
    en: "• Tag-based filtering/sorting — BotCard, BotGrid, search/filter/tag components for category browsing UX\n• OpenAI Assistant API-based real-time streaming chat with conversation history management\n• Text/character visual dual-mode chat — UI mode switches while maintaining conversation state\n• Bridge/ReverseBridge on webview — native features with React syntax only\n• Selected as Toss Payments best practice",
    tr: "• Etiket tabanlı filtreleme/sıralama — BotCard, BotGrid, arama/filtre/etiket bileşenleri\n• OpenAI Assistant API tabanlı gerçek zamanlı akış sohbet ve konuşma geçmişi yönetimi\n• Metin/karakter görsel çift mod sohbet — sohbet durumunu koruyarak UI modu geçişi\n• Webview üzerinde Bridge/ReverseBridge — sadece React söz dizimiyle native özellikler\n• Toss Payments en iyi uygulama seçildi",
  },
} as const;

function buildLlamiOverride(variant: "fullstack" | "frontend") {
  const locales = ["ko", "en", "tr"] as const;
  return Object.fromEntries(
    locales.map((l) => [l, { projects: { llami: { detail: llamiChatOverride[variant][l] } } }]),
  ) as Record<Locale, DeepPartial<PdfContent>>;
}

const companyOverrides: Record<
  Exclude<Company, "default">,
  DeepPartial<Record<PdfVariant, Record<Locale, PdfContent>>>
> = {
  zeta: {
    fullstack: buildLlamiOverride("fullstack"),
    frontend: buildLlamiOverride("frontend"),
  },
  planfit: {
    fullstack: buildLlamiOverride("fullstack"),
    frontend: buildLlamiOverride("frontend"),
  },
};

// ── Merge utility ──

export function deepMerge<T extends object>(
  base: T,
  override?: DeepPartial<T>,
): T {
  if (!override) return base;
  const result = { ...base };
  for (const key of Object.keys(override) as (keyof T)[]) {
    const ov = override[key];
    if (ov === undefined) continue;
    if (
      typeof ov === "object" &&
      ov !== null &&
      !Array.isArray(ov) &&
      typeof base[key] === "object" &&
      base[key] !== null &&
      !Array.isArray(base[key])
    ) {
      result[key] = deepMerge(
        base[key] as object,
        ov as DeepPartial<object>,
      ) as T[keyof T];
    } else {
      result[key] = ov as T[keyof T];
    }
  }
  return result;
}

export function getPdfContent(
  variant: PdfVariant,
  locale: Locale,
  company: Company,
): PdfContent {
  const base = content[variant][locale];
  if (company === "default") return base;
  const override = companyOverrides[company]?.[variant]?.[locale];
  return deepMerge(base, override as DeepPartial<PdfContent> | undefined);
}

// ── Company config (non-content display settings) ──

export interface FitnessData {
  total: string;
  stats: string[];
}

export interface CompanyConfig {
  profileImage: string;
  showFitness: boolean;
  fitness?: Record<Locale, FitnessData>;
  projectOrder: ("dynamos" | "generator" | "dynavite" | "agentSilo" | "cgv" | "llami" | "worktree")[];
}

const defaultConfig: CompanyConfig = {
  profileImage: "/logo/profile.jpg",
  showFitness: false,
  projectOrder: ["dynamos", "generator", "dynavite", "agentSilo", "cgv", "llami", "worktree"],
};

export const companyConfigs: Record<Company, CompanyConfig> = {
  default: defaultConfig,
  zeta: {
    ...defaultConfig,
    projectOrder: ["dynamos", "generator", "dynavite", "agentSilo", "llami", "cgv", "worktree"],
  },
  planfit: {
    profileImage: "/logo/profile.jpg",
    showFitness: true,
    fitness: {
      ko: {
        total: "3대중량 400kg",
        stats: ["데드리프트 160kg", "스쿼트 140kg", "벤치프레스 100kg"],
      },
      en: {
        total: "Big 3 Total 400kg",
        stats: ["Deadlift 160kg", "Squat 140kg", "Bench Press 100kg"],
      },
      tr: {
        total: "3 Büyük Toplam 400kg",
        stats: ["Deadlift 160kg", "Squat 140kg", "Bench Press 100kg"],
      },
    },
    projectOrder: ["dynamos", "generator", "dynavite", "agentSilo", "cgv", "llami", "worktree"],
  },
};

export { content, companyOverrides };
