"use client";

import dynamic from "next/dynamic";

const ResumeViewer = dynamic(
  () => import("./ResumeViewer"),
  { ssr: false }
);

export default function PdfResumeClient() {
  return <ResumeViewer />;
}
