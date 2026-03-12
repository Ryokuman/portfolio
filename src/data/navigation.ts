import type { NavItem } from "@/types";
import basePath from "@/lib/basePath";

export const navigation: NavItem[] = [
  { label: "About", href: `${basePath}/#hero` },
  { label: "Projects", href: `${basePath}/#projects` },
  { label: "Career", href: `${basePath}/#career` },
  { label: "Contact", href: `${basePath}/#contact` },
];
