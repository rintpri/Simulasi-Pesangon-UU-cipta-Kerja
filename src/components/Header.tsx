import React from 'react';
import { Scale, BookOpen, RotateCcw, Printer } from 'lucide-react';

interface HeaderProps {
  onOpenLegalModal: () => void;
  onReset: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenLegalModal, onReset }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <header className="border-b border-slate-200/80 bg-white/90 backdrop-blur-md sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand & Title */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-none">
                Kalkulator Pesangon
              </h1>
              <span className="hidden sm:inline-block text-[11px] font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/70">
                UU Cipta Kerja
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Sesuai PP No. 35 Tahun 2021 & PPh 21 PP No. 68/2009
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrint}
            className="px-3 py-1.5 rounded-lg border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
            title="Cetak Ringkasan Perhitungan Resmi"
          >
            <Printer className="w-3.5 h-3.5 text-emerald-700" />
            <span>Cetak Laporan</span>
          </button>

          <button
            type="button"
            onClick={onOpenLegalModal}
            className="px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden sm:inline">Dasar Hukum</span>
          </button>

          <button
            type="button"
            onClick={onReset}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            title="Reset Formulir"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
