"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import SsgoiProvider from "./SsgoiProvider";
import { getRoute } from "@/data/routes";

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Hide Header/Footer for PDF pages: root (/) and PDF UUID routes
  const isRoot = pathname === "/" || pathname === "";
  const uuidMatch = pathname.match(/^\/([0-9a-f-]{36})\/?$/);
  const route = uuidMatch ? getRoute(uuidMatch[1]) : null;
  const isPdf = isRoot || route?.type === "pdf-portfolio" || route?.type === "pdf-resume";

  if (isPdf) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <SsgoiProvider>{children}</SsgoiProvider>
      <Footer />
    </>
  );
}
