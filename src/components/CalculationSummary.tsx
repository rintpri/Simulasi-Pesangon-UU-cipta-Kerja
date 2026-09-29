import React, { useState } from 'react';
import { 
  Calculator, 
  Copy, 
  Check, 
  Printer, 
  Scale, 
  ArrowUpRight, 
  ShieldCheck, 
  DollarSign,
  Info,
  Calendar,
  Layers,
  Sparkles
} from 'lucide-react';
import { PesangonResult, PesangonInput } from '../types/pesangon';
import { formatRupiah } from '../utils/pesangonCalculator';

interface CalculationSummaryProps {
  input: PesangonInput;
  result: PesangonResult;
  onOpenLegalModal: () => void;
}

export const CalculationSummary: React.FC<CalculationSummaryProps> = ({
  input,
  result,
  onOpenLegalModal,
}) => {
  const [copied, setCopied] = useState(false);

  // Generate text report for clipboard copying
  const handleCopyReport = async () => {
    const report = `===========================================
SLIP ESTIMASI PERHITUNGAN PESANGON TENAGA KERJA
Berdasarkan PP No. 35 Tahun 2021 (UU Cipta Kerja)
===========================================
Status Hubungan Kerja : ${input.employmentType === 'PKWTT' ? 'Karyawan Tetap (PKWTT)' : 'Karyawan Kontrak (PKWT)'}
Masa Kerja            : ${result.tenureDisplay} (${result.totalTenureMonths} bulan)
Dasar Upah Sebulan    : ${formatRupiah(result.monthlyWage)}
- Gaji Pokok          : ${formatRupiah(input.baseSalary)}
- Tunjangan Tetap     : ${formatRupiah(input.fixedAllowance)}
Dasar Aturan          : ${result.legalBasis.article} (${result.legalBasis.rule})
-------------------------------------------
RINCIAN HAK:
${
  input.employmentType === 'PKWTT'
    ? `1. Uang Pesangon (UP)     : ${result.effectivePesangonMonths} bulan upah
   -> (${result.basePesangonMonths} bln dasar × ${result.pesangonMultiplier}x pengali) = ${formatRupiah(result.pesangonAmount)}
2. Penghargaan Masa Kerja : ${result.effectiveUpmkMonths} bulan upah
   -> (${result.baseUpmkMonths} bln dasar × ${result.upmkMultiplier}x pengali) = ${formatRupiah(result.upmkAmount)}
3. Penggantian Hak (UPH)  : ${formatRupiah(result.totalUphAmount)}
   - Kompensasi Cuti      : ${formatRupiah(result.leaveCompensationAmount)} (${input.unusedLeaveDays} hari)
   - Hak Lain/Uang Pisah  : ${formatRupiah(result.transportAmount + result.otherRightsAmount)}`
    : `1. Uang Kompensasi PKWT  : (${result.totalTenureMonths}/12) × Upah = ${formatRupiah(result.pkwtCompensationAmount)}
2. Penggantian Hak (UPH) : ${formatRupiah(result.totalUphAmount)}`
}
-------------------------------------------
TOTAL BRUTO               : ${formatRupiah(result.grossTotal)}
${
  input.calculateTax
    ? `POTONGAN PPh 21 FINAL     : - ${formatRupiah(result.taxAmount)}
TOTAL BERSIH DITERIMA     : ${formatRupiah(result.netTotal)}`
    : `TOTAL BERSIH DITERIMA     : ${formatRupiah(result.netTotal)} (Belum dipotong pajak)`
}
===========================================
Dihitung otomatis melalui Kalkulator Pesangon UU Cipta Kerja`;

    try {
      await navigator.clipboard.writeText(report);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      console.error('Clipboard error:', e);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden print:border-none print:shadow-none">
      {/* Top Banner Result */}
      <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-slate-900 text-white p-6 sm:p-7 relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 opacity-10 pointer-events-none">
          <Scale className="w-56 h-56" />
        </div>

        <div className="relative z-10 space-y-4">
          <div className="flex items-center justify-between text-xs text-emerald-200">
            <span className="font-semibold uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              Estimasi Total Hak Karyawan
            </span>
            <span className="bg-emerald-700/60 px-2.5 py-1 rounded-full text-[11px] font-mono border border-emerald-500/30">
              {input.employmentType}
            </span>
          </div>

          <div>
            <div className="text-3xl sm:text-4xl font-extrabold font-mono tracking-tight text-white">
              {formatRupiah(input.calculateTax ? result.netTotal : result.grossTotal)}
            </div>
            <p className="text-xs text-emerald-200/90 mt-1.5">
              {input.calculateTax ? 'Total Bersih (Setelah Potongan Pajak PPh 21)' : 'Total Hak Bruto (Sebelum Potongan Pajak)'}
            </p>
          </div>

          {/* Mini info chips */}
          <div className="pt-3 border-t border-emerald-700/50 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-emerald-100/90">
            <span>Masa Kerja: <strong className="text-white">{result.tenureDisplay}</strong></span>
            <span aria-hidden="true" className="opacity-50">·</span>
            <span>Upah Pokok + Tetap: <strong className="text-white">{formatRupiah(result.monthlyWage)}</strong></span>
          </div>
        </div>
      </div>

      {/* Breakdown Details */}
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Calculator className="w-4 h-4 text-emerald-600" />
            Rincian Perhitungan Berdasarkan Hukum
          </h3>
          <button
            onClick={onOpenLegalModal}
            className="text-xs text-emerald-700 hover:text-emerald-800 font-semibold flex items-center gap-1"
          >
            Lihat Pasal
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Breakdown Items */}
        <div className="space-y-3 text-xs sm:text-sm">
          {input.employmentType === 'PKWTT' ? (
            <>
              {/* 1. Uang Pesangon (UP) */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-800">1. Uang Pesangon (UP)</span>
                    <span className="text-[11px] bg-slate-200/70 text-slate-700 px-2 py-0.5 rounded-md font-mono">
                      {result.basePesangonMonths} bln dasar × {result.pesangonMultiplier}x
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Masa kerja {result.tenureDisplay} = {result.basePesangonMonths} bln upah × faktor {result.pesangonMultiplier}x
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="font-bold text-slate-900 text-sm sm:text-base font-mono">
                    {formatRupiah(result.pesangonAmount)}
                  </span>
                  <p className="text-[10px] text-slate-400 font-mono">
                    {result.effectivePesangonMonths} bulan upah
                  </p>
                </div>
              </div>

              {/* 2. Uang Penghargaan Masa Kerja (UPMK) */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-800">2. Penghargaan Masa Kerja (UPMK)</span>
                    <span className="text-[11px] bg-slate-200/70 text-slate-700 px-2 py-0.5 rounded-md font-mono">
                      {result.baseUpmkMonths} bln dasar × {result.upmkMultiplier}x
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    {result.baseUpmkMonths === 0
                      ? 'Masa kerja di bawah 3 tahun tidak mendapat UPMK'
                      : `Masa kerja ${result.tenureDisplay} = ${result.baseUpmkMonths} bulan upah`}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="font-bold text-slate-900 text-sm sm:text-base font-mono">
                    {formatRupiah(result.upmkAmount)}
                  </span>
                  <p className="text-[10px] text-slate-400 font-mono">
                    {result.effectiveUpmkMonths} bulan upah
                  </p>
                </div>
              </div>

              {/* 3. Uang Penggantian Hak (UPH) */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="space-y-0.5">
                  <span className="font-bold text-slate-800">3. Uang Penggantian Hak (UPH)</span>
                  <p className="text-[11px] text-slate-500">
                    Cuti tahunan ({input.unusedLeaveDays} hari = {formatRupiah(result.leaveCompensationAmount)}) + Ongkos & Hak lain ({formatRupiah(result.transportAmount + result.otherRightsAmount)})
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="font-bold text-slate-900 text-sm sm:text-base font-mono">
                    {formatRupiah(result.totalUphAmount)}
                  </span>
                </div>
              </div>
            </>
          ) : (
            /* Jika Karyawan Kontrak (PKWT) */
            <div className="p-4 rounded-xl bg-sky-50/70 border border-sky-100 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sky-950">Uang Kompensasi PKWT</h4>
                  <p className="text-xs text-sky-800">
                    Masa kerja {result.totalTenureMonths} bulan / 12 × 1 bulan upah
                  </p>
                </div>
                <span className="font-bold text-sky-950 font-mono text-base">
                  {formatRupiah(result.pkwtCompensationAmount)}
                </span>
              </div>
              {result.totalUphAmount > 0 && (
                <div className="flex items-center justify-between pt-2 border-t border-sky-200/60 text-xs">
                  <span className="text-sky-800">Penggantian Hak / Sisa Cuti:</span>
                  <span className="font-semibold text-sky-950 font-mono">{formatRupiah(result.totalUphAmount)}</span>
                </div>
              )}
            </div>
          )}

          {/* Subtotal Bruto */}
          <div className="pt-2 border-t border-slate-200 flex items-center justify-between px-2 text-slate-700">
            <span className="font-semibold text-xs sm:text-sm">Total Hak Bruto:</span>
            <span className="font-bold font-mono text-sm sm:text-base text-slate-900">
              {formatRupiah(result.grossTotal)}
            </span>
          </div>

          {/* Pajak PPh 21 Final */}
          {input.calculateTax && (
            <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="font-bold text-amber-950 text-xs sm:text-sm">
                    Potongan Pajak PPh 21 Final (PP 68/2009)
                  </span>
                  <p className="text-[11px] text-amber-800">
                    Bebas pajak s/d Rp 50.000.000 (Tarif 0%)
                  </p>
                </div>
                <span className="font-bold text-rose-700 font-mono text-sm sm:text-base">
                  - {formatRupiah(result.taxAmount)}
                </span>
              </div>

              {/* Rincian Bracket Pajak */}
              {result.taxBrackets.length > 0 && (
                <div className="pt-2 border-t border-amber-200/60 space-y-1">
                  {result.taxBrackets.map((b, i) => (
                    <div key={i} className="flex items-center justify-between text-[11px] text-amber-900">
                      <span>{b.bracket} (Tarif {b.rate}%):</span>
                      <span className="font-mono font-medium">{formatRupiah(b.tax)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Total Bersih */}
          {input.calculateTax && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between px-4">
              <span className="font-bold text-emerald-950 text-sm">
                Total Bersih Diterima (Take Home):
              </span>
              <span className="font-extrabold font-mono text-base sm:text-lg text-emerald-900">
                {formatRupiah(result.netTotal)}
              </span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-wrap items-center gap-3 print:hidden">
          <button
            onClick={handleCopyReport}
            className="flex-1 min-w-[140px] px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-xs"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Tersalin ke Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Salin Rincian Lengkap</span>
              </>
            )}
          </button>

          <button
            onClick={handlePrint}
            className="px-4 py-2.5 rounded-xl border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-2xs"
            title="Cetak Laporan Perhitungan Resmi (A4)"
          >
            <Printer className="w-4 h-4 text-emerald-700" />
            <span>Cetak Laporan</span>
          </button>
        </div>

        {/* Legal disclaimer note */}
        <p className="text-[11px] text-slate-400 leading-relaxed border-t border-slate-100 pt-3">
          *Catatan: Perhitungan ini merupakan acuan resmi standar minimal menurut UU Cipta Kerja & PP 35/2021. Apabila Perjanjian Kerja (PK), Peraturan Perusahaan (PP), atau Perjanjian Kerja Bersama (PKB) mengatur nominal yang lebih tinggi, maka ketentuan yang lebih menguntungkan pekerja yang berlaku (Pasal 58).
        </p>
      </div>
    </div>
  );
};
