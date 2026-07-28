"use client";

import { useRef, useState } from "react";

import { MinusIcon } from "@/shared/components/icons/Minus";
import { PlusIcon } from "@/shared/components/icons/Plus";

interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
}

/**
 * Collapsible accordion component.
 *
 * @description Renders a vertically stacked list of expandable sections. Each section
 * toggles open or closed when its header button is clicked. Supports single or
 * multiple simultaneous open items via the allowMultiple prop. Uses animated height
 * transitions for smooth open/close behavior.
 *
 * @param items - Array of sections with id, title, and content.
 * @param allowMultiple - If true, multiple sections can remain open at once.
 * @returns Accordion UI with expandable panels.
 */
export const Accordion: React.FC<AccordionProps> = ({ items, allowMultiple = false }) => {
  const [openItems, setOpenItems] = useState<string[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggleItem = (id: string) => {
    setOpenItems((prev) => {
      if (allowMultiple) {
        return prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id];
      } else {
        return prev.includes(id) ? [] : [id];
      }
    });
  };

  return (
    <div className="w-full divide-y divide-[#D1A559]/40">
      {items.map((item, index) => {
        const isOpen = openItems.includes(item.id);
        const contentHeight = isOpen ? `${contentRefs.current[index]?.scrollHeight}px` : "0px";

        return (
          <div key={item.id} className="overflow-hidden transition-all">
            <button
              type="button"
              onClick={() => toggleItem(item.id)}
              className="flex items-center justify-between w-full py-4 text-left hover:bg-gray-50 transition-colors text-[#502B3A]"
              aria-expanded={isOpen}
              aria-controls={`accordion-content-${item.id}`}
            >
              <span className="font-medium">{item.title}</span>
              {isOpen ? (
                <MinusIcon className="w-5 h-5" aria-hidden="true" />
              ) : (
                <PlusIcon className="w-5 h-5" aria-hidden="true" />
              )}
            </button>

            <div
              id={`accordion-content-${item.id}`}
              ref={(el) => {
                contentRefs.current[index] = el;
              }}
              style={{ height: contentHeight }}
              className="transition-all duration-300 ease-in-out overflow-hidden"
              aria-hidden={!isOpen}
            >
              <div className="pt-0 pb-2 text-primary-500 font-light">{item.content}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
