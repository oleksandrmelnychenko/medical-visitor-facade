"use client";

import React, { Suspense, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useWizard } from '../WizardContext';
import { WizardData, WizardStep } from '../types';
import styles from './WizardPathTree.module.scss';

type TimelineZoneKey = 'entry' | 'eligibility' | 'profile' | 'care' | 'insurance' | 'finish';

interface TimelineZoneConfig {
  key: TimelineZoneKey;
  steps: WizardStep[];
}

interface TimelineZone extends TimelineZoneConfig {
  startIndex: number;
  endIndex: number;
}

const TIMELINE_ZONES: TimelineZoneConfig[] = [
  {
    key: 'entry',
    steps: ['member-check', 'account-check', 'welcome'],
  },
  {
    key: 'eligibility',
    steps: ['location', 'become-member', 'outside-travel', 'outside-records', 'records-language', 'outside-documents', 'outside-exit-travel'],
  },
  {
    key: 'profile',
    steps: ['health-intro', 'patient-name', 'patient-dob', 'phone', 'whatsapp-consent', 'email-consent', 'no-contact-exit', 'primary-language', 'legal-sex', 'interpreter'],
  },
  {
    key: 'care',
    steps: ['services', 'address', 'primary-concern', 'current-treatment', 'health-risk'],
  },
  {
    key: 'insurance',
    steps: ['insurance-intro', 'insurance', 'insurance-coverage'],
  },
  {
    key: 'finish',
    steps: ['wrap-up-intro', 'preferred-location', 'visit-timing', 'anything-else', 'review'],
  },
];

function buildPath(data: WizardData): WizardStep[] {
  const steps: WizardStep[] = ['member-check', 'account-check', 'welcome', 'location'];

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

  steps.push('services', 'address', 'primary-concern', 'current-treatment', 'health-risk');

  steps.push('insurance-intro', 'insurance');
  if (data.hasInsurance === 'yes') steps.push('insurance-coverage');

  steps.push('wrap-up-intro', 'preferred-location', 'visit-timing', 'anything-else', 'review');
  return steps;
}

function buildZones(steps: WizardStep[]): TimelineZone[] {
  let cursor = 0;

  return TIMELINE_ZONES.reduce<TimelineZone[]>((zones, zone) => {
    const zoneSteps = steps.filter((step) => zone.steps.includes(step));
    if (!zoneSteps.length) {
      return zones;
    }

    const startIndex = cursor;
    const endIndex = cursor + zoneSteps.length - 1;
    cursor = endIndex + 1;

    zones.push({
      ...zone,
      steps: zoneSteps,
      startIndex,
      endIndex,
    });

    return zones;
  }, []);
}

function WizardPathTreeInner() {
  const searchParams = useSearchParams();
  const { data } = useWizard();
  const t = useTranslations('appointment.newPatient.pathTree');
  const currentStep = searchParams.get('step') ?? 'member-check';

  const steps = useMemo(() => buildPath(data), [data]);
  const zones = useMemo(() => buildZones(steps), [steps]);
  const currentIndex = steps.findIndex((step) => step === currentStep);
  const resolvedCurrentIndex = currentIndex >= 0 ? currentIndex : 0;
  const activeZone = zones.find((zone) => zone.startIndex <= resolvedCurrentIndex && resolvedCurrentIndex <= zone.endIndex) ?? zones[0];
  const activeZoneIndex = zones.findIndex((zone) => zone.key === activeZone?.key);
  const resolvedActiveZoneIndex = activeZoneIndex >= 0 ? activeZoneIndex : 0;
  const progressPercent = zones.length > 1
    ? ((resolvedActiveZoneIndex + 1) / zones.length) * 100
    : 100;

  return (
    <div
      className={styles.wrapper}
      style={{ '--wizard-zone-progress': `${progressPercent}%` } as React.CSSProperties}
    >
      <div className={styles.bar}>
        <span className={styles.count}>
          {String(resolvedActiveZoneIndex + 1).padStart(2, '0')}
          <span className={styles.countDash}>-</span>
          {String(zones.length).padStart(2, '0')}
        </span>
        <span className={styles.line} aria-hidden="true">
          <span className={styles.lineFill} />
        </span>
        <span className={styles.name}>
          {activeZone ? (t as (k: string) => string)(`zones.${activeZone.key}`) : ''}
        </span>
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
