import ContactSupport from "@/components/ContactSupport";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/ui/Footer";
import type { ReactNode } from "react";

export default function TermsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navigation />
      {children}
      <Footer />
      <ContactSupport />
    </>
  );
}
