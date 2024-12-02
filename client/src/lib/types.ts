export type TimerPhase = 'work' | 'break';

export type TimerState = {
  phase: TimerPhase;
  timeRemaining: number;
  isRunning: boolean;
  sessions: number;
};

export interface TimerControls {
  start: () => void;
  pause: () => void;
  reset: () => void;
  skip: () => void;
}
