"use client";

import { useState } from "react";
import { cn } from "@/shared/lib/cn";
import styles from "./Journey.module.scss";

type DetailPoint = {
  title: string;
  text: string | null;
};

type Item = {
  key: string;
  title: string;
  details: DetailPoint[];
};

type Props = {
  items: Item[];
};

export function JourneyAccordion({ items }: Props) {
  const [openKey, setOpenKey] = useState<string | null>(items[0]?.key ?? null);

  return (
    <div className={styles.accordion}>
      {items.map((item, index) => {
        const isOpen = openKey === item.key;
        const triggerId = `care-${item.key}-trigger`;
        const panelId = `care-${item.key}-panel`;

        return (
          <article key={item.key} className={cn(styles.item, isOpen && styles.itemOpen)}>
            <button
              id={triggerId}
              type="button"
              className={styles.trigger}
              onClick={() => setOpenKey((current) => (current === item.key ? null : item.key))}
              aria-expanded={isOpen}
              aria-controls={panelId}
            >
              <span className={styles.index}>{String(index + 1).padStart(2, "0")}</span>
              <span className={styles.question}>{item.title}</span>
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
                <ul className={styles.answerList}>
                  {item.details.map((point, idx) => (
                    <li key={idx} className={styles.answerPoint}>
                      <span className={styles.answerPointTitle}>{point.title}</span>
                      {point.text ? (
                        <span className={styles.answerPointText}> — {point.text}</span>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
