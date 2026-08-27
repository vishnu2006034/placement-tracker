import React, { useState } from "react";
import { Check, ChevronDown, Plus, Trash2, Layers, CheckCircle2, ChevronsUpDown, Sparkles } from "lucide-react";
import { RoadmapPhase, RoadmapTask } from "../types";
import { triggerConfetti } from "../utils/helpers";

interface RoadmapViewProps {
  phases: RoadmapPhase[];
  checkedRoadmap: Record<string, boolean>;
  onToggleTask: (phaseId: string, taskId: string) => void;
  onAddCustomTask: (phaseId: string, task: RoadmapTask) => void;
  onDeleteCustomTask: (phaseId: string, taskId: string) => void;
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({
  phases,
  checkedRoadmap,
  onToggleTask,
  onAddCustomTask,
  onDeleteCustomTask,
}) => {
  const [openPhases, setOpenPhases] = useState<Record<string, boolean>>({
    p1: true,
  });
  const [modalPhaseId, setModalPhaseId] = useState<string | null>(null);
  const [newTaskText, setNewTaskText] = useState("");

  const togglePhaseOpen = (phaseId: string) => {
    setOpenPhases((prev) => ({ ...prev, [phaseId]: !prev[phaseId] }));
  };

  const expandAll = () => {
    const next: Record<string, boolean> = {};
    phases.forEach((p) => (next[p.id] = true));
    setOpenPhases(next);
  };

  const collapseAll = () => {
    setOpenPhases({});
  };

  const calculatePhaseProgress = (phase: RoadmapPhase) => {
    if (!phase.tasks.length) return 0;
    const done = phase.tasks.filter((t) => !!checkedRoadmap[`${phase.id}-${t.id}`]).length;
    return Math.round((done / phase.tasks.length) * 100);
  };

  const handleAddTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalPhaseId || !newTaskText.trim()) return;
    const task: RoadmapTask = {
      id: `custom_t_${Date.now()}`,
      text: newTaskText.trim(),
      isCustom: true,
    };
    onAddCustomTask(modalPhaseId, task);
    setNewTaskText("");
    setModalPhaseId(null);
  };

  return (
    <div className="space-y-4">
      {/* Roadmap Controls Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/50 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-sky-400" />
            Milestone Placement Roadmap
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Structured 7-phase curriculum from reality check to final HR negotiation.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={expandAll}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-white bg-slate-900 border border-slate-800 hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Expand All
          </button>
          <button
            onClick={collapseAll}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-white bg-slate-900 border border-slate-800 hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Collapse All
          </button>
        </div>
      </div>

      {/* Phases Accordion */}
      <div className="space-y-3">
        {phases.map((phase, idx) => {
          const pct = calculatePhaseProgress(phase);
          const isOpen = !!openPhases[phase.id];
          const isComplete = pct === 100 && phase.tasks.length > 0;
          const doneTasksCount = phase.tasks.filter((t) => checkedRoadmap[`${phase.id}-${t.id}`]).length;

          return (
            <div
              key={phase.id}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isComplete
                  ? "bg-slate-900/40 border-emerald-500/30"
                  : "bg-slate-900/50 border-slate-800 hover:border-slate-700"
              }`}
            >
              {/* Phase Header Button */}
              <button
                onClick={() => togglePhaseOpen(phase.id)}
                className="w-full flex items-center justify-between p-4 sm:p-5 text-left bg-transparent transition-colors cursor-pointer hover:bg-slate-800/40"
              >
                <div className="flex items-center gap-3 min-w-0 mr-3">
                  <span className="flex-shrink-0 text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800 uppercase tracking-wider">
                    P{idx}
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm sm:text-base font-bold text-white truncate">
                        {phase.title}
                      </span>
                      {isComplete && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 uppercase tracking-wider">
                          Cleared
                        </span>
                      )}
                    </div>
                    {phase.subtitle && (
                      <p className="text-xs text-slate-500 truncate mt-0.5">
                        {phase.subtitle}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  <span
                    className={`text-xs font-bold tabular-nums ${
                      isComplete ? "text-emerald-400" : "text-amber-400"
                    }`}
                  >
                    {doneTasksCount}/{phase.tasks.length} ({pct}%)
                  </span>
                  <div className="p-1 rounded-md bg-slate-950 text-slate-400 border border-slate-800">
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isOpen ? "transform rotate-180 text-sky-400" : ""
                      }`}
                    />
                  </div>
                </div>
              </button>

              {/* Thin Progress bar */}
              <div className="w-full bg-slate-800 h-1 overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    isComplete ? "bg-emerald-400" : "bg-amber-400"
                  }`}
                  style={{ width: `${pct}%` }}
                />
              </div>

              {/* Task Items inside Phase */}
              {isOpen && (
                <div className="p-4 sm:p-5 space-y-2 border-t border-slate-800/80 bg-slate-950/20">
                  {phase.tasks.map((task) => {
                    const key = `${phase.id}-${task.id}`;
                    const isDone = !!checkedRoadmap[key];

                    return (
                      <div
                        key={task.id}
                        onClick={() => {
                          onToggleTask(phase.id, task.id);
                          if (!isDone && doneTasksCount + 1 === phase.tasks.length) {
                            triggerConfetti();
                          }
                        }}
                        className={`group flex items-start justify-between p-3.5 rounded-xl border transition-all cursor-pointer select-none ${
                          isDone
                            ? "bg-emerald-500/5 border-emerald-500/10 opacity-85"
                            : "bg-slate-950/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60"
                        }`}
                      >
                        <div className="flex items-start gap-3 flex-1 min-w-0 mr-2">
                          <div
                            className={`mt-0.5 w-4.5 h-4.5 rounded border flex items-center justify-center flex-shrink-0 transition-colors ${
                              isDone
                                ? "bg-emerald-500 border-emerald-500 text-slate-950"
                                : "border-slate-700 bg-slate-950/80 group-hover:border-slate-500"
                            }`}
                          >
                            {isDone && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <span
                            className={`text-xs sm:text-sm leading-relaxed transition-colors ${
                              isDone ? "line-through text-slate-500" : "text-slate-300"
                            }`}
                          >
                            {task.text}
                          </span>
                        </div>

                        {task.isCustom && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (confirm("Delete this custom task?")) {
                                onDeleteCustomTask(phase.id, task.id);
                              }
                            }}
                            className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-rose-400 transition-opacity"
                            title="Delete custom task"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    );
                  })}

                  {/* Add task button inside phase */}
                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => setModalPhaseId(phase.id)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg text-sky-400 hover:text-sky-300 bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/20 transition-colors cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add item to {phase.title.split(":")[0]}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add Custom Task Modal */}
      {modalPhaseId && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form
            onSubmit={handleAddTaskSubmit}
            className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-5 sm:p-6 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">Add Task to Phase</h3>
              <button
                type="button"
                onClick={() => setModalPhaseId(null)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Action / Checkpoint Description
              </label>
              <textarea
                rows={3}
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
                placeholder="e.g., Read dynamic programming with bitmasking articles"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-sky-500"
                autoFocus
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setModalPhaseId(null)}
                className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!newTaskText.trim()}
                className="px-4 py-2 bg-sky-600 border border-sky-500 rounded-lg text-xs font-bold text-white hover:bg-sky-500 disabled:opacity-40"
              >
                Add Task
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
