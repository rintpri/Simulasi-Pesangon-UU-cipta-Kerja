import React, { useState, useMemo } from 'react';
import { PesangonInput } from './types/pesangon';
import { calculatePesangon } from './utils/pesangonCalculator';
import { Header } from './components/Header';
import { PesangonForm } from './components/PesangonForm';
import { CalculationSummary } from './components/CalculationSummary';
import { QuickPresets } from './components/QuickPresets';
import { LegalReferenceModal } from './components/LegalReferenceModal';
import { PrintReport } from './components/PrintReport';

const DEFAULT_INPUT: PesangonInput = {
  employmentType: 'PKWTT',
  useDateRange: false,
  startDate: '',
  endDate: '',
  years: 3,
  months: 2,
  baseSalary: 6_000_000,
  fixedAllowance: 1_000_000,
  phkReasonId: 'efisiensi_rugi',
  unusedLeaveDays: 4,
  workingDaysPerMonth: 21,
  transportAllowance: 0,
  otherRights: 0,
  calculateTax: true,
};

export default function App() {
  const [input, setInput] = useState<PesangonInput>(DEFAULT_INPUT);
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);

  // Partial state updater
  const handleInputChange = (updated: Partial<PesangonInput>) => {
    setInput((prev) => ({ ...prev, ...updated }));
  };

  // Reset to default
  const handleReset = () => {
    setInput({
      ...DEFAULT_INPUT,
      baseSalary: 0,
      fixedAllowance: 0,
      years: 0,
      months: 0,
      unusedLeaveDays: 0,
    });
  };

  // Real-time calculation result
  const result = useMemo(() => calculatePesangon(input), [input]);

  return (
    <>
      {/* 1. Tampilan Layar Web Interaktif (Disembunyikan Otomatis Saat Mencetak) */}
      <div className="print:hidden min-h-screen bg-slate-50 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
        {/* Header Bar dengan Tombol Cetak Laporan & Hukum */}
        <Header
          onOpenLegalModal={() => setIsLegalModalOpen(true)}
          onReset={handleReset}
        />

        {/* Main Content Area */}
        <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
          {/* Quick Simulation Presets */}
          <div>
            <QuickPresets onApplyPreset={handleInputChange} />
          </div>

          {/* 2-Column Responsive Layout: Form on Left, Summary on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Input Form (Masa Kerja, Gaji Pokok, Tunjangan Tetap, Alasan PHK) */}
            <div className="lg:col-span-7">
              <PesangonForm
                input={input}
                onChange={handleInputChange}
                onOpenLegalModal={() => setIsLegalModalOpen(true)}
              />
            </div>

            {/* Right Column: Live Breakdown & Summary */}
            <div className="lg:col-span-5 lg:sticky lg:top-20">
              <CalculationSummary
                input={input}
                result={result}
                onOpenLegalModal={() => setIsLegalModalOpen(true)}
              />
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-200 bg-white py-6 mt-12 text-center text-xs text-slate-500">
          <div className="max-w-6xl mx-auto px-4 space-y-1">
            <p className="font-semibold text-slate-700">
              Kalkulator Pesangon Tenaga Kerja Republik Indonesia
            </p>
            <p>
              Disesuaikan dengan UU Cipta Kerja No. 6/2023, Peraturan Pemerintah No. 35 Tahun 2021, dan Peraturan Pajak PP No. 68/2009.
            </p>
          </div>
        </footer>

        {/* Modal Dasar Hukum */}
        <LegalReferenceModal
          isOpen={isLegalModalOpen}
          onClose={() => setIsLegalModalOpen(false)}
        />
      </div>

      {/* 2. Format Cetak Laporan Resmi (Hanya Muncul Saat Window.print() Berjalan) */}
      <div className="hidden print:block font-['Plus_Jakarta_Sans',sans-serif]">
        <PrintReport input={input} result={result} />
      </div>
    </>
  );
}
