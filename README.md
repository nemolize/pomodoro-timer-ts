# Pomodoro Timer

A modern, feature-rich Pomodoro Timer application built with React and TypeScript. This application helps users manage their work sessions effectively using the Pomodoro Technique, a time management method that uses timed intervals of work followed by breaks.

## Features

- **Circular Progress Indicator**
  - Visual representation of time remaining
  - Color-coded for work and break phases
  - Smooth animations and transitions

- **Work/Break Timer Phases**
  - 25-minute work sessions
  - 5-minute break intervals
  - Automatic phase switching

- **Audio Notifications**
  - Sound alerts when phases change
  - Browser-based audio implementation
  - Non-intrusive notification sounds

- **Session Tracking**
  - Count of completed work sessions
  - Progress persistence
  - Visual session indicators

- **Timer Controls**
  - Start/Pause: Begin or pause the current timer
  - Reset: Return to initial work phase
  - Skip: Move to next phase
  - Intuitive button layout

## Tech Stack

### Frontend
- React
- TypeScript
- TailwindCSS
- Shadcn/UI Components
- Lucide Icons

### Backend
- Express
- TypeScript
- Node.js

## Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- pnpm (v8 or higher)

### Installation Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/nemolize/pomodoro-timer.git
   cd pomodoro-timer
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

### Environment Setup
No additional environment variables are required for basic functionality.

## Usage Instructions

### Starting the Application
1. Run the development server:
   ```bash
   pnpm run dev
   ```
2. Open your browser and navigate to `http://localhost:5000`

### Using the Timer

The Pomodoro Timer follows a simple workflow:

1. **Work Phase (25 minutes)**
   - Focus on your task
   - Timer shows remaining time in minutes and seconds
   - Red progress indicator shows elapsed time

2. **Break Phase (5 minutes)**
   - Take a short break
   - Timer automatically switches to break mode
   - Green progress indicator shows elapsed break time

### Timer Controls

- **Start/Pause Button (Center)**
  - Start: Begin the timer countdown
  - Pause: Temporarily stop the timer

- **Reset Button (Left)**
  - Resets timer to initial work phase
  - Clears session count
  - Stops the timer

- **Skip Button (Right)**
  - Skips current phase
  - Switches between work and break phases
  - Maintains session count

## License

This project is open source and available under the MIT License.


## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
