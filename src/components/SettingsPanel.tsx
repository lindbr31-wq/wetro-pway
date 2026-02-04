import { useState } from 'react';

interface Settings {
  resolution: string;
  aspectRatio: string;
  filtering: string;
  audioEnabled: boolean;
  audioVolume: number;
  showFPS: boolean;
}

interface SettingsPanelProps {
  settings: Settings;
  onSettingsChange: (settings: Settings) => void;
}

export function SettingsPanel({ settings, onSettingsChange }: SettingsPanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  const updateSetting = <K extends keyof Settings>(key: K, value: Settings[K]) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition-all"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        Settings
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-80 bg-gray-800 rounded-xl border border-gray-700 shadow-2xl z-50 overflow-hidden">
            <div className="p-4 border-b border-gray-700">
              <h3 className="text-lg font-bold text-white">Emulator Settings</h3>
            </div>

            <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
              {/* Graphics Section */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Graphics</h4>
                
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Resolution</label>
                  <select
                    value={settings.resolution}
                    onChange={(e) => updateSetting('resolution', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                  >
                    <option value="320x240">320×240 (Native)</option>
                    <option value="640x480">640×480 (2×)</option>
                    <option value="1280x960">1280×960 (4×)</option>
                    <option value="1920x1440">1920×1440 (6×)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-1">Aspect Ratio</label>
                  <select
                    value={settings.aspectRatio}
                    onChange={(e) => updateSetting('aspectRatio', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                  >
                    <option value="4:3">4:3 (Original)</option>
                    <option value="16:9">16:9 (Widescreen)</option>
                    <option value="stretch">Stretch to Fit</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-1">Texture Filtering</label>
                  <select
                    value={settings.filtering}
                    onChange={(e) => updateSetting('filtering', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                  >
                    <option value="nearest">Nearest Neighbor (Sharp)</option>
                    <option value="bilinear">Bilinear (Smooth)</option>
                    <option value="xbrz">xBRZ (Enhanced)</option>
                  </select>
                </div>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.showFPS}
                    onChange={(e) => updateSetting('showFPS', e.target.checked)}
                    className="w-4 h-4 rounded bg-gray-700 border-gray-600 text-blue-500 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-300">Show FPS Counter</span>
                </label>
              </div>

              {/* Audio Section */}
              <div className="space-y-3 pt-3 border-t border-gray-700">
                <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Audio</h4>
                
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.audioEnabled}
                    onChange={(e) => updateSetting('audioEnabled', e.target.checked)}
                    className="w-4 h-4 rounded bg-gray-700 border-gray-600 text-blue-500 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-300">Enable Audio</span>
                </label>

                <div>
                  <label className="block text-sm text-gray-300 mb-1">Volume: {settings.audioVolume}%</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={settings.audioVolume}
                    onChange={(e) => updateSetting('audioVolume', parseInt(e.target.value))}
                    className="w-full accent-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-gray-700 bg-gray-900/50">
              <button
                onClick={() => setIsOpen(false)}
                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
