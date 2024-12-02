import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw, SkipForward } from "lucide-react";
import type { TimerControls } from "@/lib/types";

interface ControlsProps {
  isRunning: boolean;
  controls: TimerControls;
}

export function Controls({ isRunning, controls }: ControlsProps) {
  return (
    <div className="flex gap-4 mt-8">
      <Button
        variant="outline"
        size="lg"
        onClick={controls.reset}
        className="w-12 h-12 p-2"
      >
        <RotateCcw className="h-6 w-6" />
      </Button>

      <Button
        variant="default"
        size="lg"
        onClick={isRunning ? controls.pause : controls.start}
        className="w-24 h-12"
      >
        {isRunning ? (
          <Pause className="h-6 w-6" />
        ) : (
          <Play className="h-6 w-6" />
        )}
      </Button>

      <Button
        variant="outline"
        size="lg"
        onClick={controls.skip}
        className="w-12 h-12 p-2"
      >
        <SkipForward className="h-6 w-6" />
      </Button>
    </div>
  );
}
