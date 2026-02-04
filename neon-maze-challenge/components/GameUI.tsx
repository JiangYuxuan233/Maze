
import React from 'react';
import { GameState, GameStatus } from '../types';
import { LEVELS } from '../constants';

interface GameUIProps {
  gameState: GameState;
  onPrepare: () => void;
  onNext: () => void;
  onRestart: () => void;
  onMenu: () => void;
  onSelectLevel: (index: number) => void;
}

const GameUI: React.FC<GameUIProps> = ({ gameState, onPrepare, onNext, onRestart, onMenu, onSelectLevel }) => {
  const { status } = gameState;

  if (status === GameStatus.PLAYING || status === GameStatus.READY) return null;

  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center bg-slate-950/90 backdrop-blur-md transition-all duration-500 overflow-y-auto py-8">
      <div className="text-center p-8 w-full max-w-2xl animate-in fade-in zoom-in duration-300">
        
        {status === GameStatus.SELECTING && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <h2 className="col-span-full text-2xl font-bold text-white mb-6 uppercase tracking-widest">Select Operation</h2>
            {LEVELS.map((level, idx) => (
              <button
                key={level.id}
                onClick={() => onSelectLevel(idx)}
                className="group relative p-4 bg-slate-900 border border-slate-800 rounded-xl hover:border-cyan-500 transition-all hover:-translate-y-1 text-left"
              >
                <div className="text-slate-500 text-[10px] font-mono mb-1 uppercase">Phase {idx + 1}</div>
                <div className="text-white font-bold text-sm mb-1 group-hover:text-cyan-400 transition-colors">{level.name}</div>
                <div className={`text-[10px] font-mono px-2 py-0.5 rounded inline-block ${
                  level.difficulty === 'Extreme' ? 'bg-red-500/20 text-red-400' :
                  level.difficulty === 'Hard' ? 'bg-orange-500/20 text-orange-400' :
                  'bg-cyan-500/20 text-cyan-400'
                }`}>
                  {level.difficulty}
                </div>
              </button>
            ))}
          </div>
        )}

        {status === GameStatus.IDLE && (
          <>
            <h2 className="text-3xl font-bold text-white mb-4">{LEVELS[gameState.currentLevelIndex].name}</h2>
            <p className="text-slate-400 mb-8 max-w-sm mx-auto">
              The path is wide, but danger lurks within. Avoid the red obstacles and the dark void.
            </p>
            <div className="flex flex-col gap-3 items-center">
              <button 
                onClick={onPrepare}
                className="px-12 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-full transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(6,182,212,0.4)]"
              >
                ENGAGE SYSTEM
              </button>
              <button onClick={onMenu} className="text-slate-500 hover:text-slate-300 text-xs font-mono uppercase mt-4">
                Change Phase
              </button>
            </div>
          </>
        )}

        {status === GameStatus.GAMEOVER && (
          <>
            <div className="w-16 h-16 bg-red-500/20 border border-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl text-red-500 font-bold">!</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2 uppercase tracking-tighter">Transmission Interrupted</h2>
            <p className="text-slate-400 mb-8">Structural integrity compromised. Red zone detected.</p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <button 
                onClick={onRestart}
                className="px-8 py-3 bg-slate-100 hover:bg-white text-slate-950 font-bold rounded-full transition-all hover:scale-105"
              >
                RETRY PHASE
              </button>
              <button 
                onClick={onMenu}
                className="px-8 py-3 bg-slate-900 border border-slate-800 text-slate-300 hover:text-white font-bold rounded-full transition-all"
              >
                MAIN MENU
              </button>
            </div>
          </>
        )}

        {status === GameStatus.LEVEL_COMPLETE && (
          <>
            <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl text-emerald-500 font-bold">✓</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">PHASE COMPLETE</h2>
            <p className="text-slate-400 mb-8">Data successfully extracted. Proceeding to next node.</p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <button 
                onClick={onNext}
                className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-full transition-all hover:scale-105 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
              >
                CONTINUE
              </button>
              <button 
                onClick={onMenu}
                className="px-8 py-3 bg-slate-900 border border-slate-800 text-slate-300 hover:text-white font-bold rounded-full transition-all"
              >
                MENU
              </button>
            </div>
          </>
        )}

        {status === GameStatus.ALL_COMPLETE && (
          <>
            <div className="text-6xl mb-6">🎖️</div>
            <h2 className="text-4xl font-bold text-white mb-2">GRAND MASTER</h2>
            <p className="text-slate-400 mb-8">The Neon Nexus has been fully decrypted. You are the absolute operative.</p>
            <button 
              onClick={onMenu}
              className="px-12 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-full transition-all hover:scale-105 shadow-[0_0_30px_rgba(139,92,246,0.5)]"
            >
              MISSION REPORT
            </button>
          </>
        )}

      </div>
    </div>
  );
};

export default GameUI;
