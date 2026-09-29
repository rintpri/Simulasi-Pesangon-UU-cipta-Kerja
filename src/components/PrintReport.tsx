import React from 'react';
import { PesangonInput, PesangonResult } from '../types/pesangon';
import { formatRupiah } from '../utils/pesangonCalculator';
import { PHK_REASONS } from '../utils/constants';

interface PrintReportProps {
  input: PesangonInput;
  result: PesangonResult;
}

export const PrintReport: React.FC<PrintReportProps> = ({ input, result }) => {
  const currentDate = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const selectedReason = PHK_REASONS.find(r => r.id === input.phkReasonId);

  return (
    <div className="p-8 max-w-4xl mx-auto text-slate-900 bg-white text-xs leading-normal">
      {/* Kop Surat / Dokumen Resmi */}
      <div className="border-b-2 border-slate-900 pb-4 mb-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-950 uppercase">
              Lembar Perhitungan Hak Pemutusan Hubungan Kerja (PHK)
            </h1>
            <p className="text-sm font-semibold text-slate-700 mt-1">
              Berdasarkan Peraturan Pemerintah Republik Indonesia No. 35 Tahun 2021 (UU Cipta Kerja)
            </p>
            <p className="text-[11px] text-slate-500">
              Pelaksana UU No. 11/2020 jo. UU No. 6/2023 tentang Penetapan Perppu Cipta Kerja Menjadi Undang-Undang
            </p>
          </div>
          <div className="text-right text-[11px] text-slate-600 shrink-0">
            <p className="font-semibold text-slate-800">Dokumen Simulasi Resmi</p>
            <p>Tanggal Cetak: {currentDate}</p>
          </div>
        </div>
      </div>

      {/* 1. Data Karyawan & Masa Kerja */}
      <div className="mb-6">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950 bg-slate-100 px-3 py-1.5 border-l-4 border-slate-900 mb-3">
          I. Data Ketenagakerjaan & Masa Kerja
        </h2>
        <table className="w-full text-xs border border-slate-200 divide-y divide-slate-200">
          <tbody className="divide-y divide-slate-200">
            <tr>
              <td className="w-1/3 px-3 py-2 bg-slate-50 font-semibold text-slate-700">Status Hubungan Kerja</td>
              <td className="px-3 py-2 font-bold text-slate-900">
                {input.employmentType === 'PKWTT'
                  ? 'Perjanjian Kerja Waktu Tidak Tertentu (Karyawan Tetap - PKWTT)'
                  : 'Perjanjian Kerja Waktu Tertentu (Karyawan Kontrak - PKWT)'}
              </td>
            </tr>
            <tr>
              <td className="px-3 py-2 bg-slate-50 font-semibold text-slate-700">Masa Kerja Efektif</td>
              <td className="px-3 py-2 font-bold text-slate-900">
                {result.tenureDisplay} ({result.totalTenureMonths} Bulan)
                {input.useDateRange && input.startDate && input.endDate && (
                  <span className="font-normal text-slate-600 ml-2">
                    (Periode: {input.startDate} s/d {input.endDate})
                  </span>
                )}
              </td>
            </tr>
            {input.employmentType === 'PKWTT' && (
              <tr>
                <td className="px-3 py-2 bg-slate-50 font-semibold text-slate-700 align-top">Alasan PHK</td>
                <td className="px-3 py-2 text-slate-900">
                  <div className="font-semibold">{result.legalBasis.details}</div>
                  {selectedReason?.subPoints && selectedReason.subPoints.length > 0 && (
                    <ul className="mt-1.5 pl-4 list-disc text-[10px] text-slate-700 space-y-0.5">
                      {selectedReason.subPoints.map((pt, idx) => (
                        <li key={idx}>{pt}</li>
                      ))}
                    </ul>
                  )}
                  <div className="text-[11px] text-slate-600 mt-1">
                    Rujukan Hukum: <strong>{result.legalBasis.article}</strong> ({result.legalBasis.rule})
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 2. Komponen Upah */}
      <div className="mb-6">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950 bg-slate-100 px-3 py-1.5 border-l-4 border-slate-900 mb-3">
          II. Komponen Upah Dasar Perhitungan (Pasal 67 PP 35/2021)
        </h2>
        <table className="w-full text-xs border border-slate-200">
          <thead className="bg-slate-50 border-b border-slate-200 font-semibold text-slate-700">
            <tr>
              <th className="px-3 py-2 text-left">Komponen Upah</th>
              <th className="px-3 py-2 text-left">Keterangan</th>
              <th className="px-3 py-2 text-right">Jumlah (Rp)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-slate-800">
            <tr>
              <td className="px-3 py-2 font-medium">Gaji Pokok (Upah Pokok)</td>
              <td className="px-3 py-2 text-slate-500">Upah dasar bulanan</td>
              <td className="px-3 py-2 text-right font-mono font-medium">{formatRupiah(input.baseSalary)}</td>
            </tr>
            <tr>
              <td className="px-3 py-2 font-medium">Tunjangan Tetap</td>
              <td className="px-3 py-2 text-slate-500">Tunjangan teratur & permanen (Jabatan/Keluarga)</td>
              <td className="px-3 py-2 text-right font-mono font-medium">{formatRupiah(input.fixedAllowance)}</td>
            </tr>
            <tr className="bg-slate-50 font-bold border-t-2 border-slate-300">
              <td className="px-3 py-2.5 text-slate-900" colSpan={2}>
                Total Upah Sebulan (Dasar Pengali Hak)
              </td>
              <td className="px-3 py-2.5 text-right font-mono text-slate-950 text-sm">
                {formatRupiah(result.monthlyWage)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 3. Rincian Hak yang Diterima */}
      <div className="mb-6">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950 bg-slate-100 px-3 py-1.5 border-l-4 border-slate-900 mb-3">
          III. Rincian Perhitungan Hak Kompensasi & Pesangon
        </h2>
        <table className="w-full text-xs border border-slate-200">
          <thead className="bg-slate-50 border-b border-slate-200 font-semibold text-slate-700">
            <tr>
              <th className="px-3 py-2 text-left">Jenis Hak</th>
              <th className="px-3 py-2 text-left">Dasar Formula & Pengali</th>
              <th className="px-3 py-2 text-right">Nilai Diterima (Rp)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-slate-800">
            {input.employmentType === 'PKWTT' ? (
              <>
                <tr>
                  <td className="px-3 py-2.5 font-bold text-slate-950">
                    1. Uang Pesangon (UP)
                    <p className="font-normal text-[11px] text-slate-500">Pasal 40 ayat (2) PP 35/2021</p>
                  </td>
                  <td className="px-3 py-2.5 text-slate-700">
                    Masa kerja {result.tenureDisplay} = {result.basePesangonMonths} bulan dasar × {result.pesangonMultiplier}x faktor pengali
                    <br />
                    <span className="text-slate-500 font-mono text-[11px]">
                      = {result.effectivePesangonMonths} bulan × {formatRupiah(result.monthlyWage)}
                    </span>
                  </td>
                  <td className="px-3 py-2.5 text-right font-mono font-bold text-slate-950">
                    {formatRupiah(result.pesangonAmount)}
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-bold text-slate-950">
                    2. Uang Penghargaan Masa Kerja (UPMK)
                    <p className="font-normal text-[11px] text-slate-500">Pasal 40 ayat (3) PP 35/2021</p>
                  </td>
                  <td className="px-3 py-2.5 text-slate-700">
                    {result.baseUpmkMonths > 0 ? (
                      <>
                        Masa kerja {result.tenureDisplay} = {result.baseUpmkMonths} bulan dasar × {result.upmkMultiplier}x faktor pengali
                        <br />
                        <span className="text-slate-500 font-mono text-[11px]">
                          = {result.effectiveUpmkMonths} bulan × {formatRupiah(result.monthlyWage)}
                        </span>
                      </>
                    ) : (
                      <span className="text-slate-500">Masa kerja di bawah 3 tahun tidak memperoleh UPMK (0 bulan)</span>
                    )}
                  </td>
                  <td className="px-3 py-2.5 text-right font-mono font-bold text-slate-950">
                    {formatRupiah(result.upmkAmount)}
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-bold text-slate-950">
                    3. Uang Penggantian Hak (UPH)
                    <p className="font-normal text-[11px] text-slate-500">Pasal 40 ayat (4) PP 35/2021</p>
                  </td>
                  <td className="px-3 py-2.5 text-slate-700">
                    <div>
                      • Kompensasi sisa cuti: {input.unusedLeaveDays} hari = {formatRupiah(result.leaveCompensationAmount)}
                    </div>
                    {result.transportAmount > 0 && (
                      <div>• Ongkos pulang pekerja dan keluarga: {formatRupiah(result.transportAmount)}</div>
                    )}
                    {result.otherRightsAmount > 0 && (
                      <div>• Uang pisah / hak lain sesuai PK/PP/PKB: {formatRupiah(result.otherRightsAmount)}</div>
                    )}
                  </td>
                  <td className="px-3 py-2.5 text-right font-mono font-bold text-slate-950">
                    {formatRupiah(result.totalUphAmount)}
                  </td>
                </tr>
              </>
            ) : (
              <tr>
                <td className="px-3 py-2.5 font-bold text-slate-950">
                  Uang Kompensasi PKWT (Kontrak)
                  <p className="font-normal text-[11px] text-slate-500">Pasal 15 PP 35/2021</p>
                </td>
                <td className="px-3 py-2.5 text-slate-700">
                  ({result.totalTenureMonths} bulan / 12) × {formatRupiah(result.monthlyWage)}
                  {result.totalUphAmount > 0 && (
                    <div className="text-[11px] text-slate-500 mt-1">
                      Termasuk sisa cuti/hak lain: {formatRupiah(result.totalUphAmount)}
                    </div>
                  )}
                </td>
                <td className="px-3 py-2.5 text-right font-mono font-bold text-slate-950">
                  {formatRupiah(result.grossTotal)}
                </td>
              </tr>
            )}

            {/* Subtotal Bruto */}
            <tr className="bg-slate-50 font-bold border-t border-slate-300">
              <td className="px-3 py-2 text-slate-900" colSpan={2}>
                TOTAL HAK BRUTO
              </td>
              <td className="px-3 py-2 text-right font-mono text-slate-950 text-sm">
                {formatRupiah(result.grossTotal)}
              </td>
            </tr>

            {/* Pajak PPh 21 */}
            {input.calculateTax ? (
              <>
                <tr className="text-slate-700">
                  <td className="px-3 py-2 font-medium">
                    Potongan Pajak Penghasilan (PPh 21 Final)
                    <p className="font-normal text-[11px] text-slate-500">PP No. 68/2009 (Bebas pajak s/d Rp 50 Juta)</p>
                  </td>
                  <td className="px-3 py-2 text-[11px] text-slate-500">
                    {result.taxBrackets.map((b, i) => (
                      <span key={i} className="mr-2">
                        [{b.bracket}: {formatRupiah(b.tax)}]
                      </span>
                    ))}
                  </td>
                  <td className="px-3 py-2 text-right font-mono text-rose-800 font-semibold">
                    - {formatRupiah(result.taxAmount)}
                  </td>
                </tr>
                <tr className="bg-slate-100 font-extrabold border-t-2 border-slate-900 text-sm">
                  <td className="px-3 py-3 text-slate-950" colSpan={2}>
                    TOTAL BERSIH YANG DITERIMA PEKERJA (TAKE HOME PAY)
                  </td>
                  <td className="px-3 py-3 text-right font-mono text-slate-950 text-base">
                    {formatRupiah(result.netTotal)}
                  </td>
                </tr>
              </>
            ) : (
              <tr className="bg-slate-100 font-extrabold border-t-2 border-slate-900 text-sm">
                <td className="px-3 py-3 text-slate-950" colSpan={2}>
                  TOTAL HAK YANG DITERIMA (SEBELUM POTONGAN PAJAK)
                </td>
                <td className="px-3 py-3 text-right font-mono text-slate-950 text-base">
                  {formatRupiah(result.grossTotal)}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Catatan Legal */}
      <div className="border border-slate-200 rounded-lg p-3 mb-8 bg-slate-50/60 text-[10px] text-slate-600 space-y-1">
        <p className="font-bold text-slate-800">Catatan & Ketentuan Hukum:</p>
        <p>
          1. Perhitungan ini dibuat sesuai dengan ketentuan normatif minimal dalam UU Cipta Kerja (UU No. 6 Tahun 2023) dan Peraturan Pemerintah No. 35 Tahun 2021 Bab V.
        </p>
        <p>
          2. Sesuai Pasal 58 PP 35/2021, apabila Perjanjian Kerja (PK), Peraturan Perusahaan (PP), atau Perjanjian Kerja Bersama (PKB) memuat besaran kompensasi/pesangon yang lebih tinggi dan lebih menguntungkan pekerja, maka yang berlaku adalah ketentuan dalam PK/PP/PKB tersebut.
        </p>
        <p>
          3. Pemotongan PPh 21 Final mengacu pada Peraturan Pemerintah Nomor 68 Tahun 2009 tentang Tarif Pajak Penghasilan Pasal 21 atas Penghasilan Berupa Uang Pesangon, Uang Manfaat Pensiun, Tunjangan Hari Tua, dan Jaminan Hari Tua yang Dibayarkan Sekaligus.
        </p>
      </div>

      {/* Kolom Tanda Tangan */}
      <div className="grid grid-cols-2 gap-8 pt-4 border-t border-slate-200 text-center text-xs">
        <div>
          <p className="text-slate-600 mb-1">Dibuat & Dihitung Oleh,</p>
          <p className="font-semibold text-slate-800">Pihak Perusahaan / Bagian HRD</p>
          <div className="h-20"></div>
          <p className="font-bold text-slate-950 border-t border-slate-400 inline-block px-8 pt-1">
            ( ..................................................... )
          </p>
        </div>
        <div>
          <p className="text-slate-600 mb-1">Mengetahui & Menerima,</p>
          <p className="font-semibold text-slate-800">Pekerja / Karyawan Bersangkutan</p>
          <div className="h-20"></div>
          <p className="font-bold text-slate-950 border-t border-slate-400 inline-block px-8 pt-1">
            ( ..................................................... )
          </p>
        </div>
      </div>
    </div>
  );
};
