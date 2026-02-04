import { useState } from 'react';

interface KeyMapping {
  button: string;
  key: string;
  label: string;
}

const defaultMappings: KeyMapping[] = [
  { button: 'A', key: 'j', label: 'A Button' },
  { button: 'B', key: 'k', label: 'B Button' },
  { button: 'START', key: 'Space', label: 'Start' },
  { button: 'Z', key: 'z', label: 'Z Trigger' },
  { button: 'L', key: 'q', label: 'L Button' },
  { button: 'R', key: 'e', label: 'R Button' },
  { button: 'dpad-up', key: 'w', label: 'D-Pad Up' },
  { button: 'dpad-down', key: 's', label: 'D-Pad Down' },
  { button: 'dpad-left', key: 'a', label: 'D-Pad Left' },
  { button: 'dpad-right', key: 'd', label: 'D-Pad Right' },
  { button: 'C-up', key: 'ArrowUp', label: 'C-Up' },
  { button: 'C-down', key: 'ArrowDown', label: 'C-Down' },
  { button: 'C-left', key: 'ArrowLeft', label: 'C-Left' },
  { button: 'C-right', key: 'ArrowRight', label: 'C-Right' },
];

export function KeyboardMappings() {
  const [isOpen, setIsOpen] = useState(false);
  const [mappings] = useState<KeyMapping[]>(defaultMappings);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition-all"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
        Controls
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-96 bg-gray-800 rounded-xl border border-gray-700 shadow-2xl z-50 overflow-hidden">
            <div className="p-4 border-b border-gray-700">
              <h3 className="text-lg font-bold text-white">Keyboard Controls</h3>
              <p className="text-sm text-gray-400 mt-1">Current key mappings for the controller</p>
            </div>

            <div className="p-4 max-h-80 overflow-y-auto">
              <div className="grid grid-cols-2 gap-2">
                {mappings.map((mapping) => (
                  <div 
                    key={mapping.button}
                    className="flex items-center justify-between bg-gray-700/50 rounded-lg px-3 py-2"
                  >
                    <span className="text-sm text-gray-300">{mapping.label}</span>
                    <kbd className="px-2 py-1 bg-gray-900 text-gray-200 rounded text-xs font-mono border border-gray-600">
                      {mapping.key === 'Space' ? '␣' : mapping.key.replace('Arrow', '')}
                    </kbd>
                  </div>
                ))}
              </div>

              {/* Analog Stick Info */}
              <div className="mt-4 p-3 bg-blue-900/30 border border-blue-600/50 rounded-lg">
                <p className="text-sm text-blue-300">
                  <strong>Analog Stick:</strong> Use IJKL keys for analog movement, or connect a gamepad for true analog control.
                </p>
              </div>
            </div>

            <div className="p-4 border-t border-gray-700 bg-gray-900/50">
              <button
                onClick={() => setIsOpen(false)}
                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
