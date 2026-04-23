"use client";

import dynamic from "next/dynamic";

const ResumeViewer = dynamic(
  () => import("./[uuid]/ResumeViewer"),
  { ssr: false }
);

export default function Home() {
  return <ResumeViewer />;
}
