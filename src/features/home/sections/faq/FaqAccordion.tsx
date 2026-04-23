"use client";

import { useState } from "react";
import { cn } from "@/shared/lib/cn";
import styles from "./Faq.module.scss";

type Item = {
  key: string;
  question: string;
  answer: string;
};

type Props = {
  items: Item[];
};

export function FaqAccordion({ items }: Props) {
  const [openKey, setOpenKey] = useState<string | null>(items[0]?.key ?? null);

  return (
    <div className={styles.accordion}>
      {items.map((item, index) => {
        const isOpen = openKey === item.key;
        const triggerId = `faq-${item.key}-trigger`;
        const panelId = `faq-${item.key}-panel`;

        return (
          <article
            key={item.key}
            className={cn(styles.item, isOpen && styles.itemOpen)}
          >
            <button
              id={triggerId}
              type="button"
              className={styles.trigger}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() =>
                setOpenKey((current) => (current === item.key ? null : item.key))
              }
            >
              <span className={styles.index}>{String(index + 1).padStart(2, "0")}</span>
              <span className={styles.question}>{item.question}</span>
              <span className={cn(styles.icon, isOpen && styles.iconOpen)} aria-hidden="true">
                <span className={styles.iconBar} />
                <span className={cn(styles.iconBar, styles.iconBarVertical)} />
              </span>
            </button>

            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              aria-hidden={!isOpen}
              className={cn(styles.panel, isOpen && styles.panelOpen)}
            >
              <div className={styles.answerWrap}>
                <p className={styles.answer}>{item.answer}</p>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
