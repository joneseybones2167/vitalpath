"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MEMBER_NAV, NAV_GROUPS } from "@/lib/nav-config";
import { cn } from "@/lib/utils";

/**
 * Desktop sidebar — fixed 260px wide, dark background matching portal mockup.
 * On mobile this is hidden; bottom nav takes over (see BottomNav).
 */
export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "hidden md:flex",
        "w-[260px] h-screen sticky top-0 flex-col",
        "bg-[#141413] border-r border-portal-border",
        "z-10"
      )}
    >
      {/* Brand */}
      <div className="h-16 flex items-center gap-2.5 px-5 border-b border-portal-border">
        <div
          className={cn(
            "w-[30px] h-[30px] rounded-[7px] flex items-center justify-center",
            "font-bold text-sm text-portal-bg tracking-tight",
            "bg-gradient-to-br from-portal-accent to-[#A89860]"
          )}
        >
          VP
        </div>
        <div className="font-display text-[18px] tracking-wide text-portal-text">
          VitalPath
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 flex flex-col gap-0.5">
        {NAV_GROUPS.map((group) => {
          const items = MEMBER_NAV.filter((i) => i.group === group);
          if (items.length === 0) return null;
          return (
            <div key={group} className="flex flex-col">
              <div
                className={cn(
                  "text-[10px] font-semibold uppercase tracking-[0.12em]",
                  "text-portal-textMuted px-3 pt-3.5 pb-1.5"
                )}
              >
                {group}
              </div>
              {items.map((item) => {
                const active =
                  pathname === item.href ||
                  (item.href !== "/dashboard" && pathname.startsWith(item.href));
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "relative flex items-center gap-3 px-3 py-2.5 rounded-sm",
                      "text-[13.5px] transition-colors",
                      active
                        ? "bg-portal-accentDim text-portal-accent font-semibold"
                        : "text-portal-textSecondary hover:bg-portal-accentDim hover:text-portal-text"
                    )}
                  >
                    {/* Active indicator bar */}
                    {active && (
                      <span className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-r bg-portal-accent" />
                    )}
                    <Icon className="w-[18px] h-[18px]" strokeWidth={1.8} />
                    <span className="flex-1">{item.label}</span>
                    {item.badge && (
                      <span
                        className={cn(
                          "text-[10px] font-semibold px-1.5 py-0.5 rounded",
                          "bg-portal-accent/20 text-portal-accent"
                        )}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          );
        })}
      </nav>

      {/* Footer: member card */}
      <div className="p-3 border-t border-portal-border">
        <div
          className={cn(
            "flex items-center gap-2.5 p-2.5 rounded-md",
            "bg-portal-elevated border border-portal-border"
          )}
        >
          <div
            className={cn(
              "w-9 h-9 rounded-full flex items-center justify-center",
              "font-bold text-sm text-portal-bg",
              "bg-gradient-to-br from-portal-accent to-[#A89860]"
            )}
          >
            RM
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[13px] font-semibold text-portal-text truncate">
              R. Matsuda
            </div>
            <div className="text-[10.5px] text-portal-textMuted">Active Member</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
