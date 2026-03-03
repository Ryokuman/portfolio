"use client";

import { motion } from "motion/react";

interface TechBadgeProps {
  name: string;
}

export default function TechBadge({ name }: TechBadgeProps) {
  return (
    <motion.span
      whileHover={{ scale: 1.1 }}
      className="inline-block rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600 transition-colors hover:bg-blue-50 hover:text-blue-600"
    >
      {name}
    </motion.span>
  );
}
