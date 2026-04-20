import { Pill } from "lucide-react";
import { ComingSoon } from "@/components/ui/coming-soon";

export default function MedicationsPage() {
  return (
    <ComingSoon
      icon={Pill}
      phase="phase-1"
      title="Medications"
      description="Active prescriptions, daily adherence tracking, and the ability to see how adherence correlates with your biomarker trends."
      features={[
        "Active medication list with dose, frequency, prescribing physician, and start date",
        "Daily adherence calendar — one dot per day, taken or missed",
        "Rolling 30-day adherence percentage",
        "Missed doses flagged to the care team automatically",
        "Adherence overlay on biomarker trend charts to see cause and effect",
      ]}
    />
  );
}
