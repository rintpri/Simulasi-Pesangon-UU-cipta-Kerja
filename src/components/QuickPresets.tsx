import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { PesangonInput } from '../types/pesangon';

interface QuickPresetsProps {
  onApplyPreset: (preset: Partial<PesangonInput>) => void;
}

export const QuickPresets: React.FC<QuickPresetsProps> = ({ onApplyPreset }) => {
  const presets = [
    {
      title: 'PHK Efisiensi (Rugi)',
      desc: 'Masa kerja 3 tahun, Gaji Rp 8 Juta (UP 0.5x, UPMK 1x)',
      values: {
        employmentType: 'PKWTT' as const,
        useDateRange: false,
        years: 3,
        months: 0,
        baseSalary: 7_000_000,
        fixedAllowance: 1_000_000,
        phkReasonId: 'efisiensi_rugi',
        unusedLeaveDays: 4,
        calculateTax: true,
      },
    },
    {
      title: 'Pensiun Normal',
      desc: 'Masa kerja 15 tahun, Gaji Rp 12 Juta (UP 1.75x, UPMK 1x)',
      values: {
        employmentType: 'PKWTT' as const,
        useDateRange: false,
        years: 15,
        months: 0,
        baseSalary: 10_000_000,
        fixedAllowance: 2_000_000,
        phkReasonId: 'pensiun',
        unusedLeaveDays: 6,
        calculateTax: true,
      },
    },
    {
      title: 'Kompensasi PKWT',
      desc: 'Kontrak 1 tahun penuh selesai, Gaji Rp 6 Juta (1 bulan upah)',
      values: {
        employmentType: 'PKWT' as const,
        useDateRange: false,
        years: 1,
        months: 0,
        baseSalary: 5_500_000,
        fixedAllowance: 500_000,
        unusedLeaveDays: 0,
        calculateTax: true,
      },
    },
    {
      title: 'Resign Sukarela',
      desc: 'Masa kerja 5 tahun, Gaji Rp 7.5 Juta (Hak UPH + Uang Pisah)',
      values: {
        employmentType: 'PKWTT' as const,
        useDateRange: false,
        years: 5,
        months: 2,
        baseSalary: 6_500_000,
        fixedAllowance: 1_000_000,
        phkReasonId: 'resign',
        unusedLeaveDays: 8,
        otherRights: 3_000_000, // uang pisah dari PK/PP
        calculateTax: true,
      },
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
      <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
        <Sparkles className="w-4 h-4 text-amber-500" />
        Contoh Skenario Cepat (Simulasi 1-Klik)
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        {presets.map((p, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => onApplyPreset(p.values)}
            className="text-left p-3 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-emerald-50/60 hover:border-emerald-200 transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="text-xs font-bold text-slate-800 group-hover:text-emerald-900 flex items-center justify-between">
                <span>{p.title}</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 transition-transform group-hover:translate-x-0.5" />
              </div>
              <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                {p.desc}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
