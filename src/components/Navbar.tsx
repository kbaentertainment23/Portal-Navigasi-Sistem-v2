import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Sparkles, LogOut, Sliders } from 'lucide-react';
import { SiteSettings } from '../types';
import { PWAInstallButton } from './PWAInstallButton';

interface NavbarProps {
  settings: SiteSettings;
  isAdminLoggedIn: boolean;
  onOpenSettings: () => void;
  onAdminLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  settings,
  isAdminLoggedIn,
  onOpenSettings,
  onAdminLogout,
}) => {
  // Sembunyikan Header Navbar jika bukan Admin
  if (!isAdminLoggedIn) {
    return null;
  }

  const logoSrc = settings.logoUrl || '/logo-smpn6.png';

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-0 z-30 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-xl transition-all shadow-xs"
    >
      {/* Top ornamental thread */}
      <div className="h-1.5 w-full theme-header-bar" />

      <div className="max-w-[1600px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-12 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="relative group shrink-0">
            <img
              src={logoSrc}
              alt={settings.siteTitle || 'SMP Negeri 6 Singaraja'}
              className="h-8 w-8 sm:h-10 sm:w-10 object-contain rounded-xl bg-white p-0.5 border border-slate-200 shadow-md ring-2 ring-amber-400/40 transition-transform group-hover:scale-105"
            />
            <div className="absolute -bottom-1 -right-1 h-3 w-3 sm:h-3.5 sm:w-3.5 rounded-full theme-badge-dot border border-white flex items-center justify-center">
              <Sparkles className="w-1.8 h-1.8 sm:w-2 sm:h-2 text-amber-300" />
            </div>
          </div>
          <div className="min-w-0">
            <h1 className="font-extrabold text-slate-900 text-xs sm:text-lg leading-tight tracking-tight flex items-center gap-1.5 sm:gap-2">
              <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-950 bg-clip-text text-transparent truncate max-w-[120px] xs:max-w-[180px] sm:max-w-none">
                {settings.siteTitle || 'SMP Negeri 6 Singaraja'}
              </span>
              <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300/60 shadow-2xs uppercase tracking-wider shrink-0">
                Mode Admin
              </span>
            </h1>
            <span className="hidden sm:block text-[11px] theme-text-primary font-semibold tracking-wide truncate max-w-[280px] md:max-w-none">
              Portal Tautan Resmi & Integrasi Terpadu
            </span>
          </div>
        </div>

        {/* Right Status & Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <PWAInstallButton variant="navbar" />

          <div className="hidden lg:flex items-center gap-1.5 theme-bg-subtle theme-text-primary border border-slate-200/90 px-2.5 py-1.5 rounded-xl text-xs font-extrabold shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Admin Active</span>
          </div>

          <button
            type="button"
            onClick={onOpenSettings}
            className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] sm:text-xs font-extrabold border border-slate-300/80 transition-all shadow-2xs active:scale-95"
            title="Buka Panel Kontrol Admin"
          >
            <Sliders className="w-3.5 h-3.5 text-emerald-700" />
            <span className="hidden xs:inline">Panel Admin</span>
          </button>

          <button
            type="button"
            onClick={onAdminLogout}
            className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-800 text-[11px] sm:text-xs font-extrabold border border-rose-200 transition-all shadow-2xs active:scale-95"
            title="Keluar dari Mode Admin"
          >
            <LogOut className="w-3.5 h-3.5 text-rose-600" />
            <span>Keluar</span>
          </button>
        </div>
      </div>
    </motion.header>
  );
};

