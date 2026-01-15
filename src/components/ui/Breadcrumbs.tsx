"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import styles from "./Breadcrumbs.module.scss";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const t = useTranslations('common');

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <nav className={styles.nav}>
          <Link href="/" className={styles.link}>
            {t('home')}
          </Link>
          {items.map((item, index) => (
            <div key={index} className={styles.item}>
              <ChevronRight className={styles.icon} />
              {item.href ? (
                <Link href={item.href} className={styles.link}>
                  {item.label}
                </Link>
              ) : (
                <span className={styles.current}>{item.label}</span>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}
