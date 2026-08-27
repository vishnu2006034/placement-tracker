import React from "react";
import { Code2, Plus, Minus, CheckCircle, Flame, ExternalLink, Lightbulb } from "lucide-react";
import { DsaTopic } from "../types";

interface DsaTrackerViewProps {
  topics: DsaTopic[];
  onUpdateTopicSolved: (topicId: string, delta: number) => void;
  totalSolved: number;
  dsaGoal: number;
}

export const DsaTrackerView: React.FC<DsaTrackerViewProps> = ({
  topics,
  onUpdateTopicSolved,
  totalSolved,
  dsaGoal,
}) => {
  const overallPct = dsaGoal > 0 ? Math.min(100, Math.round((totalSolved / dsaGoal) * 100)) : 0;

  return (
    <div className="space-y-5">
      {/* Top Banner */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Code2 className="w-4 h-4 text-emerald-400" />
              DSA Sheet & Topic Mastery
            </h2>
            <p className="text-xs text-slate-400">
              High-yield patterns (Striver A2Z / Blind 75 / Love Babbar) organized by topic categories.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-950/80 px-3.5 py-1.5 rounded-xl border border-slate-800">
            <span className="text-xs font-semibold text-slate-300">
              Total Solved: <strong className="text-emerald-400 font-black">{totalSolved}</strong> / {dsaGoal}
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-wider">
              {overallPct}%
            </span>
          </div>
        </div>

        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 rounded-full transition-all duration-300"
            style={{ width: `${overallPct}%` }}
          />
        </div>
      </div>

      {/* Topics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {topics.map((topic) => {
          const topicPct = topic.totalQuestions > 0 ? Math.min(100, Math.round((topic.solved / topic.totalQuestions) * 100)) : 0;

          return (
            <div
              key={topic.id}
              className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between hover:border-slate-700 transition-all shadow-sm space-y-3"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                    {topic.name}
                  </h3>
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                    {topic.solved} / {topic.totalQuestions} ({topicPct}%)
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-3">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                    style={{ width: `${topicPct}%` }}
                  />
                </div>

                {/* Key concept tags */}
                <div className="flex flex-wrap gap-1.5 mt-3.5">
                  {topic.keyConcepts.map((concept, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-950/80 text-slate-300 border border-slate-800"
                    >
                      {concept}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom +/- controls */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
                <span className="text-xs text-slate-400 font-medium">Questions solved</span>
                <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800">
                  <button
                    onClick={() => onUpdateTopicSolved(topic.id, -1)}
                    className="w-5.5 h-5.5 flex items-center justify-center rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                    title="Decrement solved"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-xs font-bold text-slate-200 px-2 tabular-nums">
                    {topic.solved}
                  </span>
                  <button
                    onClick={() => onUpdateTopicSolved(topic.id, 1)}
                    className="w-5.5 h-5.5 flex items-center justify-center rounded bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-colors cursor-pointer"
                    title="Increment solved"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Revision Pro Tip */}
      <div className="flex items-start gap-3 p-4 sm:p-5 rounded-2xl bg-slate-900/50 border border-slate-800 text-xs text-slate-300">
        <Lightbulb className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
        <div>
          <strong className="text-white block mb-0.5">Campus Assessment Strategy:</strong>
          Aim for 120–180 problems across high-frequency patterns (Two Pointers, Sliding Window, Monotonic Stack, BFS/DFS, Tree LCA, and 0/1 Knapsack). Quality and pattern recognition beats brute-forcing random problems.
        </div>
      </div>
    </div>
  );
};
