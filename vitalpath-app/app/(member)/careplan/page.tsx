import { ClipboardList } from "lucide-react";
import { ComingSoon } from "@/components/ui/coming-soon";

export default function CarePlanPage() {
  return (
    <ComingSoon
      icon={ClipboardList}
      phase="phase-1"
      title="Care Plan"
      description="A living document that you and your physician both hold — goals, protocols, lab schedule, and progress in one place."
      features={[
        "Documented health goals with measurable outcomes (biomarker targets, weight, symptoms)",
        "Lab panel schedule — which tests, at what intervals, with completion status",
        "Active treatment protocols: medications, supplements, lifestyle interventions",
        "Rationale for each intervention, authored by your physician",
        "Updated at every follow-up; member and physician both sign off on changes",
      ]}
    />
  );
}
