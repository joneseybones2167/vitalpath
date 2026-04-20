"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { BIOMARKER_TREND } from "@/lib/mock/dashboard";

type RangeKey = "3M" | "6M" | "12M";
const RANGE_OPTIONS: RangeKey[] = ["3M", "6M", "12M"];

// Normalize every series to a 0–100 scale for unified display.
// Real values are shown in the tooltip on hover.
const NORM = { ldlP: 1500, hsCrp: 3.5, hrv: 80, glucose: 120 };

const SERIES = [
  { key: "ldlP"    as const, label: "LDL-P",   color: "#5EC4BD", unit: "nmol/L" },
  { key: "hsCrp"   as const, label: "HsCRP",   color: "#FAC775", unit: "mg/L"   },
  { key: "hrv"     as const, label: "HRV",     color: "#A78BFA", unit: "ms"     },
  { key: "glucose" as const, label: "Glucose", color: "#F87171", unit: "mg/dL"  },
];

type TooltipData = {
  month: string;
  ldlP: number; hsCrp: number; hrv: number; glucose: number;
  x: number; y: number;
};

const PAD = { top: 12, right: 16, bottom: 32, left: 42 };

/**
 * BiomarkerChart — pure SVG multi-line chart.
 *
 * Why not Recharts? Recharts' Tooltip formatter API changed between minor
 * versions and is fragile in the Next.js App Router SSR context. Pure SVG
 * gives us pixel-perfect control, no hydration mismatches, and zero
 * "blank chart" surprises from library quirks.
 */
export function BiomarkerChart() {
  const [range, setRange] = useState<RangeKey>("12M");
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const [dims, setDims] = useState({ w: 600, h: 300 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Measure container and re-measure on resize
  const measure = useCallback(() => {
    if (!containerRef.current) return;
    const { width, height } = containerRef.current.getBoundingClientRect();
    if (width > 0 && height > 0) setDims({ w: width, h: height });
  }, []);

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [measure]);

  const data = (() => {
    const len = range === "3M" ? 3 : range === "6M" ? 6 : 12;
    return BIOMARKER_TREND.slice(-len);
  })();

  const { w, h } = dims;
  const cW = w - PAD.left - PAD.right;
  const cH = h - PAD.top  - PAD.bottom;
  const n  = data.length;

  const xOf = (i: number) => PAD.left + (i / Math.max(n - 1, 1)) * cW;
  const yOf = (pct: number) => PAD.top + (1 - pct / 100) * cH;
  const nm  = (key: keyof typeof NORM, val: number) => (val / NORM[key]) * 100;

  return (
    <div className="vp-card p-5">
      {/* Header */}
      <div className="flex items-start justify-between mb-4 gap-4 flex-wrap">
        <div>
          <div className="vp-eyebrow mb-1">Biomarker Trends</div>
          <div className="text-[14px] font-semibold text-portal-text">
            Key markers —{" "}
            {range === "12M" ? "12-month" : range === "6M" ? "6-month" : "3-month"} view
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

      {/* SVG chart */}
      <div ref={containerRef} className="relative h-[280px] w-full">

        {/* Tooltip */}
        {tooltip && (
          <div
            className="absolute z-10 pointer-events-none"
            style={{
              left: tooltip.x + 14,
              top:  tooltip.y - 10,
              // Flip left if it would overflow
              ...(tooltip.x + 180 > w && { left: tooltip.x - 178 }),
            }}
          >
            <div
              className="rounded-lg border text-[12px]"
              style={{
                background: "#1A1A18",
                border: "1px solid #333330",
                padding: "9px 13px",
                boxShadow: "0 6px 24px rgba(0,0,0,0.55)",
                minWidth: 160,
              }}
            >
              <div className="text-[11px] font-semibold mb-1.5" style={{ color: "#9B9890" }}>
                {tooltip.month}
              </div>
              <div className="flex flex-col gap-1">
                {SERIES.map((s) => (
                  <div key={s.key} className="flex justify-between gap-4">
                    <span style={{ color: s.color }}>● {s.label}</span>
                    <span style={{ color: "#E8E6DF" }}>
                      {tooltip[s.key]} {s.unit}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <svg
          width={w}
          height={h}
          style={{ display: "block", overflow: "visible" }}
        >
          {/* Horizontal grid lines + Y labels */}
          {[0, 25, 50, 75, 100].map((pct) => (
            <g key={pct}>
              <line
                x1={PAD.left} y1={yOf(pct)}
                x2={PAD.left + cW} y2={yOf(pct)}
                stroke="#2A2A27" strokeWidth={1} strokeDasharray="4 3"
              />
              <text
                x={PAD.left - 6} y={yOf(pct) + 4}
                fill="#6B6961" fontSize={10} textAnchor="end"
                fontFamily="DM Sans, sans-serif"
              >
                {pct}
              </text>
            </g>
          ))}

          {/* X axis labels — every other tick to avoid crowding */}
          {data.map((d, i) =>
            i % 2 === 0 ? (
              <text
                key={d.month}
                x={xOf(i)} y={PAD.top + cH + 22}
                fill="#9B9890" fontSize={10} textAnchor="middle"
                fontFamily="DM Sans, sans-serif"
              >
                {d.month}
              </text>
            ) : null
          )}

          {/* Lines */}
          {SERIES.map((s) => {
            const points = data
              .map((d, i) => `${xOf(i).toFixed(1)},${yOf(nm(s.key, d[s.key])).toFixed(1)}`)
              .join(" ");
            return (
              <polyline
                key={s.key}
                points={points}
                fill="none"
                stroke={s.color}
                strokeWidth={2}
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            );
          })}

          {/* Dots */}
          {SERIES.map((s) =>
            data.map((d, i) => (
              <circle
                key={`${s.key}-${i}`}
                cx={xOf(i)} cy={yOf(nm(s.key, d[s.key]))}
                r={3} fill={s.color}
              />
            ))
          )}

          {/* Invisible hover columns — one per x position */}
          {data.map((d, i) => {
            const cx  = xOf(i);
            const hw  = n > 1 ? cW / (n - 1) / 2 : cW / 2;
            const rx  = i === 0 ? PAD.left : cx - hw;
            const rw  = i === 0 || i === n - 1 ? hw : hw * 2;
            return (
              <rect
                key={i}
                x={rx} y={PAD.top}
                width={rw} height={cH}
                fill="transparent"
                style={{ cursor: "crosshair" }}
                onMouseEnter={(e) => {
                  const svgRect = (e.currentTarget.closest("svg") as SVGElement)
                    .getBoundingClientRect();
                  const containerRect = containerRef.current!.getBoundingClientRect();
                  setTooltip({
                    month: d.month,
                    ldlP: d.ldlP, hsCrp: d.hsCrp,
                    hrv: d.hrv, glucose: d.glucose,
                    x: cx,
                    y: e.clientY - containerRect.top,
                  });
                }}
                onMouseLeave={() => setTooltip(null)}
              />
            );
          })}
        </svg>
      </div>

      {/* Legend */}
      <div className="flex gap-4 mt-3 flex-wrap">
        {SERIES.map((s) => (
          <div key={s.key} className="flex items-center gap-1.5">
            <span
              className="w-2.5 h-2.5 rounded-full inline-block"
              style={{ background: s.color }}
            />
            <span className="text-[11px] text-portal-textMuted">{s.label}</span>
          </div>
        ))}
      </div>

      <p className="text-[11px] text-portal-textMuted mt-1.5">
        Values normalized for display — hover data points to see actual units.
      </p>
    </div>
  );
}
