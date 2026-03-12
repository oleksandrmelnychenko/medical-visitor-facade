"use client";

import React, { useMemo, useRef, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Check } from 'lucide-react';
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
    if (data.hasMedicalRecords && data.hasMedicalRecords !== 'yes') {
      steps.push('outside-exit-records');
      return steps;
    }

    steps.push('records-language', 'outside-documents');
    if (data.hasTravelDocuments === 'no') {
      steps.push('outside-exit-travel');
      return steps;
    }
  }

  steps.push('health-intro', 'patient-name', 'patient-dob', 'phone', 'whatsapp-consent', 'email-consent');

  if (data.emailConsent === false && data.whatsappConsent === false) {
    steps.push('no-contact-exit');
    return steps;
  }

  steps.push('legal-sex', 'interpreter');
  if (data.needsInterpreter === 'yes') steps.push('primary-language');

  steps.push('services', 'address', 'concern-intro', 'primary-concern', 'health-risk');

  if (data.hasHealthRiskForTravel === 'no') {
    steps.push('current-treatment', 'additional-concerns');
  }

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
  const isFirstRender = useRef(true);

  useEffect(() => {
    const container = containerRef.current;
    const activeEl = activeRef.current;
    if (!container || !activeEl) return;

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
      <div className={styles.surface}>
        <div className={styles.metaRow}>
          <span className={styles.progressBadge}>
            {resolvedCurrentIndex + 1} / {steps.length}
          </span>
        </div>

        <div ref={containerRef} className={styles.scroll}>
          <ul className={styles.list}>
            <li className={styles.spacer} aria-hidden />

            {steps.map((key, index) => {
              const isDone = index < resolvedCurrentIndex;
              const isActive = index === resolvedCurrentIndex;
              const isLast = index === steps.length - 1;

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
                  <div className={styles.timeline}>
                    <div className={styles.dot}>
                      {isDone && <Check size={10} strokeWidth={3.25} />}
                    </div>
                    {!isLast && (
                      <div className={cn(styles.connector, isDone && styles.connectorFilled)} />
                    )}
                  </div>
                  <span className={styles.label}>{(t as (k: string) => string)(key)}</span>
                </li>
              );
            })}

            <li className={styles.spacer} aria-hidden />
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
