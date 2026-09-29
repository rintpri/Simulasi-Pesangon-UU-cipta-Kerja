import React from 'react';
import { X, BookOpen, Scale, ExternalLink } from 'lucide-react';
import { PHK_REASONS } from '../utils/constants';

interface LegalReferenceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LegalReferenceModal: React.FC<LegalReferenceModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-lg">Dasar Hukum & Rumus PP No. 35 Tahun 2021</h3>
              <p className="text-xs text-slate-500">Pelaksana UU No. 11/2020 jo. Perppu No. 2/2022 / UU No. 6/2023</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-600">
          {/* Komponen Upah */}
          <section className="bg-emerald-50/60 border border-emerald-200/60 rounded-xl p-4">
            <h4 className="font-semibold text-emerald-900 text-base mb-1.5 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-700" />
              Komponen Upah (Pasal 67 PP 35/2021)
            </h4>
            <p className="text-slate-700 leading-relaxed text-xs">
              Upah yang digunakan sebagai dasar perhitungan pesangon dan penghargaan masa kerja terdiri atas:
              <br />
              <strong>1. Upah Pokok (Gaji Pokok)</strong>
              <br />
              <strong>2. Segala bentuk tunjangan yang bersifat tetap</strong> yang diberikan kepada pekerja dan keluarganya.
              <br />
              <em>*Tunjangan tidak tetap (seperti uang makan harian berbasis kehadiran, transport harian) tidak dihitung.</em>
            </p>
          </section>

          {/* Tabel Uang Pesangon */}
          <section>
            <h4 className="font-bold text-slate-800 mb-2">1. Tabel Besaran Uang Pesangon (UP) - Pasal 40 ayat (2)</h4>
            <div className="overflow-x-auto border border-slate-200 rounded-lg">
              <table className="min-w-full divide-y divide-slate-200 text-xs">
                <thead className="bg-slate-100 font-semibold text-slate-700">
                  <tr>
                    <th className="px-4 py-2 text-left">Masa Kerja</th>
                    <th className="px-4 py-2 text-right">Besaran Uang Pesangon Pokok</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-600">
                  <tr><td className="px-4 py-1.5">Kurang dari 1 tahun</td><td className="px-4 py-1.5 text-right font-medium">1 bulan upah</td></tr>
                  <tr><td className="px-4 py-1.5">1 tahun s/d &lt; 2 tahun</td><td className="px-4 py-1.5 text-right font-medium">2 bulan upah</td></tr>
                  <tr><td className="px-4 py-1.5">2 tahun s/d &lt; 3 tahun</td><td className="px-4 py-1.5 text-right font-medium">3 bulan upah</td></tr>
                  <tr><td className="px-4 py-1.5">3 tahun s/d &lt; 4 tahun</td><td className="px-4 py-1.5 text-right font-medium">4 bulan upah</td></tr>
                  <tr><td className="px-4 py-1.5">4 tahun s/d &lt; 5 tahun</td><td className="px-4 py-1.5 text-right font-medium">5 bulan upah</td></tr>
                  <tr><td className="px-4 py-1.5">5 tahun s/d &lt; 6 tahun</td><td className="px-4 py-1.5 text-right font-medium">6 bulan upah</td></tr>
                  <tr><td className="px-4 py-1.5">6 tahun s/d &lt; 7 tahun</td><td className="px-4 py-1.5 text-right font-medium">7 bulan upah</td></tr>
                  <tr><td className="px-4 py-1.5">7 tahun s/d &lt; 8 tahun</td><td className="px-4 py-1.5 text-right font-medium">8 bulan upah</td></tr>
                  <tr className="bg-slate-50"><td className="px-4 py-1.5 font-semibold text-slate-800">8 tahun atau lebih (Maksimal)</td><td className="px-4 py-1.5 text-right font-bold text-emerald-700">9 bulan upah</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Tabel UPMK */}
          <section>
            <h4 className="font-bold text-slate-800 mb-2">2. Tabel Uang Penghargaan Masa Kerja (UPMK) - Pasal 40 ayat (3)</h4>
            <div className="overflow-x-auto border border-slate-200 rounded-lg">
              <table className="min-w-full divide-y divide-slate-200 text-xs">
                <thead className="bg-slate-100 font-semibold text-slate-700">
                  <tr>
                    <th className="px-4 py-2 text-left">Masa Kerja</th>
                    <th className="px-4 py-2 text-right">Besaran UPMK</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-600">
                  <tr><td className="px-4 py-1.5">Kurang dari 3 tahun</td><td className="px-4 py-1.5 text-right font-medium text-slate-400">Tidak dapat (0)</td></tr>
                  <tr><td className="px-4 py-1.5">3 tahun s/d &lt; 6 tahun</td><td className="px-4 py-1.5 text-right font-medium">2 bulan upah</td></tr>
                  <tr><td className="px-4 py-1.5">6 tahun s/d &lt; 9 tahun</td><td className="px-4 py-1.5 text-right font-medium">3 bulan upah</td></tr>
                  <tr><td className="px-4 py-1.5">9 tahun s/d &lt; 12 tahun</td><td className="px-4 py-1.5 text-right font-medium">4 bulan upah</td></tr>
                  <tr><td className="px-4 py-1.5">12 tahun s/d &lt; 15 tahun</td><td className="px-4 py-1.5 text-right font-medium">5 bulan upah</td></tr>
                  <tr><td className="px-4 py-1.5">15 tahun s/d &lt; 18 tahun</td><td className="px-4 py-1.5 text-right font-medium">6 bulan upah</td></tr>
                  <tr><td className="px-4 py-1.5">18 tahun s/d &lt; 21 tahun</td><td className="px-4 py-1.5 text-right font-medium">7 bulan upah</td></tr>
                  <tr><td className="px-4 py-1.5">21 tahun s/d &lt; 24 tahun</td><td className="px-4 py-1.5 text-right font-medium">8 bulan upah</td></tr>
                  <tr className="bg-slate-50"><td className="px-4 py-1.5 font-semibold text-slate-800">24 tahun atau lebih (Maksimal)</td><td className="px-4 py-1.5 text-right font-bold text-emerald-700">10 bulan upah</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Tabel Faktor Pengali Alasan PHK */}
          <section>
            <h4 className="font-bold text-slate-800 mb-2">3. Faktor Pengali Berdasarkan Alasan PHK (PP 35/2021)</h4>
            <div className="overflow-x-auto border border-slate-200 rounded-lg">
              <table className="min-w-full divide-y divide-slate-200 text-xs">
                <thead className="bg-slate-100 font-semibold text-slate-700">
                  <tr>
                    <th className="px-3 py-2 text-left">Alasan Pemutusan Hubungan Kerja</th>
                    <th className="px-2 py-2 text-center">UP</th>
                    <th className="px-2 py-2 text-center">UPMK</th>
                    <th className="px-3 py-2 text-left">Dasar Aturan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-600">
                  {PHK_REASONS.map((r) => (
                    <tr key={r.id}>
                      <td className="px-3 py-1.5 font-medium text-slate-800">{r.label}</td>
                      <td className="px-2 py-1.5 text-center font-bold text-emerald-700">{r.pesangonMultiplier}x</td>
                      <td className="px-2 py-1.5 text-center font-bold text-sky-700">{r.upmkMultiplier}x</td>
                      <td className="px-3 py-1.5 text-slate-500">{r.article}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Tarif Pajak PPh 21 Pesangon */}
          <section className="bg-amber-50/60 border border-amber-200/60 rounded-xl p-4">
            <h4 className="font-semibold text-amber-900 text-base mb-1.5 flex items-center gap-2">
              Tarif Pajak PPh 21 Final atas Pesangon (PP 68/2009)
            </h4>
            <ul className="text-slate-700 text-xs space-y-1 list-disc list-inside">
              <li>s/d Rp 50.000.000 : <strong>0% (Bebas Pajak)</strong></li>
              <li>Diatas Rp 50.000.000 s/d Rp 100.000.000 : <strong>5%</strong></li>
              <li>Diatas Rp 100.000.000 s/d Rp 500.000.000 : <strong>15%</strong></li>
              <li>Diatas Rp 500.000.000 : <strong>25%</strong></li>
            </ul>
          </section>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-semibold transition-colors"
          >
            Tutup Informasi
          </button>
        </div>
      </div>
    </div>
  );
};
