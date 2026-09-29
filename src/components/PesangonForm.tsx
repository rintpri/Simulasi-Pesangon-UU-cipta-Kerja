import React from 'react';
import { 
  Briefcase, 
  Calendar, 
  Coins, 
  HelpCircle, 
  FileText, 
  Building2, 
  Clock, 
  Receipt, 
  PlusCircle, 
  Sparkles,
  Layers,
  ChevronDown
} from 'lucide-react';
import { PesangonInput, EmploymentType } from '../types/pesangon';
import { PHK_REASONS } from '../utils/constants';
import { formatRupiah, calculateTenureFromDates } from '../utils/pesangonCalculator';

interface PesangonFormProps {
  input: PesangonInput;
  onChange: (updated: Partial<PesangonInput>) => void;
  onOpenLegalModal: () => void;
}

export const PesangonForm: React.FC<PesangonFormProps> = ({
  input,
  onChange,
  onOpenLegalModal,
}) => {
  // Format numeric input helper
  const handleNumberInput = (field: keyof PesangonInput, rawValue: string) => {
    // Strip non-digits
    const cleanDigits = rawValue.replace(/\D/g, '');
    const num = cleanDigits === '' ? 0 : parseInt(cleanDigits, 10);
    onChange({ [field]: num });
  };

  // Quick salary adder helper
  const addSalaryBonus = (field: 'baseSalary' | 'fixedAllowance', amountToAdd: number) => {
    const current = input[field] || 0;
    onChange({ [field]: current + amountToAdd });
  };

  // Sync date change
  const handleDateChange = (start: string, end: string) => {
    const tenure = calculateTenureFromDates(start, end);
    onChange({
      startDate: start,
      endDate: end,
      years: tenure.years,
      months: tenure.months,
    });
  };

  const totalMonthlyWage = (input.baseSalary || 0) + (input.fixedAllowance || 0);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Form Header */}
      <div className="px-6 py-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gradient-to-r from-slate-50 to-white">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Receipt className="w-5 h-5 text-emerald-600" />
            Formulir Data Karyawan & Upah
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Dasar perhitungan resmi berdasarkan PP No. 35 Tahun 2021
          </p>
        </div>

        {/* Tab Status Hubungan Kerja */}
        <div className="flex items-center p-1 bg-slate-100/90 rounded-xl border border-slate-200/80 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => onChange({ employmentType: 'PKWTT' })}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              input.employmentType === 'PKWTT'
                ? 'bg-white text-emerald-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Karyawan Tetap (PKWTT)
          </button>
          <button
            type="button"
            onClick={() => onChange({ employmentType: 'PKWT' })}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              input.employmentType === 'PKWT'
                ? 'bg-white text-emerald-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Karyawan Kontrak (PKWT)
          </button>
        </div>
      </div>

      <div className="p-6 space-y-7">
        {/* BAGIAN 1: MASA KERJA */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-600" />
              1. Masa Kerja Karyawan
            </label>
            <button
              type="button"
              onClick={() => onChange({ useDateRange: !input.useDateRange })}
              className="text-xs text-emerald-700 hover:text-emerald-800 font-medium flex items-center gap-1 transition-colors"
            >
              <Calendar className="w-3.5 h-3.5" />
              {input.useDateRange ? 'Beralih ke Input Manual (Tahun & Bulan)' : 'Gunakan Kalender Tanggal Masuk & Keluar'}
            </button>
          </div>

          {input.useDateRange ? (
            /* Mode Rentang Tanggal Kalender */
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50/80 p-4 rounded-xl border border-slate-200/70">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Tanggal Mulai Bekerja
                </label>
                <input
                  type="date"
                  value={input.startDate}
                  onChange={(e) => handleDateChange(e.target.value, input.endDate)}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 font-medium focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Tanggal Berakhir / PHK
                </label>
                <input
                  type="date"
                  value={input.endDate}
                  onChange={(e) => handleDateChange(input.startDate, e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 font-medium focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
                />
              </div>
              <div className="sm:col-span-2 pt-1 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-600">
                <span>Hasil Durasi:</span>
                <span className="font-bold text-slate-900 bg-white px-2.5 py-1 rounded-md border border-slate-200">
                  {input.years} Tahun {input.months} Bulan
                </span>
              </div>
            </div>
          ) : (
            /* Mode Input Angka Langsung */
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Tahun
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      max="50"
                      value={input.years === 0 ? '' : input.years}
                      placeholder="0"
                      onChange={(e) => {
                        const val = Math.max(0, parseInt(e.target.value || '0', 10));
                        onChange({ years: isNaN(val) ? 0 : val });
                      }}
                      className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
                    />
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-medium pointer-events-none">
                      Tahun
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Bulan
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      max="11"
                      value={input.months === 0 ? '' : input.months}
                      placeholder="0"
                      onChange={(e) => {
                        const val = Math.min(11, Math.max(0, parseInt(e.target.value || '0', 10)));
                        onChange({ months: isNaN(val) ? 0 : val });
                      }}
                      className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
                    />
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-medium pointer-events-none">
                      Bulan
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Presets for Tenure */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs">
                <span className="text-slate-400 text-[11px] mr-1">Pilihan Cepat:</span>
                {[
                  { label: '6 Bulan', y: 0, m: 6 },
                  { label: '1 Tahun', y: 1, m: 0 },
                  { label: '3 Tahun', y: 3, m: 0 },
                  { label: '5 Tahun', y: 5, m: 0 },
                  { label: '8 Tahun', y: 8, m: 0 },
                  { label: '12 Tahun', y: 12, m: 0 },
                  { label: '24 Tahun', y: 24, m: 0 },
                ].map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => onChange({ years: item.y, months: item.m })}
                    className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200/80 text-slate-700 text-[11px] font-medium transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* BAGIAN 2: UPAH (GAJI POKOK & TUNJANGAN TETAP) */}
        <section className="space-y-4 pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Coins className="w-4 h-4 text-emerald-600" />
              2. Komponen Upah Bulanan
            </label>
            <button
              type="button"
              onClick={onOpenLegalModal}
              className="text-xs text-emerald-700 hover:text-emerald-800 flex items-center gap-1 font-medium transition-colors"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              Aturan Upah (Pasal 67)
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Gaji Pokok */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">
                Gaji Pokok (Upah Pokok)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                  Rp
                </span>
                <input
                  type="text"
                  inputMode="numeric"
                  value={input.baseSalary ? input.baseSalary.toLocaleString('id-ID') : ''}
                  placeholder="0"
                  onChange={(e) => handleNumberInput('baseSalary', e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors font-mono"
                />
              </div>
              <div className="flex items-center gap-1 pt-0.5">
                {[1_000_000, 5_000_000].map((bonus) => (
                  <button
                    key={bonus}
                    type="button"
                    onClick={() => addSalaryBonus('baseSalary', bonus)}
                    className="text-[10px] px-2 py-0.5 rounded-sm bg-slate-100 hover:bg-slate-200 text-slate-600 font-medium transition-colors"
                  >
                    +{bonus / 1_000_000} Juta
                  </button>
                ))}
                {input.baseSalary > 0 && (
                  <button
                    type="button"
                    onClick={() => onChange({ baseSalary: 0 })}
                    className="text-[10px] px-2 py-0.5 text-rose-600 hover:underline ml-auto"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>

            {/* Tunjangan Tetap */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">
                Tunjangan Tetap (Jabatan / Fungsional)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                  Rp
                </span>
                <input
                  type="text"
                  inputMode="numeric"
                  value={input.fixedAllowance ? input.fixedAllowance.toLocaleString('id-ID') : ''}
                  placeholder="0"
                  onChange={(e) => handleNumberInput('fixedAllowance', e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors font-mono"
                />
              </div>
              <p className="text-[11px] text-slate-400">
                *Hanya tunjangan yang bersifat tetap dan teratur tiap bulan.
              </p>
            </div>
          </div>

          {/* Banner Total Upah Sebulan */}
          <div className="p-3.5 bg-emerald-50/70 border border-emerald-200/80 rounded-xl flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-emerald-800">
                Total Upah Dasar Perhitungan (Pokok + Tunjangan Tetap):
              </p>
              <p className="text-[11px] text-emerald-700/80">
                Dijadikan dasar pengali 1 bulan upah sesuai PP No. 35/2021
              </p>
            </div>
            <span className="text-base font-bold text-emerald-950 font-mono">
              {formatRupiah(totalMonthlyWage)}
            </span>
          </div>
        </section>

        {/* BAGIAN 3: ALASAN PHK (JIKA PKWTT) */}
        {input.employmentType === 'PKWTT' ? (
          <section className="space-y-3 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-emerald-600" />
                3. Alasan Pemutusan Hubungan Kerja (PHK)
              </label>
              <span className="text-xs text-slate-500">Pasal 41 - 56 PP 35/2021</span>
            </div>

            <div className="relative">
              <select
                value={input.phkReasonId}
                onChange={(e) => onChange({ phkReasonId: e.target.value })}
                className="w-full px-3.5 py-3 bg-slate-50/70 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 font-medium focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors appearance-none pr-10 leading-relaxed shadow-xs"
              >
                <optgroup label="1. Penggabungan / Peleburan Perusahaan (Pasal 41 - 42)">
                  {PHK_REASONS.filter(r => r.category === 'peleburan').map(r => (
                    <option key={r.id} value={r.id}>
                      {r.label} (UP: {r.pesangonMultiplier}x, UPMK: {r.upmkMultiplier}x)
                    </option>
                  ))}
                </optgroup>
                <optgroup label="2. Efisiensi Perusahaan (Pasal 43)">
                  {PHK_REASONS.filter(r => r.category === 'efisiensi').map(r => (
                    <option key={r.id} value={r.id}>
                      {r.label} (UP: {r.pesangonMultiplier}x, UPMK: {r.upmkMultiplier}x)
                    </option>
                  ))}
                </optgroup>
                <optgroup label="3. Perusahaan Tutup, Pailit & PKPU (Pasal 44 - 47)">
                  {PHK_REASONS.filter(r => r.category === 'tutup').map(r => (
                    <option key={r.id} value={r.id}>
                      {r.label} (UP: {r.pesangonMultiplier}x, UPMK: {r.upmkMultiplier}x)
                    </option>
                  ))}
                </optgroup>
                <optgroup label="4. Permohonan PHK atas Pelanggaran Pengusaha & Putusan PHI (Pasal 48 - 49)">
                  {PHK_REASONS.filter(r => r.category === 'permohonan').map(r => (
                    <option key={r.id} value={r.id}>
                      {r.label} (UP: {r.pesangonMultiplier}x, UPMK: {r.upmkMultiplier}x)
                    </option>
                  ))}
                </optgroup>
                <optgroup label="5. Pelanggaran, Resign & Mangkir (Pasal 50 - 52)">
                  {PHK_REASONS.filter(r => r.category === 'pelanggaran' || r.id === 'resign').map(r => (
                    <option key={r.id} value={r.id}>
                      {r.label} (UP: {r.pesangonMultiplier}x, UPMK: {r.upmkMultiplier}x)
                    </option>
                  ))}
                </optgroup>
                <optgroup label="6. Sakit, Ditahan, Pensiun & Meninggal Dunia (Pasal 54 - 57)">
                  {PHK_REASONS.filter(r => (r.category === 'pribadi' && r.id !== 'resign') || r.id === 'ditahan_berwajib_6_bulan').map(r => (
                    <option key={r.id} value={r.id}>
                      {r.label} (UP: {r.pesangonMultiplier}x, UPMK: {r.upmkMultiplier}x)
                    </option>
                  ))}
                </optgroup>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3.5 top-3.5 pointer-events-none" />
            </div>

            {/* Note dan rincian lengkap alasan hukum yang dipilih */}
            {(() => {
              const currentReason = PHK_REASONS.find(r => r.id === input.phkReasonId);
              if (!currentReason) return null;
              return (
                <div className="bg-slate-50/90 border border-slate-200/90 rounded-xl p-4 text-xs text-slate-700 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5">
                    <div className="space-y-1">
                      <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 inline-block">
                        Rujukan Hukum: {currentReason.article}
                      </span>
                      <p className="font-semibold text-slate-900 leading-snug text-xs sm:text-sm mt-1">
                        {currentReason.fullText || currentReason.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5 self-start shrink-0 font-mono text-[11px]">
                      <span className="bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-md font-semibold">
                        UP: {currentReason.pesangonMultiplier}x
                      </span>
                      <span className="bg-sky-100 text-sky-800 px-2.5 py-1 rounded-md font-semibold">
                        UPMK: {currentReason.upmkMultiplier}x
                      </span>
                      {currentReason.hasUangPisah && (
                        <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-md font-semibold">
                          + Uang Pisah
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Butir-butir rincian jika ada */}
                  {currentReason.subPoints && currentReason.subPoints.length > 0 && (
                    <div className="bg-white p-3 rounded-lg border border-slate-200/80 space-y-1.5 mt-2">
                      <p className="text-[11px] font-bold text-slate-800 uppercase tracking-wider">
                        Rincian Ketentuan:
                      </p>
                      <ul className="space-y-1 text-[11px] text-slate-600 list-disc list-inside">
                        {currentReason.subPoints.map((point, idx) => (
                          <li key={idx} className="leading-relaxed">
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })()}
          </section>
        ) : (
          /* Khusus Karyawan Kontrak (PKWT) */
          <section className="p-4 bg-sky-50/70 border border-sky-200/80 rounded-xl space-y-1.5 text-xs text-sky-900">
            <h4 className="font-bold flex items-center gap-1.5 text-sky-950">
              <FileText className="w-4 h-4 text-sky-700" />
              Ketentuan Kompensasi PKWT (Pasal 15 PP 35/2021)
            </h4>
            <p className="leading-relaxed">
              Karyawan kontrak yang telah memiliki masa kerja minimal 1 bulan berhak atas <strong>Uang Kompensasi</strong> saat jangka waktu PKWT berakhir.
            </p>
            <p className="font-mono bg-white/70 p-2 rounded-lg border border-sky-200 text-slate-800 text-[11px]">
              Rumus: (Masa Kerja dalam Bulan / 12) × 1 Bulan Upah
            </p>
          </section>
        )}

        {/* BAGIAN 4: UANG PENGGANTIAN HAK (UPH) & HAK LAINNYA */}
        <section className="space-y-3 pt-2 border-t border-slate-100">
          <label className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-emerald-600" />
            4. Uang Penggantian Hak (UPH) & Kompensasi Lain
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Sisa Cuti Tahunan */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-700">
                  Sisa Cuti Tahunan (Hari)
                </label>
                <span className="text-[11px] text-slate-400">Belum diambil</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="0"
                  max="60"
                  value={input.unusedLeaveDays === 0 ? '' : input.unusedLeaveDays}
                  placeholder="0"
                  onChange={(e) => {
                    const val = Math.max(0, parseInt(e.target.value || '0', 10));
                    onChange({ unusedLeaveDays: isNaN(val) ? 0 : val });
                  }}
                  className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
                />
                <select
                  value={input.workingDaysPerMonth}
                  onChange={(e) => onChange({ workingDaysPerMonth: parseInt(e.target.value, 10) })}
                  className="px-2.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 font-medium shrink-0"
                  title="Basis hari kerja per bulan"
                >
                  <option value={21}>21 hari (5 hr/mgg)</option>
                  <option value={25}>25 hari (6 hr/mgg)</option>
                </select>
              </div>
            </div>

            {/* Ongkos Pulang atau Uang Pisah Lainnya */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 block">
                Ongkos Pulang / Uang Pisah / Hak Lain
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                  Rp
                </span>
                <input
                  type="text"
                  inputMode="numeric"
                  value={input.otherRights ? input.otherRights.toLocaleString('id-ID') : ''}
                  placeholder="0"
                  onChange={(e) => handleNumberInput('otherRights', e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors font-mono"
                />
              </div>
              <p className="text-[11px] text-slate-400">
                Sesuai ketentuan dalam PK, Peraturan Perusahaan, atau PKB.
              </p>
            </div>
          </div>
        </section>

        {/* BAGIAN 5: OPSIONAL PERHITUNGAN PAJAK */}
        <section className="pt-2 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-xs sm:text-sm font-bold text-slate-900 block">
              Hitung Pajak PPh Pasal 21 Final atas Pesangon
            </span>
            <span className="text-[11px] text-slate-500">
              Berdasarkan PP No. 68/2009 (Bebas pajak s/d Rp 50 Juta)
            </span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={input.calculateTax}
              onChange={(e) => onChange({ calculateTax: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
          </label>
        </section>
      </div>
    </div>
  );
};
