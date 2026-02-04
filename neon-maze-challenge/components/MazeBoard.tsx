
import React, { useRef, useEffect } from 'react';
import { Level, GameStatus } from '../types';

interface MazeBoardProps {
  level: Level;
  status: GameStatus;
  onFail: () => void;
  onWin: () => void;
  onStart: () => void;
}

const MazeBoard: React.FC<MazeBoardProps> = ({ level, status, onFail, onWin, onStart }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDeathZone = () => {
    if (status === GameStatus.PLAYING) {
      onFail();
    }
  };

  const handleGoalEnter = () => {
    if (status === GameStatus.PLAYING) {
      onWin();
    }
  };

  const handleStartEnter = () => {
    if (status === GameStatus.READY) {
      onStart();
    }
  };

  useEffect(() => {
    const handleContext = (e: MouseEvent) => e.preventDefault();
    document.addEventListener('contextmenu', handleContext);
    return () => document.removeEventListener('contextmenu', handleContext);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="w-full h-full relative cursor-crosshair select-none bg-slate-950"
      onMouseEnter={handleDeathZone}
    >
      <svg 
        viewBox={level.viewBox} 
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Death Zone: Background */}
        <rect 
          x="-500" y="-500" width="2000" height="2000" 
          fill="transparent" 
          onMouseEnter={handleDeathZone}
          onMouseMove={handleDeathZone}
        />

        {/* The Safe Path */}
        <path
          d={level.path}
          fill="none"
          stroke="currentColor"
          strokeWidth={level.pathWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-slate-900 transition-colors duration-500"
          onMouseEnter={(e) => e.stopPropagation()} 
          onMouseMove={(e) => e.stopPropagation()}
        />

        {/* Path Visual Styling */}
        <path
          d={level.path}
          fill="none"
          stroke="currentColor"
          strokeWidth={level.pathWidth - 2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`${
            status === GameStatus.PLAYING ? 'text-blue-500/10' : 'text-slate-800/10'
          } pointer-events-none`}
        />

        {/* Obstacles (Danger Zones) */}
        {level.obstacles.map((obs, i) => (
          <g key={i}>
            {obs.type === 'rect' ? (
              <rect
                x={obs.x}
                y={obs.y}
                width={obs.width}
                height={obs.height}
                className="fill-red-500/80 stroke-red-400 stroke-2 cursor-crosshair"
                style={{ filter: 'drop-shadow(0 0 5px #ef4444)' }}
                onMouseEnter={handleDeathZone}
                onMouseMove={handleDeathZone}
              />
            ) : (
              <circle
                cx={obs.x}
                cy={obs.y}
                r={obs.r}
                className="fill-red-500/80 stroke-red-400 stroke-2 cursor-crosshair"
                style={{ filter: 'drop-shadow(0 0 5px #ef4444)' }}
                onMouseEnter={handleDeathZone}
                onMouseMove={handleDeathZone}
              />
            )}
          </g>
        ))}

        {/* Start Point */}
        <circle
          cx={level.startPos.x}
          cy={level.startPos.y}
          r={25}
          className={`
            transition-all duration-300 stroke-2 cursor-pointer
            ${status === GameStatus.READY ? 'fill-blue-500/40 stroke-blue-400 animate-pulse' : 'fill-blue-500/20 stroke-blue-400'}
          `}
          onMouseEnter={handleStartEnter}
          onMouseMove={(e) => {
            e.stopPropagation();
            handleStartEnter();
          }}
        />
        <text
          x={level.startPos.x}
          cy={level.startPos.y}
          textAnchor="middle"
          dy=".3em"
          className="fill-blue-400 text-[8px] font-bold pointer-events-none select-none uppercase tracking-tighter"
        >
          {status === GameStatus.READY ? 'GO' : 'START'}
        </text>

        {/* End Point (Goal) */}
        <circle
          cx={level.endPos.x}
          cy={level.endPos.y}
          r={25}
          className={`
            transition-all duration-300
            ${status === GameStatus.PLAYING ? 'fill-emerald-500/40 stroke-emerald-400 animate-pulse' : 'fill-slate-800 stroke-slate-700'}
            stroke-2 cursor-pointer
          `}
          onMouseEnter={handleGoalEnter}
          onMouseMove={(e) => {
            e.stopPropagation();
            handleGoalEnter();
          }}
        />
        <text
          x={level.endPos.x}
          cy={level.endPos.y}
          textAnchor="middle"
          dy=".3em"
          className="fill-emerald-400 text-[8px] font-bold pointer-events-none select-none uppercase tracking-tighter"
        >
          GOAL
        </text>
      </svg>
    </div>
  );
};

export default MazeBoard;
