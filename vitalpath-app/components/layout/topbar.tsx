"use client";

import { usePathname } from "next/navigation";
import { Bell, CalendarPlus } from "lucide-react";
import { MEMBER_NAV } from "@/lib/nav-config";

/**
 * Topbar spans the right of the sidebar.
 * - Left: current page title (derived from pathname)
 * - Right: notifications + primary CTA
 */
export function Topbar() {
  const pathname = usePathname();
  const current = MEMBER_NAV.find((i) =>
    i.href === "/dashboard"
      ? pathname === "/dashboard"
      : pathname.startsWith(i.href)
  );
  const title = current?.label ?? "Overview";

  return (
    <header
      className={`
        h-16 sticky top-0 z-20
        flex items-center justify-between gap-4
        px-5 md:px-8
        bg-portal-bg/80 backdrop-blur
        border-b border-portal-border
      `}
    >
      <div className="flex items-center gap-4 min-w-0">
        <h1 className="font-display text-[20px] md:text-[22px] text-portal-text truncate">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-2 md:gap-3">
        <button
          aria-label="Notifications"
          className="
            relative w-9 h-9 rounded-md flex items-center justify-center
            text-portal-textSecondary hover:text-portal-text
            hover:bg-portal-cardHover transition-colors
          "
        >
          <Bell className="w-[18px] h-[18px]" strokeWidth={1.8} />
          <span className="absolute top-1.5 right-2 w-1.5 h-1.5 rounded-full bg-portal-accent" />
        </button>

        <button
          className="
            hidden sm:inline-flex items-center gap-2
            px-3.5 py-2 rounded-md text-[13px] font-semibold
            bg-gradient-to-br from-portal-accent to-[#A89860]
            text-portal-bg
            hover:opacity-90 transition-opacity
          "
        >
          <CalendarPlus className="w-4 h-4" strokeWidth={2} />
          Book Visit
        </button>
      </div>
    </header>
  );
}
