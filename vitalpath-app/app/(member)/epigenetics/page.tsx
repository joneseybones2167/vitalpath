import { Dna } from "lucide-react";
import { ComingSoon } from "@/components/ui/coming-soon";

export default function EpigeneticsPage() {
  return (
    <ComingSoon
      icon={Dna}
      phase="phase-3"
      title="Epigenetic Profile"
      description="Biological age measured at program baseline and milestones — physician-interpreted alongside your full biomarker picture, never as a standalone number."
      features={[
        "Biological age vs. chronological age tracked over time",
        "Epigenetic age snapshots at program baseline and each lab cycle",
        "Physician interpretation note attached to every measurement",
        "Optional: raw genetic data upload (23andMe, AncestryDNA) with PRS calculation",
        "Polygenic risk scores for cardiovascular disease, type 2 diabetes, and other conditions",
      ]}
    />
  );
}
