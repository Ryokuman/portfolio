"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import ProductivityDocument from "@/components/pdf/ProductivityDocument";
import { getPdfContent, companyConfigs } from "@/data/pdf-resume";
import { getPdfUuid } from "@/data/routes";
import type { Locale } from "@/i18n/context";
import { t } from "@/i18n/translations";

const basePath = process.env.NEXT_PUBLIC_REPO_NAME
  ? `/${process.env.NEXT_PUBLIC_REPO_NAME}`
  : "";

const locales: { value: Locale; label: string }[] = [
  { value: "ko", label: "한국어" },
  { value: "en", label: "EN" },
  { value: "tr", label: "TR" },
];

const nameByLocale: Record<Locale, string> = {
  ko: "김용민",
  en: "YongminKim",
  tr: "YongminKim",
};

export default function ResumeViewer() {
  const [showPreview, setShowPreview] = useState(true);
  const [locale, setLocale] = useState<Locale>("ko");
  const router = useRouter();

  const data = getPdfContent("frontend", locale, "default");
  const config = companyConfigs["default"];

  const imageBase = useMemo(() => {
    if (typeof window === "undefined") return "";
    return `${window.location.origin}${basePath}`;
  }, []);

  const fileName = `${nameByLocale[locale]}_Frontend_${locale.toUpperCase()}.pdf`;

  const docProps = { data, config, locale, showLanguage: false, imageBase };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Toolbar */}
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-3 shadow-sm">
        <div className="flex items-center gap-4">
          {/* Tab Navigation */}
          <div className="flex items-center gap-1 rounded-full border border-gray-200 px-1 py-0.5">
            <button
              onClick={() => router.push(`/${getPdfUuid("pdf-portfolio")}`)}
              className="rounded-full px-3 py-1 text-xs font-medium text-gray-400 hover:text-gray-700 transition-colors"
            >
              {t("pdf.portfolio", locale)}
            </button>
            <button
              className="rounded-full bg-blue-600 px-3 py-1 text-xs font-medium text-white"
            >
              {t("pdf.resume", locale)}
            </button>
          </div>

          <span className="rounded-full bg-blue-100 px-3 py-0.5 text-xs font-medium text-blue-700">
            {t("pdf.role", locale)}
          </span>

          {/* Locale switcher */}
          <div className="flex items-center gap-1 rounded-full border border-gray-200 px-1 py-0.5">
            {locales.map((l) => (
              <button
                key={l.value}
                onClick={() => setLocale(l.value)}
                className={`rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors ${
                  locale === l.value
                    ? "bg-gray-900 text-white"
                    : "text-gray-400 hover:text-gray-700"
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-600 transition-colors hover:bg-gray-50"
          >
            {showPreview ? t("pdf.hidePreview", locale) : t("pdf.showPreview", locale)}
          </button>

          <PDFDownloadLink
            document={<ProductivityDocument {...docProps} />}
            fileName={fileName}
            className="rounded-lg bg-blue-600 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            {({ loading }) => (loading ? t("pdf.generating", locale) : t("pdf.download", locale))}
          </PDFDownloadLink>
        </div>
      </div>

      {/* Preview */}
      {showPreview && (
        <div className="flex justify-center p-8">
          <div
            className="w-full max-w-4xl"
            style={{ height: "calc(100vh - 80px)" }}
          >
            <PDFViewer
              key={`frontend-${locale}`}
              width="100%"
              height="100%"
              className="rounded-lg shadow-lg"
            >
              <ProductivityDocument {...docProps} />
            </PDFViewer>
          </div>
        </div>
      )}
    </div>
  );
}
