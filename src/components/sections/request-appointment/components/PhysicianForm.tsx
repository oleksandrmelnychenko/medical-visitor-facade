"use client";

import React from 'react';

interface PhysicianFormProps {
  onBack: () => void;
}

export function PhysicianForm({ onBack }: PhysicianFormProps) {
  return (
    <div className="bg-white border-2 border-black p-8 md:p-12 text-center">
      <h3 className="text-gray-900 mb-6" style={{ fontSize: '28px' }}>
        Physician Referral
      </h3>
      <p className="mb-6">Form implementation pending...</p>
      <button onClick={onBack} className="text-gray-600 underline">Back</button>
    </div>
  );
}
