export type TabType = "daily" | "weekly" | "roadmap" | "companies" | "dsa" | "notes" | "stats";

export interface RoadmapTask {
  id: string;
  text: string;
  isCustom?: boolean;
}

export interface RoadmapPhase {
  id: string;
  title: string;
  subtitle?: string;
  tasks: RoadmapTask[];
}

export interface DailyHabit {
  id: string;
  label: string;
  category: "Coding" | "Theory" | "Speed" | "Career" | "Network" | "Custom";
  isCustom?: boolean;
}

export interface WeeklyTarget {
  id: string;
  label: string;
  isCustom?: boolean;
}

export interface CompanyApplication {
  id: string;
  company: string;
  role: string;
  tier: "Tier 1 (Dream)" | "Tier 2 (Core)" | "Tier 3 (Mass)" | "Off-Campus Startup" | "Off-Campus MNC";
  status: "Applied" | "OA Round" | "Tech Round 1" | "Tech Round 2" | "HR Round" | "Offered" | "Rejected";
  appliedDate: string;
  packageLPA?: string;
  notes?: string;
  jobLink?: string;
}

export interface DsaTopic {
  id: string;
  name: string;
  totalQuestions: number;
  solved: number;
  keyConcepts: string[];
}

export interface StarStory {
  id: string;
  title: string;
  situation: string;
  task: string;
  action: string;
  result: string;
  skills: string;
}

export interface UserMetrics {
  dsaSolved: number;
  dsaGoal: number;
  appsThisWeek: number;
  appsWeekGoal: number;
  totalApps: number;
  mocksDone: number;
  mocksGoal: number;
  cgpa?: string;
  targetRole?: string;
}

export interface TrackerState {
  version: number;
  metrics: UserMetrics;
  checkedRoadmap: Record<string, boolean>; // key: `${phaseId}-${taskId}`
  customRoadmapTasks: Record<string, RoadmapTask[]>; // phaseId -> custom tasks
  dailyStatus: Record<string, Record<string, boolean>>; // dateStr -> { habitId: boolean }
  customDailyHabits: DailyHabit[];
  weeklyStatus: Record<string, Record<string, boolean>>; // weekKey (e.g. '2026-W35') -> { targetId: boolean }
  customWeeklyTargets: WeeklyTarget[];
  streak: number;
  lastCompletedDate: string;
  streakHistory: string[]; // array of completed date strings (YYYY-MM-DD)
  applications: CompanyApplication[];
  starStories: StarStory[];
  quickNotes: string;
}
