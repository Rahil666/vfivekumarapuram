import { FileText, MapPin, PanelsTopLeft, Warehouse } from "lucide-react";
import type { ReactNode } from "react";

import hero from "/pearl-hero.jpg";
import { Button } from "@/components/ui/button";
import { STATS } from "@/data/pearl";

function StairsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="size-7" aria-hidden>
      <path d="M3 20h4v-4h4v-4h4V8h4V4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const ICONS: Record<(typeof STATS)[number]["key"], ReactNode> = {
  status: <Warehouse className="size-7" strokeWidth={1.25} />,
  location: <MapPin className="size-7" strokeWidth={1.25} />,
  units: <FileText className="size-7" strokeWidth={1.25} />,
  floors: <StairsIcon />,
  area: <PanelsTopLeft className="size-7" strokeWidth={1.25} />,
};

export function Hero() {
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <img
          src={hero.url}
          alt="VFIVE Pearl apartments in Kumarapuram at dusk"
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div className="hero-overlay absolute inset-0 -z-10" />
        <div className="page-container flex min-h-[460px] flex-col items-center justify-center py-20 text-center text-ink-foreground md:min-h-[535px]">
          <h1 className="max-w-3xl font-display text-[2.4rem] font-light leading-[1.15] sm:text-5xl md:text-[3.4rem]">
            Ready to Occupy Flats in Kumarapuram, Trivandrum
          </h1>
          <p className="mt-6 max-w-xl text-base font-light leading-relaxed text-ink-foreground/90 md:text-lg">
            VFIVE Pearl offers ready to occupy 2 and 3 BHK flats and apartments in Kumarapuram,
            Trivandrum, close to Medical College.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
            <Button asChild variant="pillLight" size="pillLg">
              <a href="#enquiry">Book a Site Visit</a>
            </Button>
            <Button asChild variant="pillOutlineLight" size="pillLg">
              <a href="#enquiry">Download Brochure</a>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-ink text-ink-foreground" aria-label="Project at a glance">
        <div className="page-container grid grid-cols-1 py-6 sm:grid-cols-2 md:py-9 lg:grid-cols-5">
          {STATS.map((s, i) => (
            <div
              key={s.key}
              className={`flex flex-col items-center gap-2 px-3 py-5 text-center lg:py-3 ${
                i < STATS.length - 1 ? "lg:border-r lg:border-ink-border" : ""
              }`}
            >
              {ICONS[s.key]}
              <span className="mt-1 text-[11px] font-light text-ink-muted">{s.label}</span>
              <span className="text-[15px]">{s.value}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
