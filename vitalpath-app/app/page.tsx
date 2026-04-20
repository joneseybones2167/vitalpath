import { redirect } from "next/navigation";

export default function RootPage() {
  // Phase 1: no marketing surface inside the app yet.
  // The pitch site lives separately. Land straight on the dashboard.
  redirect("/dashboard");
}
