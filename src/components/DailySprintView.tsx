import React, { useState } from "react";
import { Check, Flame, Plus, Trash2, Calendar as CalendarIcon, Sparkles, CheckCircle2, ChevronRight, Clock } from "lucide-react";
import { DailyHabit } from "../types";
import { triggerConfetti } from "../utils/helpers";

interface DailySprintViewProps {
  habits: DailyHabit[];
  dailyStatus: Record<string, boolean>;
  onToggleHabit: (habitId: string) => void;
  onAddHabit: (habit: DailyHabit) => void;
  onDeleteHabit: (habitId: string) => void;
  streak: number;
  streakHistory: string[];
  currentDateStr: string;
  onChangeDate: (dateStr: string) => void;
}

const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  Coding: { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/20" },
  Theory: { bg: "bg-sky-500/10", text: "text-sky-400", border: "border-sky-500/20" },
  Speed: { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/20" },
  Career: { bg: "bg-purple-500/10", text: "text-purple-400", border: "border-purple-500/20" },
  Network: { bg: "bg-indigo-500/10", text: "text-indigo-400", border: "border-indigo-500/20" },
  Custom: { bg: "bg-slate-700/30", text: "text-slate-300", border: "border-slate-600/30" },
};

export const DailySprintView: React.FC<DailySprintViewProps> = ({
  habits,
  dailyStatus,
  onToggleHabit,
  onAddHabit,
  onDeleteHabit,
  streak,
  streakHistory,
  currentDateStr,
  onChangeDate,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newLabel, setNewLabel] = useState("");
  const [newCategory, setNewCategory] = useState<DailyHabit["category"]>("Coding");

  const todayIso = new Date().toISOString().split("T")[0];
  const isToday = currentDateStr === todayIso;

  const doneCount = habits.filter((h) => !!dailyStatus[h.id]).length;
  const totalCount = habits.length;
  const pct = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0;
  const isStreakEligible = doneCount >= 3;

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLabel.trim()) return;
    const newHabit: DailyHabit = {
      id: `custom_h_${Date.now()}`,
      label: newLabel.trim(),
      category: newCategory,
      isCustom: true,
    };
    onAddHabit(newHabit);
    setNewLabel("");
    setShowAddModal(false);
  };

  // Generate last 7 days for the streak timeline
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const iso = d.toISOString().split("T")[0];
    const dayName = d.toLocaleDateString("en-US", { weekday: "short" });
    const isCompleted = streakHistory.includes(iso) || (iso === currentDateStr && isStreakEligible);
    return { iso, dayName, isCompleted, isSelected: iso === currentDateStr };
  });

  return (
    <div className="space-y-5">
      {/* Daily Header with Streak Progress & Mini Calendar */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-sky-400" />
                Daily Sprint Routine
              </h2>
              <span className="text-xs text-slate-500 font-medium">
                ({new Date(currentDateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", weekday: "short" })})
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Check off at least <strong className="text-amber-400 font-semibold">3 daily habits</strong> to build and maintain your active streak.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-800">
              <span className="text-xs font-semibold text-slate-300">
                {doneCount} of {totalCount} Done
              </span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                  pct === 100
                    ? "bg-emerald-500/20 text-emerald-400"
                    : isStreakEligible
                    ? "bg-amber-500/20 text-amber-400"
                    : "bg-slate-800 text-slate-400"
                }`}
              >
                {pct}%
              </span>
            </div>

            <button
              onClick={() => setShowAddModal(true)}
              className="px-3.5 py-1.5 bg-sky-600 border border-sky-500 rounded-lg text-xs font-bold text-white hover:bg-sky-500 transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Habit</span>
            </button>
          </div>
        </div>

        {/* 7-Day Streak Timeline */}
        <div className="pt-4 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1 mr-1">
              <Flame className="w-3.5 h-3.5 text-orange-400 fill-orange-400" />
              Recent:
            </span>
            {last7Days.map((d) => (
              <button
                key={d.iso}
                onClick={() => onChangeDate(d.iso)}
                className={`flex flex-col items-center justify-center w-10 sm:w-11 py-1.5 rounded-lg border text-[11px] transition-all cursor-pointer ${
                  d.isSelected
                    ? "border-sky-500 bg-sky-500/10 text-white"
                    : "border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700"
                }`}
                title={`Switch date to ${d.iso}`}
              >
                <span className="text-[10px] text-slate-400 font-medium">{d.dayName}</span>
                <span
                  className={`w-2.5 h-2.5 rounded-full mt-1 ${
                    d.isCompleted ? "bg-orange-400 shadow-[0_0_8px_rgba(251,146,60,0.8)]" : "bg-slate-700"
                  }`}
                />
              </button>
            ))}
          </div>

          {!isToday && (
            <button
              onClick={() => onChangeDate(todayIso)}
              className="text-xs text-sky-400 hover:text-sky-300 font-semibold underline underline-offset-2 ml-2 whitespace-nowrap"
            >
              Back to Today
            </button>
          )}
        </div>
      </div>

      {/* Habits List */}
      <div className="space-y-2.5">
        {habits.map((habit) => {
          const isDone = !!dailyStatus[habit.id];
          const catStyle = CATEGORY_COLORS[habit.category] || CATEGORY_COLORS.Custom;

          return (
            <div
              key={habit.id}
              onClick={() => {
                onToggleHabit(habit.id);
                if (!isDone && doneCount + 1 === totalCount) {
                  triggerConfetti();
                }
              }}
              className={`group flex items-center justify-between p-3.5 sm:p-4 rounded-xl border transition-all cursor-pointer select-none ${
                isDone
                  ? "bg-emerald-500/5 border-emerald-500/10 opacity-85"
                  : "bg-slate-950/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60"
              }`}
            >
              <div className="flex items-center gap-3.5 flex-1 min-w-0 mr-2">
                <div
                  className={`w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 transition-colors ${
                    isDone
                      ? "bg-emerald-500 border-emerald-500 text-slate-950"
                      : "border-slate-700 bg-slate-950/80 group-hover:border-slate-500"
                  }`}
                >
                  {isDone && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
                <span
                  className={`text-sm font-medium transition-colors break-words ${
                    isDone ? "line-through text-slate-500" : "text-slate-300"
                  }`}
                >
                  {habit.label}
                </span>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${catStyle.bg} ${catStyle.text} ${catStyle.border}`}
                >
                  {habit.category}
                </span>
                {habit.isCustom && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm("Delete this custom habit?")) {
                        onDeleteHabit(habit.id);
                      }
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-rose-400 transition-opacity"
                    title="Delete habit"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Streak celebration note */}
      {isStreakEligible && (
        <div className="flex items-center gap-3 p-4 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-300 text-xs animate-in fade-in duration-200">
          <Sparkles className="w-4 h-4 text-orange-400 flex-shrink-0" />
          <span>
            <strong>Streak requirement met!</strong> You have cleared 3+ daily habits today. Keep this daily momentum going!
          </span>
        </div>
      )}

      {/* Add Custom Habit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form
            onSubmit={handleAddSubmit}
            className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-5 sm:p-6 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">Add Custom Daily Habit</h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Habit Description
              </label>
              <input
                type="text"
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
                placeholder="e.g., 20 min System Design reading"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-sky-500"
                autoFocus
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-sky-500"
              >
                <option value="Coding">Coding</option>
                <option value="Theory">Theory</option>
                <option value="Speed">Speed</option>
                <option value="Career">Career</option>
                <option value="Network">Network</option>
                <option value="Custom">Custom</option>
              </select>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!newLabel.trim()}
                className="px-4 py-2 bg-sky-600 border border-sky-500 rounded-lg text-xs font-bold text-white hover:bg-sky-500 disabled:opacity-40"
              >
                Save Habit
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
