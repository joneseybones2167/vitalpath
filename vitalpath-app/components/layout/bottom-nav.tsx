"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MoreHorizontal } from "lucide-react";
import { MEMBER_NAV } from "@/lib/nav-config";
import { cn } from "@/lib/utils";

/**
 * Bottom nav on mobile — shows the 4 most-used sections, plus "More"
 * for the rest. Fixed to bottom of viewport.
 */
const PRIMARY_PATHS = ["/dashboard", "/labs", "/wearables", "/medications"];

export function BottomNav() {
  const pathname = usePathname();
  const primary = MEMBER_NAV.filter((i) => PRIMARY_PATHS.includes(i.href));
  const moreActive = !PRIMARY_PATHS.some((p) =>
    p === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(p)
  );

  return (
    <nav
      className={cn(
        "md:hidden fixed bottom-0 left-0 right-0 z-30",
        "bg-[#141413]/95 backdrop-blur border-t border-portal-border",
        "px-2 pt-1.5 pb-[max(0.5rem,env(safe-area-inset-bottom))]",
        "grid grid-cols-5 gap-1"
      )}
    >
      {primary.map((item) => {
        const active =
          pathname === item.href ||
          (item.href !== "/dashboard" && pathname.startsWith(item.href));
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center gap-1 py-1 rounded-md",
              "text-[10.5px] font-medium transition-colors",
              active
                ? "text-portal-accent"
                : "text-portal-textMuted hover:text-portal-text"
            )}
          >
            <Icon className="w-5 h-5" strokeWidth={1.8} />
            <span>{item.label.split(" ")[0]}</span>
          </Link>
        );
      })}
      <button
        className={cn(
          "flex flex-col items-center justify-center gap-1 py-1 rounded-md",
          "text-[10.5px] font-medium transition-colors",
          moreActive
            ? "text-portal-accent"
            : "text-portal-textMuted hover:text-portal-text"
        )}
      >
        <MoreHorizontal className="w-5 h-5" strokeWidth={1.8} />
        <span>More</span>
      </button>
    </nav>
  );
}
