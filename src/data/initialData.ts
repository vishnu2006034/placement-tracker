import { RoadmapPhase, DailyHabit, WeeklyTarget, DsaTopic, StarStory, TrackerState } from "../types";

export const INITIAL_PHASES: RoadmapPhase[] = [
  {
    id: "p0",
    title: "Phase 0: Reality Check & Campus Landscape",
    subtitle: "Map out drives, syllabus, requirements and eligibility cutoffs",
    tasks: [
      { id: "t0_1", text: "List every company visiting campus, split into Tier 1/2/3" },
      { id: "t0_2", text: "Check eligibility cutoffs (CGPA, backlogs, branch) for each tier" },
      { id: "t0_3", text: "Note company-specific assessment patterns (TCS NQT, Infosys SP, Cognizant, Accenture)" },
      { id: "t0_4", text: "Confirm off-campus parallel pipeline is setup (LinkedIn, Wellfound, referrals)" },
    ],
  },
  {
    id: "p1",
    title: "Phase 1: DSA & Core CS Fundamentals",
    subtitle: "Master high-frequency data structures, algorithms, and fundamental computer science",
    tasks: [
      { id: "t1_1", text: "Pick one curated sheet (Striver A2Z / Love Babbar / NeetCode) and stick to it" },
      { id: "t1_2", text: "Master Arrays, Two Pointers, Sliding Window, Prefix Sum & Hashing" },
      { id: "t1_3", text: "Recursion, Backtracking, Linked Lists, Stacks & Queues" },
      { id: "t1_4", text: "Trees (Binary Tree, BST, Traversals) and Graph Algorithms (BFS, DFS, Dijkstra)" },
      { id: "t1_5", text: "Dynamic Programming fundamentals (1D, 2D, Knapsack, LCS/LIS patterns)" },
      { id: "t1_6", text: "DBMS: Normalization, B+ Trees Indexes, Transactions, ACID & practical SQL queries" },
      { id: "t1_7", text: "OS & Networks: Process vs Threads, Deadlocks, Paging, TCP/IP handshake, DNS, HTTP/HTTPS" },
    ],
  },
  {
    id: "p2",
    title: "Phase 2: Resume & Portfolio Polish",
    subtitle: "ATS-compliant resume, live projects, architecture READMEs, and LinkedIn footprint",
    tasks: [
      { id: "t2_1", text: "Freeze master ATS single-column resume with metric-driven XYZ bullet points" },
      { id: "t2_2", text: "All major project GitHub repos polished with architecture diagrams, setup guides & clean READMEs" },
      { id: "t2_3", text: "Active live deployment links added to resume and GitHub (Vercel, Render, Netlify, Cloud Run)" },
      { id: "t2_4", text: "Portfolio site verified: links resume PDF, GitHub, LinkedIn, and live demos" },
      { id: "t2_5", text: "Optimize LinkedIn headline, summary, and recent tech posts showcasing project builds" },
    ],
  },
  {
    id: "p3",
    title: "Phase 3: Aptitude & Online Assessment Speed",
    subtitle: "Timed quantitative aptitude, logical reasoning, and verbal comprehension drills",
    tasks: [
      { id: "t3_1", text: "Quantitative Aptitude: Time-Speed-Distance, Percentages, Profit/Loss, P&C, Probability" },
      { id: "t3_2", text: "Logical & Analytical Reasoning: Blood relations, Syllogisms, Seating arrangement, Series" },
      { id: "t3_3", text: "Verbal Ability: Reading Comprehension, Error Spotting, Sentence completion, Para-jumbles" },
      { id: "t3_4", text: "Take 3 full-length timed mock assessments on IndiaBix / PrepInsta / FacePrep" },
    ],
  },
  {
    id: "p4",
    title: "Phase 4: Targeted Applications & Outreach",
    subtitle: "Aggressive multi-channel application routine and personalized cold outreach",
    tasks: [
      { id: "t4_1", text: "Registered for all eligible on-campus drives with verified documentation" },
      { id: "t4_2", text: "Off-campus applications running weekly (10-15 targeted roles per week)" },
      { id: "t4_3", text: "Send 5 personalized cold messages/connection requests to alumni and hiring engineers weekly" },
      { id: "t4_4", text: "Application tracker updated immediately after each submission and scheduled for follow-ups" },
    ],
  },
  {
    id: "p5",
    title: "Phase 5: Technical Interview Readiness",
    subtitle: "Project deep dives, core language internals, live coding, and mock technical rounds",
    tasks: [
      { id: "t5_1", text: "Deep dive into all 2-3 portfolio projects: architecture, bottlenecks, database design, trade-offs" },
      { id: "t5_2", text: "Language internals revised (e.g., JS Event Loop/Closures or Java JVM/GC or Python GIL/decorators)" },
      { id: "t5_3", text: "Backend & REST API design revised: Auth/JWT, rate limiting, caching, CORS, status codes" },
      { id: "t5_4", text: "Complex SQL queries (Joins, Window functions, GROUP BY HAVING) written live without autocompletion" },
      { id: "t5_5", text: "Conduct weekly mock technical interviews with peers, seniors, or platforms (Pramp/Interviewing.io)" },
    ],
  },
  {
    id: "p6",
    title: "Phase 6: HR, Behavioral & Company Intel",
    subtitle: "STAR framework responses, salary expectations, and per-company research routine",
    tasks: [
      { id: "t6_1", text: "Tight, compelling 90-second answer for 'Tell me about yourself' and 'Why should we hire you?'" },
      { id: "t6_2", text: "Prepare 3-4 structured STAR stories: Technical failure/debugging, Team conflict, Leadership/Initiative" },
      { id: "t6_3", text: "Standard company research checklist before each interview: Business model, tech stack, recent news, CEO" },
      { id: "t6_4", text: "Thoughtful reverse-interview questions prepared for the interviewer (team culture, sprint cadence)" },
    ],
  },
];

