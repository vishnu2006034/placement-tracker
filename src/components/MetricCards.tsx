import React from "react";
import { Plus, Minus, Code2, Send, Award, TrendingUp } from "lucide-react";
import { UserMetrics } from "../types";

interface MetricCardsProps {
  metrics: UserMetrics;
  onUpdateMetrics: (updater: (prev: UserMetrics) => UserMetrics) => void;
  roadmapPct: number;
  totalRoadmapDone: number;
  totalRoadmapTasks: number;
}

export const MetricCards: React.FC<MetricCardsProps> = ({
  metrics,
  onUpdateMetrics,
  roadmapPct,
  totalRoadmapDone,
  totalRoadmapTasks,
}) => {
  const dsaPct = metrics.dsaGoal > 0 ? Math.min(100, Math.round((metrics.dsaSolved / metrics.dsaGoal) * 100)) : 0;
  const appPct = metrics.appsWeekGoal > 0 ? Math.min(100, Math.round((metrics.appsThisWeek / metrics.appsWeekGoal) * 100)) : 0;
  const mockPct = metrics.mocksGoal > 0 ? Math.min(100, Math.round((metrics.mocksDone / metrics.mocksGoal) * 100)) : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {/* 1. DSA Solved */}
      <div className="bg-slate-900/50 border border-slate-800 p-5 rounded-2xl flex flex-col justify-between hover:border-slate-700/80 transition-all shadow-sm">
        <div>
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5 text-emerald-400" />
              DSA Mastery
            </span>
            <span className="text-emerald-400 text-xs font-bold">{dsaPct}% Complete</span>
          </div>

          <div className="flex items-baseline justify-between gap-2 mt-1">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-black text-white tabular-nums">
                {metrics.dsaSolved}
              </span>
              <span className="text-slate-500 font-medium text-xs sm:text-sm">/ {metrics.dsaGoal} Problems</span>
            </div>

            <div className="flex items-center gap-1 bg-slate-950/60 p-0.5 rounded-lg border border-slate-800">
              <button
                onClick={() => onUpdateMetrics((m) => ({ ...m, dsaSolved: Math.max(0, m.dsaSolved - 1) }))}
                className="w-5.5 h-5.5 flex items-center justify-center rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                title="Decrease 1"
              >
                <Minus className="w-3 h-3" />
              </button>
              <button
                onClick={() => onUpdateMetrics((m) => ({ ...m, dsaSolved: m.dsaSolved + 1 }))}
                className="w-5.5 h-5.5 flex items-center justify-center rounded bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-colors cursor-pointer"
                title="Increase 1"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        <div className="w-full bg-slate-800 h-1.5 rounded-full mt-4 overflow-hidden">
          <div
            className="bg-emerald-500 h-full rounded-full transition-all duration-300"
            style={{ width: `${dsaPct}%` }}
          />
        </div>
      </div>

      {/* 2. Applications This Week */}
      <div className="bg-slate-900/50 border border-slate-800 p-5 rounded-2xl flex flex-col justify-between hover:border-slate-700/80 transition-all shadow-sm">
        <div>
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
              <Send className="w-3.5 h-3.5 text-amber-400" />
              Applications
            </span>
            <span className="text-amber-400 text-xs font-bold">Weekly Target</span>
          </div>

          <div className="flex items-baseline justify-between gap-2 mt-1">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-black text-white tabular-nums">
                {metrics.appsThisWeek < 10 && metrics.appsThisWeek >= 0 ? `0${metrics.appsThisWeek}` : metrics.appsThisWeek}
              </span>
              <span className="text-slate-500 font-medium text-xs sm:text-sm">/ {metrics.appsWeekGoal} Applications</span>
            </div>

            <div className="flex items-center gap-1 bg-slate-950/60 p-0.5 rounded-lg border border-slate-800">
              <button
                onClick={() => onUpdateMetrics((m) => ({ ...m, appsThisWeek: Math.max(0, m.appsThisWeek - 1) }))}
                className="w-5.5 h-5.5 flex items-center justify-center rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                title="Decrease 1"
              >
                <Minus className="w-3 h-3" />
              </button>
              <button
                onClick={() =>
                  onUpdateMetrics((m) => ({
                    ...m,
                    appsThisWeek: m.appsThisWeek + 1,
                    totalApps: m.totalApps + 1,
                  }))
                }
                className="w-5.5 h-5.5 flex items-center justify-center rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-colors cursor-pointer"
                title="Increase 1 (also increments total)"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        <div className="w-full bg-slate-800 h-1.5 rounded-full mt-4 overflow-hidden">
          <div
            className="bg-amber-500 h-full rounded-full transition-all duration-300"
            style={{ width: `${appPct}%` }}
          />
        </div>
      </div>

      {/* 3. Mock Interviews & Lifetime Apps */}
      <div className="bg-slate-900/50 border border-slate-800 p-5 rounded-2xl flex flex-col justify-between hover:border-slate-700/80 transition-all shadow-sm">
        <div>
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-purple-400" />
              Mock Prep
            </span>
            <span className="text-slate-400 text-[11px] font-bold">
              Total: <strong className="text-white">{metrics.totalApps}</strong> Apps
            </span>
          </div>

          <div className="flex items-baseline justify-between gap-2 mt-1">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-black text-white tabular-nums">
                {metrics.mocksDone < 10 && metrics.mocksDone >= 0 ? `0${metrics.mocksDone}` : metrics.mocksDone}
              </span>
              <span className="text-slate-500 font-medium text-xs sm:text-sm">/ {metrics.mocksGoal} Mocks</span>
            </div>

            <div className="flex items-center gap-1 bg-slate-950/60 p-0.5 rounded-lg border border-slate-800">
              <button
                onClick={() => onUpdateMetrics((m) => ({ ...m, mocksDone: Math.max(0, m.mocksDone - 1) }))}
                className="w-5.5 h-5.5 flex items-center justify-center rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                title="Decrease 1"
              >
                <Minus className="w-3 h-3" />
              </button>
              <button
                onClick={() => onUpdateMetrics((m) => ({ ...m, mocksDone: m.mocksDone + 1 }))}
                className="w-5.5 h-5.5 flex items-center justify-center rounded bg-purple-500 hover:bg-purple-400 text-slate-950 font-bold transition-colors cursor-pointer"
                title="Increase 1"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        <div className="w-full bg-slate-800 h-1.5 rounded-full mt-4 overflow-hidden">
          <div
            className="bg-purple-500 h-full rounded-full transition-all duration-300"
            style={{ width: `${mockPct}%` }}
          />
        </div>
      </div>

      {/* 4. Roadmap Milestone */}
      <div className="bg-slate-900/50 border border-slate-800 p-5 rounded-2xl flex flex-col justify-between hover:border-slate-700/80 transition-all shadow-sm">
        <div>
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-sky-400" />
              Roadmap Milestone
            </span>
            <span className="text-sky-400 text-xs font-bold">
              {totalRoadmapDone}/{totalRoadmapTasks} Cleared
            </span>
          </div>

          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl sm:text-4xl font-black text-white tabular-nums">
              {roadmapPct}%
            </span>
            <span className="text-slate-500 font-medium text-xs sm:text-sm">Overall Cleared</span>
          </div>
        </div>

        <div className="w-full bg-slate-800 h-1.5 rounded-full mt-4 overflow-hidden">
          <div
            className="bg-sky-500 h-full rounded-full transition-all duration-300"
            style={{ width: `${roadmapPct}%` }}
          />
        </div>
      </div>
    </div>
  );
};

