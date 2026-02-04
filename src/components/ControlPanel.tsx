interface ControlPanelProps {
  isRunning: boolean;
  romLoaded: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onFullscreen: () => void;
}

export function ControlPanel({ 
  isRunning, 
  romLoaded, 
  onStart, 
  onPause, 
  onReset,
  onFullscreen 
}: ControlPanelProps) {
  return (
    <div className="flex items-center gap-3">
      {/* Play/Pause Button */}
      {isRunning ? (
        <button
          onClick={onPause}
          className="flex items-center gap-2 px-6 py-3 bg-yellow-600 hover:bg-yellow-500 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-yellow-500/30"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
          </svg>
          Pause
        </button>
      ) : (
        <button
          onClick={onStart}
          disabled={!romLoaded}
          className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-green-500/30 disabled:shadow-none"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
          {romLoaded ? 'Start' : 'Load ROM First'}
        </button>
      )}

      {/* Reset Button */}
      <button
        onClick={onReset}
        disabled={!romLoaded}
        className="flex items-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-all"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        Reset
      </button>

      {/* Fullscreen Button */}
      <button
        onClick={onFullscreen}
        className="flex items-center gap-2 px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition-all"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
        </svg>
        Fullscreen
      </button>
    </div>
  );
}
