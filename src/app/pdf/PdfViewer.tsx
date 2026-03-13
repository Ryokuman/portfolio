"use client";

import { useState } from "react";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import ResumeDocument from "@/components/pdf/ResumeDocument";
import { useLocale, localeLabels, type Locale } from "@/i18n/context";
import { useProfile, useProjects, useCareer } from "@/i18n/useData";

function ResumeContent() {
  const { locale, setLocale } = useLocale();
  const profile = useProfile();
  const projects = useProjects();
  const { workExperience, education, awards } = useCareer();
  const [showPreview, setShowPreview] = useState(true);

  const locales: Locale[] = ["ko", "en", "tr"];

  const docProps = { profile, projects, workExperience, education, awards };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Toolbar */}
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-3 shadow-sm">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-semibold text-gray-900">Resume PDF</h1>
          <div className="flex items-center gap-1 rounded-full border border-gray-200 px-1 py-0.5">
            {locales.map((l) => (
              <button
                key={l}
                onClick={() => setLocale(l)}
                className={`rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors ${
                  locale === l
                    ? "bg-gray-900 text-white"
                    : "text-gray-400 hover:text-gray-700"
                }`}
              >
                {localeLabels[l]}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-600 transition-colors hover:bg-gray-50"
          >
            {showPreview ? "Hide Preview" : "Show Preview"}
          </button>

          <PDFDownloadLink
            document={<ResumeDocument {...docProps} />}
            fileName={`${profile.name}_Resume_${locale.toUpperCase()}.pdf`}
            className="rounded-lg bg-blue-600 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            {({ loading }) => (loading ? "Generating..." : "Download PDF")}
          </PDFDownloadLink>
        </div>
      </div>

      {/* Preview */}
      {showPreview && (
        <div className="flex justify-center p-8">
          <div className="w-full max-w-4xl" style={{ height: "calc(100vh - 80px)" }}>
            <PDFViewer width="100%" height="100%" className="rounded-lg shadow-lg">
              <ResumeDocument {...docProps} />
            </PDFViewer>
          </div>
        </div>
      )}
    </div>
  );
}

export default function PdfViewer() {
  return <ResumeContent />;
}
