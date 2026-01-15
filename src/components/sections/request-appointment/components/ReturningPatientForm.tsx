"use client";

import React from 'react';

interface ReturningPatientFormProps {
  onBack: () => void;
}

export function ReturningPatientForm({ onBack }: ReturningPatientFormProps) {
  return (
    <div className="bg-white border-2 border-black p-8 md:p-12 text-center">
      <h3 className="text-gray-900 mb-6" style={{ fontSize: '28px' }}>
        Returning Patient
      </h3>
      <p className="mb-6">Form implementation pending...</p>
      <button onClick={onBack} className="text-gray-600 underline">Back</button>
    </div>
  );
}
