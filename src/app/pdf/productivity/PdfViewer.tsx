"use client";

import { useState } from "react";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import ProductivityDocument from "@/components/pdf/ProductivityDocument";

export default function ProductivityPdfViewer() {
  const [showPreview, setShowPreview] = useState(true);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Toolbar */}
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-3 shadow-sm">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-semibold text-gray-900">생산성 이력서</h1>
          <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-700">
            대표 제출용
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
            document={<ProductivityDocument />}
            fileName="김용민_생산성이력서.pdf"
            className="rounded-lg bg-blue-600 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            {({ loading }) => (loading ? "생성 중..." : "PDF 다운로드")}
          </PDFDownloadLink>
        </div>
      </div>

      {/* Preview */}
      {showPreview && (
        <div className="flex justify-center p-8">
          <div className="w-full max-w-4xl" style={{ height: "calc(100vh - 80px)" }}>
            <PDFViewer width="100%" height="100%" className="rounded-lg shadow-lg">
              <ProductivityDocument />
            </PDFViewer>
          </div>
        </div>
      )}
    </div>
  );
}
