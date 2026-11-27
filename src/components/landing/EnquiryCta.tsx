"use client";

import { Loader2 } from "lucide-react";
import { useState, type FormEvent } from "react";

import hero from "@/assets/pearl-hero.jpg";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/data/pearl";

export function EnquiryCta() {
  const [sent, setSent] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;

    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    setLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: data,
      });
      const responseText = await response.text();
      let result: { success?: boolean; message?: string } = {};

      try {
        result = JSON.parse(responseText);
      } catch {
        throw new Error("The contact server returned an invalid response.");
      }

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to send your enquiry.");
      }

      setSent(name || "there");
      form.reset();
    } catch (error) {
      window.alert(
        error instanceof Error ? error.message : "Unable to send your enquiry."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="enquiry" className="relative isolate overflow-hidden">
      <img
        src={hero.src}
        alt=""
        aria-hidden
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />
      <div className="cta-overlay absolute inset-0 -z-10" />
      <div className="page-container grid items-center gap-10 py-16 md:grid-cols-2 md:py-20 lg:gap-14">
        <div className="text-ink-foreground">
          <h2 className="font-display text-[2.2rem] font-light leading-[1.15] md:text-[2.75rem]">
            Find Your Home Among the Best Flats in Kumarapuram
          </h2>
          <p className="mt-5 text-[15px] font-light leading-[1.75] text-ink-foreground/90">
            Among flats for sale in Kumarapuram, VFIVE Pearl gives your family a
            finished, RERA registered apartment in the heart of Kumarapuram,
            Trivandrum. Visit the project to choose your unit while your
            preferred floor is still available.
          </p>
          <p className="mt-4 text-[15px] font-light">
            Or call / WhatsApp us at{" "}
            <a
              href={CONTACT.phoneHref}
              className="font-medium hover:underline"
            >
              {CONTACT.phone}
            </a>
          </p>
        </div>

        <div className="bg-background p-6 sm:p-8">
          <h3 className="font-display text-[22px] font-normal">
            Book a Site Visit
          </h3>
          {sent ? (
            <div className="mt-6 space-y-4">
              <p className="text-[15px]">
                Thank you, {sent}. Our team will call you shortly to fix your
                visit.
              </p>
              <Button
                variant="pillOutline"
                size="pill"
                onClick={() => setSent(null)}
              >
                Send another enquiry
              </Button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="mt-5 space-y-4">
              <label className="block">
                <span className="mb-2 block text-xs">Full name</span>
                <input
                  name="name"
                  required
                  maxLength={100}
                  autoComplete="name"
                  className="field"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-xs">Phone / WhatsApp</span>
                <input
                  name="phone"
                  type="tel"
                  required
                  pattern="[0-9+\s\-]{8,16}"
                  title="Enter a valid phone number"
                  autoComplete="tel"
                  className="field"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-xs">Email</span>
                <input
                  name="email"
                  type="email"
                  maxLength={255}
                  autoComplete="email"
                  className="field"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-xs">I am interested in</span>
                <select
                  name="interest"
                  defaultValue="2 BHK"
                  className="field rounded-lg"
                >
                  <option>2 BHK</option>
                  <option>3 BHK</option>
                </select>
              </label>
              <Button
                type="submit"
                variant="pill"
                disabled={loading}
                aria-busy={loading}
                className="h-12 w-full rounded-full text-sm"
              >
                {loading ? (
                  <>
                    <Loader2 className="size-4 animate-spin" aria-hidden />
                    Booking…
                  </>
                ) : (
                  "Book a Site Visit"
                )}
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="page-container flex flex-col items-center justify-between gap-2 py-6 text-xs font-light sm:flex-row">
        <p>© VFive Homes, Trivandrum</p>
        <p>
          <a href={CONTACT.phoneHref} className="hover:underline">
            {CONTACT.phone}
          </a>
          {" · "}
          <a href={`mailto:${CONTACT.email}`} className="hover:underline">
            {CONTACT.email}
          </a>
        </p>
      </div>
    </footer>
  );
}
