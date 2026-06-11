"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import ProductivityDocument from "@/components/pdf/ProductivityDocument";
import VerticalResumeDocument from "@/components/pdf/VerticalResumeDocument";
import { getPdfContent, companyConfigs } from "@/data/pdf-resume";
import type { PdfVariant } from "@/data/pdf-resume";
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

const variants: { value: PdfVariant; label: string; fileLabel: string }[] = [
  { value: "frontend", label: "FE", fileLabel: "Frontend" },
  { value: "fullstack", label: "FULL", fileLabel: "Fullstack" },
  { value: "backend", label: "BE", fileLabel: "Backend" },
];

type ResumeMode = "horizontal" | "vertical";

const modes: { value: ResumeMode; label: string; fileLabel: string }[] = [
  { value: "horizontal", label: "일반", fileLabel: "Horizontal" },
  { value: "vertical", label: "Vertical", fileLabel: "Vertical" },
];

const nameByLocale: Record<Locale, string> = {
  ko: "김용민",
  en: "YongminKim",
  tr: "YongminKim",
};

export default function ResumeViewer() {
  const [showPreview, setShowPreview] = useState(true);
  const [locale, setLocale] = useState<Locale>("ko");
  const [variant, setVariant] = useState<PdfVariant>("frontend");
  const [mode, setMode] = useState<ResumeMode>("horizontal");
  const router = useRouter();

  const data = getPdfContent(variant, locale, "default");
  const config = companyConfigs["default"];

  const imageBase = useMemo(() => {
    if (typeof window === "undefined") return "";
    return `${window.location.origin}${basePath}`;
  }, []);

  const fileVariant = variants.find((v) => v.value === variant)?.fileLabel ?? "Resume";
  const fileMode = modes.find((m) => m.value === mode)?.fileLabel ?? "Horizontal";
  const fileName = `${nameByLocale[locale]}_${fileVariant}_${fileMode}_${locale.toUpperCase()}.pdf`;

  const docProps = { data, config, locale, showLanguage: false, imageBase };
  const resumeDocument = mode === "vertical"
    ? (
      <VerticalResumeDocument
        data={data}
        config={config}
        locale={locale}
        imageBase={imageBase}
      />
    )
    : <ProductivityDocument {...docProps} />;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Toolbar */}
      <div className="sticky top-0 z-10 flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 bg-white px-6 py-3 shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
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

          {/* Resume variant switcher */}
          <div className="flex items-center gap-1 rounded-full border border-blue-100 bg-blue-50 px-1 py-0.5">
            {variants.map((v) => (
              <button
                key={v.value}
                onClick={() => setVariant(v.value)}
                className={`rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors ${
                  variant === v.value
                    ? "bg-blue-600 text-white"
                    : "text-blue-500 hover:text-blue-700"
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>

          {/* Resume layout mode switcher */}
          <div className="flex items-center gap-1 rounded-full border border-emerald-100 bg-emerald-50 px-1 py-0.5">
            {modes.map((m) => (
              <button
                key={m.value}
                onClick={() => setMode(m.value)}
                className={`rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors ${
                  mode === m.value
                    ? "bg-emerald-600 text-white"
                    : "text-emerald-600 hover:text-emerald-800"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

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
            document={resumeDocument}
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
              key={`${variant}-${locale}-${mode}`}
              width="100%"
              height="100%"
              className="rounded-lg shadow-lg"
            >
              {resumeDocument}
            </PDFViewer>
          </div>
        </div>
      )}
    </div>
  );
}
