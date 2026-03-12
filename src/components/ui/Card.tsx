"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

interface CardProps {
  link: string;
  title: string;
  period?: string;
  badge?: string;
  image?: string;
}

export default function Card({
  link,
  title,
  period,
  badge,
  image,
}: CardProps) {
  const router = useRouter();
  const [leaving, setLeaving] = useState(false);

  const pinterestKey = link.replace(/\/+$/, "");

  const handleClick = useCallback(() => {
    setLeaving(true);
    requestAnimationFrame(() => {
      router.push(link);
    });
  }, [router, link]);

  return (
    <div
      onClick={handleClick}
      data-pinterest-gallery-key={pinterestKey}
      className="group block cursor-pointer rounded-xl border border-gray-200 bg-white overflow-hidden transition-all hover:border-gray-300 hover:shadow-md"
    >
      {image && (
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}
      <div
        className={`p-5 transition-opacity duration-150 ${leaving ? "opacity-0" : "opacity-100"}`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <h3 className="text-base font-semibold text-gray-900 truncate">
              {title}
            </h3>
            {period && (
              <span className="shrink-0 text-xs text-gray-400">{period}</span>
            )}
          </div>
          <svg
            className="h-4 w-4 shrink-0 text-gray-300 transition-colors group-hover:text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
            />
          </svg>
        </div>
        {badge && (
          <div className="mt-2.5">
            <span className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
              {badge}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
