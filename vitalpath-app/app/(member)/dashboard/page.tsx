import { StatCardTile } from "@/components/dashboard/stat-card";
import { BiomarkerChart } from "@/components/charts/biomarker-chart";
import { CareTeamFeed } from "@/components/dashboard/care-team-feed";
import { ProgramProgress } from "@/components/dashboard/program-progress";
import { MEMBER, OVERVIEW_STATS } from "@/lib/mock/dashboard";

/**
 * Overview dashboard — the default landing page for members.
 *
 * Layout follows portal.html structure:
 *   [ Hero greeting                                     ]
 *   [ Stat card strip (4 biomarkers)                    ]
 *   [ Biomarker trend chart (2/3 col) | Care feed (1/3) ]
 *   [ Program progress bars                             ]
 */
export default function DashboardPage() {
  return (
    <div className="px-5 md:px-8 py-6 md:py-8 flex flex-col gap-6">
      {/* ── Greeting ── */}
      <section>
        <div className="vp-eyebrow mb-1">Welcome back</div>
        <h2 className="font-display text-[28px] md:text-[32px] leading-tight text-portal-text">
          Hello, {MEMBER.firstName}.
        </h2>
        <p className="text-[13.5px] text-portal-textSecondary mt-1 max-w-[540px]">
          Here&rsquo;s where your health is trending today — all signals reviewed by your care team.
        </p>
      </section>

      {/* ── Stat card strip ── */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {OVERVIEW_STATS.map((stat) => (
          <StatCardTile key={stat.id} stat={stat} />
        ))}
      </section>

      {/* ── Trend chart + care feed ── */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <BiomarkerChart />
        </div>
        <div>
          <CareTeamFeed />
        </div>
      </section>

      {/* ── Program progress ── */}
      <section>
        <ProgramProgress />
      </section>
    </div>
  );
}
