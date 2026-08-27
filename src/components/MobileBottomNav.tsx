import React, { useState } from "react";
import { Calendar, CheckSquare, Layers, Building2, Code2, BookOpen, Settings2, MoreHorizontal, Smartphone } from "lucide-react";
import { TabType } from "../types";

interface MobileBottomNavProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
  dailyRemainingCount: number;
  weeklyRemainingCount: number;
  totalApplicationsCount: number;
  onOpenInstallModal: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  onSelectTab,
  dailyRemainingCount,
  weeklyRemainingCount,
  totalApplicationsCount,
  onOpenInstallModal,
}) => {
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const primaryTabs: { id: TabType; label: string; icon: React.FC<{ className?: string }>; badge?: number }[] = [
    { id: "daily", label: "Daily", icon: Calendar, badge: dailyRemainingCount },
    { id: "weekly", label: "Weekly", icon: CheckSquare, badge: weeklyRemainingCount },
    { id: "roadmap", label: "Roadmap", icon: Layers },
    { id: "companies", label: "Jobs", icon: Building2, badge: totalApplicationsCount },
  ];

  const secondaryTabs: { id: TabType; label: string; icon: React.FC<{ className?: string }>; desc: string }[] = [
    { id: "dsa", label: "DSA Sheet", icon: Code2, desc: "Topic-wise problem progress" },
    { id: "notes", label: "STAR Vault & Notes", icon: BookOpen, desc: "STAR stories & formula scratchpad" },
    { id: "stats", label: "Settings & Baselines", icon: Settings2, desc: "Adjust goals, CGPA, target role" },
  ];

  const isMoreActive = secondaryTabs.some((t) => t.id === activeTab);

  return (
    <>
      {/* "More" Drawer Backdrop */}
      {showMoreMenu && (
        <div
          onClick={() => setShowMoreMenu(false)}
          className="md:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-40 animate-in fade-in duration-150"
        />
      )}

      {/* "More" Drawer for Extra Tabs & Install */}
      {showMoreMenu && (
        <div className="md:hidden fixed bottom-[72px] left-3 right-3 bg-slate-900 border border-slate-800 rounded-2xl p-4 z-40 shadow-2xl space-y-2 animate-in slide-in-from-bottom-4 duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">More Navigation</span>
            <button
              onClick={() => {
                setShowMoreMenu(false);
                onOpenInstallModal();
              }}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Install App</span>
            </button>
          </div>

          <div className="grid grid-cols-1 gap-1.5 pt-1">
            {secondaryTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    onSelectTab(tab.id);
                    setShowMoreMenu(false);
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-xl transition-colors text-left ${
                    isActive
                      ? "bg-slate-800 text-white border border-slate-700"
                      : "bg-slate-950/50 hover:bg-slate-800/60 text-slate-300 border border-slate-800/60"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${isActive ? "bg-sky-500 text-slate-950" : "bg-slate-800 text-slate-400"}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">{tab.label}</p>
                      <p className="text-[10px] text-slate-400">{tab.desc}</p>
                    </div>
                  </div>
                  {isActive && <div className="w-2 h-2 rounded-full bg-sky-400" />}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Fixed Bottom Dock */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#030712]/95 backdrop-blur-xl border-t border-slate-800/90 px-2 py-1.5 pb-safe shadow-2xl">
        <div className="grid grid-cols-5 gap-1 max-w-md mx-auto">
          {primaryTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  onSelectTab(tab.id);
                  setShowMoreMenu(false);
                }}
                className={`relative flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all min-h-[48px] ${
                  isActive
                    ? "text-sky-400 font-bold bg-slate-900/90"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <div className="relative">
                  <Icon className="w-4 h-4" />
                  {tab.badge !== undefined && tab.badge > 0 && (
                    <span className="absolute -top-1.5 -right-2 min-w-[14px] h-[14px] px-1 rounded-full bg-amber-500 text-[9px] font-black text-slate-950 flex items-center justify-center">
                      {tab.badge}
                    </span>
                  )}
                </div>
                <span className="text-[10px] mt-1 tracking-tight truncate max-w-full">
                  {tab.label}
                </span>
                {isActive && (
                  <span className="absolute bottom-1 w-1 h-1 rounded-full bg-sky-400" />
                )}
              </button>
            );
          })}

          {/* 5th Button: More & Other Tabs */}
          <button
            onClick={() => setShowMoreMenu(!showMoreMenu)}
            className={`relative flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all min-h-[48px] ${
              isMoreActive || showMoreMenu
                ? "text-sky-400 font-bold bg-slate-900/90"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <div className="relative">
              <MoreHorizontal className="w-4 h-4" />
              {isMoreActive && (
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-sky-400" />
              )}
            </div>
            <span className="text-[10px] mt-1 tracking-tight">
              {isMoreActive ? "More •" : "More"}
            </span>
          </button>
        </div>
      </nav>
    </>
  );
};
