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
      tagline: "팀에 없던 구조와 프로세스를 직접 만들어 정착시켜 온 개발자입니다.",
      intro: "합류한 팀의 코드베이스를 관찰하고, 반복되는 병목의 윤곽을 파악하여 구조·프로세스·도구를 직접 만들어 해결합니다. Git Flow와 코드리뷰 문화를 도입하고, Storybook 기반 선행 개발 환경을 구축하여 백엔드 의존 없이 프론트가 먼저 움직이는 체계를 만들었습니다. 도구가 없으면 직접 만들고, 구조가 예측 가능해지면 AI를 활용한 자동화까지 도입합니다.",
      career: {
        runup: {
          role: "풀스택 개발자",
          summary: "ERP/MES 프론트엔드를 처음부터 설계·구축하여 PR 속도 약 25배 향상, 코드량 약 70% 감소를 달성했습니다. 선언적 아키텍처 설계부터 Git Flow/PR 프로세스, AI 자동화 도입까지 주도했습니다.",
        },
        poul: {
          role: "풀스택 개발자",
          summary: "CGV 합작 감정 분석 서비스, AI 플랫폼 LLAMI 등 다수 프로젝트를 풀스택으로 개발했습니다. 서비스가 Toss Payments 우수사례에 선정되었습니다.",
        },
      },
      projects: {
        dynamos: {
          summary: "레거시 구조를 선언적 프레임워크로 전환하여 팀 개발 속도를 끌어올린 프로젝트",
          detail: "• 페이지마다 useState/훅 난립, 문서화 없음 → 신규 인원이 건드릴 수 없는 구조\n• 요구사항을 재정의하고 선언적 프레임워크를 처음부터 설계·구축\n• Valtio 도입: ref()로 렌더링 제어 + 팀 러닝커브 최소화\n• Storybook + Mock으로 백엔드 의존 없이 프론트 선행 개발 체계 확립\n• PR 프로세스 없던 팀에 Git Flow + 코드리뷰 도입 → 구조 안정화 후 AI 페이지 자동생성\n• PR 속도 약 25배 향상, 코드량 약 70% 감소, 리렌더링 약 85% 감소",
        },
        cgv: {
          summary: "반복되는 메모리 폭주를 직접 추적하여 안정화한 프로젝트",
          detail: "• 매일 아침 반복되던 메모리 폭주 → 메모리 로거 직접 작성하여 원인 추적\n• tiktoken 인코더 싱글톤 미적용이 근본 원인 → 적용 후 안정화\n• 날짜별 API 비효율 조회 구조를 캐싱 테이블로 개선, 렌더링 속도 약 10배 향상\n• 바이럴 분석 UI/UX 전체 설계, 감정 분석 시각화 구현",
        },
        llami: {
          summary: "다수의 LLM API를 단일 인터페이스로 통합한 AI 플랫폼",
          detail: "• 다수 LLM API의 서로 다른 스펙(인증, 포맷, 스트리밍)을 pipe 패턴으로 통합\n• 신규 모델 추가 시 pipe 하나만 작성 → 확장 비용 최소화\n• 웹뷰 기반 Bridge/ReverseBridge로 React 문법만으로 네이티브 기능 활용\n• AI 챗봇 마켓플레이스(봇스토어) 프론트엔드 전체 설계·개발\n• Toss Payments 우수사례 선정",
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
      tagline: "반복되는 병목의 근본 원인을 추적하고, 구조적으로 해결하는 개발자입니다.",
      intro: "메모리 폭주의 원인을 로거로 추적하고, O(n²) API를 캐싱 테이블로 개선하고, 17개 LLM API의 서로 다른 스펙을 pipe 패턴으로 통합했습니다. 프론트엔드 경험을 바탕으로 API 스펙을 소비자 관점에서 설계하며, 구조가 안정되면 AI 자동화까지 도입합니다.",
      career: {
        runup: {
          role: "풀스택 개발자",
          summary: "ERP/MES 시스템의 프론트엔드 프레임워크를 설계·구축하며 API 스펙 설계를 주도했습니다. Storybook + Mock 환경으로 프론트가 API 스펙을 선정의하는 체계를 만들어 개발 속도를 향상시켰습니다.",
        },
        poul: {
          role: "풀스택 개발자",
          summary: "17개 LLM API를 pipe 패턴으로 통합하는 아키텍처를 설계하고, CGV 합작 서비스의 메모리 폭주/렌더링 병목을 직접 추적하여 해결했습니다. Toss Payments 우수사례 선정.",
        },
      },
      projects: {
        dynamos: {
          summary: "프론트엔드 프레임워크 설계를 통해 API 스펙 주도권을 확보한 프로젝트",
          detail: "• Storybook + Mock Backend 환경 구축 → 프론트가 API 스펙(요청/응답)을 먼저 정의하고 백엔드에 전달\n• Valtio 기반 17개 스토어 설계 — 프론트 상태와 API 응답 구조를 일치시켜 변환 로직 최소화\n• 선언적 config + 코어 컴포넌트 구조로 페이지 패턴 예측 가능 → AI 페이지 자동생성\n• PR 속도 약 25배 향상, 코드량 약 70% 감소",
        },
        cgv: {
          summary: "메모리 폭주와 API 병목을 근본 원인부터 추적하여 해결한 프로젝트",
          detail: "• 매일 아침 반복되던 메모리 폭주(8GB) → 메모리 로거 직접 작성하여 원인 추적\n• tiktoken 인코더가 호출마다 재생성되는 것이 근본 원인 → 싱글톤 적용 후 ~300MB로 안정화\n• 날짜별 전체 리뷰 조회 O(n²) 구조 → 캐싱 테이블 도입으로 O(n) 개선, 렌더링 3000ms → 300ms\n• API 호출 병렬화 적용: 렌더링 52~6300ms → 2~3000ms",
        },
        llami: {
          summary: "17개 LLM API를 pipe 패턴으로 통합한 백엔드 아키텍처",
          detail: "• 모델마다 다른 API 스펙(인증, 요청 포맷, 스트리밍, 응답 구조)을 pipe 패턴으로 추상화\n• 신규 모델 추가 = pipe 하나 작성 → 확장 비용 최소화\n• ReadableStream 기반 스트리밍으로 모델 응답 실시간 전달, pipe 단계에서 포맷 정규화\n• function-call 스펙을 모델 간 통합 추상화 → 프론트엔드가 모델 무관하게 동일 인터페이스 사용\n• Toss Payments 우수사례 선정",
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
      tagline: "코드베이스를 읽고, 구조적 병목을 파악하고, 실질적인 개선을 만드는 개발자입니다.",
      intro: "합류한 프로젝트의 코드를 먼저 읽고, 반복되는 문제의 윤곽을 파악한 뒤 움직입니다. 짧고 읽히는 코드를 선호하고, 핫픽스 남발보다 원인을 끝까지 파고들어 해결하는 쪽을 택합니다. PR은 작게 쪼개되 히스토리를 체계적으로 관리하고, 길어지는 논의는 이슈 티켓으로 빼고, 컨벤션은 린터로 자동화하여 팀이 코드에 집중할 수 있는 환경을 만듭니다.",
      career: {
        runup: {
          role: "프론트엔드 개발자",
          summary: "레거시 코드 분석 후 선언적 프레임워크를 설계하여 PR 속도 약 25배 향상, 코드량 약 70% 감소를 달성했습니다. PR 프로세스와 코드리뷰 문화를 도입하고, Storybook 기반 문서화를 구축했습니다.",
        },
        poul: {
          role: "프론트엔드 개발자",
          summary: "CGV 합작 서비스에서 렌더링 병목을 직접 추적하여 해결했습니다. LLAMI에서 챗봇 마켓플레이스 프론트엔드를 전체 설계·개발했으며, 서비스가 Toss Payments 우수사례에 선정되었습니다.",
        },
      },
      projects: {
        dynamos: {
          summary: "레거시 구조를 선언적 프레임워크로 전환하여 팀 개발 속도를 끌어올린 프로젝트",
          detail: "• 기존 코드 분석: 페이지마다 useState/훅 난립, 문서화 없음, 유지보수 불가 구조\n• 요구사항 재정의 → config + 코어 컴포넌트 조립 기반 선언적 구조 설계\n• Valtio 선택 근거: 프록시 구독으로 렌더링 세밀 제어 + 팀 러닝커브 최소화\n• Storybook + Mock으로 백엔드 의존 제거, API 스펙을 프론트가 선정의\n• Git Flow + 코드리뷰 도입, 구조 안정화 후 AI 페이지 자동생성 워크플로우 확장\n• PR 속도 약 25배 향상, 코드량 약 70% 감소, 리렌더링 약 85% 감소",
        },
        cgv: {
          summary: "반복되는 메모리 폭주를 직접 추적하여 안정화한 프로젝트",
          detail: "• 매일 아침 반복되던 메모리 폭주 → 메모리 로거 직접 작성하여 원인 추적\n• tiktoken 인코더 싱글톤 미적용이 근본 원인 → 적용 후 안정화\n• 날짜별 API 비효율 조회 구조를 캐싱 테이블로 개선, 렌더링 속도 약 10배 향상\n• 바이럴 분석 UI/UX 전체 설계, 감정 분석 시각화 구현",
        },
        llami: {
          summary: "AI 챗봇 마켓플레이스 프론트엔드 전체 설계·개발",
          detail: "• 태그 기반 필터링/정렬 — BotCard, BotGrid, 검색/필터/태그 컴포넌트로 카테고리 탐색 UX 설계\n• 텍스트 모드와 캐릭터 비주얼 모드 듀얼 채팅 — 대화 상태를 유지하면서 UI 모드만 전환\n• 웹뷰 기반 Bridge/ReverseBridge로 React 문법만으로 네이티브 기능 활용\n• OpenAI Assistant API 기반 스트리밍 채팅 및 대화 히스토리 관리\n• Toss Payments 우수사례 선정",
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
      tagline: "A developer who reads codebases, identifies structural bottlenecks, and delivers real improvements.",
      intro: "I read the codebase first, identify recurring problem patterns, then act. I prefer short, readable code and choose to dig into root causes over quick hotfixes. I split PRs small with systematic history management, move long discussions to issue tickets, and automate conventions with linters so the team can focus on code.",
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
      tagline: "Kod tabanını okuyup yapısal darboğazları tespit ederek gerçek iyileştirmeler yapan bir geliştirici.",
      intro: "Önce kod tabanını okur, tekrarlayan sorun kalıplarını tespit eder, sonra harekete geçerim. Kısa ve okunabilir kod tercih ederim, hızlı düzeltmeler yerine kök nedeni araştırmayı seçerim. PR'ları küçük tutup sistematik geçmiş yönetimi yapar, uzayan tartışmaları issue biletlerine taşır ve konvansiyonları linter ile otomatikleştiririm.",
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
