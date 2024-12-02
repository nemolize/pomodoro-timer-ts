import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CircularProgress } from "../components/Timer/CircularProgress";
import { Controls } from "../components/Timer/Controls";
import { usePomodoro } from "../hooks/usePomodoro";
import { PHASE_LABELS } from "../lib/constants";

export default function PomodoroTimer() {
  const { state, controls } = usePomodoro();

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const progress = (() => {
    const total = state.phase === 'work' ? 25 * 60 : 5 * 60;
    return (total - state.timeRemaining) / total;
  })();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 flex flex-col items-center space-y-8">
        <div className="text-center space-y-4">
          <Badge 
            variant="outline"
            className={`text-lg px-4 py-1 ${
              state.phase === 'work' ? 'border-red-500' : 'border-green-500'
            }`}
          >
            {PHASE_LABELS[state.phase]}
          </Badge>
          
          <div className="text-sm text-muted-foreground">
            Sessions completed: {state.sessions}
          </div>
        </div>

        <CircularProgress progress={progress} phase={state.phase}>
          <div className="text-6xl font-bold">
            {formatTime(state.timeRemaining)}
          </div>
        </CircularProgress>

        <Controls
          isRunning={state.isRunning}
          controls={controls}
        />
      </Card>
    </div>
  );
}
