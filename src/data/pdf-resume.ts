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
      tagline: "화면과 API의 병목을 직접 확인하고 개선해 온 개발자입니다.",
      intro: "프로젝트에 합류하면 먼저 코드와 운영 흐름을 읽고, 실제로 막히는 지점을 확인한 뒤 필요한 구조를 정리합니다. ERP/MES 화면 프레임워크, CGV 리뷰 분석 서비스, LLAMI AI 플랫폼에서 프론트엔드 화면과 백엔드 API 양쪽의 병목을 추적하고 개선했습니다.",
      career: {
        runup: {
          role: "풀스택 개발자",
          summary: "ERP/MES 화면 구조를 config와 코어 컴포넌트 중심으로 정리하고, Storybook/Mock 기반 개발 흐름과 PR 프로세스를 도입했습니다.",
        },
        poul: {
          role: "풀스택 개발자",
          summary: "CGV 리뷰 분석 서비스의 메모리·API·화면 병목을 추적했고, LLAMI에서는 LLM API 통합과 챗봇/결제 흐름 구현에 참여했습니다.",
        },
      },
      projects: {
        dynamos: {
          summary: "ERP/MES 레거시 화면을 config와 코어 컴포넌트 기반 구조로 정리한 프로젝트",
          detail: "• 합류 초기 페이지별 useState 7개+, 훅 16~20개가 얽힌 레거시 구조를 분석\n• Tab/Filter/Grid/Button/Modal을 코어 컴포넌트로 분리하고, 페이지는 config 조립만 남도록 설계\n• Valtio store 17개와 Provider 구조를 설계하여 탭·그리드·필터·모달 상태 책임을 분리\n• Storybook + Mock Backend로 백엔드 대기 없이 화면과 API 스펙을 먼저 검증하는 흐름 구축\n• Git Flow, PR, 코드리뷰 프로세스를 도입하고 안정화된 패턴을 AI 페이지 생성 워크플로우로 확장\n• PR 속도 약 25배 향상, 페이지 코드량 약 70% 감소, 리렌더링 트리거 약 85% 감소",
        },
        cgv: {
          summary: "리뷰 분석 서비스의 메모리, API 조회, 분석 화면 병목을 추적해 개선한 프로젝트",
          detail: "• 매일 아침 백엔드 메모리가 8GB까지 증가하는 현상을 발견하고 메모리 로거를 직접 추가\n• 호출마다 tiktoken 인코더가 새로 생성되는 원인을 확인해 싱글톤 패턴으로 고정, 약 300MB 수준으로 안정화\n• 날짜별 그래프 요구사항에서 전체 리뷰를 매번 분류·정렬하던 O(n²) 흐름을 캐싱 테이블 기반 O(n) 조회로 변경\n• AI 키워드 분석, 한줄평 자동 생성, 위험 리뷰 필터링과 바이럴 감정 분석 UI를 직접 설계·구현\n• 주요 화면 렌더링을 약 3000ms에서 300ms 수준으로 개선",
        },
        llami: {
          summary: "LLM API 통합과 챗봇 탐색·채팅·결제 흐름을 구현한 AI 플랫폼",
          detail: "• 17개 LLM API의 요청 형식, 스트리밍 방식, 응답 구조가 모두 달라 모델별 핸들러가 늘어나는 문제를 정리\n• 공통 처리 흐름을 pipe 단계로 나누고 모델별 차이는 필요한 pipe만 조합하도록 설계해 신규 모델 추가 비용을 축소\n• fetch ReadableStream 응답과 function-call 결과를 정규화하여 프론트가 모델과 무관하게 동일 컴포넌트로 렌더링하도록 구성\n• 봇스토어에서는 태그 필터, BotCard/Grid, 비주얼 채팅, 봇 생성/승인 흐름 등 주요 화면을 설계·구현\n• Toss Payments 결제 연동 및 크레딧 기반 모델 사용 흐름 구현, 우수사례 선정",
        },
        worktree: {
          summary: "기존 도구로 해결되지 않는 병렬 개발 문제를 직접 해결한 시스템",
          detail: "• QA 중 멀티 브랜치 병렬 작업 병목 → 적절한 도구가 없어 직접 설계·개발\n• xterm.js + Claude Code 연동으로 AI 기반 개발 플랜 자동 작성\n• chokidar + sync lock으로 대시보드 ↔ worktree 양방향 플랜 동기화",
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
          role: "Full Stack Developer",
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
          role: "Full Stack Geliştirici",
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
      tagline: "서비스 병목을 로그와 구조 개선으로 줄여 온 개발자입니다.",
      intro: "장애나 느린 화면을 결과로만 보지 않고, 로그와 호출 흐름을 따라가며 원인을 확인합니다. CGV 서비스에서는 메모리 폭주와 API 조회 병목을 추적했고, LLAMI에서는 서로 다른 LLM API 스펙을 pipe 구조로 정리했습니다. DynaMOS v2에서는 프론트 개발 흐름 안에서 API 스펙을 먼저 정리하는 방식을 만들었습니다.",
      career: {
        runup: {
          role: "풀스택 개발자",
          summary: "ERP/MES 화면 개발 과정에서 Storybook + Mock 환경을 구축하고, 프론트가 요청/응답 스펙을 먼저 정리해 백엔드와 맞추는 흐름을 만들었습니다.",
        },
        poul: {
          role: "풀스택 개발자",
          summary: "CGV 합작 서비스의 메모리 폭주와 API 병목을 추적했고, LLAMI에서는 17개 LLM API의 차이를 pipe 단계로 정리했습니다.",
        },
      },
      projects: {
        dynamos: {
          summary: "Storybook + Mock으로 API 스펙을 먼저 검증하는 개발 흐름을 만든 프로젝트",
          detail: "• 백엔드 API 완성 전까지 프론트 개발이 멈추는 병목을 확인하고 Storybook + Mock Backend 환경을 구축\n• 화면 요구사항을 먼저 쪼개 요청/응답 스펙을 프론트에서 정의한 뒤 백엔드에 전달하는 개발 흐름으로 전환\n• Valtio 기반 17개 store를 설계해 grid/tab/filter/modal 상태와 API 응답 형태를 맞추고 변환 로직을 줄임\n• config + 코어 컴포넌트 조립 구조로 페이지 패턴을 표준화하여 AI가 같은 규칙으로 페이지를 생성할 수 있게 만듦\n• PR 속도 약 25배 향상, 페이지 코드량 약 70% 감소",
        },
        cgv: {
          summary: "메모리 증가와 리뷰 조회 API 병목을 로그와 캐싱 구조로 개선한 프로젝트",
          detail: "• 매일 아침 반복되던 8GB 메모리 폭주를 재현하고, 메모리 로거를 추가해 증가 지점을 추적\n• tiktoken 인코더가 요청마다 재생성되는 것을 확인해 싱글톤으로 변경, 메모리 사용량을 약 300MB 수준으로 안정화\n• 날짜별 리뷰 그래프 API가 전체 리뷰를 가져와 분류·정렬하는 O(n²) 구조임을 확인하고 캐싱 테이블을 설계\n• 캐싱 테이블 기반 조회로 O(n)까지 낮추고, 독립 API 호출은 병렬화해 초기 렌더링 지연을 줄임\n• 렌더링 3000ms → 300ms, API 병렬 처리 구간 52~6300ms → 2~3000ms로 개선",
        },
        llami: {
          summary: "17개 LLM API의 요청·스트리밍·응답 차이를 pipe 구조로 정리한 프로젝트",
          detail: "• 모델별 인증, 요청 포맷, 스트리밍 이벤트, 응답 구조가 달라 핸들러가 늘어나는 문제를 분석\n• 요청 생성, 스트림 파싱, 토큰/크레딧 계산, function-call 정규화를 pipe 단계로 분리\n• 신규 모델은 공통 pipe를 재사용하고 차이가 나는 단계만 추가하도록 구성해 확장 비용을 낮춤\n• ReadableStream 기반 응답을 표준 이벤트로 변환해 프론트가 모델과 무관하게 동일 인터페이스를 사용하도록 설계\n• Toss Payments 결제 및 크레딧 차등 소모 흐름을 연동, 우수사례 선정",
        },
        worktree: {
          summary: "PTY 세션 기반 서버 상태 관리와 프로세스 복구 시스템",
          detail: "• Node.js Custom HTTP Server + WebSocket upgrade로 PTY 세션 관리\n• PTY 세션을 서버 상태의 source of truth로 — JSON 상태 불일치 문제 해결\n• lsof 기반 orphan 프로세스 탐지 및 복구 — 크래시/재시작 시 기존 프로세스 재활용\n• chokidar + sync lock(500ms)으로 양방향 플랜 동기화, 무한 루프 방지",
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
          role: "Full Stack Developer",
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
          role: "Full Stack Geliştirici",
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
      tagline: "레거시 화면 구조와 사용자 흐름을 정리해 온 프론트엔드 개발자입니다.",
      intro: "기존 화면의 상태 흐름과 반복 패턴을 먼저 읽고, config·코어 컴포넌트·작은 PR 단위로 정리하는 일을 해왔습니다. ERP/MES 화면 프레임워크를 정리했고, CGV 분석 대시보드와 LLAMI 챗봇 화면에서는 실제 사용 흐름과 성능 병목을 따라가며 개선했습니다.",
      career: {
        runup: {
          role: "프론트엔드 개발자",
          summary: "ERP/MES 레거시 화면을 config와 코어 컴포넌트 기반으로 정리하고, Storybook 문서화와 PR 단위 개발 흐름을 만들었습니다.",
        },
        poul: {
          role: "프론트엔드 개발자",
          summary: "CGV 분석 대시보드의 화면 병목과 시각화 흐름을 개선했고, LLAMI에서는 챗봇 탐색·채팅 UI와 앱 브릿지 흐름을 구현했습니다.",
        },
      },
      projects: {
        dynamos: {
          summary: "ERP/MES 레거시 화면을 config와 코어 컴포넌트 기반으로 정리한 프로젝트",
          detail: "• 페이지마다 useState 7개+, 훅 16~20개가 얽힌 코드를 분석하고 반복 패턴을 Tab/Filter/Grid/Button/Modal로 분리\n• 컬럼·필터·버튼 정의는 config로 빼고, 화면은 코어 컴포넌트를 조립하는 선언적 구조로 재설계\n• Valtio store와 Provider를 직접 설계해 페이지 레벨 상태를 줄이고, useSnapshot으로 필요한 값만 구독하게 구성\n• Storybook + Mock으로 API 완성 전에도 화면을 개발·검증하고, 프론트가 요청/응답 스펙을 먼저 정리하도록 프로세스 변경\n• Git Flow + 코드리뷰 도입 후 안정화된 페이지 패턴을 AI 페이지 자동생성 워크플로우로 확장\n• PR 속도 약 25배 향상, 페이지 코드량 약 70% 감소, 리렌더링 트리거 약 85% 감소",
        },
        cgv: {
          summary: "분석 대시보드의 렌더링 병목과 리뷰/바이럴 시각화 흐름을 개선한 프로젝트",
          detail: "• CGV 실관람평/바이럴 데이터를 수집·분석하는 대시보드에서 느린 렌더링과 메모리 증가 현상을 추적\n• 메모리 로거로 tiktoken 인코더 재생성 문제를 찾아 싱글톤으로 고정하고, 백엔드 메모리를 약 300MB 수준으로 안정화\n• 날짜별 그래프가 전체 리뷰를 매번 분류·정렬하던 구조를 캐싱 테이블 기반 조회로 바꿔 렌더링을 약 10배 개선\n• AI 키워드 분석, 한줄평 자동 생성, 위험 리뷰 필터링, 바이럴 감정/트렌드 화면을 직접 설계·구현",
        },
        llami: {
          summary: "챗봇 탐색, 채팅 UI, 앱 브릿지 흐름을 구현한 AI 서비스",
          detail: "• 봇스토어에서 카테고리/태그 기반 탐색을 위해 BotCard, BotGrid, 검색/필터/태그 컴포넌트 구조를 설계\n• 일반 텍스트 채팅과 캐릭터 이미지가 함께 보이는 비주얼 채팅을 같은 대화 상태 위에서 전환되도록 구현\n• OpenAI Assistant API 스트리밍 응답과 대화 히스토리를 연결해 게스트 체험, 로그인 전환, 채팅 지속 흐름을 구성\n• 라미 앱에서는 WebView postMessage 기반 Bridge/ReverseBridge를 설계해 웹 개발자가 React 문법으로 네이티브 기능을 호출하도록 지원\n• Toss Payments 결제 및 크레딧 충전 흐름과 연결되어 우수사례 선정",
        },
        worktree: {
          summary: "기존 도구로 해결되지 않는 병렬 개발 문제를 직접 해결한 시스템",
          detail: "• QA 중 멀티 브랜치 병렬 작업 병목 → 적절한 도구가 없어 직접 설계·개발\n• xterm.js 기반 멀티 세션 웹 터미널 + Claude Code 연동 AI 플랜 자동 작성\n• 대시보드에서 worktree 생성/삭제/완료, 개발 서버 원클릭 관리\n• 진행률 바 + 상태 토글의 구조화된 뷰와 직접 편집 가능한 Raw 뷰 제공",
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
          role: "Frontend Developer",
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
          role: "Frontend Geliştirici",
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
  projectOrder: ("dynamos" | "cgv" | "llami" | "worktree")[];
}

const defaultConfig: CompanyConfig = {
  profileImage: "/images/profile.jpg",
  showFitness: false,
  projectOrder: ["dynamos", "cgv", "llami", "worktree"],
};

export const companyConfigs: Record<Company, CompanyConfig> = {
  default: defaultConfig,
  zeta: {
    ...defaultConfig,
    projectOrder: ["dynamos", "llami", "cgv", "worktree"],
  },
  planfit: {
    profileImage: "/images/gym.jpg",
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
    projectOrder: ["dynamos", "cgv", "llami", "worktree"],
  },
};

export { content, companyOverrides };
