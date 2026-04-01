"use client";

import dynamic from "next/dynamic";

const PortfolioViewer = dynamic(() => import("./PortfolioViewer"), {
  ssr: false,
});

export default function PortfolioPage() {
  return <PortfolioViewer />;
}
