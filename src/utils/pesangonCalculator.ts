import { PesangonInput, PesangonResult } from '../types/pesangon';
import { PHK_REASONS } from './constants';

/**
 * Hitung selisih masa kerja dari tanggal mulai ke tanggal akhir
 */
export function calculateTenureFromDates(startDateStr: string, endDateStr: string): { years: number; months: number; totalMonths: number } {
  if (!startDateStr || !endDateStr) return { years: 0, months: 0, totalMonths: 0 };
  
  const start = new Date(startDateStr);
  const end = new Date(endDateStr);
  
  if (isNaN(start.getTime()) || isNaN(end.getTime()) || end < start) {
    return { years: 0, months: 0, totalMonths: 0 };
  }

  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  const days = end.getDate() - start.getDate();

  if (days < 0) {
    months -= 1;
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const totalMonths = Math.max(0, years * 12 + months);
  return {
    years: Math.max(0, years),
    months: Math.max(0, months),
    totalMonths,
  };
}

/**
 * Uang Pesangon (UP) Pokok Berdasarkan Masa Kerja (Pasal 40 ayat 2 PP 35/2021)
 */
export function getBasePesangonMonths(years: number, months: number): number {
  const totalYearsFloat = years + months / 12;
  
  if (totalYearsFloat < 1) return 1;
  if (totalYearsFloat < 2) return 2;
  if (totalYearsFloat < 3) return 3;
  if (totalYearsFloat < 4) return 4;
  if (totalYearsFloat < 5) return 5;
  if (totalYearsFloat < 6) return 6;
  if (totalYearsFloat < 7) return 7;
  if (totalYearsFloat < 8) return 8;
  return 9; // 8 tahun atau lebih = 9 bulan upah (maksimal)
}

/**
 * Uang Penghargaan Masa Kerja (UPMK) Pokok (Pasal 40 ayat 3 PP 35/2021)
 */
export function getBaseUpmkMonths(years: number, months: number): number {
  const totalYearsFloat = years + months / 12;
  
  if (totalYearsFloat < 3) return 0;
  if (totalYearsFloat < 6) return 2;
  if (totalYearsFloat < 9) return 3;
  if (totalYearsFloat < 12) return 4;
  if (totalYearsFloat < 15) return 5;
  if (totalYearsFloat < 18) return 6;
  if (totalYearsFloat < 21) return 7;
  if (totalYearsFloat < 24) return 8;
  return 10; // 24 tahun atau lebih = 10 bulan upah
}

/**
 * Perhitungan Pajak PPh Pasal 21 Final atas Uang Pesangon yang Dibayarkan Sekaligus
 * Berdasarkan PP No. 68 Tahun 2009 & PMK No. 16/PMK.03/2010
 */
export function calculatePPh21Pesangon(grossAmount: number): {
  totalTax: number;
  brackets: { bracket: string; rate: number; taxableAmount: number; tax: number }[];
} {
  if (grossAmount <= 0) {
    return { totalTax: 0, brackets: [] };
  }

  const brackets = [
    { label: 's/d Rp 50.000.000', min: 0, max: 50_000_000, rate: 0 },
    { label: 'Rp 50.000.000 s/d Rp 100.000.000', min: 50_000_000, max: 100_000_000, rate: 0.05 },
    { label: 'Rp 100.000.000 s/d Rp 500.000.000', min: 100_000_000, max: 500_000_000, rate: 0.15 },
    { label: 'Di atas Rp 500.000.000', min: 500_000_000, max: Infinity, rate: 0.25 },
  ];

  let totalTax = 0;
  const detailedBrackets = [];

  for (const b of brackets) {
    if (grossAmount > b.min) {
      const taxable = Math.min(grossAmount, b.max) - b.min;
      const tax = taxable * b.rate;
      totalTax += tax;
      detailedBrackets.push({
        bracket: b.label,
        rate: b.rate * 100,
        taxableAmount: taxable,
        tax,
      });
    }
  }

  return { totalTax, brackets: detailedBrackets };
}

/**
 * Kalkulasi Komprehensif
 */
export function calculatePesangon(input: PesangonInput): PesangonResult {
  // Upah sebulan = Gaji Pokok + Tunjangan Tetap (Pasal 67 PP 35/2021)
  const monthlyWage = Math.max(0, (input.baseSalary || 0) + (input.fixedAllowance || 0));

  // Tentukan masa kerja
  let years = input.years || 0;
  let months = input.months || 0;

  if (input.useDateRange && input.startDate && input.endDate) {
    const tenure = calculateTenureFromDates(input.startDate, input.endDate);
    years = tenure.years;
    months = tenure.months;
  }

  const totalTenureMonths = years * 12 + months;
  const tenureDisplay = `${years} Tahun ${months} Bulan`;

  // Handle PKWT (Karyawan Kontrak)
  if (input.employmentType === 'PKWT') {
    // Kompensasi PKWT = (Masa Kerja dalam bulan / 12) * Upah sebulan (Pasal 15 PP 35/2021)
    const pkwtCompensation = (totalTenureMonths / 12) * monthlyWage;
    
    // UPH sisa cuti jika ada
    const leaveCompensation = (input.unusedLeaveDays > 0 && input.workingDaysPerMonth > 0)
      ? (input.unusedLeaveDays / input.workingDaysPerMonth) * monthlyWage
      : 0;

    const grossTotal = pkwtCompensation + leaveCompensation + (input.transportAllowance || 0) + (input.otherRights || 0);
    const taxCalc = input.calculateTax ? calculatePPh21Pesangon(grossTotal) : { totalTax: 0, brackets: [] };
    const netTotal = grossTotal - taxCalc.totalTax;

    return {
      monthlyWage,
      totalTenureMonths,
      tenureDisplay,
      basePesangonMonths: 0,
      pesangonMultiplier: 0,
      effectivePesangonMonths: 0,
      pesangonAmount: 0,
      baseUpmkMonths: 0,
      upmkMultiplier: 0,
      effectiveUpmkMonths: 0,
      upmkAmount: 0,
      leaveCompensationAmount: leaveCompensation,
      transportAmount: input.transportAllowance || 0,
      otherRightsAmount: input.otherRights || 0,
      totalUphAmount: leaveCompensation + (input.transportAllowance || 0) + (input.otherRights || 0),
      isPkwt: true,
      pkwtCompensationAmount: pkwtCompensation,
      grossTotal,
      taxAmount: taxCalc.totalTax,
      taxBrackets: taxCalc.brackets,
      netTotal,
      legalBasis: {
        rule: 'PP No. 35 Tahun 2021',
        article: 'Pasal 15 & Pasal 16',
        details: 'Uang kompensasi pekerja PKWT dihitung proporsional: (Masa Kerja / 12) × 1 Bulan Upah.',
      },
    };
  }

  // Handle PKWTT (Karyawan Tetap)
  const reason = PHK_REASONS.find(r => r.id === input.phkReasonId) || PHK_REASONS[0];

  // 1. Dasar UP
  const basePesangonMonths = getBasePesangonMonths(years, months);
  const effectivePesangonMonths = basePesangonMonths * reason.pesangonMultiplier;
  const pesangonAmount = effectivePesangonMonths * monthlyWage;

  // 2. Dasar UPMK
  const baseUpmkMonths = getBaseUpmkMonths(years, months);
  const effectiveUpmkMonths = baseUpmkMonths * reason.upmkMultiplier;
  const upmkAmount = effectiveUpmkMonths * monthlyWage;

  // 3. UPH (Sisa Cuti + Ongkos Pulang + Hak Lain / Uang Pisah)
  const workingDays = input.workingDaysPerMonth > 0 ? input.workingDaysPerMonth : 21;
  const leaveCompensationAmount = (input.unusedLeaveDays > 0)
    ? (input.unusedLeaveDays / workingDays) * monthlyWage
    : 0;
  
  const transportAmount = Math.max(0, input.transportAllowance || 0);
  const otherRightsAmount = Math.max(0, input.otherRights || 0);
  const totalUphAmount = leaveCompensationAmount + transportAmount + otherRightsAmount;

  // Total Bruto
  const grossTotal = pesangonAmount + upmkAmount + totalUphAmount;

  // Pajak PPh 21
  const taxCalc = input.calculateTax ? calculatePPh21Pesangon(grossTotal) : { totalTax: 0, brackets: [] };
  const netTotal = grossTotal - taxCalc.totalTax;

  return {
    monthlyWage,
    totalTenureMonths,
    tenureDisplay,
    basePesangonMonths,
    pesangonMultiplier: reason.pesangonMultiplier,
    effectivePesangonMonths,
    pesangonAmount,
    baseUpmkMonths,
    upmkMultiplier: reason.upmkMultiplier,
    effectiveUpmkMonths,
    upmkAmount,
    leaveCompensationAmount,
    transportAmount,
    otherRightsAmount,
    totalUphAmount,
    isPkwt: false,
    pkwtCompensationAmount: 0,
    grossTotal,
    taxAmount: taxCalc.totalTax,
    taxBrackets: taxCalc.brackets,
    netTotal,
    legalBasis: {
      rule: 'PP No. 35 Tahun 2021',
      article: `${reason.article} jo. Pasal 40`,
      details: reason.fullText || reason.description,
    },
  };
}

/**
 * Format angka ke Rupiah
 */
export function formatRupiah(amount: number): string {
  if (isNaN(amount) || amount === null || amount === undefined) return 'Rp 0';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(amount);
}
