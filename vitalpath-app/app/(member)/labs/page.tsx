import { FlaskConical } from "lucide-react";
import { ComingSoon } from "@/components/ui/coming-soon";

export default function LabsPage() {
  return (
    <ComingSoon
      icon={FlaskConical}
      phase="phase-2"
      title="Lab Results"
      description="Longitudinal biomarker tracking across clinic labs, at-home kits, and member uploads — one record, wherever the test was done."
      features={[
        "Latest panel table with value, reference range, and in/out-of-range flags for every biomarker",
        "Trends view — select biomarkers to see their trajectory over time",
        "Upload flow — photograph or upload a lab PDF; Azure Document Intelligence extracts the values for review",
        "Automatic import from LifeLabs / DynaLife via HL7 FHIR (Phase 3)",
        "SiPhox Health at-home kit results pulled in via their API",
      ]}
    />
  );
}
