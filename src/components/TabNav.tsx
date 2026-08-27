import React from "react";
import { Calendar, Layers, Building2, Code2, BookOpen, Settings2, CheckSquare } from "lucide-react";
import { TabType } from "../types";

interface TabNavProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
  dailyRemainingCount: number;
  weeklyRemainingCount: number;
  totalApplicationsCount: number;
}

export const TabNav: React.FC<TabNavProps> = ({
  activeTab,
  onSelectTab,
  dailyRemainingCount,
  weeklyRemainingCount,
  totalApplicationsCount,
}) => {
  const tabs = [
    {
      id: "daily" as TabType,
      label: "Daily Routine",
      icon: Calendar,
      badge: dailyRemainingCount > 0 ? `${dailyRemainingCount} left` : "Done",
      badgeColor: dailyRemainingCount > 0 ? "bg-amber-500/20 text-amber-300" : "bg-emerald-500/20 text-emerald-300",
    },
    {
      id: "weekly" as TabType,
      label: "Weekly Sprint",
      icon: CheckSquare,
      badge: weeklyRemainingCount > 0 ? `${weeklyRemainingCount} left` : "Done",
      badgeColor: weeklyRemainingCount > 0 ? "bg-sky-500/20 text-sky-300" : "bg-emerald-500/20 text-emerald-300",
    },
    {
      id: "roadmap" as TabType,
      label: "Milestone Roadmap",
      icon: Layers,
    },
    {
      id: "companies" as TabType,
      label: "Job & Drives Tracker",
      icon: Building2,
      badge: totalApplicationsCount > 0 ? `${totalApplicationsCount}` : undefined,
      badgeColor: "bg-slate-800 text-slate-300",
    },
    {
      id: "dsa" as TabType,
      label: "DSA Sheet & Topics",
      icon: Code2,
    },
    {
      id: "notes" as TabType,
      label: "STAR Stories & Cheat Sheet",
      icon: BookOpen,
    },
    {
      id: "stats" as TabType,
      label: "Edit Baselines",
      icon: Settings2,
    },
  ];

  return (
    <nav className="flex items-center gap-1.5 overflow-x-auto pb-1 my-5 no-scrollbar scroll-smooth">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onSelectTab(tab.id)}
            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all cursor-pointer border ${
              isActive
                ? "bg-slate-800 text-white border-slate-700 shadow-sm ring-1 ring-sky-500/30"
                : "bg-slate-900/60 text-slate-400 border-slate-800/80 hover:bg-slate-800/70 hover:text-slate-200"
            }`}
          >
            <Icon className={`w-4 h-4 ${isActive ? "text-sky-400" : "text-slate-500"}`} />
            <span>{tab.label}</span>
            {tab.badge && (
              <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${tab.badgeColor}`}>
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
};
