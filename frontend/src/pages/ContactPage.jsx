import { useEffect } from "react";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { site } from "../config/site";
import { trackEvent } from "../lib/analytics";
import { useLanguage } from "../context/LanguageContext";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { ContactSection } from "../components/ContactSection";
import { Reveal } from "../components/Reveal";

export default function ContactPage() {
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.title = t.pagesSeo.contact.title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", t.pagesSeo.contact.desc);
  }, [t]);

  return (
    <div className="App">
      <Navbar />
      <main className="pt-16">
        <ContactSection />
        <section className="pb-24 bg-[#F5EFE6]" data-testid="contact-info-strip">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Reveal>
              <div className="rounded-2xl bg-white border border-[#1E2430]/8 p-6 text-center" data-testid="contact-info-address">
                <MapPin className="w-5 h-5 text-[#C88463] mx-auto" />
                <p className="mt-3 text-sm font-medium text-[#1E2430]">{site.address.street}</p>
                <p className="text-xs text-[#78869A]">{site.address.city}</p>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="rounded-2xl bg-white border border-[#1E2430]/8 p-6 text-center" data-testid="contact-info-hours">
                <Clock className="w-5 h-5 text-[#C88463] mx-auto" />
                <p className="mt-3 text-sm font-medium text-[#1E2430]">{site.hours}</p>
              </div>
            </Reveal>
            <Reveal delay={0.16}>
              <a
                href={`tel:${site.contact.phone}`}
                onClick={() => trackEvent("phone_click", { source: "contact_page" })}
                className="block rounded-2xl bg-white border border-[#1E2430]/8 p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                data-testid="contact-info-phone"
              >
                <Phone className="w-5 h-5 text-[#C88463] mx-auto" />
                <p className="mt-3 text-sm font-medium text-[#1E2430]">{site.contact.phoneDisplay}</p>
              </a>
            </Reveal>
            <Reveal delay={0.24}>
              <a
                href={`mailto:${site.contact.email}`}
                className="block rounded-2xl bg-white border border-[#1E2430]/8 p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                data-testid="contact-info-email"
              >
                <Mail className="w-5 h-5 text-[#C88463] mx-auto" />
                <p className="mt-3 text-sm font-medium text-[#1E2430] break-all">{site.contact.email}</p>
              </a>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
