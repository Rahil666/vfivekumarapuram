"use client";

import { useState } from "react";
import { ChevronDown, Mail, Menu, Phone, X } from "lucide-react";

import logo from "@/assets/vfive-logo.png";
import { Button } from "@/components/ui/button";
import { CONTACT, NAV_LINKS } from "@/data/pearl";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-30">
      <div className="bg-ink text-ink-foreground">
        <div className="page-container flex h-10 items-center justify-center gap-6 text-xs sm:justify-end">
          <a href={CONTACT.phoneHref} className="flex items-center gap-1.5 hover:opacity-80">
            <Phone className="size-3.5" strokeWidth={1.5} />
            {CONTACT.phone}
          </a>
          <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-1.5 hover:opacity-80">
            <Mail className="size-3.5" strokeWidth={1.5} />
            {CONTACT.email}
          </a>
        </div>
      </div>

      <div className="border-b border-border bg-background">
        <div className="page-container flex h-20 items-center justify-between gap-6">
          <a href="/" aria-label="VFive Homes home">
            <img src={logo.src} alt="VFive Homes" className="h-14 w-auto" />
          </a>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
            {NAV_LINKS.map((l) => (
              <a
                key={l.label}
                href="#"
                className="flex items-center gap-0.5 text-[13px] font-medium text-foreground hover:opacity-70"
              >
                {l.label}
                {l.dropdown && <ChevronDown className="size-3.5" strokeWidth={2.5} />}
              </a>
            ))}
            <Button asChild variant="pill" size="pill" className="font-medium">
              <a href="#enquiry">Book a Site Visit</a>
            </Button>
          </nav>

          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-full border border-border lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        {open && (
          <nav className="border-t border-border lg:hidden" aria-label="Mobile">
            <div className="page-container flex flex-col py-3">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.label}
                  href="#"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between border-b border-border py-3 text-sm font-medium last:border-0"
                >
                  {l.label}
                  {l.dropdown && <ChevronDown className="size-4" />}
                </a>
              ))}
              <Button asChild variant="pill" size="pillLg" className="mt-3 self-start">
                <a href="#enquiry" onClick={() => setOpen(false)}>
                  Book a Site Visit
                </a>
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
