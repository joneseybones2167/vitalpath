import { Watch } from "lucide-react";
import { ComingSoon } from "@/components/ui/coming-soon";

export default function WearablesPage() {
  return (
    <ComingSoon
      icon={Watch}
      phase="phase-2"
      title="Wearable Data"
      description="Continuous signals from Oura, Apple Health, CGM, and more — overlaid with your lab timeline so one-off tests become a continuous story."
      features={[
        "Device connection hub — link Oura, Apple Health, CGM, Garmin, Whoop via Terra API",
        "HRV, resting heart rate, sleep stages, body temperature, readiness score",
        "Real-time glucose overlay from CGM with meals, exercise, and sleep context",
        "Unified schema across all devices — no more switching between apps to see your health",
        "iOS companion app for HealthKit background sync (required for Apple Watch data)",
      ]}
    />
  );
}
