import type { NavItem } from "@/types";
import basePath from "@/lib/basePath";
import { getHomeUuid } from "@/data/routes";

export const navigation: NavItem[] = [
  { label: "About", href: `${basePath}/${getHomeUuid()}/#hero` },
  { label: "Projects", href: `${basePath}/${getHomeUuid()}/#projects` },
  { label: "Career", href: `${basePath}/${getHomeUuid()}/#career` },
  { label: "Contact", href: `${basePath}/${getHomeUuid()}/#contact` },
];
