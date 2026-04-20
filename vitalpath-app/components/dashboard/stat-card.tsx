import { TrendingDown, TrendingUp, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { StatCard } from "@/lib/mock/dashboard";

/**
 * Biomarker stat card used in the Overview hero grid.
 * Color-coded by `status` — green for on-target, amber for warn, red for alert.
 */
export function StatCardTile({ stat }: { stat: StatCard }) {
  const Icon = stat.icon;
  const TrendIcon =
    stat.trend === "up" ? TrendingUp : stat.trend === "down" ? TrendingDown : Minus;

  // Status drives both the left rail color and the trend chip
  const statusStyles = {
    good: "bg-status-greenDim text-status-green border-status-green/20",
    warn: "bg-status-amberDim text-status-amber border-status-amber/20",
    alert: "bg-status-redDim text-status-red border-status-red/20",
  }[stat.status];

  return (
    <div className="vp-stat relative overflow-hidden">
      {/* Status accent bar */}
      <div
        className={cn(
          "absolute left-0 top-0 bottom-0 w-[3px]",
          stat.status === "good" && "bg-status-green",
          stat.status === "warn" && "bg-status-amber",
          stat.status === "alert" && "bg-status-red"
        )}
      />

      <div className="flex items-start justify-between">
        <div
          className={cn(
            "w-8 h-8 rounded-md flex items-center justify-center",
            "bg-portal-accentDim text-portal-accent"
          )}
        >
          <Icon className="w-4 h-4" strokeWidth={1.8} />
        </div>
        <div
          className={cn(
            "inline-flex items-center gap-1 px-2 py-0.5 rounded-full border",
            "text-[10.5px] font-semibold",
            statusStyles
          )}
        >
          <TrendIcon className="w-3 h-3" strokeWidth={2.2} />
          {stat.trendLabel}
        </div>
      </div>

      <div className="vp-stat-label mt-2">{stat.label}</div>
      <div className="flex items-baseline gap-1.5">
        <span className="vp-stat-value">{stat.value}</span>
        {stat.unit && (
          <span className="text-xs text-portal-textMuted font-sans">{stat.unit}</span>
        )}
      </div>
    </div>
  );
}
