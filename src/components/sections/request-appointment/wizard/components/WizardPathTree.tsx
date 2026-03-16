"use client";

import React, { useMemo, useRef, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { useWizard } from '../WizardContext';
import { WizardData } from '../types';
import styles from './WizardPathTree.module.scss';

function buildPath(data: WizardData): string[] {
  const steps: string[] = ['member-check', 'welcome', 'location'];

  if (!data.locationDetailed) return steps;

  if (data.locationDetailed !== 'germany') {
    steps.push('become-member', 'outside-travel');
    if (data.canTravel === 'no') {
      steps.push('outside-exit-travel');
      return steps;
    }

    steps.push('outside-records');
    if (data.hasMedicalRecords === 'yes') {
      steps.push('records-language');
    }

    steps.push('outside-documents');
  }

  steps.push('health-intro', 'patient-name', 'patient-dob', 'phone', 'whatsapp-consent', 'email-consent');

  if (data.emailConsent === false && data.whatsappConsent === false) {
    steps.push('no-contact-exit');
    return steps;
  }

  steps.push('primary-language', 'legal-sex', 'interpreter');

  steps.push('services', 'address', 'concern-intro', 'primary-concern', 'current-treatment', 'health-risk');

  steps.push('insurance-intro', 'insurance');
  if (data.hasInsurance === 'yes') steps.push('insurance-coverage');

  steps.push('wrap-up-intro', 'preferred-location', 'visit-timing', 'anything-else', 'review');
  return steps;
}

function WizardPathTreeInner() {
  const searchParams = useSearchParams();
  const { data } = useWizard();
  const t = useTranslations('appointment.newPatient.pathTree');
  const currentStep = searchParams.get('step') ?? 'member-check';

  const steps = useMemo(() => buildPath(data), [data]);
  const currentIndex = steps.indexOf(currentStep);
  const resolvedCurrentIndex = currentIndex >= 0 ? currentIndex : 0;

  const containerRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLLIElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    const container = containerRef.current;
    const activeEl = activeRef.current;
    const progressFillEl = progressFillRef.current;
    if (!container || !activeEl) {
      if (progressFillEl) {
        progressFillEl.style.height = '0px';
      }
      return;
    }

    if (progressFillEl) {
      progressFillEl.style.height = `${activeEl.offsetTop}px`;
    }

    const inset = 36;
    const visibleTop = container.scrollTop + inset;
    const visibleBottom = container.scrollTop + container.clientHeight - inset;
    const activeTop = activeEl.offsetTop;
    const activeBottom = activeTop + activeEl.offsetHeight;

    if (activeTop >= visibleTop && activeBottom <= visibleBottom) {
      isFirstRender.current = false;
      return;
    }

    const top = Math.max(0, activeTop - container.clientHeight / 2 + activeEl.offsetHeight / 2);
    container.scrollTo({ top, behavior: isFirstRender.current ? 'instant' : 'smooth' });
    isFirstRender.current = false;
  }, [resolvedCurrentIndex]);

  return (
    <div className={styles.wrapper}>
      <div ref={containerRef} className={styles.scroll}>
        <div className={styles.track}>
          <div className={styles.trackLine} />
          <div ref={progressFillRef} className={styles.progressFill} />

          <ul className={styles.list}>
            {steps.map((key, index) => {
              const isDone = index < resolvedCurrentIndex;
              const isActive = index === resolvedCurrentIndex;

              return (
                <li
                  key={key}
                  ref={isActive ? activeRef : undefined}
                  className={cn(
                    styles.node,
                    isDone && styles.nodeDone,
                    isActive && styles.nodeActive,
                    !isDone && !isActive && styles.nodePending,
                  )}
                  aria-current={isActive ? 'step' : undefined}
                >
                  <div className={styles.dot}>
                    <span className={styles.dotInner} />
                  </div>
                  <span className={styles.label}>{(t as (k: string) => string)(key)}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function WizardPathTree() {
  return (
    <Suspense fallback={null}>
      <WizardPathTreeInner />
    </Suspense>
  );
}
