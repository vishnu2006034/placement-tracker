import React from "react";
import { Plus, Minus, Code2, Send, Award, CheckCircle2, TrendingUp } from "lucide-react";
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
  totalRoadmapTasks
}) => {
  const dsaPct = metrics.dsaGoal > 0 ? Math.min(100, Math.round((metrics.dsaSolved / metrics.dsaGoal) * 100)) : 0;
  const appPct = metrics.appsWeekGoal > 0 ? Math.min(100, Math.round((metrics.appsThisWeek / metrics.appsWeekGoal) * 100)) : 0;
  const mockPct = metrics.mocksGoal > 0 ? Math.min(100, Math.round((metrics.mocksDone / metrics.mocksGoal) * 100)) : 0;

  // Ring SVG math for Roadmap progress
  const radius = 32;
  const ringCirc = 2 * Math.PI * radius;
  const ringOffset = ringCirc - (roadmapPct / 100) * ringCirc;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
      {/* 1. DSA Solved */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex flex-col justify-between hover:border-slate-700/80 transition-all shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Code2 className="w-4 h-4" />
            </div>
            <span className="text-xs font-semibold text-slate-300">DSA Solved</span>
          </div>
          <span className="text-xs font-bold text-emerald-400">{dsaPct}%</span>
        </div>

        <div className="my-3 flex items-baseline justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400 tabular-nums">
              {metrics.dsaSolved}
            </span>
            <span className="text-xs text-slate-400 font-medium">/ {metrics.dsaGoal} target</span>
          </div>
          <div className="flex items-center gap-1 bg-slate-950/60 p-0.5 rounded-lg border border-slate-800">
            <button
              onClick={() => onUpdateMetrics(m => ({ ...m, dsaSolved: Math.max(0, m.dsaSolved - 1) }))}
              className="w-6 h-6 flex items-center justify-center rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title="Decrease 1"
            >
              <Minus className="w-3 h-3" />
            </button>
            <button
              onClick={() => onUpdateMetrics(m => ({ ...m, dsaSolved: m.dsaSolved + 1 }))}
              className="w-6 h-6 flex items-center justify-center rounded-md bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-colors"
              title="Increase 1"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
        </div>

        <div className="w-full bg-slate-800/80 rounded-full h-1.5 overflow-hidden">
          <div
            className="bg-emerald-400 h-full transition-all duration-300 rounded-full"
            style={{ width: `${dsaPct}%` }}
          />
        </div>
      </div>

      {/* 2. Applications This Week */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex flex-col justify-between hover:border-slate-700/80 transition-all shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Send className="w-4 h-4" />
            </div>
            <span className="text-xs font-semibold text-slate-300">Weekly Applications</span>
          </div>
          <span className="text-xs font-bold text-amber-400">{appPct}%</span>
        </div>

        <div className="my-3 flex items-baseline justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-extrabold text-amber-400 tabular-nums">
              {metrics.appsThisWeek}
            </span>
            <span className="text-xs text-slate-400 font-medium">/ {metrics.appsWeekGoal} goal</span>
          </div>
          <div className="flex items-center gap-1 bg-slate-950/60 p-0.5 rounded-lg border border-slate-800">
            <button
              onClick={() => onUpdateMetrics(m => ({ ...m, appsThisWeek: Math.max(0, m.appsThisWeek - 1) }))}
              className="w-6 h-6 flex items-center justify-center rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title="Decrease 1"
            >
              <Minus className="w-3 h-3" />
            </button>
            <button
              onClick={() => onUpdateMetrics(m => ({
                ...m,
                appsThisWeek: m.appsThisWeek + 1,
                totalApps: m.totalApps + 1
              }))}
              className="w-6 h-6 flex items-center justify-center rounded-md bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-colors"
              title="Increase 1 (also adds to lifetime total)"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
        </div>

        <div className="w-full bg-slate-800/80 rounded-full h-1.5 overflow-hidden">
          <div
            className="bg-amber-400 h-full transition-all duration-300 rounded-full"
            style={{ width: `${appPct}%` }}
          />
        </div>
      </div>

      {/* 3. Mock Interviews & Total Lifetime */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex flex-col justify-between hover:border-slate-700/80 transition-all shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Award className="w-4 h-4" />
            </div>
            <span className="text-xs font-semibold text-slate-300">Mock Interviews</span>
          </div>
          <span className="text-[11px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
            Total Apps: <strong className="text-white">{metrics.totalApps}</strong>
          </span>
        </div>

        <div className="my-3 flex items-baseline justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-extrabold text-purple-400 tabular-nums">
              {metrics.mocksDone}
            </span>
            <span className="text-xs text-slate-400 font-medium">/ {metrics.mocksGoal} target</span>
          </div>
          <div className="flex items-center gap-1 bg-slate-950/60 p-0.5 rounded-lg border border-slate-800">
            <button
              onClick={() => onUpdateMetrics(m => ({ ...m, mocksDone: Math.max(0, m.mocksDone - 1) }))}
              className="w-6 h-6 flex items-center justify-center rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              <Minus className="w-3 h-3" />
            </button>
            <button
              onClick={() => onUpdateMetrics(m => ({ ...m, mocksDone: m.mocksDone + 1 }))}
              className="w-6 h-6 flex items-center justify-center rounded-md bg-purple-500 hover:bg-purple-400 text-slate-950 font-bold transition-colors"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
        </div>

        <div className="w-full bg-slate-800/80 rounded-full h-1.5 overflow-hidden">
          <div
            className="bg-purple-400 h-full transition-all duration-300 rounded-full"
            style={{ width: `${mockPct}%` }}
          />
        </div>
      </div>

      {/* 4. Overall Milestone Roadmap Progress */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex items-center justify-between hover:border-slate-700/80 transition-all shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-1.5 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20">
              <TrendingUp className="w-4 h-4" />
            </div>
            <span className="text-xs font-semibold text-slate-300">Milestone Roadmap</span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-sky-400 tabular-nums">
            {roadmapPct}%
          </div>
          <div className="text-xs text-slate-400 mt-0.5">
            {totalRoadmapDone} of {totalRoadmapTasks} tasks cleared
          </div>
        </div>

        <div className="relative w-18 h-18 flex items-center justify-center flex-shrink-0">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 76 76">
            <circle
              cx="38"
              cy="38"
              r={radius}
              className="text-slate-800"
              strokeWidth="6"
              stroke="currentColor"
              fill="transparent"
            />
            <circle
              cx="38"
              cy="38"
              r={radius}
              className="text-sky-400 transition-all duration-500 ease-out"
              strokeWidth="6"
              strokeDasharray={ringCirc}
              strokeDashoffset={ringOffset}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
            />
          </svg>
          <span className="absolute text-xs font-bold text-slate-200">
            {roadmapPct}%
          </span>
        </div>
      </div>
    </div>
  );
};
