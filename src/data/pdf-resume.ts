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
          summary: "ERP/MES 화면 개발, 레거시 전환, QA 운영을 묶은 DynaMOS 개발 시스템",
          detail: "• 100개+ 업무 화면을 빠르게 전환해야 했지만, 화면마다 상태관리·필터·그리드·버튼 구현 방식이 달라 개발 속도와 품질이 흔들리는 문제가 있었습니다.\n• 이 문제는 화면을 더 많이 구현하는 방식으로는 해결하기 어렵다고 판단했고, core component와 Store + Context 기반 페이지 구조를 설계해 화면 개발을 표준 패턴 조립으로 전환했습니다.\n• 컬럼·필터·버튼 정의를 config로 분리하고 Storybook + Mock Backend를 붙여, API 완성 전에도 화면과 요청/응답 스펙을 먼저 고정할 수 있게 만들었습니다.",
        },
        generator: {
          summary: "V1 화면 정보를 V2 index.tsx/config.ts 초안으로 변환하는 page generator",
          detail: "• V1 화면 정보를 사람이 읽고 V2 코드로 옮기는 작업이 레거시 전환 속도의 반복 병목이었습니다.\n• V1 HTML/JS/widgetprop/elements 데이터를 분석해 V2 index.tsx와 config.ts 초안을 생성하는 DynaMOS Generator 파이프라인을 구축했습니다.\n• 레거시 전환을 수동 복원 작업이 아니라 규칙 기반 생성 문제로 바꿔 화면 전환 비용을 낮췄습니다.",
        },
        dynavite: {
          summary: "generated page를 전체 앱 없이 검증하는 사일로 QA runtime",
          detail: "• generated page 하나를 확인하려고 전체 Next 앱, 인증, 세션, backend API를 모두 띄워야 해서 사일로 내부 QA 루프가 느려지는 문제가 있었습니다.\n• 생성 화면 검증은 전체 앱 실행이 아니라 page 단위 surface 확인으로 줄여야 한다고 판단했고, dynaVite runtime에 mock auth/API/session을 주입했습니다.\n• 그 결과 filter/grid/button surface를 단일 page harness에서 빠르게 확인할 수 있게 되어 generated page QA 피드백 속도를 높였습니다.",
        },
        agentSilo: {
          summary: "task/page 단위 사일로로 구현·QA·리뷰를 분리해 개발 처리량과 릴리즈 속도를 끌어올린 개발 운영 시스템",
          detail: "• 여러 화면 이슈를 한 작업 공간에서 처리하면 브랜치 전환, QA 대기, 실패한 실험 롤백이 반복되어 개발 속도와 리뷰 품질이 함께 떨어지는 문제가 있었습니다.\n• 이 문제는 에이전트 수를 늘리는 것만으로는 해결되지 않는다고 판단했고, 메인 오케스트레이터가 task/issue/page 단위 사일로를 만들고 필요한 repo만 격리 clone한 뒤 새 작업 브랜치에서 처리하도록 운영 구조를 설계했습니다.\n• 사일로 내부에서는 개발 에이전트가 구현하고 QA 에이전트가 agent-browser로 검증하며, 리뷰 에이전트가 scope, branch, secret, SSoT 승격 후보를 점검하도록 역할을 분리했습니다.\n• DynaMOS QA 운영에서 사일로 기반 병렬 처리 흐름으로 4일간 62개 PR을 처리했고, 기존 수동 브랜치 전환 운영 대비 PR 처리량을 약 2.5~3배로 높이면서 리뷰 반복과 릴리즈 대기 시간을 줄였습니다.",
        },
        cgv: {
          summary: "영화 리뷰와 바이럴 데이터를 수집·분석하는 CGV 운영 대시보드",
          detail: "• CGV 실관람평과 바이럴 데이터를 매일 운영자가 확인해야 했지만, 메모리 증가와 느린 리뷰 조회 API 때문에 분석 대시보드의 안정성과 응답성이 흔들리는 문제가 있었습니다.\n• 먼저 운영 병목을 화면 문제가 아니라 backend 호출 흐름 문제로 보고, 메모리 로거로 원인을 추적해 tiktoken 인코더가 요청마다 재생성되는 지점을 찾았습니다.\n• 인코더 생성 흐름을 싱글톤 구조로 바꾸고, 날짜별 그래프 조회는 캐싱 테이블 기반 조회와 API 병렬화로 전환해 운영 대시보드 응답성을 개선했습니다.\n• 그 위에 리뷰 수집, AI 감정/유해성 분석, 위험 리뷰 필터링, 한줄평 생성, 바이럴 트렌드 화면을 연결해 매일 확인 가능한 분석 서비스로 제품화했습니다.",
        },
        llami: {
          summary: "17개 LLM API 차이를 통합하고 여러 product surface를 구현한 AI 플랫폼",
          detail: "• 모델마다 인증, 요청 포맷, 스트리밍 이벤트, function-call 응답이 달라 신규 모델 추가 때마다 handler가 늘어나는 문제가 있었습니다.\n• 요청 생성, stream parsing, token/credit 계산, function-call 정규화를 pipe 단계로 분리해 모델별 차이를 조합 가능한 처리 단위로 전환했습니다.\n• 모델 응답을 단일 인터페이스로 정규화해 프론트가 모델 차이를 몰라도 같은 컴포넌트로 렌더링하도록 구성했습니다.\n• 이 구조 위에서 모델스토어, 봇스토어, 라미챗, Expo 앱까지 여러 product surface를 구현했습니다.",
        },
        worktree: {
          summary: "QA 병렬 처리와 작업 컨텍스트 유실 문제를 해결하기 위해 만든 개발 운영 시스템",
          detail: "• 여러 브랜치를 동시에 처리할 때마다 서버 재시작, 의존성 설치, 터미널 이동, 작업 맥락 복구가 반복되는 문제가 있었습니다.\n• 이 문제는 개인 기억이나 수동 체크리스트로 해결하기 어렵다고 판단했고, branch별 dev server, web terminal, plan, health check를 한곳에서 관리하는 worktree 대시보드를 구축했습니다.\n• PTY 세션을 서버 상태의 source of truth로 두고 plan을 양방향 동기화해, 사람과 AI가 같은 작업 맥락을 유지하면서 QA 피드백을 병렬로 처리할 수 있게 만들었습니다.",
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
      tagline: "",
      intro: "I turn recurring bottlenecks across UI, API, QA, and development process\ninto systems that improve product development speed.",
      career: {
        runup: {
          role: "Product Engineering Lead / Full Stack Developer",
          summary: "Structured the pressure of converting 100+ ERP/MES screens into a frontend framework, generator, QA runtime, and worktree operating system.",
        },
        poul: {
          role: "Full Stack Developer",
          summary: "Connected operational analytics, API stabilization, LLM integration, and product surfaces into working service flows in CGV-ASSISTANT and LLAMI.",
        },
      },
      projects: {
        dynamos: {
          summary: "DynaMOS development system for ERP/MES screen development, legacy conversion, and QA operation",
          detail: "• The team had to convert 100+ business screens quickly, but each screen handled state, filters, grids, and buttons differently, which made development speed and quality unstable.\n• I judged that implementing more screens would not solve the repeated pattern problem, so I designed core components and a Store + Context page structure to turn screen development into standardized composition.\n• I separated column, filter, and button definitions into config and connected Storybook + Mock Backend so the team could fix screen behavior and request/response contracts before the real API was ready.",
        },
        generator: {
          summary: "Page generator that converts V1 screen data into V2 index.tsx/config.ts drafts",
          detail: "• Reading V1 screen information and manually moving it into V2 code was becoming a repeated bottleneck in the legacy conversion process.\n• I judged that this should be handled as a rule-based transformation problem rather than manual restoration, so I analyzed V1 HTML/JS/widgetprop/elements data.\n• I connected that analysis to the DynaMOS Generator pipeline, which creates V2 index.tsx and config.ts drafts and reduces the cost of converting legacy screens.",
        },
        dynavite: {
          summary: "Silo QA runtime for validating generated pages without the full app",
          detail: "• To verify one generated page, the team had to run the full Next app, auth flow, session state, and backend APIs, which made the silo QA loop slow.\n• I judged that generated page QA should be reduced to page-level surface checks, so I injected mock auth/API/session into the dynaVite runtime.\n• As a result, filter/grid/button surfaces could be checked in a single page harness, improving the feedback speed of generated page QA.",
        },
        agentSilo: {
          summary: "Development operation system that separates implementation, QA, and review into task/page-level silos to raise throughput and release speed",
          detail: "• When multiple screen issues were handled in one workspace, branch switching, QA waiting time, and failed experiment rollbacks repeatedly slowed development speed and review quality.\n• I judged that simply adding more agents would not solve the operating bottleneck, so I designed a main-orchestrator flow that creates task/issue/page-level silos, clones only the required repos, and works on isolated branches.\n• Inside each silo, developer agents implement, QA agents verify with agent-browser, and review agents inspect scope, branch, secrets, and SSoT promotion candidates.\n• In DynaMOS QA operation, this silo-based parallel flow handled 62 PRs in 4 days and increased PR throughput by roughly 2.5-3x compared with manual branch-switching operation while reducing review loops and release waiting time.",
        },
        cgv: {
          summary: "CGV operations dashboard for collecting and analyzing movie review and viral data",
          detail: "• CGV operators needed to review audience and viral data every day, but memory growth and slow review APIs made the analytics dashboard unstable and less responsive.\n• I treated the bottleneck as a backend call-flow and data-query problem rather than a screen-only issue, then traced the tiktoken encoder being recreated per request with memory logging.\n• I moved encoder creation to a singleton structure, changed date-based graph queries to cached-table reads with parallel API calls, and improved dashboard responsiveness.\n• On top of that, I connected review collection, AI sentiment/toxicity analysis, risky-review filtering, short review generation, and viral trend screens into a daily analytics service.",
        },
        llami: {
          summary: "AI platform that unifies 17 LLM APIs and delivers multiple product surfaces",
          detail: "• Each model had different auth, request format, streaming events, and function-call responses, so adding a new model kept increasing handler code.\n• I judged that model-specific handlers would keep raising maintenance cost, so I separated request creation, stream parsing, token/credit calculation, and function-call normalization into pipe stages.\n• I normalized model responses into a single interface so the frontend could render responses with the same components regardless of model differences.\n• On top of this structure, I implemented multiple product surfaces including Model Store, Bot Store, LLAMI Chat, and the Expo app.",
        },
        worktree: {
          summary: "Development operation system for parallel QA handling and work context preservation",
          detail: "• Handling multiple branches at once repeatedly required server restarts, dependency setup, and context recovery.\n• I systematized this with a worktree dashboard that manages branch-specific dev servers, web terminals, plans, and health checks in one place.\n• PTY sessions became the source of truth for server state, and bidirectional plan sync kept dashboard context aligned with worktree-local work context.",
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
      tagline: "",
      intro: "Ekran, API, QA ve geliştirme sürecindeki tekrarlayan darboğazları\nürün geliştirme hızını artıran sistemlere dönüştüren geliştiriciyim.",
      career: {
        runup: {
          role: "Product Engineering Lead / Full Stack Geliştirici",
          summary: "100+ ERP/MES ekran dönüşüm baskısını frontend framework, generator, QA runtime ve worktree işletim sistemi olarak yapılandırdı.",
        },
        poul: {
          role: "Full Stack Geliştirici",
          summary: "CGV-ASSISTANT ve LLAMI'de operasyonel analiz, API stabilizasyonu, LLM entegrasyonu ve ürün yüzeylerini çalışan servis akışlarına bağladı.",
        },
      },
      projects: {
        dynamos: {
          summary: "ERP/MES ekran geliştirme, legacy dönüşüm ve QA operasyonunu birleştiren DynaMOS geliştirme sistemi",
          detail: "• Ekip 100+ iş ekranını hızlı dönüştürmek zorundaydı; ancak her ekran state, filtre, grid ve butonları farklı şekilde yönettiği için hız ve kalite dalgalanıyordu.\n• Daha fazla ekran yazmanın bu tekrarlayan problemi çözmeyeceğine karar verdim ve ekran geliştirmeyi standart kompozisyona çevirmek için core component ve Store + Context sayfa yapısı tasarladım.\n• Kolon, filtre ve buton tanımlarını config'e ayırdım; Storybook + Mock Backend ile gerçek API hazır olmadan ekran davranışını ve request/response contract'larını sabitleyen akış kurdum.",
        },
        generator: {
          summary: "V1 ekran verisini V2 index.tsx/config.ts taslaklarına dönüştüren page generator",
          detail: "• V1 ekran bilgisini okuyup V2 koda elle taşımak legacy dönüşümde tekrarlayan bir darboğaz haline geliyordu.\n• Bunun elle restorasyon değil kural tabanlı dönüşüm problemi olarak ele alınması gerektiğine karar verdim ve V1 HTML/JS/widgetprop/elements verilerini analiz ettim.\n• Bu analizi V2 index.tsx ve config.ts taslakları üreten DynaMOS Generator pipeline'ına bağlayarak legacy ekran dönüşüm maliyetini düşürdüm.",
        },
        dynavite: {
          summary: "Generated page'leri tam uygulama olmadan doğrulayan silo QA runtime",
          detail: "• Tek bir generated page'i doğrulamak için tüm Next uygulaması, auth akışı, session ve backend API'leri çalıştırmak gerekiyordu; bu da silo QA döngüsünü yavaşlatıyordu.\n• Generated page QA'nın page-level surface kontrolüne indirgenmesi gerektiğine karar verdim ve dynaVite runtime'a mock auth/API/session enjekte ettim.\n• Böylece filter/grid/button surface'leri tek page harness içinde hızlıca kontrol edilebilir hale geldi ve QA geri bildirim hızı arttı.",
        },
        agentSilo: {
          summary: "Implementasyon, QA ve review'u task/page bazlı silo'lara ayırarak throughput ve release hızını artıran geliştirme operasyon sistemi",
          detail: "• Birden fazla screen issue tek workspace içinde işlenince branch switching, QA bekleme süresi ve başarısız deney rollback'leri tekrar ediyor; geliştirme hızı ve review kalitesi birlikte düşüyordu.\n• Sadece daha fazla agent eklemenin bu operasyon darboğazını çözmeyeceğine karar verdim ve main orchestrator'ın task/issue/page bazlı silo oluşturduğu, sadece gerekli repo'ları clone ettiği ve izole branch'lerde çalıştığı akışı tasarladım.\n• Her silo içinde developer agent implementasyon yapar, QA agent agent-browser ile doğrular, review agent ise scope, branch, secret ve SSoT promotion adaylarını kontrol eder.\n• DynaMOS QA operasyonunda bu silo tabanlı paralel akış 4 günde 62 PR işledi ve manuel branch switching operasyonuna kıyasla PR throughput'unu yaklaşık 2.5-3x artırırken review tekrarını ve release bekleme süresini azalttı.",
        },
        cgv: {
          summary: "Film yorumları ve viral verileri toplayıp analiz eden CGV operasyon dashboard'u",
          detail: "• CGV operatörlerinin yorum ve viral verileri her gün incelemesi gerekiyordu; ancak memory growth ve yavaş review API'leri analytics dashboard'un stabilitesini ve yanıt hızını bozuyordu.\n• Darboğazı sadece ekran problemi değil backend call-flow ve data-query problemi olarak ele aldım; memory logging ile tiktoken encoder'ın her request'te yeniden oluşturulduğunu buldum.\n• Encoder oluşturmayı singleton yapısına taşıdım, tarih bazlı grafik sorgularını cache table read ve parallel API call yapısına çevirdim.\n• Bunun üzerine review collection, AI sentiment/toxicity analysis, risky-review filtering, short review generation ve viral trend ekranlarını bağlayarak günlük analiz servisi haline getirdim.",
        },
        llami: {
          summary: "17 LLM API farkını birleştiren ve birden fazla product surface sunan AI platformu",
          detail: "• Her modelin auth, request formatı, streaming event ve function-call response yapısı farklıydı; bu yüzden yeni model ekledikçe handler kodu büyüyordu.\n• Model-specific handler sayısını artırmanın bakım maliyetini yükselteceğine karar verdim ve request creation, stream parsing, token/credit calculation ve function-call normalization adımlarını pipe aşamalarına böldüm.\n• Model yanıtlarını tek arayüze normalize ederek frontend'in model farklarını bilmeden aynı component'lerle render etmesini sağladım.\n• Bu yapı üzerinde Model Store, Bot Store, LLAMI Chat ve Expo app gibi birden fazla product surface geliştirdim.",
        },
        worktree: {
          summary: "QA paralel işleme ve çalışma bağlamı kaybını azaltmak için kurulan geliştirme operasyon sistemi",
          detail: "• Birden fazla branch aynı anda işlendiğinde server restart, dependency setup, terminal geçişi ve çalışma bağlamını geri yükleme tekrar eden bir probleme dönüşüyordu.\n• Bunun kişisel hafıza veya manuel checklist ile çözülemeyeceğine karar verdim ve branch bazlı dev server, web terminal, plan ve health check'i tek yerde yöneten bir worktree dashboard kurdum.\n• PTY session'larını server state'in source of truth'u yaptım ve plan'ı çift yönlü senkronize ederek insan ve AI'nın aynı çalışma bağlamını koruyup QA feedback'lerini paralel işlemesini sağladım.",
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
          summary: "레거시 backend contract와 generated frontend API 호출 정책을 맞추는 전환 프로젝트",
          detail: "• V1/V2 전환에서는 화면을 생성하는 것만으로 충분하지 않았고, Spring/MyBatis endpoint method와 mapper statement가 FE 호출 방식과 맞아야 하는 문제가 있었습니다.\n• 그래서 generated page의 API 호출 정책을 먼저 안정화해야 한다고 판단했고, dynamosconvert의 /mos/request method와 create/modify/remove mapper prefix를 조사해 PUT/POST/deleteList 사용 정책을 분류했습니다.\n• V1 snapshot data에서 page source를 생성할 때 backend query contract와 어긋나는 stale method output을 찾아 page generator 정책 보정 근거를 마련했습니다.\n• Storybook + Mock Backend로 실제 API 완성 전에도 요청/응답 형태를 먼저 고정해 backend 연동 리스크를 줄이는 흐름을 구축했습니다.",
        },
        cgv: {
          summary: "CGV 리뷰/바이럴 분석 서비스의 backend 안정화 프로젝트",
          detail: "• 매일 아침 백엔드 메모리가 8GB까지 증가하고 날짜별 리뷰 그래프 API가 느려지는 문제가 반복됐습니다.\n• 이 문제를 단순 서버 증설이 아니라 호출 흐름과 데이터 조회 구조의 문제로 판단했고, 메모리 로거로 tiktoken 인코더가 요청마다 재생성되는 원인을 확인했습니다.\n• 인코더 생성 흐름을 싱글톤 구조로 전환해 백엔드 메모리 사용량을 약 300MB 수준으로 안정화했습니다.\n• 전체 리뷰를 매번 가져와 분류·정렬하던 O(n²) 조회 흐름은 캐싱 테이블 기반 조회와 독립 API 병렬화로 바꿔 운영 대시보드의 응답성을 개선했습니다.",
        },
        llami: {
          summary: "17개 LLM API의 요청·스트리밍·응답 차이를 통합하는 LLM worker 프로젝트",
          detail: "• 모델마다 인증, 요청 포맷, streaming event, 응답 구조, function-call 스펙이 달라 신규 모델 추가 시 handler가 계속 늘어나는 문제가 있었습니다.\n• 모델별 handler를 계속 늘리는 방식은 유지보수 비용을 키운다고 판단했고, 요청 생성, stream parsing, token/credit 계산, function-call 정규화를 pipe 단계로 분리했습니다.\n• ReadableStream 응답을 표준 이벤트로 변환해 프론트가 모델 차이를 몰라도 단일 인터페이스로 렌더링하도록 구성했습니다.\n• 이 구조 위에서 모델별 크레딧 차등 소모와 결제 흐름을 연결해 모델 사용, 충전, workspace 공유 흐름을 구현했습니다.",
        },
        worktree: {
          summary: "브랜치별 dev server와 terminal 상태를 안정적으로 관리하는 개발 운영 시스템",
          detail: "• 여러 worktree의 dev server 상태가 JSON 기록과 실제 프로세스 사이에서 어긋나고, branch 전환 때마다 terminal 상태 복구가 반복되는 문제가 있었습니다.\n• 이 문제를 terminal 상태가 흩어지는 운영 문제로 판단했고, Node.js Custom HTTP Server와 WebSocket upgrade로 PTY session을 관리하는 구조를 구축했습니다.\n• lsof 기반 orphan process 탐지로 crash/restart 이후에도 기존 server process를 복구하고, chokidar와 sync lock으로 plan을 양방향 동기화해 backend contract 분석과 API 검증 맥락이 유실되지 않게 만들었습니다.",
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
      intro: "I turn recurring bottlenecks in API, data processing, and LLM integration\ninto structured and automated systems.",
      career: {
        runup: {
          role: "Product Engineering Lead / Full Stack Developer",
          summary: "Analyzed ERP/MES legacy backend contracts and built conversion and verification flows aligned with generated page API policies.",
        },
        poul: {
          role: "Full Stack Developer",
          summary: "Stabilized memory/API bottlenecks in CGV and organized 17 LLM APIs in LLAMI into a pipe-based integration structure.",
        },
      },
      projects: {
        dynamos: {
          summary: "Project aligning legacy backend contracts with generated frontend API call policies",
          detail: "• In the V1/V2 conversion, generating screens was not enough; Spring/MyBatis endpoint methods and mapper statements also had to match the FE call policy.\n• I judged that generated page API policies had to be stabilized first, then analyzed /mos/request methods and create/modify/remove mapper prefixes in dynamosconvert to classify PUT/POST/deleteList usage.\n• I identified stale method outputs that conflicted with backend query contracts while generating page source from V1 snapshot data, and used them as grounds to adjust generator policy.\n• With Storybook + Mock Backend, request/response shapes could be fixed before the real API was ready, reducing backend integration risk.",
        },
        cgv: {
          summary: "Backend stabilization project for CGV review and viral analytics service",
          detail: "• Backend memory repeatedly grew to 8GB in the morning, and the date-based review graph API was slow.\n• I treated this as a call-flow and query-structure problem rather than a server-size problem, then used memory logging to find that the tiktoken encoder was recreated per request.\n• I moved encoder creation into a singleton structure and stabilized backend memory usage to around 300MB.\n• I also replaced the O(n²) full-review classification/sort flow with cached-table reads and parallel API calls, improving dashboard responsiveness.",
        },
        llami: {
          summary: "LLM worker project unifying request, streaming, and response differences across 17 LLM APIs",
          detail: "• Each model had different auth, request format, streaming events, response structure, and function-call specs, so adding a new model kept increasing handler code.\n• I judged that model-specific handlers would keep raising maintenance cost, so I separated request creation, stream parsing, token/credit calculation, and function-call normalization into pipe stages.\n• I transformed ReadableStream responses into standard events so the frontend could render through a single interface regardless of model differences.\n• On top of that structure, I connected model-specific credit consumption, payment, model usage, charging, and workspace sharing flows.",
        },
        worktree: {
          summary: "PTY session-based server state management and process recovery system",
          detail: "• Dev server state across multiple worktrees could diverge between JSON records and real processes, and terminal state recovery repeated on every branch switch.\n• I judged this as an operations problem caused by scattered terminal state, so I built a PTY session management structure with a Node.js Custom HTTP Server and WebSocket upgrade.\n• I added lsof-based orphan process detection to recover existing server processes after crash/restart, and used chokidar with a sync lock to keep plans synchronized in both directions without losing backend contract analysis and API verification context.",
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
      intro: "API, veri işleme ve LLM entegrasyonundaki tekrarlayan darboğazları\nyapılandırılmış ve otomatik sistemlere dönüştüren geliştiriciyim.",
      career: {
        runup: {
          role: "Product Engineering Lead / Full Stack Geliştirici",
          summary: "ERP/MES legacy backend contract'larını analiz edip generated page API policy ile uyumlu conversion ve verification akışları kurdu.",
        },
        poul: {
          role: "Full Stack Geliştirici",
          summary: "CGV'de memory/API darboğazlarını stabilize etti; LLAMI'de 17 LLM API'yi pipe tabanlı entegrasyon yapısına dönüştürdü.",
        },
      },
      projects: {
        dynamos: {
          summary: "Legacy backend contract ile generated frontend API call policy'lerini hizalayan dönüşüm projesi",
          detail: "• V1/V2 dönüşümünde sadece ekran üretmek yeterli değildi; Spring/MyBatis endpoint method'ları ve mapper statement'ları FE çağrı politikasıyla uyumlu olmalıydı.\n• Bu yüzden generated page API policy'nin önce stabilize edilmesi gerektiğine karar verdim ve dynamosconvert içinde /mos/request method'larını ve create/modify/remove mapper prefix'lerini inceleyerek PUT/POST/deleteList kullanımını sınıflandırdım.\n• V1 snapshot data'dan page source üretirken backend query contract ile çelişen stale method output'larını bulup generator policy düzeltme gerekçesi haline getirdim.\n• Storybook + Mock Backend ile gerçek API hazır olmadan request/response şekillerini sabitledim ve backend integration riskini azalttım.",
        },
        cgv: {
          summary: "CGV review ve viral analytics servisinin backend stabilizasyon projesi",
          detail: "• Backend memory her sabah tekrar 8GB'a kadar yükseliyor ve tarih bazlı review graph API yavaş çalışıyordu.\n• Bunu server büyüklüğü değil call-flow ve query structure problemi olarak ele aldım; memory logging ile tiktoken encoder'ın her request'te yeniden oluşturulduğunu buldum.\n• Encoder oluşturmayı singleton yapısına taşıyarak backend memory kullanımını yaklaşık 300MB seviyesinde stabilize ettim.\n• Tüm review'ları her seferinde sınıflandırıp sıralayan O(n²) akışı cache table read ve parallel API call yapısına çevirerek dashboard yanıt hızını iyileştirdim.",
        },
        llami: {
          summary: "17 LLM API'nin request, streaming ve response farklarını birleştiren LLM worker projesi",
          detail: "• Her modelin auth, request formatı, streaming event, response structure ve function-call spec'i farklıydı; bu yüzden yeni model ekledikçe handler kodu artıyordu.\n• Model-specific handler sayısını artırmanın bakım maliyetini yükselteceğine karar verdim ve request creation, stream parsing, token/credit calculation ve function-call normalization adımlarını pipe aşamalarına böldüm.\n• ReadableStream yanıtlarını standart event'lere dönüştürerek frontend'in model farklarını bilmeden tek arayüzle render etmesini sağladım.\n• Bu yapı üzerinde model-specific credit consumption, payment, model usage, charging ve workspace sharing akışlarını bağladım.",
        },
        worktree: {
          summary: "PTY oturum tabanlı sunucu durumu yönetimi ve süreç kurtarma sistemi",
          detail: "• Birden fazla worktree'de dev server state JSON kayıtları ile gerçek process'ler arasında ayrışabiliyor, her branch geçişinde terminal state recovery tekrar ediyordu.\n• Bunu dağınık terminal state'ten kaynaklanan bir operasyon problemi olarak ele aldım ve Node.js Custom HTTP Server ile WebSocket upgrade kullanan PTY session management yapısı kurdum.\n• lsof tabanlı orphan process detection ile crash/restart sonrasında mevcut server process'lerini geri kullandım, chokidar ve sync lock ile plan'ı çift yönlü senkronize ederek backend contract analysis ve API verification bağlamını korudum.",
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
          summary: "100개+ ERP/MES 업무 화면을 표준화하는 프론트엔드 플랫폼 프로젝트",
          detail: "• 화면마다 useState, hook, props 전달, 필터/그리드/버튼 구현 방식이 달라 신규 개발자가 화면 하나를 수정하려면 전체 흐름을 읽어야 하는 문제가 있었습니다.\n• 이 문제는 화면별 구현을 계속 정리하는 방식으로는 반복될 것이라고 판단했고, core component와 Store + Context 기반 페이지 구조를 설계했습니다.\n• 그 결과 props drilling과 페이지별 상태 혼선을 줄이고, 컬럼·필터·버튼 정의를 config로 분리해 화면은 코어 컴포넌트 조립만 남기는 선언적 구조로 전환했습니다.\n• Storybook + Mock Backend를 붙여 API 완성 전에도 화면과 요청/응답 스펙을 먼저 고정하는 프론트 선행 개발 흐름을 구축했습니다.",
        },
        generator: {
          summary: "V1 화면 정보를 V2 index.tsx/config.ts 초안으로 변환하는 page generator",
          detail: "• V1 화면 정보를 사람이 읽고 V2 코드로 옮기는 작업이 화면 전환 속도의 반복 병목이었습니다.\n• 이 작업은 사람의 수작업보다 규칙 기반 변환으로 다루는 것이 맞다고 판단했고, V1 HTML/JS/widgetprop/elements 데이터를 분석했습니다.\n• 분석 결과를 V2 index.tsx와 config.ts 초안으로 생성하는 DynaMOS Generator 파이프라인으로 연결해, 레거시 화면 복원을 생성 가능한 페이지 패턴으로 전환했습니다.",
        },
        dynavite: {
          summary: "generated page를 전체 앱 없이 검증하는 사일로 QA runtime",
          detail: "• generated page 검증을 위해 전체 Next 앱, 인증, 세션, backend API를 모두 띄워야 해 사일로 내부 QA 루프가 느렸습니다.\n• mock auth/API/session을 주입한 dynaVite runtime으로 page 단위 filter/grid/button surface를 빠르게 확인하도록 구성했습니다.\n• 생성된 화면 검증을 전체 앱 실행에서 단일 page harness 검증으로 줄였습니다.",
        },
        agentSilo: {
          summary: "task/page 단위 사일로로 구현·QA·리뷰를 분리해 개발 처리량과 릴리즈 속도를 끌어올린 개발 운영 시스템",
          detail: "• 여러 화면 이슈를 한 작업 공간에서 처리하면 브랜치 전환, QA 대기, 실패한 실험 롤백이 반복되어 개발 속도와 리뷰 품질이 함께 떨어지는 문제가 있었습니다.\n• 이 문제는 에이전트 수를 늘리는 것만으로는 해결되지 않는다고 판단했고, 메인 오케스트레이터가 task/issue/page 단위 사일로를 만들고 필요한 repo만 격리 clone한 뒤 새 작업 브랜치에서 처리하도록 운영 구조를 설계했습니다.\n• 사일로 내부에서는 개발 에이전트가 구현하고 QA 에이전트가 agent-browser로 검증하며, 리뷰 에이전트가 scope, branch, secret, SSoT 승격 후보를 점검하도록 역할을 분리했습니다.\n• DynaMOS QA 운영에서 사일로 기반 병렬 처리 흐름으로 4일간 62개 PR을 처리했고, 기존 수동 브랜치 전환 운영 대비 PR 처리량을 약 2.5~3배로 높이면서 리뷰 반복과 릴리즈 대기 시간을 줄였습니다.",
        },
        cgv: {
          summary: "CGV 리뷰/바이럴 분석 결과를 운영자가 확인하는 분석 대시보드",
          detail: "• 실관람평, AI 감정/유해성 분석, 위험 리뷰, 한줄평, 바이럴 지표가 흩어져 있어 운영자가 매일 확인할 화면 흐름이 필요했습니다.\n• 단순 차트 나열보다 운영자가 매일 보는 의사결정 흐름으로 묶어야 한다고 판단했고, 날짜별 그래프, AI 키워드 분석, 위험 리뷰 필터링, 바이럴 감정/트렌드 화면을 설계·구현했습니다.\n• API 병렬 처리와 캐싱 구조 개선에 맞춰 대량 리뷰 데이터를 빠르게 탐색할 수 있는 화면 구조를 구성했습니다.\n• 그 결과 데이터 수집부터 운영 화면까지 이어지는 분석 대시보드를 0→1로 구현했습니다.",
        },
        llami: {
          summary: "챗봇 탐색, 실시간 채팅, 앱 bridge까지 AI 서비스 화면을 0→1로 구현한 프로젝트",
          detail: "• 봇스토어, 라미챗, Expo 앱이 각각 다른 화면처럼 흩어지면 사용자가 탐색, 체험, 대화, 로그인 전환을 하나의 흐름으로 이해하기 어려운 문제가 있었습니다.\n• 그래서 카테고리/태그 탐색, 텍스트 채팅, 캐릭터 비주얼 채팅, 게스트 체험, 로그인 전환을 같은 대화 상태와 사용 흐름 위에 얹는 방향으로 설계했습니다.\n• BotCard, BotGrid, 검색/필터/태그 컴포넌트와 스트리밍 응답 화면을 구현해 챗봇 마켓플레이스의 핵심 사용 흐름을 만들었습니다.\n• Expo 앱에서는 WebView postMessage 기반 Bridge/ReverseBridge를 설계해 웹 개발자가 네이티브 기능을 호출하고 상태를 구독할 수 있게 했습니다.",
        },
        worktree: {
          summary: "QA 병렬 처리와 브랜치 전환 컨텍스트 유실을 줄이기 위해 만든 개발 대시보드",
          detail: "• 여러 브랜치를 동시에 처리할 때 서버 재시작, 의존성 설치, 터미널 이동, 작업 맥락 복구가 반복되어 QA 피드백 처리 속도가 느려지는 문제가 있었습니다.\n• 이 문제는 branch 전환을 줄이고 작업 환경을 격리해야 해결된다고 판단했고, branch별 dev server, web terminal, plan, health check를 한 화면에서 관리하는 worktree 대시보드를 구축했습니다.\n• Claude Code를 worktree별 터미널에서 실행하고 plan을 양방향 동기화해 사람과 AI가 같은 작업 맥락을 유지하도록 구성했습니다.\n• 그 결과 QA 피드백을 해당 worktree에서 바로 처리하고 다른 브랜치는 중단 없이 병렬 진행하는 운영 흐름을 만들었습니다.",
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
      tagline: "I turn repeated screen development bottlenecks into frameworks, generators, and validation systems.",
      intro: "I turn repeated screen development bottlenecks\ninto frameworks, generators, and validation systems that improve development speed.",
      career: {
        runup: {
          role: "Product Engineering Lead / Frontend Developer",
          summary: "Solved the pressure of building 100+ ERP/MES screens through a frontend framework, page generator, and generated page QA runtime.",
        },
        poul: {
          role: "Frontend Developer",
          summary: "Implemented product surfaces for CGV analytics and LLAMI Bot Store/App, connecting data exploration, chat, and WebView bridge flows.",
        },
      },
      projects: {
        dynamos: {
          summary: "Frontend platform project standardizing 100+ ERP/MES business screens",
          detail: "• Each screen handled useState, hooks, props, filters, grids, and buttons differently, so new developers had to read the entire flow just to modify one screen.\n• I judged that this would repeat if handled screen by screen, so I designed core components and a Store + Context page structure.\n• As a result, props drilling and page-level state confusion were reduced, and column/filter/button definitions moved into config so screens became declarative compositions of core components.\n• Storybook + Mock Backend made it possible to fix screens and request/response contracts before the real API was complete.",
        },
        generator: {
          summary: "Page generator that converts V1 screen data into V2 index.tsx/config.ts drafts",
          detail: "• Reading V1 screen information and manually moving it into V2 code was a repeated bottleneck in screen conversion.\n• I judged that this should be handled as a rule-based transformation rather than manual work, then analyzed V1 HTML/JS/widgetprop/elements data.\n• I connected that analysis to the DynaMOS Generator pipeline, which creates V2 index.tsx and config.ts drafts and turns legacy screen restoration into a generatable page pattern.",
        },
        dynavite: {
          summary: "Silo QA runtime for validating generated pages without the full app",
          detail: "• Generated page validation required running the full Next app, auth, session, and backend APIs, which slowed down the silo QA loop.\n• I judged that generated page validation should be reduced to page-level surface checks, then built dynaVite runtime with mock auth/API/session injection.\n• This reduced validation from full-app execution to a single page harness for checking filter/grid/button surfaces.",
        },
        agentSilo: {
          summary: "Development operation system that separates implementation, QA, and review into task/page-level silos to raise throughput and release speed",
          detail: "• When multiple screen issues were handled in one workspace, branch switching, QA waiting time, and failed experiment rollbacks repeatedly slowed development speed and review quality.\n• I judged that simply adding more agents would not solve the operating bottleneck, so I designed a main-orchestrator flow that creates task/issue/page-level silos, clones only the required repos, and works on isolated branches.\n• Inside each silo, developer agents implement, QA agents verify with agent-browser, and review agents inspect scope, branch, secrets, and SSoT promotion candidates.\n• In DynaMOS QA operation, this silo-based parallel flow handled 62 PRs in 4 days and increased PR throughput by roughly 2.5-3x compared with manual branch-switching operation while reducing review loops and release waiting time.",
        },
        cgv: {
          summary: "Analytics dashboard where CGV operators review audience and viral analysis results",
          detail: "• Audience reviews, AI sentiment/toxicity analysis, risky reviews, short review summaries, and viral metrics were scattered, so operators needed a daily screen flow.\n• I judged that this should be organized as an operational decision flow rather than a list of charts, then designed and implemented date graphs, AI keyword analysis, risky-review filtering, and viral sentiment/trend screens.\n• I aligned the UI with API parallelization and caching improvements so large review datasets could be explored quickly.\n• As a result, the analytics dashboard connected data collection to operational screens from zero to one.",
        },
        llami: {
          summary: "AI service frontend covering chatbot discovery, realtime chat, and app bridge",
          detail: "• If Bot Store, LLAMI Chat, and the Expo app remained separate surfaces, users would struggle to understand discovery, trial, chat, and login transition as one flow.\n• I designed category/tag exploration, text chat, character visual chat, guest trial, and login transition on top of shared conversation state and user flow.\n• I implemented BotCard, BotGrid, search/filter/tag components, and streaming response screens to build the core chatbot marketplace experience.\n• In the Expo app, I designed a WebView postMessage-based Bridge/ReverseBridge so web developers could call native features and subscribe to native state.",
        },
        worktree: {
          summary: "Development dashboard for reducing QA parallel-processing and branch-switching context loss",
          detail: "• During multi-branch QA work, server restarts, dependency setup, terminal navigation, and context recovery repeated on every branch switch, slowing down feedback handling.\n• I judged that this required isolated branch environments rather than more manual switching, so I built a dashboard that manages branch-specific dev servers, web terminals, plans, and health checks in one screen.\n• I ran Claude Code inside each worktree terminal and synchronized plans in both directions so humans and AI could keep the same work context.\n• As a result, QA feedback could be handled directly in the relevant worktree while other branches continued in parallel.",
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
      tagline: "Tekrarlayan ekran geliştirme darboğazlarını framework, generator ve validation sistemlerine dönüştürürüm.",
      intro: "Tekrarlayan ekran geliştirme darboğazlarını\ngeliştirme hızını artıran framework, generator ve validation sistemlerine dönüştüren geliştiriciyim.",
      career: {
        runup: {
          role: "Product Engineering Lead / Frontend Geliştirici",
          summary: "100+ ERP/MES ekran geliştirme baskısını frontend framework, page generator ve generated page QA runtime ile çözdü.",
        },
        poul: {
          role: "Frontend Geliştirici",
          summary: "CGV analytics ve LLAMI Bot Store/App yüzeylerinde data exploration, chat ve WebView bridge akışlarını ürün ekranlarına dönüştürdü.",
        },
      },
      projects: {
        dynamos: {
          summary: "100+ ERP/MES iş ekranını standartlaştıran frontend platform projesi",
          detail: "• Her ekran useState, hook, props, filter, grid ve button yapılarını farklı kullandığı için yeni geliştiriciler tek bir ekranı değiştirmek için tüm akışı okumak zorundaydı.\n• Bunun ekran bazlı düzenlemeyle tekrar edeceğine karar verdim ve core component ile Store + Context sayfa yapısı tasarladım.\n• Böylece props drilling ve sayfa bazlı state karmaşasını azalttım; column/filter/button tanımlarını config'e taşıyarak ekranları core component kompozisyonuna dönüştürdüm.\n• Storybook + Mock Backend ile gerçek API tamamlanmadan ekranları ve request/response contract'larını önce sabitleyen frontend-first geliştirme akışı kurdum.",
        },
        generator: {
          summary: "V1 ekran verisini V2 index.tsx/config.ts taslaklarına dönüştüren page generator",
          detail: "• V1 ekran bilgisini okuyup V2 koda elle taşımak ekran dönüşümünde tekrarlayan bir darboğazdı.\n• Bunun manuel iş değil kural tabanlı dönüşüm olarak ele alınması gerektiğine karar verdim ve V1 HTML/JS/widgetprop/elements verilerini analiz ettim.\n• Bu analizi V2 index.tsx ve config.ts taslakları üreten DynaMOS Generator pipeline'ına bağlayarak legacy ekran restorasyonunu üretilebilir page pattern haline getirdim.",
        },
        dynavite: {
          summary: "Generated page'leri tam uygulama olmadan doğrulayan silo QA runtime",
          detail: "• Generated page doğrulamak için full Next app, auth, session ve backend API çalıştırmak gerekiyordu; bu da silo QA döngüsünü yavaşlatıyordu.\n• Generated page validation'ın page-level surface kontrolüne indirgenmesi gerektiğine karar verdim ve mock auth/API/session injection içeren dynaVite runtime kurdum.\n• Böylece validation full-app execution'dan filter/grid/button surface kontrolü yapan single page harness'a indirildi.",
        },
        agentSilo: {
          summary: "Implementasyon, QA ve review'u task/page bazlı silo'lara ayırarak throughput ve release hızını artıran geliştirme operasyon sistemi",
          detail: "• Birden fazla screen issue tek workspace içinde işlenince branch switching, QA bekleme süresi ve başarısız deney rollback'leri tekrar ediyor; geliştirme hızı ve review kalitesi birlikte düşüyordu.\n• Sadece daha fazla agent eklemenin bu operasyon darboğazını çözmeyeceğine karar verdim ve main orchestrator'ın task/issue/page bazlı silo oluşturduğu, sadece gerekli repo'ları clone ettiği ve izole branch'lerde çalıştığı akışı tasarladım.\n• Her silo içinde developer agent implementasyon yapar, QA agent agent-browser ile doğrular, review agent ise scope, branch, secret ve SSoT promotion adaylarını kontrol eder.\n• DynaMOS QA operasyonunda bu silo tabanlı paralel akış 4 günde 62 PR işledi ve manuel branch switching operasyonuna kıyasla PR throughput'unu yaklaşık 2.5-3x artırırken review tekrarını ve release bekleme süresini azalttı.",
        },
        cgv: {
          summary: "CGV operatörlerinin review ve viral analysis sonuçlarını izlediği analytics dashboard",
          detail: "• Audience review, AI sentiment/toxicity analysis, risky review, short summary ve viral metric verileri dağınıktı; operatörlerin her gün takip edeceği ekran akışı gerekiyordu.\n• Bunu chart listesi değil operational decision flow olarak kurmak gerektiğine karar verdim ve date graph, AI keyword analysis, risky-review filtering, viral sentiment/trend ekranlarını tasarlayıp geliştirdim.\n• UI'yı API parallelization ve caching improvement ile uyumlu hale getirerek büyük review dataset'lerinin hızlı keşfedilmesini sağladım.\n• Sonuç olarak data collection'dan operation screen'e uzanan analytics dashboard'u sıfırdan kurdum.",
        },
        llami: {
          summary: "Chatbot discovery, realtime chat ve app bridge'i kapsayan AI service frontend",
          detail: "• Bot Store, LLAMI Chat ve Expo app ayrı surface'ler olarak kalırsa kullanıcı discovery, trial, chat ve login transition akışını tek deneyim olarak anlayamazdı.\n• Bu yüzden category/tag exploration, text chat, character visual chat, guest trial ve login transition'ı ortak conversation state ve user flow üzerine tasarladım.\n• BotCard, BotGrid, search/filter/tag component'leri ve streaming response ekranlarını geliştirerek chatbot marketplace'in core user flow'unu kurdum.\n• Expo app'te WebView postMessage tabanlı Bridge/ReverseBridge tasarlayarak web geliştiricilerin native feature çağırmasını ve native state'e subscribe olmasını sağladım.",
        },
        worktree: {
          summary: "QA paralel işleme ve branch geçişlerinde bağlam kaybını azaltan geliştirme dashboard'u",
          detail: "• Çoklu branch QA sırasında her branch geçişinde server restart, dependency setup, terminal navigation ve context recovery tekrarlanıyor, feedback işleme hızı düşüyordu.\n• Bunun daha fazla manuel geçişle değil izole branch ortamlarıyla çözüleceğine karar verdim ve branch bazlı dev server, web terminal, plan ve health check'i tek ekranda yöneten dashboard kurdum.\n• Claude Code'u her worktree terminalinde çalıştırdım ve plan'ları çift yönlü senkronize ederek insan ve AI'nın aynı çalışma bağlamını korumasını sağladım.\n• Böylece QA feedback ilgili worktree içinde doğrudan işlenebilirken diğer branch'ler paralel şekilde ilerleyebildi.",
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
