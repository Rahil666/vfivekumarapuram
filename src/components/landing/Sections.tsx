import { BadgeCheck, GraduationCap, MapPin, Plane, ShoppingBag, SquarePlus } from "lucide-react";
import { useState, type ReactNode } from "react";

import building from "@/assets/pearl-building.jpg";
import floorplan3 from "@/assets/floorplan-3bhk-ff.jpg";
import handover from "@/assets/key-handover.jpg";
import progressJan from "@/assets/progress-jan-2024.jpg";
import { Button } from "@/components/ui/button";
import {
  AMENITIES,
  FAQS,
  LANDMARKS,
  LOCATION_CARDS,
  REASONS,
  SPECIFICATIONS,
  STEPS,
  TESTIMONIALS,
} from "@/data/pearl";
import { cn } from "@/lib/utils";
import { ToggleList } from "./ToggleList";

function Block({
  id,
  title,
  intro,
  children,
  first,
}: {
  id: string;
  title: string;
  intro?: ReactNode;
  children?: ReactNode;
  first?: boolean;
}) {
  return (
    <section id={id} className={cn("py-12 md:py-14", !first && "border-t border-border")}>
      <h2 className="section-title">{title}</h2>
      {intro && <div className="body-copy mt-5 max-w-[680px] md:text-[15px]">{intro}</div>}
      {children && <div className="mt-7">{children}</div>}
    </section>
  );
}

export function Overview() {
  return (
    <section id="overview" className="pb-12 md:pb-14">
      <div className="grid gap-8 md:grid-cols-[1fr_234px] md:gap-10">
        <div>
          <h2 className="section-title">VFIVE Pearl: Premium Flats in Kumarapuram</h2>
          <div className="body-copy mt-6 space-y-4 md:text-[15px]">
            <p>
              VFIVE Pearl is a ready to occupy residential project developed by VFive Homes in
              Kumarapuram, Trivandrum. The building has 40 units across G+7 floors. Unit options
              include 2 and 3 BHK apartments, with sizes ranging from 715 to 1662 sq ft.
            </p>
            <p>
              Kumarapuram is a calm residential location in the centre of Thiruvananthapuram. The
              project sits about 1 km from Government Medical College and about 15 minutes from
              Trivandrum International Airport. Schools and colleges, hospitals and shopping malls
              are all within a short drive.
            </p>
            <p>
              VFIVE Pearl is registered with K-RERA under K-RERA/PRJ/072/2020. Every apartment comes
              with branded fittings, car parking, a swimming pool, a health club and 24x7 security.
            </p>
          </div>
        </div>
        <img
          src={building}
          alt="VFIVE Pearl building exterior"
          className="aspect-[3/4] w-full max-w-sm border border-border object-cover md:max-w-none"
          loading="lazy"
        />
      </div>
    </section>
  );
}

const CARD_ICONS: Record<(typeof LOCATION_CARDS)[number]["key"], ReactNode> = {
  hospital: <SquarePlus className="size-6" strokeWidth={1.5} />,
  school: <GraduationCap className="size-6" strokeWidth={1.5} />,
  airport: <Plane className="size-6" strokeWidth={1.5} />,
  shopping: <ShoppingBag className="size-6" strokeWidth={1.5} />,
};

export function WhyKumarapuram() {
  return (
    <Block
      id="why-kumarapuram"
      title="Why Kumarapuram Is a Smart Location to Buy a Flat"
      intro="Kumarapuram is one of the best connected residential areas in Trivandrum. The locality sits between Medical College, Pattom and Chakkai, close to the city centre. Families choose flats and apartments in Kumarapuram for hospitals, schools and calm streets within the city. Several residential projects in Kumarapuram are still under construction, so finished homes here are in short supply."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {LOCATION_CARDS.map((c) => (
          <article key={c.key} className="bg-muted px-6 py-7">
            {CARD_ICONS[c.key]}
            <h3 className="mt-5 text-[17px] font-medium leading-snug">{c.title}</h3>
            <p className="body-copy mt-4 text-[13.5px] leading-[1.7]">{c.body}</p>
          </article>
        ))}
      </div>
    </Block>
  );
}

