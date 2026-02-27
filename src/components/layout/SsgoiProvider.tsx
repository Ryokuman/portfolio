"use client";

import { Ssgoi } from "@ssgoi/react";
import { hero, fade } from "@ssgoi/react/view-transitions";
import type { ReactNode } from "react";

const config = {
  defaultTransition: fade(),
  transitions: [
    {
      from: "/",
      to: "/projects/*",
      transition: hero(),
      symmetric: true,
    },
  ],
};

export default function SsgoiProvider({ children }: { children: ReactNode }) {
  return (
    <Ssgoi config={config}>
      <main style={{ position: "relative", minHeight: "100vh" }}>
        {children}
      </main>
    </Ssgoi>
  );
}
