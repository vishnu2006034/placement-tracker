import React, { useState } from "react";
import { Flame, RotateCcw, Download, Upload, Target, Sparkles, CheckCircle2, ShieldAlert } from "lucide-react";
import { TrackerState } from "../types";
import { exportStateAsJson, triggerConfetti } from "../utils/helpers";

interface HeaderProps {
  state: TrackerState;
  onReset: () => void;
  onImportState: (imported: TrackerState) => void;
}

export const Header: React.FC<HeaderProps> = ({ state, onReset, onImportState }) => {
  const [showImportModal, setShowImportModal] = useState(false);
  const [importJsonText, setImportJsonText] = useState("");
  const [importError, setImportError] = useState("");

  const handleImport = () => {
    try {
      const parsed = JSON.parse(importJsonText);
      if (!parsed || typeof parsed !== "object") throw new Error("Invalid JSON object");
      onImportState(parsed);
      setShowImportModal(false);
      setImportJsonText("");
      setImportError("");
      triggerConfetti();
    } catch (e: any) {
      setImportError(e.message || "Failed to parse JSON file or text.");
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const parsed = JSON.parse(text);
        onImportState(parsed);
        setShowImportModal(false);
        setImportError("");
        triggerConfetti();
      } catch (err) {
        setImportError("Invalid JSON backup file.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <header className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md sticky top-0 z-30 px-4 sm:px-6 py-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-sky-500/10 text-sky-400 border border-sky-500/20">
              <Target className="w-3 h-3" /> Campus & Off-Campus Sprint
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/25 animate-pulse">
              <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              {state.streak} Day Streak
            </span>
            {state.metrics.targetRole && (
              <span className="text-xs text-slate-400 hidden sm:inline-block px-2 py-0.5 rounded bg-slate-800/80 border border-slate-700/50">
                Target: <strong className="text-slate-200">{state.metrics.targetRole}</strong>
              </span>
            )}
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            Placement Preparation OS
          </h1>
        </div>

        <div className="flex items-center flex-wrap gap-2">
          {/* Backup / Export */}
          <button
            onClick={() => exportStateAsJson(state)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors shadow-sm cursor-pointer"
            title="Download JSON Backup"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Backup</span>
          </button>

          {/* Import */}
          <button
            onClick={() => setShowImportModal(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors shadow-sm cursor-pointer"
            title="Import Progress JSON"
          >
            <Upload className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Restore</span>
          </button>

          {/* Reset */}
          <button
            onClick={onReset}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 transition-colors shadow-sm cursor-pointer"
            title="Reset All Progress"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Import / Restore Modal */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-xl max-w-lg w-full p-5 sm:p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Upload className="w-5 h-5 text-sky-400" /> Restore / Import Progress
              </h3>
              <button
                onClick={() => {
                  setShowImportModal(false);
                  setImportError("");
                }}
                className="text-slate-400 hover:text-white text-sm px-2 py-1 rounded bg-slate-800"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-slate-400">
              Upload a previously exported JSON backup file or paste your JSON configuration below to restore your progress across devices.
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Option 1: Upload .json file
                </label>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleFileUpload}
                  className="block w-full text-xs text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-sky-500/20 file:text-sky-300 hover:file:bg-sky-500/30 cursor-pointer"
                />
              </div>

              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-slate-800"></div>
                <span className="flex-shrink mx-2 text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Or Paste JSON</span>
                <div className="flex-grow border-t border-slate-800"></div>
              </div>

              <div>
                <textarea
                  rows={5}
                  value={importJsonText}
                  onChange={(e) => setImportJsonText(e.target.value)}
                  placeholder="Paste backup JSON data here..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 font-mono focus:outline-none focus:border-sky-500"
                />
              </div>

              {importError && (
                <div className="flex items-center gap-2 text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 p-2 rounded">
                  <ShieldAlert className="w-4 h-4 flex-shrink-0" />
                  {importError}
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => {
                  setShowImportModal(false);
                  setImportError("");
                }}
                className="px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-slate-200"
              >
                Cancel
              </button>
              <button
                onClick={handleImport}
                disabled={!importJsonText.trim()}
                className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-sky-500 hover:bg-sky-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 transition-colors"
              >
                Import & Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
