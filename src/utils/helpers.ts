import confetti from "canvas-confetti";
import { TrackerState } from "../types";
import { INITIAL_STATE } from "../data/initialData";

export const STORAGE_KEY = "placement_os_pro_v2";

export function loadTrackerState(): TrackerState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_STATE;
    const parsed = JSON.parse(raw);
    return {
      ...INITIAL_STATE,
      ...parsed,
      metrics: {
        ...INITIAL_STATE.metrics,
        ...(parsed.metrics || {})
      },
      checkedRoadmap: {
        ...INITIAL_STATE.checkedRoadmap,
        ...(parsed.checkedRoadmap || {})
      },
      customRoadmapTasks: parsed.customRoadmapTasks || {},
      dailyStatus: parsed.dailyStatus || {},
      customDailyHabits: parsed.customDailyHabits || [],
      weeklyStatus: parsed.weeklyStatus || {},
      customWeeklyTargets: parsed.customWeeklyTargets || [],
      streak: typeof parsed.streak === "number" ? parsed.streak : INITIAL_STATE.streak,
      lastCompletedDate: parsed.lastCompletedDate || "",
      streakHistory: Array.isArray(parsed.streakHistory) ? parsed.streakHistory : INITIAL_STATE.streakHistory,
      applications: Array.isArray(parsed.applications) ? parsed.applications : INITIAL_STATE.applications,
      starStories: Array.isArray(parsed.starStories) ? parsed.starStories : INITIAL_STATE.starStories,
      quickNotes: typeof parsed.quickNotes === "string" ? parsed.quickNotes : INITIAL_STATE.quickNotes,
    };
  } catch (err) {
    console.warn("Error loading state from localStorage, using initial state", err);
    return INITIAL_STATE;
  }
}

export function saveTrackerState(state: TrackerState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error("Error saving state to localStorage", err);
  }
}

export function getTodayString(): string {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function getCurrentWeekKey(): string {
  const d = new Date();
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNum = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((date.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  return `${date.getUTCFullYear()}-W${String(weekNo).padStart(2, "0")}`;
}

export function triggerConfetti() {
  confetti({
    particleCount: 50,
    spread: 60,
    origin: { y: 0.8 },
    colors: ["#34D399", "#38BDF8", "#F59E0B", "#A78BFA"],
  });
}

export function exportStateAsJson(state: TrackerState) {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state, null, 2));
  const downloadAnchor = document.createElement("a");
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `placement-os-backup-${getTodayString()}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}
