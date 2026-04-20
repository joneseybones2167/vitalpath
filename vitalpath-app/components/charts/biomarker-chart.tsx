"use client";

import { useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { cn } from "@/lib/utils";
import { BIOMARKER_TREND, type TrendPoint } from "@/lib/mock/dashboard";

/**
 * Multi-line chart showing key biomarkers over time.
 * - Each biomarker has its own Y-axis scale (they're different units),
 *   but we normalize them to a 0–100 display scale so they're all readable
 *   on one chart. Real values live in the tooltip.
 */

type RangeKey = "3M" | "6M" | "12M";
const RANGE_OPTIONS: RangeKey[] = ["3M", "6M", "12M"];

// Max values used for the 0–100 normalization
const NORM = {
  ldlP: 1500,
  hsCrp: 3.5,
  hrv: 80,
  glucose: 120,
};

type ChartPoint = TrendPoint & {
  ldlPN: number;
  hsCrpN: number;
  hrvN: number;
  glucoseN: number;
};

const SERIES = [
  { key: "ldlPN", raw: "ldlP", label: "LDL-P", color: "#5EC4BD", unit: "nmol/L" },
  { key: "hsCrpN", raw: "hsCrp", label: "HsCRP", color: "#FAC775", unit: "mg/L" },
  { key: "hrvN", raw: "hrv", label: "HRV", color: "#A78BFA", unit: "ms" },
  { key: "glucoseN", raw: "glucose", label: "Glucose", color: "#F87171", unit: "mg/dL" },
] as const;

export function BiomarkerChart() {
  const [range, setRange] = useState<RangeKey>("12M");

  const data: ChartPoint[] = useMemo(() => {
    const sliceLen = range === "3M" ? 3 : range === "6M" ? 6 : 12;
    const slice = BIOMARKER_TREND.slice(-sliceLen);
    // Normalize each value to 0–100 for display
    return slice.map((p) => ({
      ...p,
      ldlPN: (p.ldlP / NORM.ldlP) * 100,
      hsCrpN: (p.hsCrp / NORM.hsCrp) * 100,
      hrvN: (p.hrv / NORM.hrv) * 100,
      glucoseN: (p.glucose / NORM.glucose) * 100,
    }));
  }, [range]);

  return (
    <div className="vp-card p-5">
      {/* Header */}
      <div className="flex items-start justify-between mb-4 gap-4 flex-wrap">
        <div>
          <div className="vp-eyebrow mb-1">Biomarker Trends</div>
          <div className="text-[14px] font-semibold text-portal-text">
            Key markers — {range === "12M" ? "12-month" : range === "6M" ? "6-month" : "3-month"} view
          </div>
        </div>
        <div className="flex gap-1 p-1 bg-portal-elevated rounded-md border border-portal-border">
          {RANGE_OPTIONS.map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={cn(
                "px-3 py-1 text-[11px] font-semibold rounded transition-colors",
                range === r
                  ? "bg-portal-accentDim text-portal-accent"
                  : "text-portal-textMuted hover:text-portal-text"
              )}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2A2A27" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fill: "#9B9890", fontSize: 11 }}
              axisLine={{ stroke: "#2A2A27" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#6B6961", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              domain={[0, 100]}
              tickFormatter={(v) => `${v}`}
            />
            <Tooltip
              contentStyle={{
                background: "#1A1A18",
                border: "1px solid #2A2A27",
                borderRadius: 8,
                fontSize: 12,
                color: "#E8E6DF",
              }}
              labelStyle={{ color: "#9B9890", fontSize: 11, marginBottom: 4 }}
              formatter={(_value, _name, ctx) => {
                // Display the raw (un-normalized) value from the source data
                const series = SERIES.find((s) => s.key === ctx.dataKey);
                if (!series) return null;
                const payload = ctx.payload as ChartPoint;
                const raw = payload[series.raw as keyof TrendPoint];
                return [`${raw} ${series.unit}`, series.label];
              }}
            />
            <Legend
              iconType="circle"
              wrapperStyle={{ fontSize: 11, color: "#9B9890", paddingTop: 8 }}
            />
            {SERIES.map((s) => (
              <Line
                key={s.key}
                type="monotone"
                dataKey={s.key}
                name={s.label}
                stroke={s.color}
                strokeWidth={2}
                dot={{ r: 2.5, strokeWidth: 0, fill: s.color }}
                activeDot={{ r: 5, strokeWidth: 0 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <p className="text-[11px] text-portal-textMuted mt-2">
        Values normalized for display — hover points to see actual units.
      </p>
    </div>
  );
}
