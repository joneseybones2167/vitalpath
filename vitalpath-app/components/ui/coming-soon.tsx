import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

type Phase = "phase-1" | "phase-2" | "phase-3";

/**
 * Placeholder page shell used for sections we haven't built yet.
 * Shows what's coming so the nav feels complete while we iterate.
 */
export function ComingSoon({
  title,
  description,
  icon: Icon,
  phase,
  features,
}: {
  title: string;
  description: string;
  icon: LucideIcon;
  phase: Phase;
  features: string[];
}) {
  const phaseLabel = {
    "phase-1": "Phase 1 · In development",
    "phase-2": "Phase 2 · Data ingestion",
    "phase-3": "Phase 3 · Intelligence layer",
  }[phase];

  const phaseColor = {
    "phase-1": "text-teal bg-teal/10 border-teal/25",
    "phase-2": "text-status-amber bg-status-amberDim border-status-amber/25",
    "phase-3": "text-portal-accent bg-portal-accentDim border-portal-accent/25",
  }[phase];

  return (
    <div className="px-5 md:px-8 py-6 md:py-8">
      <div className="max-w-3xl">
        {/* Header */}
        <div className="flex items-start gap-4 mb-6">
          <div
            className={cn(
              "w-12 h-12 rounded-lg flex items-center justify-center shrink-0",
              "bg-portal-accentDim text-portal-accent"
            )}
          >
            <Icon className="w-6 h-6" strokeWidth={1.8} />
          </div>
          <div>
            <div
              className={cn(
                "inline-flex items-center px-2 py-0.5 rounded-full border mb-2",
                "text-[10px] font-semibold uppercase tracking-[0.12em]",
                phaseColor
              )}
            >
              {phaseLabel}
            </div>
            <h2 className="font-display text-[26px] md:text-[30px] text-portal-text leading-tight">
              {title}
            </h2>
            <p className="text-[14px] text-portal-textSecondary mt-1.5 leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        {/* What's coming */}
        <div className="vp-card p-5">
          <div className="vp-eyebrow mb-3">What will live here</div>
          <ul className="flex flex-col gap-2.5">
            {features.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-portal-accent mt-2 shrink-0" />
                <span className="text-[13.5px] text-portal-textSecondary leading-relaxed">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
