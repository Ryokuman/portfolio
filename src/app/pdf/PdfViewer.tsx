"use client";

import { useState, useMemo } from "react";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import ProductivityDocument from "@/components/pdf/ProductivityDocument";
import {
  getPdfContent,
  companyConfigs,
  type PdfVariant,
  type Company,
} from "@/data/pdf-resume";
import type { Locale } from "@/i18n/context";

const basePath = process.env.NEXT_PUBLIC_REPO_NAME
  ? `/${process.env.NEXT_PUBLIC_REPO_NAME}`
  : "";

const variants: { value: PdfVariant; label: string }[] = [
  { value: "fullstack", label: "Full Stack" },
  { value: "backend", label: "Backend" },
  { value: "frontend", label: "Frontend" },
];

const locales: { value: Locale; label: string }[] = [
  { value: "ko", label: "한국어" },
  { value: "en", label: "EN" },
  { value: "tr", label: "TR" },
];

const companies: { value: Company; label: string }[] = [
  { value: "default", label: "기본" },
  { value: "zeta", label: "제타" },
  { value: "planfit", label: "플랜핏" },
];

const variantFileLabels: Record<PdfVariant, string> = {
  fullstack: "FullStack",
  backend: "Backend",
  frontend: "Frontend",
};

const nameByLocale: Record<Locale, string> = {
  ko: "김용민",
  en: "YongminKim",
  tr: "YongminKim",
};

export default function ProductivityPdfViewer() {
  const [showPreview, setShowPreview] = useState(true);
  const [variant, setVariant] = useState<PdfVariant>("fullstack");
  const [locale, setLocale] = useState<Locale>("ko");
  const [company, setCompany] = useState<Company>("default");
  const [showLanguage, setShowLanguage] = useState(false);

  const data = getPdfContent(variant, locale, company);
  const config = companyConfigs[company];

  const imageBase = useMemo(() => {
    if (typeof window === "undefined") return "";
    return `${window.location.origin}${basePath}`;
  }, []);

  const companyLabel =
    company === "default"
      ? ""
      : `_${companies.find((c) => c.value === company)?.label}`;
  const fileName = `${nameByLocale[locale]}_${variantFileLabels[variant]}_${locale.toUpperCase()}${companyLabel}.pdf`;

  const docProps = { data, config, locale, showLanguage, imageBase };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Toolbar */}
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-3 shadow-sm">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-semibold text-gray-900">Resume PDF</h1>

          {/* Variant switcher */}
          <div className="flex items-center gap-1 rounded-full border border-gray-200 px-1 py-0.5">
            {variants.map((v) => (
              <button
                key={v.value}
                onClick={() => setVariant(v.value)}
                className={`rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors ${
                  variant === v.value
                    ? "bg-blue-600 text-white"
                    : "text-gray-400 hover:text-gray-700"
                }`}
              >
                {v.label}
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

          {/* Company dropdown */}
          <select
            value={company}
            onChange={(e) => setCompany(e.target.value as Company)}
            className="rounded-lg border border-gray-200 px-3 py-1 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            {companies.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>

          {/* Language toggle */}
          <button
            onClick={() => setShowLanguage(!showLanguage)}
            className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
              showLanguage
                ? "bg-teal-600 text-white"
                : "border border-gray-200 text-gray-500 hover:text-gray-700"
            }`}
          >
            언어
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-600 transition-colors hover:bg-gray-50"
          >
            {showPreview ? "Hide Preview" : "Show Preview"}
          </button>

          <PDFDownloadLink
            document={<ProductivityDocument {...docProps} />}
            fileName={fileName}
            className="rounded-lg bg-blue-600 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            {({ loading }) => (loading ? "Generating..." : "Download PDF")}
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
              key={`${variant}-${locale}-${company}-${showLanguage}`}
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
