/**
 * Mock data for Phase 1 of the VitalPath portal.
 *
 * Structure here maps 1:1 to the data entities defined in the
 * Requirements doc (Member, BiomarkerResult, WearableDataPoint,
 * AIAlert, CareTeamNote, Medication). Swap these exports out for
 * Drizzle ORM queries against D1 / Azure Postgres when we wire up
 * the real backend in Phase 2.
 */

import type { LucideIcon } from "lucide-react";
import { Activity, Droplet, Flame, HeartPulse } from "lucide-react";

// ───────────────────────────────────────────
// Member profile
// ───────────────────────────────────────────
export const MEMBER = {
  id: "mem_01",
  firstName: "Riko",
  lastName: "Matsuda",
  initials: "RM",
  biologicalAge: 41,
  chronologicalAge: 47,
  program: "Longevity Plus",
  programStartedOn: "2025-10-15",
};

// ───────────────────────────────────────────
// Stat cards (Overview hero strip)
// ───────────────────────────────────────────
export type StatCard = {
  id: string;
  label: string;
  value: string;
  unit?: string;
  trend: "up" | "down" | "stable";
  trendLabel: string;
  status: "good" | "warn" | "alert";
  icon: LucideIcon;
};

export const OVERVIEW_STATS: StatCard[] = [
  {
    id: "ldl",
    label: "LDL-P",
    value: "1,190",
    unit: "nmol/L",
    trend: "down",
    trendLabel: "−14% vs 6mo",
    status: "good",
    icon: Droplet,
  },
  {
    id: "hscrp",
    label: "HsCRP",
    value: "2.4",
    unit: "mg/L",
    trend: "up",
    trendLabel: "+0.6 vs last",
    status: "warn",
    icon: Flame,
  },
  {
    id: "hrv",
    label: "HRV (avg)",
    value: "48",
    unit: "ms",
    trend: "down",
    trendLabel: "−8 vs 30d avg",
    status: "warn",
    icon: HeartPulse,
  },
  {
    id: "fasting-glucose",
    label: "Fasting Glucose",
    value: "92",
    unit: "mg/dL",
    trend: "stable",
    trendLabel: "In target",
    status: "good",
    icon: Activity,
  },
];

// ───────────────────────────────────────────
// Biomarker trend time series (12-month view)
// Each entry is one monthly rollup; we normalize all
// markers into a single array for easy multi-line rendering.
// ───────────────────────────────────────────
export type TrendPoint = {
  month: string; // "Apr", "May", etc.
  ldlP: number;
  hsCrp: number;
  hrv: number;
  glucose: number;
};

export const BIOMARKER_TREND: TrendPoint[] = [
  { month: "May '25", ldlP: 1385, hsCrp: 1.9, hrv: 56, glucose: 94 },
  { month: "Jun '25", ldlP: 1350, hsCrp: 2.0, hrv: 58, glucose: 93 },
  { month: "Jul '25", ldlP: 1320, hsCrp: 1.8, hrv: 59, glucose: 95 },
  { month: "Aug '25", ldlP: 1290, hsCrp: 1.7, hrv: 60, glucose: 92 },
  { month: "Sep '25", ldlP: 1260, hsCrp: 1.6, hrv: 57, glucose: 94 },
  { month: "Oct '25", ldlP: 1240, hsCrp: 1.5, hrv: 55, glucose: 91 },
  { month: "Nov '25", ldlP: 1230, hsCrp: 1.6, hrv: 54, glucose: 92 },
  { month: "Dec '25", ldlP: 1220, hsCrp: 1.7, hrv: 53, glucose: 93 },
  { month: "Jan '26", ldlP: 1210, hsCrp: 1.9, hrv: 52, glucose: 91 },
  { month: "Feb '26", ldlP: 1205, hsCrp: 2.1, hrv: 50, glucose: 92 },
  { month: "Mar '26", ldlP: 1200, hsCrp: 2.3, hrv: 49, glucose: 93 },
  { month: "Apr '26", ldlP: 1190, hsCrp: 2.4, hrv: 48, glucose: 92 },
];

// ───────────────────────────────────────────
// Physician note feed
// ───────────────────────────────────────────
export type CareTeamNote = {
  id: string;
  kind: "physician-note" | "ai-alert" | "bio-age";
  title: string;
  body: string;
  author?: string;
  ageDays?: number;
  isNew?: boolean;
};

export const CARE_FEED: CareTeamNote[] = [
  {
    id: "note_1",
    kind: "physician-note",
    title: "Physician Note",
    body: "Lipid response is on track. Continuing statin + lifestyle protocol.",
    author: "Dr. R. Patel",
    ageDays: 3,
  },
  {
    id: "alert_1",
    kind: "ai-alert",
    title: "AI Pattern Alert",
    body: "HRV declined 18% over 6 weeks while HsCRP is trending up. Flagged for physician review.",
    isNew: true,
  },
  {
    id: "bioage_1",
    kind: "bio-age",
    title: "Biological Age",
    body: "41 vs 47 chronological",
  },
];

// ───────────────────────────────────────────
// Program progress bars
// ───────────────────────────────────────────
export type ProgramMetric = {
  label: string;
  current: number;
  total: number;
  color: "teal" | "green" | "blue" | "amber";
  displayValue: string;
};

export const PROGRAM_PROGRESS: ProgramMetric[] = [
  {
    label: "Wearable Data Days",
    current: 182,
    total: 365,
    color: "teal",
    displayValue: "182 / 365",
  },
  {
    label: "Lab Panels",
    current: 1,
    total: 2,
    color: "green",
    displayValue: "1 of 2",
  },
  {
    label: "Physician Visits",
    current: 2,
    total: 3,
    color: "blue",
    displayValue: "2 of 3",
  },
  {
    label: "Medication Adherence",
    current: 94,
    total: 100,
    color: "green",
    displayValue: "94%",
  },
];
