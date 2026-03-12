import type { Locale } from "./context";

type CareerI18n = {
  title?: string;
  organization?: string;
  description?: string[];
};

const careerI18n: Record<string, Record<Locale, CareerI18n>> = {
  runup: {
    ko: {},
    en: {
      title: "Frontend Lead",
      organization: "Runup Inc.",
      description: [
        "DynaMOS v2: Manufacturing ERP/MES frontend framework design & development",
        "runup/core UI framework — standardized page composition patterns with declarative components",
        "Introduced AI-powered automation leveraging core components",
        "Established PR-based dev process and improved team development culture",
      ],
    },
    tr: {
      title: "Frontend Lider",
      organization: "Runup A.Ş.",
      description: [
        "DynaMOS v2: Üretim ERP/MES frontend framework tasarımı ve geliştirmesi",
        "runup/core UI framework — bildirimsel bileşenlerle sayfa düzeni standartlaştırması",
        "Çekirdek bileşenleri kullanan AI destekli otomasyon",
        "PR tabanlı geliştirme süreci ve ekip kültürü iyileştirmesi",
      ],
    },
  },
  poul: {
    ko: {},
    en: {
      title: "Full Stack Developer",
      organization: "POUL Inc.",
      description: [
        "CGV-ASSISTANT: CGV collaboration SI project — full-stack development of movie review sentiment analysis & viral monitoring service",
        "LLAMI Model Store: Main developer of 17 LLM API integrated platform (Contribution 80%)",
        "LLAMI Bot Store: AI chatbot marketplace main developer (Contribution 55.6%)",
        "LLAMI Chat: No-code AI chatbot builder — org/payment system (Contribution 18%)",
        "LLAMI App: Expo-based on-device AI app — Bridge/ReverseBridge architecture (Contribution 15%)",
        "LLM-WORKER: 17 LLM API abstraction SaaS — pipe model architecture design",
      ],
    },
    tr: {
      title: "Full Stack Geliştirici",
      organization: "POUL A.Ş.",
      description: [
        "CGV-ASSISTANT: CGV işbirliği projesi — film yorum duygu analizi ve viral izleme servisi",
        "LLAMI Model Mağazası: 17 LLM API entegre platformun ana geliştiricisi (Katkı %80)",
        "LLAMI Bot Mağazası: AI chatbot pazarı ana geliştirici (Katkı %55.6)",
        "LLAMI Sohbet: Kodsuz AI chatbot oluşturucu — organizasyon/ödeme sistemi (Katkı %18)",
        "LLAMI Uygulama: Expo tabanlı cihaz üstü AI uygulaması — Bridge/ReverseBridge mimarisi (Katkı %15)",
        "LLM-WORKER: 17 LLM API soyutlama SaaS — pipe model mimarisi tasarımı",
      ],
    },
  },
  "edu-1": {
    ko: {},
    en: {
      title: "B.S. Computer Science (Withdrawn)",
      organization: "Sungkyul University",
    },
    tr: {
      title: "Bilgisayar Mühendisliği Lisans (Ayrıldı)",
      organization: "Sungkyul Üniversitesi",
    },
  },
  "award-1": {
    ko: {},
    en: {
      title: "Silicon Valley Boot Camp — Top Excellence Award",
      organization: "Tech University of Korea",
      description: ["Won Top Excellence Award with reBike project"],
    },
    tr: {
      title: "Silicon Valley Boot Camp — En İyi Başarı Ödülü",
      organization: "Kore Teknoloji Üniversitesi",
      description: ["reBike projesi ile En İyi Başarı Ödülü"],
    },
  },
};

export default careerI18n;
