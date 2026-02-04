import { useRef, useEffect } from 'react';

interface EmulatorScreenProps {
  isRunning: boolean;
  romLoaded: boolean;
  romName: string;
}

export function EmulatorScreen({ isRunning, romLoaded, romName }: EmulatorScreenProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw retro pattern when no ROM
    if (!romLoaded) {
      ctx.fillStyle = '#1a1a2e';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw scanlines
      ctx.strokeStyle = 'rgba(255,255,255,0.02)';
      for (let y = 0; y < canvas.height; y += 2) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      
      // Draw N64 logo placeholder
      ctx.fillStyle = '#e23636';
      ctx.font = 'bold 48px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('N64', canvas.width / 2, canvas.height / 2 - 40);
      
      ctx.fillStyle = '#4a9eff';
      ctx.font = '18px Arial';
      ctx.fillText('RetroPlay64 Emulator', canvas.width / 2, canvas.height / 2 + 10);
      
      ctx.fillStyle = '#888';
      ctx.font = '14px Arial';
      ctx.fillText('Load a legally obtained ROM to begin', canvas.width / 2, canvas.height / 2 + 50);
    } else if (!isRunning) {
      // ROM loaded but paused
      ctx.fillStyle = '#1a1a2e';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#4ade80';
      ctx.font = 'bold 24px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('ROM Loaded', canvas.width / 2, canvas.height / 2 - 30);
      
      ctx.fillStyle = '#fff';
      ctx.font = '16px Arial';
      ctx.fillText(romName, canvas.width / 2, canvas.height / 2 + 10);
      
      ctx.fillStyle = '#888';
      ctx.font = '14px Arial';
      ctx.fillText('Press START to play', canvas.width / 2, canvas.height / 2 + 50);
    } else {
      // Simulated running state with animation
      let frame = 0;
      const animate = () => {
        if (!isRunning) return;
        
        // Create a demo pattern
        const imageData = ctx.createImageData(canvas.width, canvas.height);
        for (let i = 0; i < imageData.data.length; i += 4) {
          const x = (i / 4) % canvas.width;
          const y = Math.floor((i / 4) / canvas.width);
          const wave = Math.sin((x + frame) * 0.05) * Math.cos((y + frame) * 0.05);
          
          imageData.data[i] = Math.floor(128 + wave * 60);     // R
          imageData.data[i + 1] = Math.floor(80 + wave * 40);  // G
          imageData.data[i + 2] = Math.floor(180 + wave * 50); // B
          imageData.data[i + 3] = 255;                          // A
        }
        ctx.putImageData(imageData, 0, 0);
        
        // Overlay info
        ctx.fillStyle = 'rgba(0,0,0,0.7)';
        ctx.fillRect(10, 10, 200, 60);
        ctx.fillStyle = '#4ade80';
        ctx.font = '12px monospace';
        ctx.textAlign = 'left';
        ctx.fillText(`ROM: ${romName.slice(0, 20)}`, 20, 30);
        ctx.fillText(`Frame: ${frame}`, 20, 48);
        ctx.fillText('Demo Mode - No actual emulation', 20, 62);
        
        frame++;
        requestAnimationFrame(animate);
      };
      animate();
    }
  }, [isRunning, romLoaded, romName]);

  return (
    <div className="relative">
      <div className="absolute -inset-2 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-xl opacity-75 blur-sm"></div>
      <div className="relative bg-black p-3 rounded-xl">
        <canvas
          ref={canvasRef}
          width={640}
          height={480}
          className="w-full max-w-[640px] rounded-lg border-4 border-gray-800"
          style={{ imageRendering: 'pixelated' }}
        />
      </div>
    </div>
  );
}
