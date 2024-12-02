import { useState, useCallback, useEffect, useRef } from 'react';
import { WORK_TIME, BREAK_TIME } from '../lib/constants';
import type { TimerPhase, TimerState } from '../lib/types';
import { useAudioNotification } from './useAudioNotification';
import { useToast } from '@/hooks/use-toast';

export function usePomodoro() {
  const [state, setState] = useState<TimerState>({
    phase: 'work',
    timeRemaining: WORK_TIME,
    isRunning: false,
    sessions: 0,
  });

  const intervalRef = useRef<number>();
  const playNotification = useAudioNotification();
  const { toast } = useToast();

  const switchPhase = useCallback((phase: TimerPhase) => {
    setState(prev => ({
      ...prev,
      phase,
      timeRemaining: phase === 'work' ? WORK_TIME : BREAK_TIME,
      sessions: phase === 'work' ? prev.sessions + 1 : prev.sessions,
    }));
    
    playNotification();
    toast({
      title: phase === 'work' ? 'Work Time!' : 'Break Time!',
      description: phase === 'work' ? 'Focus on your task.' : 'Take a short break.',
    });
  }, [playNotification, toast]);

  useEffect(() => {
    if (state.isRunning) {
      intervalRef.current = window.setInterval(() => {
        setState(prev => {
          if (prev.timeRemaining <= 1) {
            const nextPhase = prev.phase === 'work' ? 'break' : 'work';
            switchPhase(nextPhase);
            return prev;
          }
          return { ...prev, timeRemaining: prev.timeRemaining - 1 };
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [state.isRunning, switchPhase]);

  const start = useCallback(() => {
    setState(prev => ({ ...prev, isRunning: true }));
  }, []);

  const pause = useCallback(() => {
    setState(prev => ({ ...prev, isRunning: false }));
  }, []);

  const reset = useCallback(() => {
    setState({
      phase: 'work',
      timeRemaining: WORK_TIME,
      isRunning: false,
      sessions: 0,
    });
  }, []);

  const skip = useCallback(() => {
    const nextPhase = state.phase === 'work' ? 'break' : 'work';
    switchPhase(nextPhase);
  }, [state.phase, switchPhase]);

  return {
    state,
    controls: { start, pause, reset, skip },
  };
}
