import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  TabType,
  TrackerState,
  DailyHabit,
  WeeklyTarget,
  RoadmapTask,
  CompanyApplication,
  StarStory,
  UserMetrics,
} from "./types";
import {
  INITIAL_PHASES,
  INITIAL_DAILY_HABITS,
  INITIAL_WEEKLY_TARGETS,
  INITIAL_DSA_TOPICS,
  INITIAL_STATE,
} from "./data/initialData";
import {
  loadTrackerState,
  saveTrackerState,
  getTodayString,
  getCurrentWeekKey,
  triggerConfetti,
} from "./utils/helpers";
import { Header } from "./components/Header";
import { MetricCards } from "./components/MetricCards";
import { TabNav } from "./components/TabNav";
import { DailySprintView } from "./components/DailySprintView";
import { WeeklySprintView } from "./components/WeeklySprintView";
import { RoadmapView } from "./components/RoadmapView";
import { CompanyTrackerView } from "./components/CompanyTrackerView";
import { DsaTrackerView } from "./components/DsaTrackerView";
import { NotesScratchpadView } from "./components/NotesScratchpadView";
import { BaselineSettingsView } from "./components/BaselineSettingsView";

export default function App() {
  const [trackerState, setTrackerState] = useState<TrackerState>(() => loadTrackerState());
  const [activeTab, setActiveTab] = useState<TabType>("daily");
  const [currentDateStr, setCurrentDateStr] = useState<string>(getTodayString());
  const [dsaTopics, setDsaTopics] = useState(INITIAL_DSA_TOPICS);

  const currentWeekKey = useMemo(() => getCurrentWeekKey(), []);

  // Save to localStorage on state change
  useEffect(() => {
    saveTrackerState(trackerState);
  }, [trackerState]);

  // Merge default phases with custom tasks
  const phases = useMemo(() => {
    return INITIAL_PHASES.map((p) => {
      const customForPhase = trackerState.customRoadmapTasks[p.id] || [];
      return {
        ...p,
        tasks: [...p.tasks, ...customForPhase],
      };
    });
  }, [trackerState.customRoadmapTasks]);

  // Merge default daily habits with custom
  const allDailyHabits = useMemo(() => {
    return [...INITIAL_DAILY_HABITS, ...trackerState.customDailyHabits];
  }, [trackerState.customDailyHabits]);

  // Merge default weekly targets with custom
  const allWeeklyTargets = useMemo(() => {
    return [...INITIAL_WEEKLY_TARGETS, ...trackerState.customWeeklyTargets];
  }, [trackerState.customWeeklyTargets]);

  // Active day status
  const activeDailyStatus = useMemo(() => {
    return trackerState.dailyStatus[currentDateStr] || {};
  }, [trackerState.dailyStatus, currentDateStr]);

  // Active week status
  const activeWeeklyStatus = useMemo(() => {
    return trackerState.weeklyStatus[currentWeekKey] || {};
  }, [trackerState.weeklyStatus, currentWeekKey]);

  // Roadmap metrics calculation
  const totalRoadmapTasks = useMemo(() => {
    return phases.reduce((acc, p) => acc + p.tasks.length, 0);
  }, [phases]);

  const totalRoadmapDone = useMemo(() => {
    return Object.values(trackerState.checkedRoadmap).filter(Boolean).length;
  }, [trackerState.checkedRoadmap]);

  const roadmapPct = totalRoadmapTasks > 0 ? Math.min(100, Math.round((totalRoadmapDone / totalRoadmapTasks) * 100)) : 0;

  // Unfinished counts for badges
  const dailyRemainingCount = useMemo(() => {
    const done = allDailyHabits.filter((h) => !!activeDailyStatus[h.id]).length;
    return Math.max(0, allDailyHabits.length - done);
  }, [allDailyHabits, activeDailyStatus]);

  const weeklyRemainingCount = useMemo(() => {
    const done = allWeeklyTargets.filter((t) => !!activeWeeklyStatus[t.id]).length;
    return Math.max(0, allWeeklyTargets.length - done);
  }, [allWeeklyTargets, activeWeeklyStatus]);

  // 1. Metric updater helper
  const handleUpdateMetrics = (updater: (prev: UserMetrics) => UserMetrics) => {
    setTrackerState((prev) => ({
      ...prev,
      metrics: updater(prev.metrics),
    }));
  };

  // 2. Daily habit toggle & streak logic
  const handleToggleHabit = (habitId: string) => {
    setTrackerState((prev) => {
      const dayMap = { ...(prev.dailyStatus[currentDateStr] || {}) };
      dayMap[habitId] = !dayMap[habitId];

      const newDailyStatus = {
        ...prev.dailyStatus,
        [currentDateStr]: dayMap,
      };

      const doneHabitsCount = Object.values(dayMap).filter(Boolean).length;
      let newStreak = prev.streak;
      let newLastCompletedDate = prev.lastCompletedDate;
      const historySet = new Set(prev.streakHistory || []);

      // If user clears at least 3 habits for this day, record streak
      if (doneHabitsCount >= 3) {
        historySet.add(currentDateStr);
        if (prev.lastCompletedDate !== currentDateStr) {
          newStreak = prev.streak + 1;
          newLastCompletedDate = currentDateStr;
        }
      }

      return {
        ...prev,
        dailyStatus: newDailyStatus,
        streak: newStreak,
        lastCompletedDate: newLastCompletedDate,
        streakHistory: Array.from(historySet),
      };
    });
  };

  const handleAddDailyHabit = (habit: DailyHabit) => {
    setTrackerState((prev) => ({
      ...prev,
      customDailyHabits: [...prev.customDailyHabits, habit],
    }));
  };

  const handleDeleteDailyHabit = (habitId: string) => {
    setTrackerState((prev) => ({
      ...prev,
      customDailyHabits: prev.customDailyHabits.filter((h) => h.id !== habitId),
    }));
  };

  // 3. Weekly target toggle
  const handleToggleWeeklyTarget = (targetId: string) => {
    setTrackerState((prev) => {
      const weekMap = { ...(prev.weeklyStatus[currentWeekKey] || {}) };
      weekMap[targetId] = !weekMap[targetId];

      return {
        ...prev,
        weeklyStatus: {
          ...prev.weeklyStatus,
          [currentWeekKey]: weekMap,
        },
      };
    });
  };

  const handleAddWeeklyTarget = (target: WeeklyTarget) => {
    setTrackerState((prev) => ({
      ...prev,
      customWeeklyTargets: [...prev.customWeeklyTargets, target],
    }));
  };

  const handleDeleteWeeklyTarget = (targetId: string) => {
    setTrackerState((prev) => ({
      ...prev,
      customWeeklyTargets: prev.customWeeklyTargets.filter((t) => t.id !== targetId),
    }));
  };

  const handleResetWeeklyStatus = () => {
    setTrackerState((prev) => ({
      ...prev,
      weeklyStatus: {
        ...prev.weeklyStatus,
        [currentWeekKey]: {},
      },
    }));
  };

  // 4. Roadmap Task toggle & custom tasks
  const handleToggleRoadmapTask = (phaseId: string, taskId: string) => {
    const key = `${phaseId}-${taskId}`;
    setTrackerState((prev) => ({
      ...prev,
      checkedRoadmap: {
        ...prev.checkedRoadmap,
        [key]: !prev.checkedRoadmap[key],
      },
    }));
  };

  const handleAddCustomRoadmapTask = (phaseId: string, task: RoadmapTask) => {
    setTrackerState((prev) => ({
      ...prev,
      customRoadmapTasks: {
        ...prev.customRoadmapTasks,
        [phaseId]: [...(prev.customRoadmapTasks[phaseId] || []), task],
      },
    }));
  };

  const handleDeleteCustomRoadmapTask = (phaseId: string, taskId: string) => {
    const key = `${phaseId}-${taskId}`;
    setTrackerState((prev) => {
      const updatedPhaseList = (prev.customRoadmapTasks[phaseId] || []).filter((t) => t.id !== taskId);
      const updatedChecked = { ...prev.checkedRoadmap };
      delete updatedChecked[key];

      return {
        ...prev,
        customRoadmapTasks: {
          ...prev.customRoadmapTasks,
          [phaseId]: updatedPhaseList,
        },
        checkedRoadmap: updatedChecked,
      };
    });
  };

  // 5. Company Applications
  const handleAddApplication = (app: CompanyApplication) => {
    setTrackerState((prev) => ({
      ...prev,
      applications: [app, ...prev.applications],
      metrics: {
        ...prev.metrics,
        totalApps: prev.metrics.totalApps + 1,
        appsThisWeek: prev.metrics.appsThisWeek + 1,
      },
    }));
  };

  const handleUpdateApplicationStatus = (id: string, status: CompanyApplication["status"]) => {
    setTrackerState((prev) => ({
      ...prev,
      applications: prev.applications.map((app) => (app.id === id ? { ...app, status } : app)),
    }));
  };

  const handleDeleteApplication = (id: string) => {
    setTrackerState((prev) => ({
      ...prev,
      applications: prev.applications.filter((app) => app.id !== id),
    }));
  };

  // 6. DSA Topics & Solved
  const handleUpdateTopicSolved = (topicId: string, delta: number) => {
    setDsaTopics((prev) =>
      prev.map((t) => {
        if (t.id === topicId) {
          const nextSolved = Math.max(0, Math.min(t.totalQuestions, t.solved + delta));
          return { ...t, solved: nextSolved };
        }
        return t;
      })
    );
    // sync total metrics
    setTrackerState((prev) => ({
      ...prev,
      metrics: {
        ...prev.metrics,
        dsaSolved: Math.max(0, prev.metrics.dsaSolved + delta),
      },
    }));
  };

  // 7. Baselines
  const handleUpdateBaselines = (updatedMetrics: UserMetrics, updatedStreak: number) => {
    setTrackerState((prev) => ({
      ...prev,
      metrics: updatedMetrics,
      streak: updatedStreak,
    }));
  };

  // 8. STAR Stories & Quick notes
  const handleAddStarStory = (story: StarStory) => {
    setTrackerState((prev) => ({
      ...prev,
      starStories: [story, ...prev.starStories],
    }));
  };

  const handleDeleteStarStory = (id: string) => {
    setTrackerState((prev) => ({
      ...prev,
      starStories: prev.starStories.filter((s) => s.id !== id),
    }));
  };

  const handleSaveQuickNotes = (notes: string) => {
    setTrackerState((prev) => ({
      ...prev,
      quickNotes: notes,
    }));
  };

  // 9. Reset all data
  const handleResetAll = () => {
    if (confirm("Are you sure you want to reset all tracker data? This will clear your completed checks and counters.")) {
      setTrackerState(INITIAL_STATE);
      triggerConfetti();
    }
  };

  // 10. Import JSON
  const handleImportState = (imported: TrackerState) => {
    setTrackerState(imported);
  };

  return (
    <div className="min-h-screen bg-[#070b12] text-slate-100 flex flex-col selection:bg-sky-500 selection:text-slate-950">
      {/* Top Bar */}
      <Header state={trackerState} onReset={handleResetAll} onImportState={handleImportState} />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-5 sm:py-7 space-y-6">
        {/* KPI Metric Overview Row */}
        <MetricCards
          metrics={trackerState.metrics}
          onUpdateMetrics={handleUpdateMetrics}
          roadmapPct={roadmapPct}
          totalRoadmapDone={totalRoadmapDone}
          totalRoadmapTasks={totalRoadmapTasks}
        />

        {/* Tab Navigation */}
        <TabNav
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          dailyRemainingCount={dailyRemainingCount}
          weeklyRemainingCount={weeklyRemainingCount}
          totalApplicationsCount={trackerState.applications.length}
        />

        {/* Tab Views with Motion Animations */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {activeTab === "daily" && (
              <motion.div
                key="daily"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18 }}
              >
                <DailySprintView
                  habits={allDailyHabits}
                  dailyStatus={activeDailyStatus}
                  onToggleHabit={handleToggleHabit}
                  onAddHabit={handleAddDailyHabit}
                  onDeleteHabit={handleDeleteDailyHabit}
                  streak={trackerState.streak}
                  streakHistory={trackerState.streakHistory}
                  currentDateStr={currentDateStr}
                  onChangeDate={setCurrentDateStr}
                />
              </motion.div>
            )}

            {activeTab === "weekly" && (
              <motion.div
                key="weekly"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18 }}
              >
                <WeeklySprintView
                  targets={allWeeklyTargets}
                  weeklyStatus={activeWeeklyStatus}
                  onToggleTarget={handleToggleWeeklyTarget}
                  onAddTarget={handleAddWeeklyTarget}
                  onDeleteTarget={handleDeleteWeeklyTarget}
                  onResetWeeklyStatus={handleResetWeeklyStatus}
                  currentWeekKey={currentWeekKey}
                />
              </motion.div>
            )}

            {activeTab === "roadmap" && (
              <motion.div
                key="roadmap"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18 }}
              >
                <RoadmapView
                  phases={phases}
                  checkedRoadmap={trackerState.checkedRoadmap}
                  onToggleTask={handleToggleRoadmapTask}
                  onAddCustomTask={handleAddCustomRoadmapTask}
                  onDeleteCustomTask={handleDeleteCustomRoadmapTask}
                />
              </motion.div>
            )}

            {activeTab === "companies" && (
              <motion.div
                key="companies"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18 }}
              >
                <CompanyTrackerView
                  applications={trackerState.applications}
                  onAddApplication={handleAddApplication}
                  onUpdateStatus={handleUpdateApplicationStatus}
                  onDeleteApplication={handleDeleteApplication}
                />
              </motion.div>
            )}

            {activeTab === "dsa" && (
              <motion.div
                key="dsa"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18 }}
              >
                <DsaTrackerView
                  topics={dsaTopics}
                  onUpdateTopicSolved={handleUpdateTopicSolved}
                  totalSolved={trackerState.metrics.dsaSolved}
                  dsaGoal={trackerState.metrics.dsaGoal}
                />
              </motion.div>
            )}

            {activeTab === "notes" && (
              <motion.div
                key="notes"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18 }}
              >
                <NotesScratchpadView
                  starStories={trackerState.starStories}
                  onAddStarStory={handleAddStarStory}
                  onDeleteStarStory={handleDeleteStarStory}
                  quickNotes={trackerState.quickNotes}
                  onSaveQuickNotes={handleSaveQuickNotes}
                />
              </motion.div>
            )}

            {activeTab === "stats" && (
              <motion.div
                key="stats"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18 }}
              >
                <BaselineSettingsView
                  metrics={trackerState.metrics}
                  streak={trackerState.streak}
                  onUpdateBaselines={handleUpdateBaselines}
                  fullState={trackerState}
                  onResetAll={handleResetAll}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/60 py-4 px-4 text-center text-xs text-slate-500">
        Placement Preparation OS • Stored locally in your browser • Ready for Campus & Off-Campus Sprints
      </footer>
    </div>
  );
}
