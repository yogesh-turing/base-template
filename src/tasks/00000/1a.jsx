import React, { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const charPairs = ["OQ", "JI", "MN", "MW", "UV", "DB"];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

const GameBoard = () => {
    const [n, setN] = useState(0);
    const [board, setBoard] = useState([]);
    const [oddIndex, setOddIndex] = useState(null);
    const [score, setScore] = useState(0);
    const [timer, setTimer] = useState(4);
    const [gameActive, setGameActive] = useState(false);
    const [selectedPair, setSelectedPair] = useState('');

    const startGame = useCallback((size) => {
        if (size < 3 || size > 10) return;
        setN(size);
        const pair = charPairs[Math.floor(Math.random() * charPairs.length)];
        setSelectedPair(pair);
        let newBoard = Array(size * size).fill(pair[0]);
        let odd = Math.floor(Math.random() * newBoard.length);
        newBoard[odd] = pair[1];
        shuffleArray(newBoard);
        setBoard(newBoard);
        setOddIndex(odd);
        setGameActive(true);
        setTimer(4);
        setScore(0);
    }, []);

    useEffect(() => {
        let interval = null;
        if (gameActive && timer > 0) {
            interval = setInterval(() => {
                setTimer(prevTimer => prevTimer - 1);
            }, 1000);
        } else if (timer === 0) {
            resetGame();
        }
        return () => clearInterval(interval);
    }, [gameActive, timer]);

    const handleBoxClick = (index) => {
        if (!gameActive) return;
        if (index === oddIndex) {
            setScore(score + 1);
            setBoard(prev => prev.map((char, i) => i === index ? { ...char, correct: true } : char));
            setTimeout(resetGame, 1000);
        } else {
            setBoard(prev => prev.map((char, i) => i === index ? { ...char, wrong: true } : char));
            setTimeout(() => {
                setBoard(prev => prev.map((char, i) => i === index ? { ...char, wrong: false } : char));
            }, 1000);
        }
    };

    const resetGame = () => {
        startGame(n);
    };

    return (
        <div className="flex flex-col items-center p-4 space-y-4">
            {!gameActive ? (
                <>
                    <Input 
                        type="number" 
                        placeholder="Enter size (3-10)" 
                        onChange={(e) => setN(Number(e.target.value))} 
                        value={n}
                        className="w-64"
                    />
                    <Button onClick={() => startGame(n)}>Start Game</Button>
                </>
            ) : (
                <>
                    <div className="text-lg">Score: {score}</div>
                    <div className="grid grid-cols-{n} gap-1" style={{ gridTemplateColumns: `repeat(${n}, 30px)` }}>
                        {board.map((char, index) => (
                            <div 
                                key={index} 
                                className={`w-7 h-7 flex items-center justify-center border ${board[index]?.correct ? 'bg-green-500' : (board[index]?.wrong ? 'bg-red-500' : 'bg-gray-200')}`}
                                onClick={() => handleBoxClick(index)}
                            >
                                {char}
                            </div>
                        ))}
                    </div>
                    <div>Time left: {timer}</div>
                </>
            )}
        </div>
    );
};

export default function App() {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
                <h1 className="text-2xl mb-4 text-center">Odd Character Out</h1>
                <GameBoard />
            </div>
        </div>
    );
}