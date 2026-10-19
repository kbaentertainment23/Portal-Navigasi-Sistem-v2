import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Smartphone, Share, PlusSquare, X, CheckCircle2, Sparkles } from 'lucide-react';
import { usePWAInstall } from '../lib/usePWAInstall';

interface PWAInstallButtonProps {
  variant?: 'navbar' | 'banner' | 'floating';
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({ variant = 'navbar' }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSModal, setShowIOSModal] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  // If already running inside installed standalone PWA, don't show prompt
  if (isInstalled) {
    if (variant === 'navbar') {
      return (
        <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-bold shadow-2xs">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>App Terpasang</span>
        </div>
      );
    }
    return null;
  }

  // Handle click based on platform
  const handleInstallClick = () => {
    if (isInstallable) {
      install();
    } else if (isIOS) {
      setShowIOSModal(true);
    } else {
      // General browser instructions modal
      setShowIOSModal(true);
    }
  };

  // Floating banner variant for mobile/desktop users
  if (variant === 'banner') {
    if (isDismissed) return null;

    return (
      <>
        <div className="w-full bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white border-b border-emerald-500/30 px-3 py-2 sm:px-6 shadow-sm">
          <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0 flex-1">
              <img
                src="/icon-192.png"
                alt="Logo SMPN 6 Singaraja"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg object-contain bg-white p-0.5 shadow-xs shrink-0"
              />
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-extrabold text-amber-300 leading-tight flex items-center gap-1.5 truncate">
                  <span>Pasang Aplikasi SMPN 6 Singaraja</span>
                  <span className="hidden xs:inline-block px-1.5 py-0.2 rounded bg-amber-400 text-emerald-950 text-[9px] font-black uppercase">
                    PWA
                  </span>
                </p>
                <p className="text-[11px] text-emerald-100/80 truncate hidden sm:block">
                  Akses instan dari layar beranda HP / Laptop tanpa perlu unduh dari PlayStore.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={handleInstallClick}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-emerald-950 text-xs font-black shadow-md hover:shadow-lg transition-all active:scale-95"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Pasang</span>
              </button>
              <button
                type="button"
                onClick={() => setIsDismissed(true)}
                title="Tutup ajakan pasang"
                className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Modal Guide */}
        <InstallGuideModal
          isOpen={showIOSModal}
          isIOS={isIOS}
          onClose={() => setShowIOSModal(false)}
        />
      </>
    );
  }

  // Default Navbar button
  return (
    <>
      <button
        type="button"
        onClick={handleInstallClick}
        className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white text-[11px] sm:text-xs font-extrabold border border-emerald-400/40 transition-all shadow-2xs hover:shadow-md active:scale-95 cursor-pointer shrink-0"
        title="Pasang Aplikasi ke Layar Utama (PWA)"
      >
        <Smartphone className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
        <span className="hidden xs:inline">Pasang App</span>
        <span className="xs:hidden">App</span>
      </button>

      {/* Guide Modal */}
      <InstallGuideModal
        isOpen={showIOSModal}
        isIOS={isIOS}
        onClose={() => setShowIOSModal(false)}
      />
    </>
  );
};

interface InstallGuideModalProps {
  isOpen: boolean;
  isIOS: boolean;
  onClose: () => void;
}

const InstallGuideModal: React.FC<InstallGuideModalProps> = ({ isOpen, isIOS, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 15 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden"
          >
            {/* Header */}
            <div className="p-5 bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 text-white relative">
              <button
                type="button"
                onClick={onClose}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3">
                <img
                  src="/icon-192.png"
                  alt="Logo SMPN 6 Singaraja"
                  className="w-12 h-12 rounded-2xl bg-white p-1 object-contain shadow-md ring-2 ring-amber-300/50"
                />
                <div>
                  <h3 className="font-extrabold text-base sm:text-lg leading-tight text-white flex items-center gap-1.5">
                    <span>SMP Negeri 6 Singaraja</span>
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  </h3>
                  <p className="text-xs text-emerald-200 mt-0.5">
                    Petunjuk Pemasangan Aplikasi (PWA)
                  </p>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="p-5 sm:p-6 space-y-4 text-slate-800 text-sm">
              {isIOS ? (
                <>
                  <p className="font-bold text-slate-900">
                    Untuk pengguna iPhone / iPad (Safari):
                  </p>
                  <ol className="space-y-3">
                    <li className="flex items-start gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                      <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0 text-xs">
                        1
                      </div>
                      <div className="text-xs leading-relaxed">
                        Ketuk tombol <strong className="inline-flex items-center gap-1 text-emerald-800"><Share className="w-3.5 h-3.5" /> Bagikan (Share)</strong> pada bilah bawah browser Safari.
                      </div>
                    </li>
                    <li className="flex items-start gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                      <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0 text-xs">
                        2
                      </div>
                      <div className="text-xs leading-relaxed">
                        Gulir ke bawah pada menu yang muncul dan pilih <strong className="inline-flex items-center gap-1 text-emerald-800"><PlusSquare className="w-3.5 h-3.5" /> Tambah ke Layar Utama (Add to Home Screen)</strong>.
                      </div>
                    </li>
                    <li className="flex items-start gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                      <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0 text-xs">
                        3
                      </div>
                      <div className="text-xs leading-relaxed">
                        Ketuk <strong className="text-emerald-800">Tambah (Add)</strong> di pojok kanan atas. Ikon resmi SMPN 6 Singaraja akan langsung muncul di beranda HP Anda!
                      </div>
                    </li>
                  </ol>
                </>
              ) : (
                <>
                  <p className="font-bold text-slate-900">
                    Cara Pasang di Android atau Komputer / Laptop:
                  </p>
                  <ol className="space-y-3">
                    <li className="flex items-start gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                      <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0 text-xs">
                        1
                      </div>
                      <div className="text-xs leading-relaxed">
                        Jika pop-up install otomatis belum muncul, buka menu titik tiga (⋮) di browser Chrome / Edge.
                      </div>
                    </li>
                    <li className="flex items-start gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                      <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0 text-xs">
                        2
                      </div>
                      <div className="text-xs leading-relaxed">
                        Pilih menu <strong className="text-emerald-800">"Instal Aplikasi" / "Tambahkan ke Layar Utama"</strong>.
                      </div>
                    </li>
                    <li className="flex items-start gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                      <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0 text-xs">
                        3
                      </div>
                      <div className="text-xs leading-relaxed">
                        Aplikasi akan terpasang dengan logo resmi <strong>SMP Negeri 6 Singaraja</strong> dan dapat dibuka cepat tanpa membuka browser terlebih dahulu.
                      </div>
                    </li>
                  </ol>
                </>
              )}

              <button
                type="button"
                onClick={onClose}
                className="w-full mt-2 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Saya Mengerti
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
