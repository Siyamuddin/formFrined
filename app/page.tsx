import { Suspense } from "react";
import { Wizard } from "@/components/wizard";
import { en } from "@/lib/i18n/en";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-lg flex-col px-4 py-6">
      <header className="mb-6">
        <p className="text-sm font-semibold text-accent">{en.appName}</p>
        <h1 className="mt-1 text-2xl font-semibold leading-tight">{en.tagline}</h1>
        <p className="mt-3 text-sm leading-6">{en.disclaimer}</p>
        <p className="mt-2 text-sm leading-6 text-foreground/70">{en.privacy}</p>
      </header>
      <Suspense fallback={null}>
        <Wizard />
      </Suspense>
      <footer className="mt-10 border-t border-line pt-4 text-xs leading-5 text-foreground/70">
        {en.footerCredit}
      </footer>
    </main>
  );
}
