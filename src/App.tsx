import { useState, useEffect, useCallback, useRef } from 'react';
import { EmulatorScreen } from '@/components/EmulatorScreen';
import { VirtualController } from '@/components/VirtualController';
import { RomLoader } from '@/components/RomLoader';
import { ControlPanel } from '@/components/ControlPanel';
import { SettingsPanel } from '@/components/SettingsPanel';
import { KeyboardMappings } from '@/components/KeyboardMappings';

interface Settings {
  resolution: string;
  aspectRatio: string;
  filtering: string;
  audioEnabled: boolean;
  audioVolume: number;
  showFPS: boolean;
}

const defaultSettings: Settings = {
  resolution: '640x480',
  aspectRatio: '4:3',
  filtering: 'bilinear',
  audioEnabled: true,
  audioVolume: 75,
  showFPS: false,
};

export function App() {
  const [romLoaded, setRomLoaded] = useState(false);
  const [romName, setRomName] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [activeButtons, setActiveButtons] = useState<Set<string>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);

  const handleRomLoad = useCallback((file: File) => {
    setRomName(file.name);
    setRomLoaded(true);
    setIsRunning(false);
  }, []);

  const handleStart = useCallback(() => {
    if (romLoaded) {
      setIsRunning(true);
    }
  }, [romLoaded]);

  const handlePause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const handleReset = useCallback(() => {
    setIsRunning(false);
    // Small delay then restart
    setTimeout(() => setIsRunning(true), 100);
  }, []);

  const handleFullscreen = useCallback(() => {
    if (containerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        containerRef.current.requestFullscreen();
      }
    }
  }, []);

  const handleButtonPress = useCallback((button: string) => {
    setActiveButtons(prev => new Set(prev).add(button));
    if (button === 'START' && romLoaded) {
      setIsRunning(prev => !prev);
    }
  }, [romLoaded]);

  const handleButtonRelease = useCallback((button: string) => {
    setActiveButtons(prev => {
      const next = new Set(prev);
      next.delete(button);
      return next;
    });
  }, []);

  // Keyboard controls
  useEffect(() => {
    const keyMap: Record<string, string> = {
      'w': 'dpad-up',
      's': 'dpad-down',
      'a': 'dpad-left',
      'd': 'dpad-right',
      'j': 'A',
      'k': 'B',
      ' ': 'START',
      'z': 'Z',
      'q': 'L',
      'e': 'R',
      'ArrowUp': 'C-up',
      'ArrowDown': 'C-down',
      'ArrowLeft': 'C-left',
      'ArrowRight': 'C-right',
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const button = keyMap[e.key.toLowerCase()] || keyMap[e.key];
      if (button) {
        e.preventDefault();
        handleButtonPress(button);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const button = keyMap[e.key.toLowerCase()] || keyMap[e.key];
      if (button) {
        handleButtonRelease(button);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleButtonPress, handleButtonRelease]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
      {/* Header */}
      <header className="bg-black/50 border-b border-gray-800 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* N64 Logo */}
              <div className="flex items-center gap-2">
                <div className="relative w-12 h-12">
                  <div className="absolute inset-0 bg-red-500 rounded-lg transform rotate-45"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white font-black text-lg transform -rotate-0">N64</span>
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">RetroPlay64</h1>
                  <p className="text-xs text-gray-400">Nintendo 64 Emulator</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <SettingsPanel 
                settings={settings} 
                onSettingsChange={setSettings} 
              />
              <KeyboardMappings />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - ROM Loader & Info */}
          <div className="space-y-6">
            <RomLoader 
              onRomLoad={handleRomLoad} 
              romLoaded={romLoaded} 
              romName={romName} 
            />

            {/* Emulator Status */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-bold text-white mb-4">Emulator Status</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Status:</span>
                  <span className={`font-semibold ${isRunning ? 'text-green-400' : 'text-yellow-400'}`}>
                    {isRunning ? 'Running' : romLoaded ? 'Paused' : 'Idle'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">ROM:</span>
                  <span className="text-gray-200 truncate max-w-32">
                    {romLoaded ? romName.slice(0, 15) + '...' : 'None'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Resolution:</span>
                  <span className="text-gray-200">{settings.resolution}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Audio:</span>
                  <span className="text-gray-200">
                    {settings.audioEnabled ? `${settings.audioVolume}%` : 'Muted'}
                  </span>
                </div>
              </div>
            </div>

            {/* Active Buttons Display */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-bold text-white mb-4">Input Monitor</h3>
              <div className="flex flex-wrap gap-2 min-h-12">
                {activeButtons.size > 0 ? (
                  Array.from(activeButtons).map(button => (
                    <span 
                      key={button}
                      className="px-3 py-1 bg-green-600 text-white rounded-full text-sm font-semibold animate-pulse"
                    >
                      {button}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-500 text-sm">No input detected</span>
                )}
              </div>
            </div>
          </div>

          {/* Center & Right - Screen & Controller */}
          <div className="lg:col-span-2 space-y-6">
            {/* Emulator Screen */}
            <div ref={containerRef} className="flex justify-center">
              <EmulatorScreen 
                isRunning={isRunning} 
                romLoaded={romLoaded} 
                romName={romName} 
              />
            </div>

            {/* Control Panel */}
            <div className="flex justify-center">
              <ControlPanel
                isRunning={isRunning}
                romLoaded={romLoaded}
                onStart={handleStart}
                onPause={handlePause}
                onReset={handleReset}
                onFullscreen={handleFullscreen}
              />
            </div>

            {/* Virtual Controller */}
            <div className="flex justify-center">
              <VirtualController
                onButtonPress={handleButtonPress}
                onButtonRelease={handleButtonRelease}
              />
            </div>
          </div>
        </div>

        {/* Disclaimer Footer */}
        <div className="mt-12 bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <div className="flex items-start gap-4">
            <svg className="w-8 h-8 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="text-sm text-gray-300 space-y-2">
              <p className="font-semibold text-white">About RetroPlay64</p>
              <p>
                This is a demonstration emulator interface. A full N64 emulator requires complex hardware emulation 
                including the VR4300 CPU, Reality Display Processor (RDP), Reality Signal Processor (RSP), and audio subsystems.
              </p>
              <p>
                <strong className="text-yellow-400">Legal Notice:</strong> ROM files must be legally obtained. You may only 
                use ROM backups of games you physically own. Downloading or distributing ROMs for games you do not own is piracy 
                and is illegal in most jurisdictions.
              </p>
              <p className="text-gray-400">
                Nintendo 64 is a registered trademark of Nintendo Co., Ltd. This project is not affiliated with or endorsed by Nintendo.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
