import { cn } from "@/lib/utils";
import { PROGRAM_PROGRESS } from "@/lib/mock/dashboard";

/**
 * Program progress tracker — lab panels, visits, data days, adherence.
 * Each bar is colored per the program metric config.
 */
export function ProgramProgress() {
  return (
    <div className="vp-card p-5">
      <div className="vp-eyebrow mb-1">Program Progress</div>
      <div className="text-[14px] font-semibold text-portal-text mb-4">
        Year-to-date
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {PROGRAM_PROGRESS.map((metric) => {
          const pct = Math.min(100, (metric.current / metric.total) * 100);

          const fillColor = {
            teal: "bg-teal",
            green: "bg-status-green",
            blue: "bg-status-blue",
            amber: "bg-status-amber",
          }[metric.color];

          return (
            <div key={metric.label} className="flex flex-col gap-1.5">
              <div className="flex items-baseline justify-between">
                <span className="text-[11px] text-portal-textMuted">
                  {metric.label}
                </span>
                <span className="text-[11px] font-semibold text-portal-text">
                  {metric.displayValue}
                </span>
              </div>
              <div className="vp-progress-track">
                <div
                  className={cn("vp-progress-fill", fillColor)}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