export const INITIAL_DAILY_HABITS: DailyHabit[] = [
  { id: "dsa", label: "Solve 2 DSA problems (Blind 75 / Striver)", category: "Coding" },
  { id: "cs_rev", label: "30 min Core CS / SQL / DBMS revision", category: "Theory" },
  { id: "aptitude", label: "15 min Aptitude / Mental Math timed drill", category: "Speed" },
  { id: "apps", label: "Submit 2 off-campus applications", category: "Career" },
  { id: "outreach", label: "Send 1 personalized outreach message on LinkedIn", category: "Network" },
];

export const INITIAL_WEEKLY_TARGETS: WeeklyTarget[] = [
  { id: "w_mock", label: "Complete 1 full-length mock assessment or technical mock interview" },
  { id: "w_apps", label: "Hit weekly application target (10-15 targeted applications sent)" },
  { id: "w_project", label: "Push 1 significant feature or architectural improvement to GitHub" },
  { id: "w_review", label: "Review all weak DSA topics and bookmarked tricky mistakes" },
  { id: "w_aptitude_test", label: "Attempt 1 full-length timed aptitude test with sectional analysis" },
];

export const INITIAL_DSA_TOPICS: DsaTopic[] = [
  { id: "arr_str", name: "Arrays & Strings", totalQuestions: 30, solved: 18, keyConcepts: ["Two Pointers", "Sliding Window", "Kadane's", "Prefix Sum"] },
  { id: "hash", name: "Hashing & Maps", totalQuestions: 15, solved: 10, keyConcepts: ["Frequency Counter", "Subarray Sum Equals K", "Longest Consecutive Sequence"] },
  { id: "linked_list", name: "Linked List", totalQuestions: 18, solved: 12, keyConcepts: ["Fast & Slow Pointers", "Reverse Linked List", "Merge K Lists", "Cycle Detection"] },
  { id: "stack_queue", name: "Stack & Queue", totalQuestions: 20, solved: 9, keyConcepts: ["Monotonic Stack", "Next Greater Element", "Valid Parentheses", "LRU Cache"] },
  { id: "trees", name: "Trees & BST", totalQuestions: 30, solved: 14, keyConcepts: ["BFS/DFS Traversals", "LCA", "Diameter", "Max Path Sum", "Validate BST"] },
  { id: "graphs", name: "Graphs", totalQuestions: 25, solved: 8, keyConcepts: ["BFS/DFS", "Dijkstra", "Topological Sort", "Disjoint Set (Union-Find)", "Cycle Detection"] },
  { id: "dp", name: "Dynamic Programming", totalQuestions: 35, solved: 7, keyConcepts: ["0/1 Knapsack", "LCS & LIS", "Matrix Chain", "Grid DP", "DP with Bitmask"] },
  { id: "sql_db", name: "SQL & DB Queries", totalQuestions: 20, solved: 12, keyConcepts: ["Joins", "Window Functions (RANK, DENSE_RANK)", "Self Joins", "Aggregation"] },
];

