"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import PortfolioDocument from "@/components/pdf/PortfolioDocument";
import { portfolioData } from "@/data/pdf-portfolio";

export default function PortfolioViewer() {
  const [showPreview, setShowPreview] = useState(true);
  const router = useRouter();

  const fileName = "김용민_포트폴리오_토스뱅크_FrontendOps.pdf";

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Toolbar */}
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-3 shadow-sm">
        <div className="flex items-center gap-4">
          {/* Tab Navigation */}
          <div className="flex items-center gap-1 rounded-full border border-gray-200 px-1 py-0.5">
            <button
              className="rounded-full bg-blue-600 px-3 py-1 text-xs font-medium text-white"
            >
              포트폴리오
            </button>
            <button
              onClick={() => router.push("/pdf/resume")}
              className="rounded-full px-3 py-1 text-xs font-medium text-gray-400 hover:text-gray-700 transition-colors"
            >
              이력서
            </button>
          </div>
          <span className="rounded-full bg-blue-100 px-3 py-0.5 text-xs font-medium text-blue-700">
            토스뱅크 Frontend Ops
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-600 transition-colors hover:bg-gray-50"
          >
            {showPreview ? "Hide Preview" : "Show Preview"}
          </button>

          <PDFDownloadLink
            document={<PortfolioDocument data={portfolioData} />}
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
            <PDFViewer width="100%" height="100%" className="rounded-lg shadow-lg">
              <PortfolioDocument data={portfolioData} />
            </PDFViewer>
          </div>
        </div>
      )}
    </div>
  );
}
