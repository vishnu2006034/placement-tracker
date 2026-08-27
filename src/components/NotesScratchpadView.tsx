import React, { useState } from "react";
import { BookOpen, Plus, Trash2, Save, Sparkles, CheckCircle2, Award, Edit3 } from "lucide-react";
import { StarStory } from "../types";
import { triggerConfetti } from "../utils/helpers";

interface NotesScratchpadViewProps {
  starStories: StarStory[];
  onAddStarStory: (story: StarStory) => void;
  onDeleteStarStory: (id: string) => void;
  quickNotes: string;
  onSaveQuickNotes: (notes: string) => void;
}

export const NotesScratchpadView: React.FC<NotesScratchpadViewProps> = ({
  starStories,
  onAddStarStory,
  onDeleteStarStory,
  quickNotes,
  onSaveQuickNotes,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<"star" | "notes">("star");
  const [showAddModal, setShowAddModal] = useState(false);
  const [notesContent, setNotesContent] = useState(quickNotes);
  const [savedNotesSuccess, setSavedNotesSuccess] = useState(false);

  // STAR Form state
  const [starForm, setStarForm] = useState<Partial<StarStory>>({
    title: "",
    situation: "",
    task: "",
    action: "",
    result: "",
    skills: "",
  });

  const handleAddStarSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!starForm.title?.trim()) return;

    const newStory: StarStory = {
      id: `star_${Date.now()}`,
      title: starForm.title.trim(),
      situation: starForm.situation?.trim() || "",
      task: starForm.task?.trim() || "",
      action: starForm.action?.trim() || "",
      result: starForm.result?.trim() || "",
      skills: starForm.skills?.trim() || "",
    };

    onAddStarStory(newStory);
    triggerConfetti();
    setStarForm({
      title: "",
      situation: "",
      task: "",
      action: "",
      result: "",
      skills: "",
    });
    setShowAddModal(false);
  };

  const handleSaveNotes = () => {
    onSaveQuickNotes(notesContent);
    setSavedNotesSuccess(true);
    triggerConfetti();
    setTimeout(() => setSavedNotesSuccess(false), 2500);
  };

  return (
    <div className="space-y-5">
      {/* Sub-tab switcher */}
      <div className="flex items-center justify-between bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-sky-400" />
            Interview Vault & STAR Stories
          </h2>
          <p className="text-xs text-slate-400">
            Formulate high-impact behavioral responses, STAR stories, and quick revision notes.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveSubTab("star")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeSubTab === "star" ? "bg-slate-800 text-white" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            STAR Stories ({starStories.length})
          </button>
          <button
            onClick={() => setActiveSubTab("notes")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeSubTab === "notes" ? "bg-slate-800 text-white" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Formulas & Notes
          </button>
        </div>
      </div>

      {/* 1. STAR Stories Tab */}
      {activeSubTab === "star" && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-sky-500 hover:bg-sky-400 text-slate-950 transition-colors cursor-pointer shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add STAR Story</span>
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {starStories.map((story) => (
              <div
                key={story.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm space-y-3"
              >
                <div className="flex items-start justify-between gap-3 border-b border-slate-800/80 pb-3">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Award className="w-4 h-4 text-purple-400" />
                      {story.title}
                    </h3>
                    {story.skills && (
                      <div className="flex flex-wrap gap-1.5 mt-1.5">
                        {story.skills.split(",").map((sk, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] font-medium px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20"
                          >
                            {sk.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      if (confirm(`Delete "${story.title}"?`)) {
                        onDeleteStarStory(story.id);
                      }
                    }}
                    className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                    title="Delete story"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs leading-relaxed">
                  <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800/80">
                    <span className="font-bold text-sky-400 block mb-1">S - Situation:</span>
                    <p className="text-slate-300">{story.situation || "—"}</p>
                  </div>

                  <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800/80">
                    <span className="font-bold text-amber-400 block mb-1">T - Task:</span>
                    <p className="text-slate-300">{story.task || "—"}</p>
                  </div>

                  <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800/80 sm:col-span-2">
                    <span className="font-bold text-emerald-400 block mb-1">A - Action (Technical Steps):</span>
                    <p className="text-slate-300">{story.action || "—"}</p>
                  </div>

                  <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800/80 sm:col-span-2">
                    <span className="font-bold text-purple-400 block mb-1">R - Result & Metrics:</span>
                    <p className="text-slate-300">{story.result || "—"}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. Quick Notes Tab */}
      {activeSubTab === "notes" && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Edit3 className="w-4 h-4 text-sky-400" /> Formulas & CS Revision Scratchpad
            </h3>

            <button
              onClick={handleSaveNotes}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-sky-500 hover:bg-sky-400 text-slate-950 transition-colors cursor-pointer shadow-sm"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Notes</span>
            </button>
          </div>

          <textarea
            rows={15}
            value={notesContent}
            onChange={(e) => setNotesContent(e.target.value)}
            placeholder="Type formulas, elevator pitch, tricky SQL queries, or interview bookmarks..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs sm:text-sm text-slate-200 font-mono leading-relaxed focus:outline-none focus:border-sky-500"
          />

          {savedNotesSuccess && (
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 bg-emerald-500/10 p-2.5 rounded-xl border border-emerald-500/20 animate-in fade-in duration-150">
              <CheckCircle2 className="w-4 h-4" />
              Notes saved successfully!
            </div>
          )}
        </div>
      )}

      {/* Add STAR Story Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <form
            onSubmit={handleAddStarSubmit}
            className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-5 sm:p-6 shadow-2xl space-y-4 my-8"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Award className="w-4 h-4 text-purple-400" /> Prepare STAR Story
              </h3>
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
                Story Title / Scenario Theme *
              </label>
              <input
                type="text"
                required
                value={starForm.title}
                onChange={(e) => setStarForm({ ...starForm, title: e.target.value })}
                placeholder="e.g. Debugging concurrency race condition in team project"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Key Skills Demonstrated (comma separated)
              </label>
              <input
                type="text"
                value={starForm.skills}
                onChange={(e) => setStarForm({ ...starForm, skills: e.target.value })}
                placeholder="e.g. Debugging, Concurrency, Redis, Leadership"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-sky-400 mb-1">
                S - Situation (Context & problem)
              </label>
              <textarea
                rows={2}
                value={starForm.situation}
                onChange={(e) => setStarForm({ ...starForm, situation: e.target.value })}
                placeholder="What was the project, team setting, or initial bottleneck?"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-amber-400 mb-1">
                T - Task (Your specific objective)
              </label>
              <textarea
                rows={2}
                value={starForm.task}
                onChange={(e) => setStarForm({ ...starForm, task: e.target.value })}
                placeholder="What was your exact goal or responsibility?"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-emerald-400 mb-1">
                A - Action (Technical implementation & decisions)
              </label>
              <textarea
                rows={3}
                value={starForm.action}
                onChange={(e) => setStarForm({ ...starForm, action: e.target.value })}
                placeholder="Step-by-step actions you executed (profiling, refactoring, algorithms, testing)..."
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-purple-400 mb-1">
                R - Result & Measurable Impact (Metrics)
              </label>
              <textarea
                rows={2}
                value={starForm.result}
                onChange={(e) => setStarForm({ ...starForm, result: e.target.value })}
                placeholder="What was the measurable outcome (e.g. 80% latency reduction, passed all test cases)?"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-sky-500"
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
                disabled={!starForm.title?.trim()}
                className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 disabled:opacity-40"
              >
                Save STAR Story
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