export const INITIAL_STAR_STORIES: StarStory[] = [
  {
    id: "s1",
    title: "Handling a production bottleneck / Critical bug fix",
    situation: "During our final semester full-stack project deployment, API response times spiked above 3.5 seconds under concurrent load.",
    task: "I was responsible for profiling the backend endpoints and reducing latency below 200ms before our live demo.",
    action: "Used database query explain plans to identify unindexed N+1 queries. Added composite indexes, integrated Redis in-memory caching for read-heavy routes, and debounced search triggers.",
    result: "Reduced average API latency from 3500ms down to 85ms (97% reduction) and handled 500 simultaneous test users without timeouts.",
    skills: "Performance Profiling, Redis, Database Indexing, System Optimization"
  },
  {
    id: "s2",
    title: "Leading team through conflicting technical opinions",
    situation: "Our 4-person hackathon team disagreed on whether to use a microservices architecture vs a modular monolith under a 36-hour deadline.",
    task: "As team coordinator, I needed to resolve the technical deadlock quickly without alienating teammates.",
    action: "Set up a 15-minute matrix evaluating our time constraints against delivery requirements. Proposed starting with a modular monolith with clear domain boundaries, and creating one standalone service only for AI inference.",
    result: "Shipped the complete MVP 4 hours before deadline, won 2nd place in the track, and avoided distributed debugging overhead.",
    skills: "Leadership, Conflict Resolution, Architectural Pragmatism"
  }
];

export const INITIAL_COMPANIES: import("../types").CompanyApplication[] = [
  {
    id: "c1",
    company: "Goldman Sachs",
    role: "Summer Analyst / SDE",
    tier: "Tier 1 (Dream)",
    status: "OA Round",
    appliedDate: "2026-08-15",
    packageLPA: "24-28",
    notes: "Aptitude + 2 Medium DSA problems in HackerRank. Focus on Math and Graph algorithms.",
    jobLink: "https://goldmansachs.com/careers"
  },
  {
    id: "c2",
    company: "TCS Digital / Prime",
    role: "Systems Engineer (Digital)",
    tier: "Tier 2 (Core)",
    status: "Applied",
    appliedDate: "2026-08-20",
    packageLPA: "7.5-9",
    notes: "NQT exam scheduled soon. Verbal, Numerical, Advanced Coding in Python/C++.",
    jobLink: ""
  },
  {
    id: "c3",
    company: "Razorpay",
    role: "Backend Engineer Intern",
    tier: "Tier 1 (Dream)",
    status: "Tech Round 1",
    appliedDate: "2026-08-10",
    packageLPA: "22",
    notes: "Completed take-home assignment on distributed rate limiter. Live system design and API round scheduled.",
    jobLink: "https://razorpay.com"
  }
];

export const INITIAL_STATE: TrackerState = {
  version: 2,
  metrics: {
    dsaSolved: 83,
    dsaGoal: 180,
    appsThisWeek: 4,
    appsWeekGoal: 15,
    totalApps: 18,
    mocksDone: 2,
    mocksGoal: 10,
    cgpa: "8.75",
    targetRole: "Full Stack / SDE Intern"
  },
  checkedRoadmap: {
    "p0-t0_1": true,
    "p0-t0_2": true,
    "p0-t0_3": true,
    "p1-t1_1": true,
    "p1-t1_2": true,
    "p2-t2_1": true,
    "p2-t2_2": true,
  },
  customRoadmapTasks: {},
  dailyStatus: {},
  customDailyHabits: [],
  weeklyStatus: {},
  customWeeklyTargets: [],
  streak: 4,
  lastCompletedDate: "",
  streakHistory: ["2026-08-24", "2026-08-25", "2026-08-26"],
  applications: INITIAL_COMPANIES,
  starStories: INITIAL_STAR_STORIES,
  quickNotes: `## Quick Interview Formulas & Revision Notes

### Time Complexities Cheat Sheet
- Binary Search: O(log N)
- Merge Sort / Quick Sort (avg): O(N log N)
- DFS / BFS Graph: O(V + E)
- Dijkstra: O((V + E) log V) with Priority Queue
- 0/1 Knapsack: O(N * W)

### SQL Joins Recall
- INNER JOIN: Matches in both tables
- LEFT JOIN: All left + matching right (NULL if none)
- Window functions: \`ROW_NUMBER() OVER (PARTITION BY dept_id ORDER BY salary DESC)\`

### 30-Second Elevator Pitch
"Hi! I'm a final-year CS undergrad passionate about scalable backend systems and responsive web applications. Recently built a distributed workflow engine that handled 500+ simulated concurrent requests, and I love digging into algorithms and high-throughput systems."`
};
