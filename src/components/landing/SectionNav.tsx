import { useEffect, useState } from "react";

import { SECTIONS } from "@/data/pearl";
import { cn } from "@/lib/utils";

export function SectionNav() {
  const [active, setActive] = useState<string>(SECTIONS[0].id);

  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => !!el,
    );
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) {
          visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
          const top = visible[0];
          if (top) setActive(top.target.id);
        }
      },
      { rootMargin: "-10% 0px -70% 0px" },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <aside className="lg:sticky lg:top-6 lg:self-start">
      <nav aria-label="On this page">
        <ul>
          {SECTIONS.map((s) => (
            <li key={s.id} className="border-b border-border">
              <a
                href={`#${s.id}`}
                className={cn(
                  "block py-3 text-[13px] transition-colors hover:text-foreground",
                  active === s.id ? "font-medium text-foreground" : "text-foreground/80",
                )}
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-9">
        <p className="font-display text-[28px] font-normal tracking-[0.18em] text-pearl">PEARL</p>
        <p className="mt-1 text-[10px] tracking-[0.25em] text-pearl">REDEFINING LUXURY</p>
      </div>

      <dl className="mt-8 space-y-4 text-[11px]">
        <div>
          <dt className="font-light text-muted-foreground">Permit Number</dt>
          <dd className="mt-1 font-medium">E10/BA/41989/18</dd>
        </div>
        <div>
          <dt className="font-light text-muted-foreground">RERA Reg No</dt>
          <dd className="mt-1 font-medium">K-RERA/PRJ/072/2020</dd>
        </div>
      </dl>
    </aside>
  );
}
