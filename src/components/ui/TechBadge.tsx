"use client";

import { motion } from "motion/react";

interface TechBadgeProps {
  name: string;
}

export default function TechBadge({ name }: TechBadgeProps) {
  return (
    <motion.span
      whileHover={{ scale: 1.1 }}
      className="inline-block rounded-full bg-gray-800 px-3 py-1 text-sm text-gray-300 transition-colors hover:bg-blue-500/20 hover:text-blue-300"
    >
      {name}
    </motion.span>
  );
}
