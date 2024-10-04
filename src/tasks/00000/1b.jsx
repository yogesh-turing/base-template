import React, { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const charPairs = ["OQ", "JI", "MN", "MW", "UV", "DB"];

function generateBoard(n, pair) {
  const board = Array(n * n).fill(pair[0]);
  const randomIndex = Math.floor(Math.random() * board.length);
  board[randomIndex] = pair[1];
  return board;
}

function Board({ size, onCellClick, board }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
      {board.map((char, index) => (
        <div 
          key={index} 
          className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center border border-gray-300 rounded text-lg font-bold cursor-pointer"
          style={{ width: '30px', height: '30px' }}
          onClick={() => onCellClick(char, index)}
        >
          {char}
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const [n, setN] = useState(3);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [board, setBoard] = useState([]);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(4);
  const [currentPair, setCurrentPair] = useState('');

  useEffect(() => {
    let interval = null;
    if (isGameStarted && timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      resetGame();
    }
    return () => clearInterval(interval);
  }, [timer, isGameStarted]);

  const startGame = () => {
    if (n >= 3 && n <= 10) {
      setIsGameStarted(true);
      const pair = charPairs[Math.floor(Math.random() * charPairs.length)];
      setCurrentPair(pair);
      setBoard(generateBoard(n, pair));
    }
  };

  const resetGame = useCallback(() => {
    const newPair = charPairs[Math.floor(Math.random() * charPairs.length)];
    setCurrentPair(newPair);
    setBoard(generateBoard(n, newPair));
    setTimer(4);
  }, [n]);

  const handleCellClick = (char, index) => {
    if (!isGameStarted || timer === 0) return;

    const newBoard = [...board];
    if (char === currentPair[1]) {
      newBoard[index] = <span style={{ backgroundColor: 'green' }}>{char}</span>;
      setScore(score + 1);
      setBoard(newBoard);
      setTimeout(resetGame, 500);
    } else {
      newBoard[index] = <span style={{ backgroundColor: 'red' }}>{char}</span>;
      setBoard(newBoard);
      setTimeout(() => {
        const resetBoard = [...board];
        resetBoard[index] = char;
        setBoard(resetBoard);
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Odd Character Out</CardTitle>
        </CardHeader>
        <CardContent>
          {!isGameStarted ? (
            <>
              <input 
                type="number" 
                value={n} 
                onChange={(e) => setN(Math.min(Math.max(Number(e.target.value), 3), 10))} 
                className="mb-4 p-2 border border-gray-300 rounded w-full"
              />
              <Button onClick={startGame}>Start Game</Button>
            </>
          ) : (
            <>
              <Board size={n} board={board} onCellClick={handleCellClick} />
              <div className="mt-4 flex justify-between w-full">
                <div>Score: {score}</div>
                <div>Time: {timer}</div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}