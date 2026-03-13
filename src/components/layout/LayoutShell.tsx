"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import SsgoiProvider from "./SsgoiProvider";

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isPdf = pathname.startsWith("/pdf");

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
