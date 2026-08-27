import React, { useState, useEffect } from "react";
import { Smartphone, Download, Share2, PlusSquare, CheckCircle, Sparkles, ExternalLink, X, Laptop, ShieldCheck } from "lucide-react";

interface MobileInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
  deferredPrompt: any;
  onInstallClick: () => void;
  isStandalone: boolean;
}

export const MobileInstallModal: React.FC<MobileInstallModalProps> = ({
  isOpen,
  onClose,
  deferredPrompt,
  onInstallClick,
  isStandalone,
}) => {
  const [platform, setPlatform] = useState<"ios" | "android" | "desktop">("android");

  useEffect(() => {
    // Detect OS
    const ua = navigator.userAgent || "";
    if (/iPad|iPhone|iPod/.test(ua) && !(window as any).MSStream) {
      setPlatform("ios");
    } else if (/android/i.test(ua)) {
      setPlatform("android");
    } else {
      setPlatform("desktop");
    }
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-t-3xl sm:rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-5 sm:p-6 shadow-2xl space-y-5 animate-in fade-in slide-in-from-bottom-6 sm:zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="flex items-start justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center flex-shrink-0">
              <Smartphone className="w-5 h-5 text-sky-400" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                Use as App & Web on Phone
              </h3>
              <p className="text-xs text-slate-400">
                Install on your Home Screen or use anywhere in your browser
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Current status banner */}
        {isStandalone ? (
          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs">
            <CheckCircle className="w-4 h-4 flex-shrink-0" />
            <span>You are already running in standalone <strong>App Mode</strong>! All your progress is stored locally on this device.</span>
          </div>
        ) : (
          /* Quick 1-click install button if Chrome prompt available */
          deferredPrompt && (
            <div className="p-4 rounded-xl bg-gradient-to-r from-sky-500/20 to-emerald-500/20 border border-sky-500/30 flex items-center justify-between gap-3">
              <div className="space-y-0.5">
                <p className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-sky-400" /> Quick Install Ready
                </p>
                <p className="text-[11px] text-slate-300">
                  Tap below to add Placement OS directly to your home screen.
                </p>
              </div>
              <button
                onClick={onInstallClick}
                className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold rounded-lg border border-sky-400 shadow-md transition-colors flex-shrink-0"
              >
                Install Now
              </button>
            </div>
          )
        )}

        {/* Platform Selector Tabs */}
        <div className="grid grid-cols-3 gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setPlatform("android")}
            className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              platform === "android"
                ? "bg-slate-800 text-white shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Android (Chrome)
          </button>
          <button
            onClick={() => setPlatform("ios")}
            className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              platform === "ios"
                ? "bg-slate-800 text-white shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            iPhone (Safari)
          </button>
          <button
            onClick={() => setPlatform("desktop")}
            className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              platform === "desktop"
                ? "bg-slate-800 text-white shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Laptop / Web
          </button>
        </div>

        {/* Platform Step-by-Step Instructions */}
        <div className="space-y-3">
          {platform === "android" && (
            <div className="space-y-2.5 text-xs text-slate-300">
              <h4 className="font-semibold text-white text-xs flex items-center gap-1.5">
                How to install on Android (Google Chrome):
              </h4>
              <ol className="space-y-2 list-decimal list-inside bg-slate-950/60 border border-slate-800/80 p-3.5 rounded-xl">
                <li className="leading-relaxed">
                  Open this link in <strong>Chrome</strong> on your Android phone.
                </li>
                <li className="leading-relaxed">
                  Tap the <strong>three dots menu (⋮)</strong> in the top-right corner.
                </li>
                <li className="leading-relaxed">
                  Select <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong>.
                </li>
                <li className="leading-relaxed">
                  Tap <strong>"Install"</strong> to confirm. The Placement OS icon will appear on your app drawer and home screen!
                </li>
              </ol>
            </div>
          )}

          {platform === "ios" && (
            <div className="space-y-2.5 text-xs text-slate-300">
              <h4 className="font-semibold text-white text-xs flex items-center gap-1.5">
                How to install on iPhone & iPad (Safari):
              </h4>
              <ol className="space-y-2 list-decimal list-inside bg-slate-950/60 border border-slate-800/80 p-3.5 rounded-xl">
                <li className="leading-relaxed">
                  Open this webpage in <strong>Safari</strong> on your iPhone.
                </li>
                <li className="leading-relaxed">
                  Tap the <strong>Share button</strong> <Share2 className="inline w-3.5 h-3.5 text-sky-400 mx-1" /> (square with arrow at the bottom).
                </li>
                <li className="leading-relaxed">
                  Scroll down and tap <strong>"Add to Home Screen"</strong> <PlusSquare className="inline w-3.5 h-3.5 text-slate-300 mx-1" />.
                </li>
                <li className="leading-relaxed">
                  Tap <strong>"Add"</strong> in the top-right corner. The app will launch in fullscreen mode without browser toolbars!
                </li>
              </ol>
            </div>
          )}

          {platform === "desktop" && (
            <div className="space-y-2.5 text-xs text-slate-300">
              <h4 className="font-semibold text-white text-xs flex items-center gap-1.5">
                How to use on Laptop / Web Browser:
              </h4>
              <ul className="space-y-2 list-disc list-inside bg-slate-950/60 border border-slate-800/80 p-3.5 rounded-xl">
                <li className="leading-relaxed">
                  Bookmark this tab in your browser or install via Chrome's address bar icon <Download className="inline w-3.5 h-3.5 text-sky-400 mx-1" />.
                </li>
                <li className="leading-relaxed">
                  Use the <strong>"Backup"</strong> (JSON Export) and <strong>"Restore"</strong> features to transfer your streak & tasks between your phone and laptop!
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Benefits Comparison */}
        <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-slate-800">
          <div className="bg-slate-950/40 border border-slate-800 p-3 rounded-xl space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400 block">📱 App Mode Benefits</span>
            <ul className="text-[11px] text-slate-400 space-y-1">
              <li>• Fullscreen app experience</li>
              <li>• Works offline in labs/metro</li>
              <li>• Quick 1-tap home screen access</li>
            </ul>
          </div>
          <div className="bg-slate-950/40 border border-slate-800 p-3 rounded-xl space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">🌐 Web Mode Benefits</span>
            <ul className="text-[11px] text-slate-400 space-y-1">
              <li>• No download required</li>
              <li>• Instant access on any device</li>
              <li>• Easy JSON backup & sync</li>
            </ul>
          </div>
        </div>

        {/* Action button */}
        <div className="flex items-center justify-end gap-2 pt-2">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            Got it, thanks!
          </button>
        </div>
      </div>
    </div>
  );
};
