import { ReactNode, useEffect } from "react";
import SimpleHeader from "./SimpleHeader";
import Footer from "./Footer";

export const LEGAL_CONTACT = {
  email: "info@heavenofmunroe.com",
  phone: "+91 96338 36839",
  phoneHref: "tel:+919633836839",
  address: "Heaven of Munroe, Munroe Island, Kollam District, Kerala 691502, India",
};

export const LEGAL_UPDATED = "1 October 2026";

export default function LegalLayout({ title, children }: { title: string; children: ReactNode }) {
  useEffect(() => {
    document.title = `${title} | Heaven of Munroe`;
    window.scrollTo({ top: 0 });
  }, [title]);

  return (
    <div className="min-h-screen bg-background">
      <SimpleHeader />
      <main className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="font-serif text-4xl font-bold mb-2">{title}</h1>
        <p className="text-sm text-muted-foreground mb-8">Last updated: {LEGAL_UPDATED}</p>
        <div className="space-y-6 leading-relaxed text-foreground/90 [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:mt-8 [&_h2]:mb-2 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1 [&_a]:text-primary [&_a]:underline">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}
