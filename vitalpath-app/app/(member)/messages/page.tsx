import { MessageSquare } from "lucide-react";
import { ComingSoon } from "@/components/ui/coming-soon";

export default function MessagesPage() {
  return (
    <ComingSoon
      icon={MessageSquare}
      phase="phase-1"
      title="Messages"
      description="Secure async messaging with your VitalPath physician and care team — no phone tag, no portals from the 1990s."
      features={[
        "Threaded conversations with your physician",
        "Attach files, lab PDFs, or images directly to a message",
        "Clinical notes from your physician delivered here for your records",
        "Push notifications for new messages (mobile app)",
        "End-to-end encrypted — messages never leave Canadian data centers",
      ]}
    />
  );
}
