"use client";

import dynamic from "next/dynamic";

const PortfolioViewer = dynamic(
  () => import("./portfolio/PortfolioViewer"),
  { ssr: false }
);

export default function PdfPage() {
  return <PortfolioViewer />;
}
