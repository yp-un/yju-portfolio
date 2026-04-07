"use client";

import { useState } from "react";
import style from "./Accordion.module.scss";

export interface AccordionItem {
  title: string;
  descriptions: string[];
}

export default function Accordion({ items }: { items: AccordionItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className={style.container}>
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;

        return (
          <section key={item.title} className={`${style.item} ${isOpen && style.open}`}>
            <button
              type="button"
              className={style.trigger}
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : idx)}
            >
              <h4>{item.title}</h4>
              <span className={style.icon} aria-hidden="true" />
            </button>
            <div className={style.panel}>
              <div className={style.panelInner}>
                <ul className={style.list}>
                  {item.descriptions.map((description) => (
                    <li key={description}>{description}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
