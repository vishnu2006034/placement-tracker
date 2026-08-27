import React, { useState } from "react";
import { Check, CheckSquare, Plus, Trash2, RotateCcw, Target, Sparkles } from "lucide-react";
import { WeeklyTarget } from "../types";
import { triggerConfetti } from "../utils/helpers";

interface WeeklySprintViewProps {
  targets: WeeklyTarget[];
  weeklyStatus: Record<string, boolean>;
  onToggleTarget: (targetId: string) => void;
  onAddTarget: (target: WeeklyTarget) => void;
  onDeleteTarget: (targetId: string) => void;
  onResetWeeklyStatus: () => void;
  currentWeekKey: string;
}

export const WeeklySprintView: React.FC<WeeklySprintViewProps> = ({
  targets,
  weeklyStatus,
  onToggleTarget,
  onAddTarget,
  onDeleteTarget,
  onResetWeeklyStatus,
  currentWeekKey,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newLabel, setNewLabel] = useState("");

  const doneCount = targets.filter((t) => !!weeklyStatus[t.id]).length;
  const totalCount = targets.length;
  const pct = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0;

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLabel.trim()) return;
    const newTarget: WeeklyTarget = {
      id: `custom_w_${Date.now()}`,
      label: newLabel.trim(),
      isCustom: true,
    };
    onAddTarget(newTarget);
    setNewLabel("");
    setShowAddModal(false);
  };

  return (
    <div className="space-y-5">
      {/* Weekly Header */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-sky-400" />
                Weekly Sprint Deliverables
              </h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20 uppercase tracking-wider">
                {currentWeekKey}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              High-impact weekly milestones. Review and set new goals every Sunday evening.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (confirm("Reset status for the current week's targets?")) {
                  onResetWeeklyStatus();
                }
              }}
              className="px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs font-semibold hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-sm"
              title="Reset current week checkboxes"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Week</span>
            </button>

            <button
              onClick={() => setShowAddModal(true)}
              className="px-3.5 py-2 bg-sky-600 border border-sky-500 rounded-lg text-xs font-bold text-white hover:bg-sky-500 transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Goal</span>
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="pt-4 flex flex-col gap-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400">
              Completed: <strong className="text-slate-200">{doneCount} of {totalCount} goals</strong>
            </span>
            <span className="font-bold text-sky-400">{pct}%</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div
              className="h-full bg-sky-500 rounded-full transition-all duration-300"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Target Items */}
      <div className="space-y-2.5">
        {targets.map((target) => {
          const isDone = !!weeklyStatus[target.id];

          return (
            <div
              key={target.id}
              onClick={() => {
                onToggleTarget(target.id);
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
                      ? "bg-sky-500 border-sky-500 text-slate-950"
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
                  {target.label}
                </span>
              </div>

              {target.isCustom && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (confirm("Delete this custom weekly target?")) {
                      onDeleteTarget(target.id);
                    }
                  }}
                  className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-rose-400 transition-opacity"
                  title="Delete target"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          );
        })}
      </div>

      {pct === 100 && totalCount > 0 && (
        <div className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs animate-in fade-in duration-200">
          <Sparkles className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>
            <strong>Sprint Cleared!</strong> Outstanding work finishing all weekly goals. Take Sunday to rest and plan next week!
          </span>
        </div>
      )}

      {/* Add Custom Weekly Goal Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form
            onSubmit={handleAddSubmit}
            className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-5 sm:p-6 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">Add Weekly Sprint Goal</h3>
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
                Goal Description
              </label>
              <input
                type="text"
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
                placeholder="e.g., Complete 3 dynamic programming patterns"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-sky-500"
                autoFocus
              />
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
                Save Goal
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
