import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { BottomNav } from "@/components/layout/bottom-nav";

/**
 * Layout for every authenticated member page.
 * `(member)` is a Next.js route group — it doesn't add a URL segment.
 *
 * In Phase 1 we don't have auth yet; once added, this layout is where
 * we'll enforce session + redirect to /login if unauthenticated.
 */
export default function MemberLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-portal-bg text-portal-text">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar />
        <main className="flex-1 pb-24 md:pb-10">{children}</main>
      </div>
      <BottomNav />
    </div>
  );
}
