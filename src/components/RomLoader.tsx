import { useRef } from 'react';

interface RomLoaderProps {
  onRomLoad: (file: File) => void;
  romLoaded: boolean;
  romName: string;
}

export function RomLoader({ onRomLoad, romLoaded, romName }: RomLoaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check for valid N64 ROM extensions
      const validExtensions = ['.z64', '.n64', '.v64', '.rom'];
      const ext = file.name.toLowerCase().slice(file.name.lastIndexOf('.'));
      
      if (validExtensions.includes(ext)) {
        onRomLoad(file);
      } else {
        alert('Please select a valid N64 ROM file (.z64, .n64, .v64, .rom)');
      }
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700">
      <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
        ROM Loader
      </h2>

      {/* Legal Notice */}
      <div className="bg-yellow-900/30 border border-yellow-600/50 rounded-lg p-4 mb-4">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <div className="text-sm">
            <p className="text-yellow-400 font-semibold mb-1">Legal Notice</p>
            <p className="text-yellow-200/80">
              This emulator requires legally obtained ROM files. You must own the original game cartridge 
              to legally use a ROM backup. Downloading ROMs for games you do not own is piracy and is illegal.
            </p>
          </div>
        </div>
      </div>

      {/* File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".z64,.n64,.v64,.rom"
        onChange={handleFileChange}
        className="hidden"
      />

      {romLoaded ? (
        <div className="space-y-3">
          <div className="flex items-center gap-3 bg-green-900/30 border border-green-600/50 rounded-lg p-4">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-green-400 font-semibold">ROM Loaded</p>
              <p className="text-green-300/80 text-sm truncate max-w-xs">{romName}</p>
            </div>
          </div>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full py-2 px-4 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm"
          >
            Load Different ROM
          </button>
        </div>
      ) : (
        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-full py-4 px-6 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white rounded-lg transition-all flex items-center justify-center gap-3 font-semibold shadow-lg hover:shadow-red-500/20"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          Load ROM File
        </button>
      )}

      {/* Supported Formats */}
      <div className="mt-4 text-xs text-gray-500">
        <p className="font-semibold text-gray-400 mb-1">Supported Formats:</p>
        <p>.z64 (Big Endian) • .n64 (Little Endian) • .v64 (Byte Swapped)</p>
      </div>
    </div>
  );
}
