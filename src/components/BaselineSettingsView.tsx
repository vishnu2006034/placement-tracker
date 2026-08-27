import React, { useState } from "react";
import { Settings2, Save, Download, Upload, CheckCircle2, RotateCcw, ShieldCheck, Sparkles } from "lucide-react";
import { UserMetrics, TrackerState } from "../types";
import { exportStateAsJson, triggerConfetti } from "../utils/helpers";

interface BaselineSettingsViewProps {
  metrics: UserMetrics;
  streak: number;
  onUpdateBaselines: (updatedMetrics: UserMetrics, updatedStreak: number) => void;
  fullState: TrackerState;
  onResetAll: () => void;
}

export const BaselineSettingsView: React.FC<BaselineSettingsViewProps> = ({
  metrics,
  streak,
  onUpdateBaselines,
  fullState,
  onResetAll,
}) => {
  const [formMetrics, setFormMetrics] = useState<UserMetrics>({ ...metrics });
  const [formStreak, setFormStreak] = useState<number>(streak);
  const [savedSuccess, setSavedSuccess] = useState(false);

  React.useEffect(() => {
    setFormMetrics({ ...metrics });
    setFormStreak(streak);
  }, [metrics, streak]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateBaselines(formMetrics, formStreak);
    setSavedSuccess(true);
    triggerConfetti();
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-1">
          <Settings2 className="w-5 h-5 text-sky-400" />
          <h2 className="text-lg font-bold text-white">Starting Baselines & Progress Setup</h2>
        </div>
        <p className="text-xs text-slate-400">
          Already solved 50 problems or sent 20 applications before using this tracker? Enter your starting numbers below to carry over your existing progress seamlessly.
        </p>
      </div>

      {/* Baseline Form */}
      <form onSubmit={handleSave} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {/* Target Role */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300">Target Role / Profile</label>
            <input
              type="text"
              value={formMetrics.targetRole || ""}
              onChange={(e) => setFormMetrics({ ...formMetrics, targetRole: e.target.value })}
              placeholder="e.g. SDE-1 / Backend Engineer"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-sky-500"
            />
          </div>

          {/* CGPA */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300">Current CGPA / Percentage</label>
            <input
              type="text"
              value={formMetrics.cgpa || ""}
              onChange={(e) => setFormMetrics({ ...formMetrics, cgpa: e.target.value })}
              placeholder="e.g. 8.75 / 85%"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-sky-500"
            />
          </div>

          {/* Current Streak */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300">Current Day Streak</label>
            <input
              type="number"
              min={0}
              value={formStreak}
              onChange={(e) => setFormStreak(Number(e.target.value) || 0)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-amber-400 font-bold focus:outline-none focus:border-sky-500"
            />
          </div>

          {/* DSA Solved */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300">DSA Problems Solved So Far</label>
            <input
              type="number"
              min={0}
              value={formMetrics.dsaSolved}
              onChange={(e) => setFormMetrics({ ...formMetrics, dsaSolved: Number(e.target.value) || 0 })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-emerald-400 font-bold focus:outline-none focus:border-sky-500"
            />
          </div>

          {/* DSA Target Goal */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300">DSA Target Goal (e.g. 180)</label>
            <input
              type="number"
              min={1}
              value={formMetrics.dsaGoal}
              onChange={(e) => setFormMetrics({ ...formMetrics, dsaGoal: Number(e.target.value) || 1 })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-sky-500"
            />
          </div>

          {/* Lifetime Applications */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300">Lifetime Total Applications Sent</label>
            <input
              type="number"
              min={0}
              value={formMetrics.totalApps}
              onChange={(e) => setFormMetrics({ ...formMetrics, totalApps: Number(e.target.value) || 0 })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-amber-400 font-bold focus:outline-none focus:border-sky-500"
            />
          </div>

          {/* Weekly Application Goal */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300">Weekly Application Target (e.g. 15)</label>
            <input
              type="number"
              min={1}
              value={formMetrics.appsWeekGoal}
              onChange={(e) => setFormMetrics({ ...formMetrics, appsWeekGoal: Number(e.target.value) || 1 })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-sky-500"
            />
          </div>

          {/* Mock Interviews Done */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300">Mock Interviews Completed</label>
            <input
              type="number"
              min={0}
              value={formMetrics.mocksDone}
              onChange={(e) => setFormMetrics({ ...formMetrics, mocksDone: Number(e.target.value) || 0 })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-purple-400 font-bold focus:outline-none focus:border-sky-500"
            />
          </div>

          {/* Mock Target */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300">Mock Interviews Target (e.g. 10)</label>
            <input
              type="number"
              min={1}
              value={formMetrics.mocksGoal}
              onChange={(e) => setFormMetrics({ ...formMetrics, mocksGoal: Number(e.target.value) || 1 })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-sky-500"
            />
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-800">
          <div className="flex items-center gap-2">
            {savedSuccess && (
              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/20 animate-in fade-in duration-200">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Baselines saved to local storage!
              </span>
            )}
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-sky-600 border border-sky-500 hover:bg-sky-500 text-white transition-colors shadow-lg cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save Baselines</span>
          </button>
        </div>
      </form>

      {/* Backup & Reset Utilities */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" /> Data Safety & Multi-Device Sync
        </h3>
        <p className="text-xs text-slate-400">
          Your progress is stored locally in your browser cache. You can download a backup JSON file anytime to transfer your progress between your laptop and mobile phone.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => exportStateAsJson(fullState)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white border border-slate-800 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" /> Download JSON Backup
          </button>

          <button
            type="button"
            onClick={onResetAll}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 transition-colors cursor-pointer ml-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset All Tracker Data
          </button>
        </div>
      </div>
    </div>
  );
};
