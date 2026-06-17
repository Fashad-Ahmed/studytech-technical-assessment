import type { ReactNode } from "react";
import NavHeader from "@/components/organisms/NavHeader";
import PageFade from "@/components/organisms/PageFade";

type Props = { children: ReactNode };

export default function PageShell({ children }: Props) {
  return (
    <div className="min-h-screen">
      <NavHeader />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10">
        <PageFade>{children}</PageFade>
      </main>
    </div>
  );
}
