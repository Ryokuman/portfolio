"use client";

import { useState } from "react";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import ProductivityDocument from "@/components/pdf/ProductivityDocument";
import type { Variant, Company } from "@/components/pdf/ProductivityDocument";

const companies: { value: Company; label: string }[] = [
  { value: "default", label: "기본" },
  { value: "zeta", label: "제타" },
];

export default function ProductivityPdfViewer() {
  const [showPreview, setShowPreview] = useState(true);
  const [variant, setVariant] = useState<Variant>("startup");
  const [company, setCompany] = useState<Company>("default");
  const [showLanguage, setShowLanguage] = useState(false);

  const companyLabel =
    company === "default"
      ? ""
      : `_${companies.find((c) => c.value === company)?.label}`;
  const variantLabel =
    variant === "startup" ? "스타트업" : "엔터프라이즈";
  const fileName = `김용민_이력서_${variantLabel}${companyLabel}.pdf`;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Toolbar */}
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-3 shadow-sm">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-semibold text-gray-900">생산성 이력서</h1>

          {/* Variant Toggle */}
          <div className="flex rounded-lg border border-gray-200 p-0.5">
            <button
              onClick={() => setVariant("startup")}
              className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                variant === "startup"
                  ? "bg-blue-600 text-white"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Startup
            </button>
            <button
              onClick={() => setVariant("enterprise")}
              className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                variant === "enterprise"
                  ? "bg-blue-600 text-white"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Enterprise
            </button>
          </div>

          {/* Company Dropdown */}
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

          {/* Language Toggle */}
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
            document={
              <ProductivityDocument
                variant={variant}
                company={company}
                showLanguage={showLanguage}
              />
            }
            fileName={fileName}
            className="rounded-lg bg-blue-600 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            {({ loading }) => (loading ? "생성 중..." : "PDF 다운로드")}
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
              key={`${variant}-${company}-${showLanguage}`}
              width="100%"
              height="100%"
              className="rounded-lg shadow-lg"
            >
              <ProductivityDocument
                variant={variant}
                company={company}
                showLanguage={showLanguage}
              />
            </PDFViewer>
          </div>
        </div>
      )}
    </div>
  );
}
