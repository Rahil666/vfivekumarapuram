import { Minus, Plus } from "lucide-react";
import { useState } from "react";

type Item = { title: string; body: string };

/** Expandable list used for Specification and FAQs; every row starts open, as in the design. */
export function ToggleList({ items, size = "sm" }: { items: Item[]; size?: "sm" | "md" }) {
  const [closed, setClosed] = useState<Set<number>>(new Set());

  const toggle = (i: number) =>
    setClosed((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <div className="border-t border-border">
      {items.map((item, i) => {
        const isOpen = !closed.has(i);
        return (
          <div key={item.title} className="border-b border-border">
            <button
              type="button"
              onClick={() => toggle(i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 py-5 text-left"
            >
              <span className={size === "md" ? "text-[15px]" : "text-sm"}>{item.title}</span>
              {isOpen ? (
                <Minus className="size-4 shrink-0" strokeWidth={2.5} />
              ) : (
                <Plus className="size-4 shrink-0" strokeWidth={2.5} />
              )}
            </button>
            {isOpen && (
              <p
                className={`body-copy -mt-1 max-w-[840px] pb-5 ${size === "md" ? "" : "text-[13px]"}`}
              >
                {item.body}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
