"use client";

import React, { Suspense, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Play, Route, UserRound, HeartPulse, ShieldCheck, CheckCircle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useWizard } from '../WizardContext';
import type { WizardStep } from '../types';
import { buildPath } from '../wizardPath';
import styles from './PathTree.module.scss';

type TimelineZoneKey = 'entry' | 'eligibility' | 'profile' | 'care' | 'insurance' | 'finish';

const ZONE_ICONS: Record<TimelineZoneKey, LucideIcon> = {
  entry: Play,
  eligibility: Route,
  profile: UserRound,
  care: HeartPulse,
  insurance: ShieldCheck,
  finish: CheckCircle,
};

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

function PathTreeInner() {
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
  const stepPercent = steps.length > 1
    ? ((Math.max(resolvedCurrentIndex, 0) + 1) / steps.length) * 100
    : 100;

  const ZoneIcon = activeZone ? ZONE_ICONS[activeZone.key] : Play;

  return (
    <div
      className={styles.wrapper}
      style={{ '--wizard-zone-progress': `${progressPercent}%` } as React.CSSProperties}
    >
      <div className={styles.widget}>
        <div className={styles.widgetInner}>
          <span className={styles.count}>
            {String(resolvedActiveZoneIndex + 1).padStart(2, '0')}
            <span className={styles.countDash}>—</span>
            {String(zones.length).padStart(2, '0')}
          </span>
          <div className={styles.headingRow}>
            <span className={styles.name}>
              {activeZone ? (t as (k: string) => string)(`zones.${activeZone.key}`) : ''}
            </span>
            <ZoneIcon className={styles.icon} aria-hidden="true" />
          </div>
        </div>
        <div className={styles.progressTrack} aria-hidden="true">
          <div
            className={styles.progressFill}
            style={{ width: `${stepPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export function PathTree() {
  return (
    <Suspense fallback={null}>
      <PathTreeInner />
    </Suspense>
  );
}
