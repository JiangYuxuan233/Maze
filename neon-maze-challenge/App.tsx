
import React, { useState, useCallback } from 'react';
import { GameStatus, GameState } from './types';
import { LEVELS } from './constants';
import MazeBoard from './components/MazeBoard';
import GameUI from './components/GameUI';
import { getGameCommentary } from './services/geminiService';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    currentLevelIndex: 0,
    status: GameStatus.SELECTING, // Start with level selection
    commentary: "Choose your path, operative.",
    isAIThinking: false
  });

  const updateCommentary = useCallback(async (outcome: 'win' | 'lose' | 'start' | 'complete') => {
    setGameState(prev => ({ ...prev, isAIThinking: true }));
    const currentLevel = LEVELS[gameState.currentLevelIndex];
    const text = await getGameCommentary(outcome, currentLevel.name, currentLevel.id);
    setGameState(prev => ({ ...prev, commentary: text, isAIThinking: false }));
  }, [gameState.currentLevelIndex]);

  const handleSelectLevel = useCallback((index: number) => {
    setGameState(prev => ({
      ...prev,
      currentLevelIndex: index,
      status: GameStatus.IDLE
    }));
  }, []);

  const handlePrepareGame = useCallback(() => {
    setGameState(prev => ({ ...prev, status: GameStatus.READY }));
  }, []);

  const handleActualStart = useCallback(() => {
    if (gameState.status !== GameStatus.READY) return;
    setGameState(prev => ({ ...prev, status: GameStatus.PLAYING }));
    updateCommentary('start');
  }, [gameState.status, updateCommentary]);

  const handleGameOver = useCallback(() => {
    if (gameState.status !== GameStatus.PLAYING) return;
    setGameState(prev => ({ ...prev, status: GameStatus.GAMEOVER }));
    updateCommentary('lose');
  }, [gameState.status, updateCommentary]);

  const handleLevelComplete = useCallback(() => {
    if (gameState.status !== GameStatus.PLAYING) return;
    
    if (gameState.currentLevelIndex === LEVELS.length - 1) {
      setGameState(prev => ({ ...prev, status: GameStatus.ALL_COMPLETE }));
      updateCommentary('complete');
    } else {
      setGameState(prev => ({ ...prev, status: GameStatus.LEVEL_COMPLETE }));
      updateCommentary('win');
    }
  }, [gameState.status, gameState.currentLevelIndex, updateCommentary]);

  const handleNextLevel = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      currentLevelIndex: Math.min(prev.currentLevelIndex + 1, LEVELS.length - 1),
      status: GameStatus.IDLE
    }));
  }, []);

  const handleRetry = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      status: GameStatus.IDLE
    }));
  }, []);

  const handleGoToMenu = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      status: GameStatus.SELECTING
    }));
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500 rounded-full blur-[120px]"></div>
      </div>

      <div className="z-10 text-center mb-6">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-2">
          NEON MAZE: OVERDRIVE
        </h1>
        {gameState.status !== GameStatus.SELECTING && (
          <div className="flex items-center justify-center gap-4 text-slate-400 font-mono text-sm">
            <span>LEVEL {gameState.currentLevelIndex + 1}: {LEVELS[gameState.currentLevelIndex].name}</span>
            <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
            <span className="text-cyan-400">{LEVELS[gameState.currentLevelIndex].difficulty}</span>
          </div>
        )}
      </div>

      <div className="relative z-10 w-full max-w-4xl aspect-[8/3] bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
        {gameState.status !== GameStatus.SELECTING ? (
          <MazeBoard 
            level={LEVELS[gameState.currentLevelIndex]}
            status={gameState.status}
            onFail={handleGameOver}
            onWin={handleLevelComplete}
            onStart={handleActualStart}
          />
        ) : null}
        
        <GameUI 
          gameState={gameState}
          onPrepare={handlePrepareGame}
          onNext={handleNextLevel}
          onRestart={handleRetry}
          onMenu={handleGoToMenu}
          onSelectLevel={handleSelectLevel}
        />
      </div>

      <div className="z-10 mt-6 max-w-2xl text-center">
        <div className="flex items-center justify-center gap-3 mb-1">
          <div className={`w-2 h-2 rounded-full ${gameState.isAIThinking ? 'bg-cyan-400 animate-ping' : 'bg-cyan-400/50'}`}></div>
          <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500">System Feedback</p>
        </div>
        <p className={`text-base italic text-slate-300 font-medium transition-opacity duration-300 ${gameState.isAIThinking ? 'opacity-50' : 'opacity-100'}`}>
          "{gameState.commentary}"
        </p>
      </div>

      {gameState.status !== GameStatus.SELECTING && (
        <button 
          onClick={handleGoToMenu}
          className="z-10 mt-4 text-slate-500 hover:text-slate-300 text-xs font-mono uppercase tracking-widest transition-colors"
        >
          [ Exit to Menu ]
        </button>
      )}
    </div>
  );
};

export default App;
