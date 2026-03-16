"use client";

import React, { useState, useCallback, useRef } from 'react';
import { Paperclip, Upload, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { useWizard } from '../../WizardContext';
import { WizardStepLayout } from '../../components/WizardStepLayout';
import formStyles from '@/components/auth/Auth.module.scss';
import styles from '../../../RequestAppointment/RequestAppointment.module.scss';

const MAX_UPLOAD_FILES = 6;
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;
const MAX_TOTAL_SIZE_BYTES = 20 * 1024 * 1024;
const ACCEPTED_UPLOAD_TYPES = '.zip,.pdf,image/*';

function isAllowedMedicalFile(file: File) {
  const type = file.type.toLowerCase();
  const name = file.name.toLowerCase();

  if (type.startsWith('image/')) return true;
  if (type === 'application/pdf') return true;
  if (type === 'application/zip' || type === 'application/x-zip-compressed') return true;
  if (name.endsWith('.pdf') || name.endsWith('.zip')) return true;

  return false;
}

export function PrimaryConcernStep() {
  const t = useTranslations('appointment.newPatient');
  const router = useRouter();
  const { data, updateData, uploadedMedicalFiles, setUploadedMedicalFiles } = useWizard();
  const [concern, setConcern] = useState(data.primaryConcernText || '');
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleContinue = useCallback(() => {
    if (!concern) return;
    updateData({ primaryConcernText: concern });
    router.push('/apply?type=new&step=current-treatment');
  }, [concern, updateData, router]);

  const handleBack = useCallback(() => {
    router.push('/apply?type=new&step=concern-intro');
  }, [router]);

  const handleOpenFilePicker = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleRemoveFile = useCallback((targetFile: File) => {
    setUploadedMedicalFiles(prev =>
      prev.filter(
        file =>
          !(
            file.name === targetFile.name &&
            file.size === targetFile.size &&
            file.lastModified === targetFile.lastModified
          )
      )
    );
    setUploadError(null);
  }, [setUploadedMedicalFiles]);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const pickedFiles = Array.from(event.target.files ?? []);

    if (pickedFiles.length === 0) {
      return;
    }

    const existingFiles = uploadedMedicalFiles;
    const mergedFiles = [...existingFiles];

    for (const file of pickedFiles) {
      const isDuplicate = mergedFiles.some(
        existing =>
          existing.name === file.name &&
          existing.size === file.size &&
          existing.lastModified === file.lastModified
      );

      if (isDuplicate) {
        continue;
      }

      if (!isAllowedMedicalFile(file)) {
        setUploadError(t('primaryConcernText.invalidFileType'));
        event.target.value = '';
        return;
      }

      if (file.size > MAX_FILE_SIZE_BYTES) {
        setUploadError(t('primaryConcernText.fileTooLarge'));
        event.target.value = '';
        return;
      }

      mergedFiles.push(file);
    }

    if (mergedFiles.length > MAX_UPLOAD_FILES) {
      setUploadError(t('primaryConcernText.tooManyFiles'));
      event.target.value = '';
      return;
    }

    const totalSize = mergedFiles.reduce((sum, file) => sum + file.size, 0);

    if (totalSize > MAX_TOTAL_SIZE_BYTES) {
      setUploadError(t('primaryConcernText.totalFilesTooLarge'));
      event.target.value = '';
      return;
    }

    setUploadedMedicalFiles(mergedFiles);
    setUploadError(null);
    event.target.value = '';
  }, [setUploadedMedicalFiles, t, uploadedMedicalFiles]);

  return (
    <WizardStepLayout
      title={t('primaryConcernText.title')}
      onBack={handleBack}
      backLabel={t('back')}
    >
      <div className={styles.wizardFormContainer}>
        <div className={styles.wizardFormGrid}>
          <textarea
            value={concern}
            onChange={e => setConcern(e.target.value)}
            placeholder={t('primaryConcernText.placeholder')}
            aria-label={t('primaryConcernText.placeholder')}
            aria-required="true"
            className={formStyles.textarea}
            rows={5}
            autoFocus
          />

          <div className={styles.fileUploadSection}>
            <div className={styles.fileUploadHeader}>
              <div className={styles.fileUploadTitleRow}>
                <Paperclip className={styles.fileUploadIcon} aria-hidden="true" />
                <p className={styles.fileUploadTitle}>{t('primaryConcernText.attachmentsLabel')}</p>
              </div>
              <p className={styles.fileUploadHint}>{t('primaryConcernText.attachmentsHint')}</p>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept={ACCEPTED_UPLOAD_TYPES}
              onChange={handleFileChange}
              aria-label={t('primaryConcernText.attachmentsAction')}
              className={styles.fileUploadInput}
            />

            <button
              type="button"
              onClick={handleOpenFilePicker}
              className={styles.fileUploadTrigger}
            >
              <Upload className={styles.fileUploadTriggerIcon} aria-hidden="true" />
              <span>{t('primaryConcernText.attachmentsAction')}</span>
            </button>

            <p className={styles.fileUploadMeta}>{t('primaryConcernText.attachmentsFormats')}</p>

            {uploadedMedicalFiles.length > 0 ? (
              <div className={styles.fileUploadList}>
                {uploadedMedicalFiles.map(file => (
                  <div
                    key={`${file.name}-${file.size}-${file.lastModified}`}
                    className={styles.fileUploadItem}
                  >
                    <span className={styles.fileUploadItemName}>{file.name}</span>
                    <button
                      type="button"
                      className={styles.fileUploadRemove}
                      onClick={() => handleRemoveFile(file)}
                      aria-label={t('primaryConcernText.removeFile')}
                    >
                      <X aria-hidden="true" />
                    </button>
                  </div>
                ))}
              </div>
            ) : null}

            {uploadError ? (
              <p role="alert" aria-live="assertive" className={formStyles.formError}>{uploadError}</p>
            ) : null}
          </div>
        </div>
        <button
          onClick={handleContinue}
          disabled={!concern}
          className={`${formStyles.submitButton} ${styles.wizardPrimaryButton}`}
          type="button"
        >
          {t('continue')}
        </button>
      </div>
    </WizardStepLayout>
  );
}
