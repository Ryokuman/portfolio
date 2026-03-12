import type { Locale } from "./context";

// Per-project i18n overrides: description, achievements, detail content
// Only text fields are translated; techStack, images, links stay the same.

type ProjectI18n = {
  description?: string;
  role?: string;
  achievements?: string[];
  details?: {
    title?: string;
    content?: string[];
  }[];
};

const projectsI18n: Record<string, Record<Locale, ProjectI18n>> = {
  llami: {
    ko: {},
    en: {
      description:
        "POUL's core project — an integrated AI platform providing diverse solutions including LLM model store, character chatbot marketplace, and more.",
      role: "Full Stack Engineer",
      achievements: [
        "Selected as Toss Payments best practice",
        "Built Bridge/ReverseBridge system enabling native app development with React only",
        "Unified abstraction of 17 LLM APIs (llm-worker)",
        "Implemented pipe model for rapid spec changes",
      ],
      details: [
        {
          title: "Model Store",
          content: [
            "17 models with completely different API specs (request format, streaming, response structure) — introduced pipe pattern to compose only needed processing steps per model, making new model addition trivial (Contribution 80%)",
            "Real-time rendering of model responses via fetch ReadableStream-based streaming, normalizing different stream formats at the pipe stage so frontend uses a single interface",
            "Unified abstraction of function-call specs across models (OpenAI, Claude, etc.) — frontend renders function-call results with the same components regardless of model",
            "Differential credit consumption per model — payment integration via Toss Payments turnkey method, implementing credit top-up and workspace sharing",
          ],
        },
        {
          title: "LLAMI App",
          content: [
            "No RN-experienced developers on the team — designed webview + postMessage Bridge system so web developers can leverage native features (Contribution 15%)",
            "Bridge: webview requests native function call → native executes and updates state → subscribed nodes auto-rerender via context",
            "ReverseBridge: native injects webViewAction/webViewState into webview → Proxy-based request/response pattern optimizes rendering",
            "Developed core frontend features: image download, i18n, model load/download alerts, chat sidebar",
          ],
        },
        {
          title: "Bot Store",
          content: [
            "Marketplace platform for exploring and chatting with AI bots across categories (romance/kids/productivity) (Contribution 55.6%)",
            "Implemented tag-based filtering/sorting — designed BotCard, BotGrid, search/filter/tag components for category browsing UX",
            "Built normal text mode and visual mode chat with character images, with mode switching",
            "Created prompt generator for user-created bots + admin approval system",
            "Guest 20 free chats → unlimited on login, OpenAI Assistant API streaming chat with history management",
          ],
        },
        {
          title: "LLAMI Chat",
          content: [
            "No-code AI chatbot builder — users create custom chatbots in 5 minutes, deploy to KakaoTalk, Instagram, websites (Contribution 18%)",
            "Designed organization (workspace) management — team invites, role separation, payment integration",
            "Structured API with repository/service pattern — widget type definitions, tag/category system",
            "Inconsistent API v1 response structure → migrated to v2 with standardized API structure",
          ],
        },
      ],
    },
    tr: {
      description:
        "POUL'un ana projesi — LLM model mağazası, karakter chatbot pazarı ve daha fazlasını içeren entegre bir AI platformu.",
      role: "Full Stack Mühendisi",
      achievements: [
        "Toss Payments en iyi uygulama seçildi",
        "Sadece React ile native uygulama geliştirmeyi sağlayan Bridge/ReverseBridge sistemi",
        "17 LLM API birleşik soyutlaması (llm-worker)",
        "Hızlı spec değişiklikleri için pipe modeli",
      ],
      details: [
        {
          title: "Model Mağazası",
          content: [
            "17 farklı API spesifikasyonuna sahip model — pipe deseni ile model başına sadece gerekli işlem adımlarını birleştirerek yeni model eklemeyi kolaylaştırdık (Katkı %80)",
            "Fetch ReadableStream tabanlı akış ile model yanıtlarını gerçek zamanlı render, pipe aşamasında farklı akış formatlarını normalleştirme",
            "Modeller arası function-call spesifikasyonlarını birleşik soyutlama — frontend model fark etmeksizin aynı bileşenlerle render",
            "Model başına farklı kredi tüketimi — Toss Payments ile ödeme entegrasyonu, kredi yükleme ve workspace paylaşımı",
          ],
        },
        {
          title: "LLAMI Uygulaması",
          content: [
            "Ekipte RN deneyimi yok — webview + postMessage Bridge sistemi tasarlayarak web geliştiricilerin native özellikleri kullanmasını sağladık (Katkı %15)",
            "Bridge: webview native fonksiyon çağrısı ister → native çalıştırır ve state günceller → context ile otomatik yeniden render",
            "ReverseBridge: native, webViewAction/webViewState'i webview'e enjekte eder → Proxy tabanlı istek/yanıt deseni",
            "Temel frontend özellikleri: resim indirme, çoklu dil (i18n), model yükleme/indirme uyarıları, sohbet kenar çubuğu",
          ],
        },
        {
          title: "Bot Mağazası",
          content: [
            "Kategorilere göre AI botlarını keşfetme ve sohbet etme platformu (Katkı %55.6)",
            "Etiket tabanlı filtreleme/sıralama — BotCard, BotGrid, arama/filtre/etiket bileşenleri",
            "Normal metin modu ve karakter görsellerli görsel mod sohbet, mod geçişi",
            "Kullanıcı tarafından oluşturulan botlar için prompt oluşturucu + yönetici onay sistemi",
            "Misafir 20 ücretsiz sohbet → giriş yapınca sınırsız, OpenAI Assistant API akış sohbet",
          ],
        },
        {
          title: "LLAMI Sohbet",
          content: [
            "Kodsuz AI chatbot oluşturucu — kullanıcılar 5 dakikada özel chatbot oluşturup KakaoTalk, Instagram, web sitelerine dağıtabilir (Katkı %18)",
            "Organizasyon (workspace) yönetim sistemi — ekip davetleri, rol ayrımı, ödeme entegrasyonu",
            "Repository/service deseni ile API yapılandırması — widget tip tanımları, etiket/kategori sistemi",
            "Tutarsız API v1 yanıt yapısı → v2'ye geçiş ile standart API yapısı",
          ],
        },
      ],
    },
  },

  "cgv-assistant": {
    ko: {},
    en: {
      description:
        "A joint project between POUL and CGV — an analytics service that scrapes and analyzes user review data and social media viral data using AI to provide at-a-glance sentiment insights for specific movies.",
      role: "Full Stack Engineer",
      achievements: [
        "Memory usage stabilized to ~300MB (singleton pattern)",
        "10x rendering speed improvement: 3000ms → 300ms",
        "API complexity improved: O(n²) → O(n)",
        "Parallel processing 2x rendering improvement: 52~6300ms → 2~3000ms",
        "~5000 AI data analyses daily",
        "~2000 data scraping daily",
      ],
      details: [
        {
          title: "Main Service",
          content: [
            "Real-time collection and AI sentiment/toxicity analysis of CGV movie reviews (Contribution 30%)",
            "Discovered backend memory spiking to 8GB during morning monitoring → added memory logger, identified tiktoken encoder being recreated per call → fixed with singleton pattern, stabilized to ~300MB",
            "CGV requested date-based data graphs → existing O(n²) structure fetching all reviews → introduced caching table for single API call, O(n) improvement (rendering 3000ms → 300ms)",
            "Built data visualization graphs — AI keyword analysis, one-liner auto-generation, risk review filtering, and core business logic",
            "Implemented API call parallelization: rendering improved from 52~6300ms → 2~3000ms",
          ],
        },
        {
          title: "Viral Service",
          content: [
            "Service collecting viral data from X, YouTube, Naver Blog and analyzing sentiment/keywords per movie",
            "Designed and implemented complete viral analysis UI/UX — egg index (proprietary metric), social stats charts, sentiment visualization",
            "Built sentiment evaluation system and embedding processing — handled all business logic except viral scraping",
          ],
        },
      ],
    },
    tr: {
      description:
        "POUL ve CGV ortak projesi — AI kullanarak kullanıcı yorum verilerini ve sosyal medya viral verilerini analiz eden bir analitik hizmeti.",
      role: "Full Stack Mühendisi",
      achievements: [
        "Bellek kullanımı ~300MB'de stabilize (singleton deseni)",
        "Render hızı 10 kat iyileştirme: 3000ms → 300ms",
        "API karmaşıklığı iyileştirmesi: O(n²) → O(n)",
        "Paralel işleme ile 2 kat render iyileştirmesi: 52~6300ms → 2~3000ms",
        "Günlük ~5000 AI veri analizi",
        "Günlük ~2000 veri kazıma",
      ],
      details: [
        {
          title: "Ana Hizmet",
          content: [
            "CGV film yorumlarının gerçek zamanlı toplanması ve AI duygu/toksisite analizi (Katkı %30)",
            "Sabah izlemede backend belleğin 8GB'a çıktığını tespit → bellek logger ekleyerek tiktoken kodlayıcının her çağrıda yeniden oluşturulduğunu belirleme → singleton deseni ile ~300MB'ye stabilize",
            "CGV tarih bazlı grafik istedi → mevcut O(n²) yapı → önbellek tablosu ile tek API çağrısı, O(n) iyileştirme (render 3000ms → 300ms)",
            "Veri görselleştirme grafikleri — AI anahtar kelime analizi, tek satır otomatik üretim, riskli yorum filtreleme",
            "API çağrı paralelleştirmesi: render 52~6300ms → 2~3000ms'ye iyileştirildi",
          ],
        },
        {
          title: "Viral Hizmet",
          content: [
            "X, YouTube, Naver Blog'dan film başına viral veri toplama ve duygu/anahtar kelime analizi",
            "Tüm viral analiz UI/UX tasarımı ve geliştirmesi — egg indeksi, sosyal istatistik grafikleri, duygu görselleştirmesi",
            "Duygu değerlendirme sistemi ve embedding işleme — viral kazıma dışındaki tüm iş mantığı",
          ],
        },
      ],
    },
  },

  "dynamos-v2": {
    ko: {},
    en: {
      description:
        "Designed and built the frontend framework for a manufacturing ERP/MES system. Analyzed vibe-coded legacy codebase and created a framework with declarative component structure and Valtio-based state management.",
      role: "Frontend Lead & Full Stack Developer",
      achievements: [
        "From 0 PRs before joining → introduced PR-based dev process with 170 PRs",
        "PR velocity 25x improvement: 0.16/day → 3.97/day",
        "72% code reduction per page: 441 lines → 122 lines",
        "85% fewer re-render triggers: 12.3 → 1.9 per page",
        "Worktree System: 62 PRs processed in 4 days during QA (15.5 PR/day)",
        "Introduced PR-based dev process — replaced direct .env commits and main push practices",
      ],
      details: [
        {
          title: "Framework Design & Build",
          content: [
            "Analyzed vibe-coded legacy — pages with 7+ useState hooks, 16~20 hooks tangled in black-box structure, unmaintainable",
            "Redefined requirements and designed core UI components (Tab, Filter, Grid, Buttons) — eliminated props drilling, shared state via Stores",
            "Established declarative structure: config file (column definitions) + component assembly completes a page → predictable patterns enabling AI-powered page auto-generation, with actual cases of bulk AI page generation",
            "PR velocity 25x improvement (31 in 198 days → 139 in 35 days), average code per page reduced 72% (441 → 122 lines)",
          ],
        },
        {
          title: "Valtio State Management & Rendering Optimization",
          content: [
            "Introduced Valtio proxy pattern — direct store.value = x mutation without dispatch, 17 stores (grid, tab, modal, filter, etc.) for separation of concerns",
            "Designed useSnapshot-based selective rerendering — achieved 0 page-level useState (previously avg 7)",
            "ref() to prevent proxy tracking of non-reactive objects like GridApi, structuredClone to prevent store pollution",
            "85% fewer rerender trigger points (12.3 → 1.9/page) — enabling 120+ business pages as simultaneous tabs",
          ],
        },
        {
          title: "Storybook-Driven Frontend Development",
          content: [
            "Problem: frontend blocked waiting for backend API completion — project schedule bottleneck",
            "Built Storybook + Mock Backend environment enabling independent frontend development without backend",
            "Frontend defines API spec (request/response) first and delivers to backend — led API design decisions as frontend lead, both sides benefit",
            "Frontend dev velocity faster → pre-built all features without pending, just delivering mockdata to backend → ~1.3x overall dev speed improvement (by PR metrics)",
            "Documented core component usage via Storybook, providing executable learning environment for team onboarding",
          ],
        },
        {
          title: "Dev Process Systematization & Frontend Leading",
          content: [
            "Before joining: no Git branch strategy, .env direct commits, direct push to main, no PR/code review culture → introduced Git Flow (main/qa/dev) and PR-based dev process, established across team",
            "Set up Jira project from scratch (boards, workflows, issue types) — as frontend PM, led priority meetings with CEO/CTO and managed task assignment & scheduling",
            "Designed and created all 17 Valtio stores and providers — established frontend state management architecture (stores coverage 77.5%, providers 100%)",
            "After joining: 66% of total commits, 63% of line changes — led frontend from core architecture design to page implementation (54%)",
            "During QA, used Worktree System for 62 PRs in 4 days (15.5 PR/day) — parallel multi-branch work for instant QA feedback",
          ],
        },
      ],
    },
    tr: {
      description:
        "Üretim ERP/MES sistemi için frontend framework tasarımı ve geliştirmesi. Vibe-coded legacy kod tabanını analiz ederek bildirimsel bileşen yapısı ve Valtio tabanlı state yönetimi ile framework oluşturuldu.",
      role: "Frontend Lider & Full Stack Geliştirici",
      achievements: [
        "Katılmadan önce 0 PR → 170 PR tabanlı geliştirme süreci",
        "PR hızı 25 kat artış: 0.16/gün → 3.97/gün",
        "Sayfa başına %72 kod azaltma: 441 satır → 122 satır",
        "Yeniden render tetikleyicileri %85 azalma: 12.3 → 1.9/sayfa",
        "Worktree Sistemi: QA'da 4 günde 62 PR (15.5 PR/gün)",
        "PR tabanlı geliştirme süreci — doğrudan .env commit ve main push alışkanlıkları düzeltildi",
      ],
      details: [
        {
          title: "Framework Tasarımı ve Geliştirme",
          content: [
            "Vibe-coded legacy analizi — sayfa başına 7+ useState, 16~20 hook ile karmaşık kara kutu yapı, bakım yapılamaz durum",
            "Gereksinimleri yeniden tanımlayarak çekirdek UI bileşenleri tasarlandı (Tab, Filter, Grid, Buttons) — props drilling kaldırıldı, Store üzerinden state paylaşımı",
            "Bildirimsel yapı: config dosyası + bileşen montajı ile sayfa tamamlanır → AI ile otomatik sayfa oluşturmayı mümkün kılan öngörülebilir desenler",
            "PR hızı 25 kat artış (198 günde 31 → 35 günde 139), sayfa başına ortalama kod %72 azalma (441 → 122 satır)",
          ],
        },
        {
          title: "Valtio State Yönetimi ve Render Optimizasyonu",
          content: [
            "Valtio proxy deseni — dispatch olmadan doğrudan store.value = x, 17 store (grid, tab, modal, filter vb.) ile sorumluluk ayrımı",
            "useSnapshot tabanlı seçici yeniden render tasarımı — sayfa seviyesinde 0 useState (önceki ortalama 7)",
            "ref() ile GridApi gibi reaktif olmayan nesnelerin proxy takibini engelleme, structuredClone ile store kirliliğini önleme",
            "Yeniden render tetikleyicileri %85 azalma (12.3 → 1.9/sayfa) — 120+ iş sayfasını eşzamanlı sekmede çalıştırabilme",
          ],
        },
        {
          title: "Storybook Tabanlı Frontend Geliştirme",
          content: [
            "Sorun: frontend backend API tamamlanmasını bekliyor — proje takvimi darboğazı",
            "Storybook + Mock Backend ortamı ile backend olmadan bağımsız frontend geliştirme",
            "Frontend API spesifikasyonunu önce tanımlar ve backend'e iletir — frontend lider olarak API tasarım kararlarını yönetti",
            "Frontend geliştirme hızı daha yüksek → tüm özellikler beklemeden ön-geliştirme → ~1.3 kat genel hız artışı",
            "Storybook ile çekirdek bileşen kullanım dokümantasyonu, ekip oryantasyonu için çalıştırılabilir öğrenme ortamı",
          ],
        },
        {
          title: "Geliştirme Süreci Sistematizasyonu ve Frontend Liderliği",
          content: [
            "Katılmadan önce: Git branch stratejisi yok, .env doğrudan commit, main'e doğrudan push, PR/kod inceleme kültürü yok → Git Flow ve PR tabanlı süreç tanıtıldı",
            "Jira projesi sıfırdan kurulum — frontend PM olarak CEO/CTO ile öncelik toplantıları, görev dağılımı ve takvim yönetimi",
            "17 Valtio store ve tüm provider'ları tasarladı ve oluşturdu — frontend state yönetimi mimarisi (store kapsama %77.5, provider %100)",
            "Katıldıktan sonra: toplam commitlerin %66'sı, satır değişikliklerinin %63'ü — mimari tasarımdan sayfa uygulamasına (%54) frontend'i yönetti",
            "QA döneminde Worktree Sistemi ile 4 günde 62 PR (15.5 PR/gün) — paralel çoklu branch çalışması",
          ],
        },
      ],
    },
  },

  "worktree-system": {
    ko: {},
    en: {
      description:
        "An open-source DX tool that manages Git worktree-based multi-branch development environments through a web dashboard. One-stop management of branch-specific worktree creation, dev server control, web terminal, and AI plan generation.",
      role: "Creator & Solo Developer",
      achievements: [
        "Branch detection → worktree creation → dev server → develop → complete: one-stop management",
        "xterm.js multi-session web terminal + Claude Code integration",
        "Bidirectional plan sync (dashboard ↔ worktree)",
        "PTY session-based server state management solving stale state issues",
      ],
      details: [
        {
          title: "Worktree Dashboard",
          content: [
            "Real-time Git refs monitoring via chokidar for automatic branch classification (active/inactive)",
            "Worktree create/delete/complete via web UI — auto port assignment, auto .env generation",
            "Dev server one-click start/stop + health check monitoring (10s polling)",
            "Completed tasks auto-move to ended list with plan archive",
          ],
        },
        {
          title: "Web Terminal & AI Integration",
          content: [
            "Browser terminal with xterm.js + node-pty + WebSocket — multi-session per worktree",
            "100KB scrollback buffer + multi-viewer support — real-time session sharing across tabs",
            "Claude Code in web terminal for AI-powered development plan auto-generation",
            "Git SSH auto-setup + terminal init command injection for instant development",
          ],
        },
        {
          title: "Plan System & Bidirectional Sync",
          content: [
            "JSON index (plan.json) + Markdown step files for development plan management",
            "Structured view (progress bar + status toggle) / Raw view (direct file editing)",
            "Bidirectional sync: plan/active/{branch}/ ↔ {worktree}/.claude/plan/ — chokidar watch + 1s debouncing",
            "Infinite loop prevention with sync lock (500ms cooldown)",
          ],
        },
        {
          title: "Architecture Design",
          content: [
            "Next.js App Router wrapped with Custom HTTP Server for WebSocket upgrade handling",
            "PTY sessions as source of truth for server state — resolved JSON state inconsistency",
            "lsof-based orphan process recovery — reuses existing processes on crash/restart",
            "Task Lock system preventing concurrent worktree operations (Promise-based queue)",
          ],
        },
      ],
    },
    tr: {
      description:
        "Git worktree tabanlı çoklu branch geliştirme ortamlarını web panosu ile yöneten açık kaynak DX aracı.",
      role: "Yaratıcı & Solo Geliştirici",
      achievements: [
        "Branch algılama → worktree oluşturma → dev sunucu → geliştirme → tamamlama: tek durak yönetim",
        "xterm.js çoklu oturum web terminali + Claude Code entegrasyonu",
        "Çift yönlü plan senkronizasyonu (pano ↔ worktree)",
        "PTY oturum tabanlı sunucu durumu yönetimi",
      ],
      details: [
        {
          title: "Worktree Panosu",
          content: [
            "chokidar ile gerçek zamanlı Git refs izleme, otomatik branch sınıflandırma (aktif/pasif)",
            "Web UI ile worktree oluşturma/silme/tamamlama — otomatik port atama, otomatik .env oluşturma",
            "Dev sunucu tek tıkla başlat/durdur + sağlık kontrolü izleme (10sn aralık)",
            "Tamamlanan görevler plan arşivi ile otomatik olarak bitiş listesine taşınır",
          ],
        },
        {
          title: "Web Terminal & AI Entegrasyonu",
          content: [
            "xterm.js + node-pty + WebSocket ile tarayıcı terminali — worktree başına çoklu oturum",
            "100KB geri kaydırma tamponu + çoklu izleyici desteği — sekmeler arası gerçek zamanlı oturum paylaşımı",
            "Web terminalinde Claude Code ile AI destekli geliştirme planı otomatik oluşturma",
            "Git SSH otomatik kurulum + terminal init komutu enjeksiyonu",
          ],
        },
        {
          title: "Plan Sistemi & Çift Yönlü Senkronizasyon",
          content: [
            "JSON dizin (plan.json) + Markdown adım dosyaları ile geliştirme planı yönetimi",
            "Yapılandırılmış görünüm (ilerleme çubuğu + durum değiştirme) / Ham görünüm (doğrudan dosya düzenleme)",
            "Çift yönlü senkronizasyon: plan/active/{branch}/ ↔ {worktree}/.claude/plan/ — chokidar izleme + 1sn debounce",
            "Sonsuz döngü önleme: sync kilidi (500ms bekleme süresi)",
          ],
        },
        {
          title: "Mimari Tasarım",
          content: [
            "Next.js App Router, WebSocket upgrade için Custom HTTP Server ile sarmalandı",
            "PTY oturumları sunucu durumunun kaynağı — JSON durum tutarsızlığı çözüldü",
            "lsof tabanlı yetim süreç kurtarma — çökme/yeniden başlatmada mevcut süreçleri yeniden kullanır",
            "Eşzamanlı worktree işlemlerini önleyen Task Lock sistemi (Promise tabanlı kuyruk)",
          ],
        },
      ],
    },
  },
};

export default projectsI18n;
