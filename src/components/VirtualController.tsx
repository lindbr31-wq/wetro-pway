import { cn } from '@/utils/cn';

interface VirtualControllerProps {
  onButtonPress: (button: string) => void;
  onButtonRelease: (button: string) => void;
}

export function VirtualController({ onButtonPress, onButtonRelease }: VirtualControllerProps) {
  const handlePress = (button: string) => {
    onButtonPress(button);
  };

  const handleRelease = (button: string) => {
    onButtonRelease(button);
  };

  const Button = ({ 
    name, 
    className, 
    children 
  }: { 
    name: string; 
    className?: string; 
    children: React.ReactNode;
  }) => (
    <button
      onMouseDown={() => handlePress(name)}
      onMouseUp={() => handleRelease(name)}
      onMouseLeave={() => handleRelease(name)}
      onTouchStart={() => handlePress(name)}
      onTouchEnd={() => handleRelease(name)}
      className={cn(
        "flex items-center justify-center font-bold text-white transition-all active:scale-95 select-none",
        className
      )}
    >
      {children}
    </button>
  );

  return (
    <div className="bg-gradient-to-b from-gray-700 to-gray-800 rounded-3xl p-6 shadow-2xl border-4 border-gray-600">
      {/* Controller shape inspired by N64 */}
      <div className="flex justify-between items-start gap-4">
        {/* Left Prong - D-Pad */}
        <div className="bg-gray-900 rounded-2xl p-4 flex flex-col items-center gap-4">
          <span className="text-xs text-gray-400 font-semibold">D-PAD</span>
          <div className="grid grid-cols-3 gap-1">
            <div></div>
            <Button name="dpad-up" className="w-10 h-10 bg-gray-600 rounded-t-lg hover:bg-gray-500">▲</Button>
            <div></div>
            <Button name="dpad-left" className="w-10 h-10 bg-gray-600 rounded-l-lg hover:bg-gray-500">◀</Button>
            <div className="w-10 h-10 bg-gray-700 rounded"></div>
            <Button name="dpad-right" className="w-10 h-10 bg-gray-600 rounded-r-lg hover:bg-gray-500">▶</Button>
            <div></div>
            <Button name="dpad-down" className="w-10 h-10 bg-gray-600 rounded-b-lg hover:bg-gray-500">▼</Button>
            <div></div>
          </div>
        </div>

        {/* Center Prong - Analog Stick */}
        <div className="bg-gray-900 rounded-2xl p-4 flex flex-col items-center gap-4">
          <span className="text-xs text-gray-400 font-semibold">ANALOG</span>
          <div className="relative w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center">
            <div className="w-16 h-16 bg-gray-500 rounded-full shadow-inner flex items-center justify-center cursor-move hover:bg-gray-400 transition-colors">
              <div className="w-4 h-4 bg-gray-800 rounded-full"></div>
            </div>
          </div>
          <span className="text-xs text-gray-500">Drag to move</span>
        </div>

        {/* Right side - Action Buttons */}
        <div className="bg-gray-900 rounded-2xl p-4 flex flex-col items-center gap-4">
          <span className="text-xs text-gray-400 font-semibold">BUTTONS</span>
          <div className="relative w-28 h-28">
            {/* A Button - Green */}
            <Button 
              name="A" 
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-12 bg-green-600 hover:bg-green-500 rounded-full text-xl shadow-lg"
            >
              A
            </Button>
            {/* B Button - Blue */}
            <Button 
              name="B" 
              className="absolute top-1/2 left-0 -translate-y-1/2 w-10 h-10 bg-blue-600 hover:bg-blue-500 rounded-full text-lg shadow-lg"
            >
              B
            </Button>
            {/* C Buttons - Yellow */}
            <div className="absolute top-0 right-0 grid grid-cols-2 gap-1">
              <Button name="C-up" className="w-6 h-6 bg-yellow-500 hover:bg-yellow-400 rounded text-xs">▲</Button>
              <div></div>
              <Button name="C-left" className="w-6 h-6 bg-yellow-500 hover:bg-yellow-400 rounded text-xs">◀</Button>
              <Button name="C-right" className="w-6 h-6 bg-yellow-500 hover:bg-yellow-400 rounded text-xs">▶</Button>
              <div></div>
              <Button name="C-down" className="w-6 h-6 bg-yellow-500 hover:bg-yellow-400 rounded text-xs">▼</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Start, Z, L, R */}
      <div className="mt-6 flex justify-center items-center gap-8">
        <Button 
          name="L" 
          className="w-16 h-8 bg-gray-600 hover:bg-gray-500 rounded-lg text-sm"
        >
          L
        </Button>
        <Button 
          name="Z" 
          className="w-12 h-8 bg-gray-600 hover:bg-gray-500 rounded-lg text-sm"
        >
          Z
        </Button>
        <Button 
          name="START" 
          className="w-16 h-8 bg-red-600 hover:bg-red-500 rounded-full text-xs"
        >
          START
        </Button>
        <Button 
          name="R" 
          className="w-16 h-8 bg-gray-600 hover:bg-gray-500 rounded-lg text-sm"
        >
          R
        </Button>
      </div>

      {/* Keyboard mapping hint */}
      <div className="mt-4 text-center text-xs text-gray-500">
        Keyboard: WASD/Arrows = D-Pad • J = A • K = B • Space = Start • Q/E = L/R
      </div>
    </div>
  );
}
