import { CheckCircle2, Sparkles, Dna } from "lucide-react";
import { cn } from "@/lib/utils";
import { CARE_FEED, MEMBER, type CareTeamNote } from "@/lib/mock/dashboard";

/**
 * Right-rail feed on the overview dashboard showing:
 * - Recent physician notes
 * - AI-detected pattern alerts (already physician-reviewed)
 * - Biological age summary
 */
export function CareTeamFeed() {
  return (
    <div className="flex flex-col gap-3">
      <div className="vp-eyebrow">Recent Activity</div>

      {CARE_FEED.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </div>
  );
}

function NoteCard({ note }: { note: CareTeamNote }) {
  const config = {
    "physician-note": {
      icon: CheckCircle2,
      iconColor: "text-teal",
      iconBg: "bg-teal/15",
      borderAccent: "border-l-teal",
    },
    "ai-alert": {
      icon: Sparkles,
      iconColor: "text-status-amber",
      iconBg: "bg-status-amberDim",
      borderAccent: "border-l-status-amber",
    },
    "bio-age": {
      icon: Dna,
      iconColor: "text-portal-accent",
      iconBg: "bg-portal-accentDim",
      borderAccent: "border-l-portal-accent",
    },
  }[note.kind];

  const Icon = config.icon;

  return (
    <div
      className={cn(
        "vp-card p-4 border-l-[3px] hover:bg-portal-cardHover transition-colors",
        config.borderAccent
      )}
    >
      <div className="flex items-start gap-3">
        <div
          className={cn(
            "w-8 h-8 rounded-md flex items-center justify-center shrink-0",
            config.iconBg,
            config.iconColor
          )}
        >
          <Icon className="w-4 h-4" strokeWidth={1.8} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1">
            <div className="text-[12px] font-semibold uppercase tracking-wider text-portal-textSecondary">
              {note.title}
            </div>
            {note.isNew && (
              <span className="w-1.5 h-1.5 rounded-full bg-status-amber animate-pulse-soft" />
            )}
          </div>

          {/* Bio-age card gets a dedicated visual */}
          {note.kind === "bio-age" ? (
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="font-display text-[26px] text-portal-accent">
                {MEMBER.biologicalAge}
              </span>
              <span className="text-[11px] text-portal-textMuted">
                vs {MEMBER.chronologicalAge} chronological
              </span>
            </div>
          ) : (
            <>
              <p className="text-[12.5px] text-portal-textSecondary leading-relaxed">
                {note.body}
              </p>
              {note.author && (
                <div className="mt-2 inline-flex items-center gap-1.5 text-[10.5px] text-teal">
                  <CheckCircle2 className="w-3 h-3" strokeWidth={2.2} />
                  {note.author} · {note.ageDays}d ago
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
