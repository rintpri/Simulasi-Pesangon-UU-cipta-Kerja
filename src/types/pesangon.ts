export type EmploymentType = 'PKWTT' | 'PKWT';

export interface PhkReason {
  id: string;
  label: string;
  category: 'peleburan' | 'efisiensi' | 'tutup' | 'pribadi' | 'pelanggaran' | 'permohonan' | 'lainnya';
  pesangonMultiplier: number; // Pengali UP (0, 0.5, 1, 1.75, 2)
  upmkMultiplier: number;     // Pengali UPMK (0 atau 1)
  hasUph: boolean;            // Hak UPH
  hasUangPisah: boolean;      // Uang Pisah (sesuai PK/PP/PKB)
  article: string;            // Rujukan Pasal di PP 35/2021
  description: string;
  fullText?: string;          // Bunyi lengkap pasal / skenario
  subPoints?: string[];       // Butir-butir rincian jika ada
}

export interface PesangonInput {
  employmentType: EmploymentType;
  // Masa kerja
  useDateRange: boolean;
  startDate: string;
  endDate: string;
  years: number;
  months: number;
  // Upah
  baseSalary: number;         // Gaji Pokok
  fixedAllowance: number;     // Tunjangan Tetap
  // Alasan PHK
  phkReasonId: string;
  // Hak lainnya
  unusedLeaveDays: number;    // Sisa cuti tahunan
  workingDaysPerMonth: number;// Hari kerja per bulan (21 atau 25)
  transportAllowance: number; // Ongkos pulang pekerja/keluarga
  otherRights: number;        // Kompensasi lain / Uang pisah
  calculateTax: boolean;      // Hitung PPh 21 Final
}

export interface PesangonResult {
  monthlyWage: number;        // Gaji Pokok + Tunjangan Tetap
  totalTenureMonths: number;
  tenureDisplay: string;
  
  // UP (Uang Pesangon)
  basePesangonMonths: number;
  pesangonMultiplier: number;
  effectivePesangonMonths: number;
  pesangonAmount: number;
  
  // UPMK (Uang Penghargaan Masa Kerja)
  baseUpmkMonths: number;
  upmkMultiplier: number;
  effectiveUpmkMonths: number;
  upmkAmount: number;
  
  // UPH (Uang Penggantian Hak)
  leaveCompensationAmount: number;
  transportAmount: number;
  otherRightsAmount: number;
  totalUphAmount: number;

  // PKWT Kompensasi (jika PKWT)
  isPkwt: boolean;
  pkwtCompensationAmount: number;
  
  // Subtotal & Total
  grossTotal: number;
  taxAmount: number;
  taxBrackets: { bracket: string; rate: number; taxableAmount: number; tax: number }[];
  netTotal: number;
  
  // Hukum
  legalBasis: {
    rule: string;
    article: string;
    details: string;
  };
}
