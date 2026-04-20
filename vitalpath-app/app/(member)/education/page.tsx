import { BookOpen } from "lucide-react";
import { ComingSoon } from "@/components/ui/coming-soon";

export default function EducationPage() {
  return (
    <ComingSoon
      icon={BookOpen}
      phase="phase-2"
      title="Education Hub"
      description="Every biomarker, explained. Every result, contextualized. Every question, answered — by AI grounded in physician-approved content."
      features={[
        "Biomarker modules: what it measures, why it matters, what affects it",
        "Plain-language AI Q&A about your own results (GPT-4o mini, grounded in VitalPath's curated knowledge repo)",
        "Every AI response labeled as AI-generated and never presented as medical advice",
        "Deep dives on longevity topics: sleep, nutrition, resistance training, stress",
        "Content physician-reviewed before publication — no hallucinated medical content",
      ]}
    />
  );
}
