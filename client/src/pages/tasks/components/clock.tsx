import { Component, createSignal, createEffect, onCleanup } from "solid-js";
import { useAppState } from "../../../context";

interface TimerState {
  isRunning: boolean;
  timeLeft: number;
  currentSession: number;
  totalSessions: number;
  isBreak: boolean;
}

const WORK_TIME = 25 * 60; // 25 minutes in seconds
const SHORT_BREAK = 5 * 60; // 5 minutes in seconds
const LONG_BREAK = 15 * 60; // 15 minutes in seconds
const SESSIONS_BEFORE_LONG_BREAK = 4;

const Clock: Component = () => {
  const { auth } = useAppState();
  const [timerState, setTimerState] = createSignal<TimerState>({
    isRunning: false,
    timeLeft: WORK_TIME,
    currentSession: 1,
    totalSessions: 0,
    isBreak: false,
  });

  let intervalId: number | undefined;

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const getProgressPercentage = (): number => {
    const state = timerState();
    const totalTime = state.isBreak
      ? state.currentSession % SESSIONS_BEFORE_LONG_BREAK === 0
        ? LONG_BREAK
        : SHORT_BREAK
      : WORK_TIME;
    return ((totalTime - state.timeLeft) / totalTime) * 100;
  };

  const startTimer = () => {
    setTimerState((prev) => ({ ...prev, isRunning: true }));
  };

  const pauseTimer = () => {
    setTimerState((prev) => ({ ...prev, isRunning: false }));
  };

  const resetTimer = () => {
    setTimerState({
      isRunning: false,
      timeLeft: WORK_TIME,
      currentSession: 1,
      totalSessions: 0,
      isBreak: false,
    });
  };

  const skipTimer = () => {
    const state = timerState();
    if (state.isBreak) {
      // Skip break, start next work session
      setTimerState({
        isRunning: false,
        timeLeft: WORK_TIME,
        currentSession: state.currentSession + 1,
        totalSessions: state.totalSessions,
        isBreak: false,
      });
    } else {
      // Skip work session, start break
      const isLongBreak =
        state.currentSession % SESSIONS_BEFORE_LONG_BREAK === 0;
      setTimerState({
        isRunning: false,
        timeLeft: isLongBreak ? LONG_BREAK : SHORT_BREAK,
        currentSession: state.currentSession,
        totalSessions: state.totalSessions + 1,
        isBreak: true,
      });
    }
  };

  const completeSession = () => {
    const state = timerState();
    if (state.isBreak) {
      // Break completed, start next work session
      setTimerState({
        isRunning: false,
        timeLeft: WORK_TIME,
        currentSession: state.currentSession + 1,
        totalSessions: state.totalSessions,
        isBreak: false,
      });
    } else {
      // Work session completed, start break
      const isLongBreak =
        state.currentSession % SESSIONS_BEFORE_LONG_BREAK === 0;
      setTimerState({
        isRunning: false,
        timeLeft: isLongBreak ? LONG_BREAK : SHORT_BREAK,
        currentSession: state.currentSession,
        totalSessions: state.totalSessions + 1,
        isBreak: true,
      });
    }
  };

  createEffect(() => {
    const state = timerState();

    if (state.isRunning && state.timeLeft > 0) {
      intervalId = window.setInterval(() => {
        setTimerState((prev) => {
          if (prev.timeLeft <= 1) {
            // Timer completed
            completeSession();
            return prev;
          }
          return { ...prev, timeLeft: prev.timeLeft - 1 };
        });
      }, 1000);
    } else if (intervalId) {
      clearInterval(intervalId);
    }
  });

  onCleanup(() => {
    if (intervalId) {
      clearInterval(intervalId);
    }
  });

  const state = timerState();
  const progressPercentage = getProgressPercentage();

  return (
    <div class="bg-gradient-to-br from-purple-900 to-indigo-900 text-white text-center py-8 px-4">
      <div class="max-w-md mx-auto">
        {/* Session Info */}
        <div class="mb-6">
          <h2 class="text-2xl font-bold mb-2">
            {state.isBreak ? "Break Time" : "Focus Time"}
          </h2>
          <p class="text-purple-200">
            Session {state.currentSession} • Completed: {state.totalSessions}
          </p>
        </div>

        {/* Timer Display */}
        <div class="text-6xl font-mono font-bold mb-6">
          {formatTime(state.timeLeft)}
        </div>

        {/* Progress Bar */}
        <div class="w-full bg-purple-700 rounded-full h-3 mb-6">
          <div
            class="bg-yellow-400 h-3 rounded-full transition-all duration-1000 ease-out"
            style={`width: ${progressPercentage}%`}
          ></div>
        </div>

        {/* Controls */}
        <div class="flex justify-center gap-4 mb-6">
          {!state.isRunning ? (
            <button
              onClick={startTimer}
              class="bg-green-600 hover:bg-green-700 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Start
            </button>
          ) : (
            <button
              onClick={pauseTimer}
              class="bg-yellow-600 hover:bg-yellow-700 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Pause
            </button>
          )}

          <button
            onClick={resetTimer}
            class="bg-gray-600 hover:bg-gray-700 px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Reset
          </button>

          <button
            onClick={skipTimer}
            class="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Skip
          </button>
        </div>

        {/* Session Type Indicator */}
        <div class="text-sm text-purple-200">
          {state.isBreak
            ? state.currentSession % SESSIONS_BEFORE_LONG_BREAK === 0
              ? "Long Break"
              : "Short Break"
            : "Work Session"}
        </div>
      </div>
    </div>
  );
};

export default Clock;
