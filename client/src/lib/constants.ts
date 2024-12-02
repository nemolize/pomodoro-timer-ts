export const WORK_TIME = 25 * 60; // 25 minutes in seconds
export const BREAK_TIME = 5 * 60; // 5 minutes in seconds

export const PHASE_COLORS = {
  work: "hsl(348, 100%, 61%)",
  break: "hsl(142, 76%, 36%)",
} as const;

export const PHASE_LABELS = {
  work: "Work Time",
  break: "Break Time",
} as const;
