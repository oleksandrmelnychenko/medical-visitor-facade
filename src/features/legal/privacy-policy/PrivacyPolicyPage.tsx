import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { cn } from "@/shared/lib/cn";
import { BreadcrumbJsonLd } from "@/shared/seo/json-ld";
import sectionStyles from "@/shared/ui/section/Section.module.scss";
import pageStyles from "@/styles/page.module.scss";
import {
  getBreadcrumbItems,
  getLocalizedMessage,
  getLocalizedMetadata,
  normalizeLanguage,
} from "@/shared/lib/seo";
import styles from "./PrivacyPolicyPage.module.scss";

type PrivacyPolicyPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PrivacyPolicyPageProps): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = normalizeLanguage(locale);
  const [title, description] = await Promise.all([
    getLocalizedMessage(safeLocale, "privacyPolicy.title"),
    getLocalizedMessage(safeLocale, "privacyPolicy.intro1"),
  ]);

  return getLocalizedMetadata({
    locale: safeLocale,
    path: "/privacy-policy",
    title,
    description,
  });
}

type PolicyBlock =
  | {
      type: "paragraph";
      text: string;
    }
  | {
      type: "list";
      items: string[];
    };

export default async function PrivacyPolicyPage({ params }: PrivacyPolicyPageProps) {
  const { locale } = await params;
  const safeLocale = normalizeLanguage(locale);
  const t = await getTranslations({ locale, namespace: "privacyPolicy" });
  const tCommon = await getTranslations({ locale, namespace: "common" });

  const introParagraphs = [t("intro2"), t("intro3"), t("intro4")];

  const breadcrumbItems = getBreadcrumbItems(safeLocale, [
    { name: tCommon("home"), path: "" },
    { name: t("title"), path: "/privacy-policy" },
  ]);

  const sections: Array<{
    key: string;
    title: string;
    blocks: PolicyBlock[];
  }> = [
    {
      key: "dataCollection",
      title: t("dataCollection.title"),
      blocks: [
        { type: "paragraph", text: t("dataCollection.text") },
        {
          type: "list",
          items: [t("dataCollection.item1"), t("dataCollection.item2")],
        },
        { type: "paragraph", text: t("dataCollection.text2") },
      ],
    },
    {
      key: "howWeCollect",
      title: t("howWeCollect.title"),
      blocks: [
        { type: "paragraph", text: t("howWeCollect.text1") },
        { type: "paragraph", text: t("howWeCollect.text2") },
      ],
    },
    {
      key: "purpose",
      title: t("purpose.title"),
      blocks: [
        { type: "paragraph", text: t("purpose.text") },
        {
          type: "list",
          items: [
            t("purpose.item1"),
            t("purpose.item2"),
            t("purpose.item3"),
            t("purpose.item4"),
            t("purpose.item5"),
          ],
        },
        { type: "paragraph", text: t("purpose.text2") },
        {
          type: "list",
          items: [t("purpose.legal1"), t("purpose.legal2"), t("purpose.legal3")],
        },
      ],
    },
    {
      key: "sharing",
      title: t("sharing.title"),
      blocks: [
        { type: "paragraph", text: t("sharing.text1") },
        { type: "paragraph", text: t("sharing.text2") },
        { type: "paragraph", text: t("sharing.text3") },
      ],
    },
    {
      key: "rights",
      title: t("rights.title"),
      blocks: [{ type: "paragraph", text: t("rights.text") }],
    },
    {
      key: "hosting",
      title: t("hosting.title"),
      blocks: [
        { type: "paragraph", text: t("hosting.text1") },
        { type: "paragraph", text: t("hosting.text2") },
        { type: "paragraph", text: t("hosting.text3") },
      ],
    },
    {
      key: "cookies",
      title: t("cookies.title"),
      blocks: [
        { type: "paragraph", text: t("cookies.text1") },
        { type: "paragraph", text: t("cookies.text2") },
      ],
    },
    {
      key: "storage",
      title: t("storage.title"),
      blocks: [
        { type: "paragraph", text: t("storage.text1") },
        { type: "paragraph", text: t("storage.text2") },
      ],
    },
    {
      key: "retention",
      title: t("retention.title"),
      blocks: [{ type: "paragraph", text: t("retention.text") }],
    },
    {
      key: "security",
      title: t("security.title"),
      blocks: [
        { type: "paragraph", text: t("security.text1") },
        { type: "paragraph", text: t("security.text2") },
        { type: "paragraph", text: t("security.text3") },
        { type: "paragraph", text: t("security.text4") },
      ],
    },
    {
      key: "minors",
      title: t("minors.title"),
      blocks: [
        { type: "paragraph", text: t("minors.text1") },
        { type: "paragraph", text: t("minors.text2") },
        { type: "paragraph", text: t("minors.text3") },
        { type: "paragraph", text: t("minors.text4") },
      ],
    },
    {
      key: "updates",
      title: t("updates.title"),
      blocks: [{ type: "paragraph", text: t("updates.text") }],
    },
  ];

  return (
    <div className={cn(pageStyles.page, styles.page)} data-page="privacy-policy">
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <section className={cn(sectionStyles.section, styles.contentSection)}>
        <div className={styles.container}>
          <div className={styles.editorialLayout}>
            <header className={styles.heroRow}>
              <span className={styles.eyebrow}>{t("title")}</span>
              <div className={styles.heroContent}>
                <h1 className={styles.pageTitle}>{t("title")}</h1>
                <p className={styles.pageLead}>{t("intro1")}</p>
                <p className={styles.metaLabel}>{t("lastUpdated")}</p>
              </div>
            </header>

            <section className={styles.introRow} aria-label={t("title")}>
              <div className={styles.rowIndex}>00</div>
              <div className={styles.rowHeading}>
                <p className={styles.rowTitle}>{t("title")}</p>
              </div>
              <div className={styles.rowBody}>
                <div className={styles.introStack}>
                  {introParagraphs.map((paragraph) => (
                    <p key={paragraph} className={styles.introText}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </section>

            {sections.map((section, index) => (
              <article key={section.key} className={styles.policyRow}>
                <div className={styles.rowIndex}>{String(index + 1).padStart(2, "0")}</div>
                <div className={styles.rowHeading}>
                  <h2 className={styles.rowTitle}>{section.title}</h2>
                </div>
                <div className={styles.rowBody}>
                  <div className={styles.bodyStack}>
                    {section.blocks.map((block, blockIndex) => {
                      if (block.type === "list") {
                        return (
                          <ul key={`${section.key}-${blockIndex}`} className={styles.detailList}>
                            {block.items.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        );
                      }

                      return (
                        <p key={`${section.key}-${blockIndex}`} className={styles.bodyText}>
                          {block.text}
                        </p>
                      );
                    })}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