export function WhyPearl() {
  return (
    <Block
      id="why-vfive-pearl"
      title="Why Families and NRIs Choose VFIVE Pearl"
      intro="VFIVE Pearl combines a central Kumarapuram, Trivandrum address with a finished building. Buyers get certainty on unit size, quality and handover. VFive Homes has more than 10 years of experience and over 500 happy customers, with residential projects across Trivandrum including Midcity, Deepam and Elysium."
    >
      <div className="grid gap-8 md:grid-cols-[252px_1fr]">
        <figure className="self-start">
          <img
            src={handover}
            alt="Key handing over at VFIVE Pearl, Kumarapuram"
            className="aspect-square w-full max-w-sm object-cover md:max-w-none"
            loading="lazy"
          />
          <figcaption className="mt-3 text-[11px] text-muted-foreground">
            Key handing over at VFIVE Pearl, Kumarapuram
          </figcaption>
        </figure>
        <ol className="border-t border-border">
          {REASONS.map((r, i) => (
            <li key={r.title} className="flex gap-4 border-b border-border py-5 last:border-0">
              <span className="w-8 shrink-0 font-display text-2xl font-light leading-none">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-[16px] font-medium">{r.title}</h3>
                <p className="body-copy mt-3 text-[13.5px] leading-[1.7]">{r.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Block>
  );
}

export function Amenities() {
  return (
    <Block
      id="amenities"
      title="Amenities at VFIVE Pearl"
      intro="The project offers 18 amenities for modern living, for families, children and working professionals."
    >
      <ul className="grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-3 lg:grid-cols-5">
        {AMENITIES.map((a) => (
          <li key={a} className="flex items-center gap-2.5 text-[13px]">
            <BadgeCheck className="size-[18px] shrink-0" strokeWidth={1.5} />
            {a}
          </li>
        ))}
      </ul>
    </Block>
  );
}

export function Specification() {
  return (
    <Block
      id="specification"
      title="Specification"
      intro="Every apartment is built on an RCC frame designed for seismic zone 3, with branded fittings throughout."
    >
      <ToggleList items={SPECIFICATIONS} />
    </Block>
  );
}

export function FloorPlans() {
  const [tab, setTab] = useState<"2" | "3">("3");

  return (
    <Block
      id="floor-plans"
      title="Floor Plans: 2 and 3 BHK Flats in Kumarapuram"
      intro={
        <>
          VFIVE Pearl offers 2 BHK and 3 BHK flats in Kumarapuram, with unit sizes from 715 to 1662
          sq ft. Explore our{" "}
          <a href="#floor-plans" className="text-foreground underline underline-offset-2">
            2 BHK flats in Kumarapuram
          </a>{" "}
          and{" "}
          <a href="#floor-plans" className="text-foreground underline underline-offset-2">
            3 BHK flats in Kumarapuram
          </a>
          .
        </>
      }
    >
      <div className="flex gap-2" role="tablist">
        {(["2", "3"] as const).map((t) => (
          <Button
            key={t}
            role="tab"
            aria-selected={tab === t}
            variant={tab === t ? "pill" : "pillOutline"}
            size="pill"
            onClick={() => setTab(t)}
          >
            {t} BHK Layouts
          </Button>
        ))}
      </div>

      <div className="mt-5 grid gap-6 md:grid-cols-[1fr_auto] md:gap-5">
        {tab === "3" ? (
          <img
            src={floorplan3}
            alt="3 BHK Type FF 1st floor plan, VFIVE Pearl"
            className="w-full max-w-[535px] border border-foreground/80 bg-background"
            loading="lazy"
          />
        ) : (
          <div className="flex aspect-[908/800] w-full max-w-[535px] items-center justify-center border border-border bg-muted text-xs text-muted-foreground">
            2 BHK floor plan
          </div>
        )}
        <div className="md:w-[220px]">
          {tab === "3" ? (
            <>
              <p className="text-[13px] font-medium">3 BHK · Type FF · 1st Floor</p>
              <ul className="body-copy mt-3 space-y-1 text-[13px]">
                <li>Saleable area 1583 sq ft</li>
                <li>Carpet area 1034 sq ft</li>
                <li>Balcony area 74 sq ft</li>
              </ul>
            </>
          ) : (
            <>
              <p className="text-[13px] font-medium">2 BHK Layouts</p>
              <ul className="body-copy mt-3 space-y-1 text-[13px]">
                <li>Sizes from 715 sq ft</li>
              </ul>
            </>
          )}
          <Button asChild variant="pill" size="pill" className="mt-5">
            <a href="#enquiry">View all {tab} BHK plans</a>
          </Button>
        </div>
      </div>
    </Block>
  );
}

export function LocationMap() {
  return (
    <Block
      id="location-map"
      title="VFIVE Pearl Location Map, Kumarapuram"
      intro="The project location is Kumarapuram, Trivandrum, about 1 km from Government Medical College."
    >
      <div className="grid gap-6 md:grid-cols-[1fr_217px] md:gap-6">
        <div className="relative min-h-[300px] overflow-hidden bg-placeholder md:min-h-[368px]">
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-xs text-muted-foreground">
            <MapPin className="size-7 text-foreground" strokeWidth={1.5} />
            Loading map…
          </div>
          <iframe
            title="VFIVE Pearl location on Google Maps"
            src="https://www.google.com/maps?q=Kumarapuram,+Thiruvananthapuram,+Kerala&z=15&output=embed"
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <ul>
          {LANDMARKS.map((l) => (
            <li
              key={l.name}
              className="flex items-start justify-between gap-4 border-b border-border py-4 text-[13px] first:pt-0"
            >
              <span className="font-light">{l.name}</span>
              <span className="shrink-0 font-medium">{l.distance}</span>
            </li>
          ))}
        </ul>
      </div>
    </Block>
  );
}

const PROGRESS = [
  { label: "September 2024", src: handover },
  { label: "January 2024", src: progressJan },
  { label: "October 2023",src: progressJan },
  { label: "March 2023",src: handover },
];

export function ProjectProgress() {
  return (
    <Block
      id="project-progress"
      title="Project Progress"
      intro="VFIVE Pearl is complete. These photos show each stage of the build, from 2020 to handover."
    >
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {PROGRESS.map((p) => (
          <figure key={p.label}>
            {p.src ? (
              <img
                src={p.src}
                alt={`VFIVE Pearl progress, ${p.label}`}
                className="aspect-square w-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="flex aspect-square w-full items-center justify-center bg-muted text-xs text-muted-foreground">
                Progress photo
              </div>
            )}
            <figcaption className="mt-2 text-xs">{p.label}</figcaption>
          </figure>
        ))}
      </div>
    </Block>
  );
}

export function HowToBuy() {
  return (
    <Block id="how-to-buy" title="How to Buy Your Apartment at VFIVE Pearl">
      <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
        {STEPS.map((s, i) => (
          <li key={s.title} className="border-t-2 border-foreground pt-4">
            <p className="text-[11px] tracking-[0.2em] text-muted-foreground">
              STEP {String(i + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-3 text-[16px] font-medium">{s.title}</h3>
            <p className="body-copy mt-3 text-[12.5px] leading-[1.7]">{s.body}</p>
          </li>
        ))}
      </ol>
    </Block>
  );
}

export function Testimonials() {
  return (
    <Block id="testimonials" title="What Our Residents Say">
      <div className="grid gap-4 md:grid-cols-3">
        {TESTIMONIALS.map((t) => (
          <figure key={t.quote} className="bg-muted px-6 py-7">
            <blockquote className="text-[16px] font-light leading-relaxed">“{t.quote}”</blockquote>
            <figcaption className="mt-4 text-[11px]">
              <span className="font-medium">{t.name}</span>
              <span className="text-foreground/80"> · {t.role}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </Block>
  );
}

export function Faqs() {
  return (
    <Block id="faqs" title="Flats in Kumarapuram: Frequently Asked Questions">
      <ToggleList items={FAQS} size="md" />
    </Block>
  );
}
