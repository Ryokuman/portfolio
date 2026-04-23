"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { projects } from "@/data/projects";
import basePath from "@/lib/basePath";
import { useLocale, localeLabels, type Locale } from "@/i18n/context";
import { useT } from "@/i18n/useT";
import { useProfile } from "@/i18n/useData";
import { getRoute, getProjectUuid } from "@/data/routes";

const navItems = [
  { key: "nav.about" as const, hash: "#hero" },
  { key: "nav.projects" as const, hash: "#projects" },
  { key: "nav.career" as const, hash: "#career" },
  { key: "nav.contact" as const, hash: "#contact" },
];

function useBackLink() {
  const pathname = usePathname();
  const t = useT();

  // Match UUID routes: /uuid
  const uuidMatch = pathname.match(/^\/([0-9a-f-]{36})\/?$/);
  if (uuidMatch) {
    const route = getRoute(uuidMatch[1]);
    if (route) {
      if (route.type === "detail") {
        const projectUuid = getProjectUuid(route.projectId);
        const project = projects.find((p) => p.id === route.projectId);
        return { href: `/${projectUuid}/`, label: project?.title ?? "Back" };
      }
      if (route.type === "project") {
        return { href: "/#projects", label: t("detail.backToList") };
      }
    }
  }

  return null;
}

function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();
  const locales: Locale[] = ["ko", "en", "tr"];

  return (
    <div className="flex items-center gap-1 rounded-full border border-gray-200 bg-white/60 px-1 py-0.5 backdrop-blur-sm">
      {locales.map((l) => (
        <button
          key={l}
          onClick={() => setLocale(l)}
          className={`rounded-full px-2 py-0.5 text-xs font-medium transition-colors ${
            locale === l
              ? "bg-gray-900 text-white"
              : "text-gray-400 hover:text-gray-700"
          }`}
        >
          {localeLabels[l]}
        </button>
      ))}
    </div>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const backLink = useBackLink();
  const router = useRouter();
  const t = useT();
  const profile = useProfile();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleBackClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      if (!backLink) return;

      const href = backLink.href;

      if (window.scrollY <= 1) {
        router.push(href);
        return;
      }

      window.scrollTo({ top: 0, behavior: "smooth" });
      const start = Date.now();
      const check = () => {
        if (window.scrollY <= 1 || Date.now() - start > 400) {
          router.push(href);
        } else {
          requestAnimationFrame(check);
        }
      };
      requestAnimationFrame(check);
    },
    [backLink, router],
  );

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 z-50 w-full transition-colors duration-300 ${
        scrolled
          ? "border-b border-gray-200 bg-white/80 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          {backLink && (
            <a
              href={`${basePath}${backLink.href}`}
              onClick={handleBackClick}
              className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-sm text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
              {backLink.label}
            </a>
          )}
          {!backLink && (
            <a
              href={`${basePath}/#hero`}
              className="text-lg font-bold text-gray-900 transition-colors hover:text-blue-600"
            >
              {profile.name}
            </a>
          )}
        </div>

        <div className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <a
              key={item.hash}
              href={`${basePath}/${item.hash}`}
              className="text-sm text-gray-500 transition-colors hover:text-gray-900"
            >
              {t(item.key)}
            </a>
          ))}
          <LanguageSwitcher />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-8 w-8 items-center justify-center text-gray-500"
            aria-label="Toggle menu"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-b border-gray-200 bg-white/95 backdrop-blur-md md:hidden"
          >
            <div className="space-y-1 px-6 py-4">
              {navItems.map((item) => (
                <a
                  key={item.hash}
                  href={`${basePath}/${item.hash}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-lg px-3 py-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
                >
                  {t(item.key)}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
