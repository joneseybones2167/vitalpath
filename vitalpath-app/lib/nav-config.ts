import {
  LayoutGrid,
  FlaskConical,
  Watch,
  Dna,
  Pill,
  MessageSquare,
  BookOpen,
  ClipboardList,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
  /** Which section heading this item lives under in the sidebar */
  group: "Dashboard" | "Care" | "Account";
};

/**
 * Full member nav — mirrors the 8 pages in portal.html/vitalpath-portal.html.
 * Keeping this as a single array so sidebar, bottom nav, and breadcrumbs
 * all stay in sync with one edit.
 */
export const MEMBER_NAV: NavItem[] = [
  { label: "Overview", href: "/dashboard", icon: LayoutGrid, group: "Dashboard" },
  { label: "Lab Results", href: "/labs", icon: FlaskConical, badge: "2 new", group: "Dashboard" },
  { label: "Wearables", href: "/wearables", icon: Watch, group: "Dashboard" },
  { label: "Epigenetics", href: "/epigenetics", icon: Dna, group: "Dashboard" },
  { label: "Medications", href: "/medications", icon: Pill, group: "Care" },
  { label: "Messages", href: "/messages", icon: MessageSquare, badge: "1", group: "Care" },
  { label: "Education", href: "/education", icon: BookOpen, group: "Care" },
  { label: "Care Plan", href: "/careplan", icon: ClipboardList, group: "Account" },
];

export const NAV_GROUPS: Array<NavItem["group"]> = ["Dashboard", "Care", "Account"];
