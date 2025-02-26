"use client";

import { useState } from "react";

export default function NumberGame() {
  const [secretCode, setSecretCode] = useState(["", "", "", "", ""]);
  const [guesses, setGuesses] = useState<{ value: string; color: string }[][]>([]);
  const [gameWon, setGameWon] = useState(false);

  // Manejar cambios en el código secreto
  const handleSecretChange = (index: number, value: string) => {
    if (/^\d?$/.test(value)) {
      const newSecret = [...secretCode];
      newSecret[index] = value;
      setSecretCode(newSecret);
    }
  };

  // Agregar un nuevo intento
  const addGuess = () => {
    const newGuess = Array(5).fill(null).map(() => ({ value: "", color: "bg-gray-200" }));
    setGuesses([...guesses, newGuess]);
  };

  // Manejar cambios en un intento
  const handleGuessChange = (guessIndex: number, digitIndex: number, value: string) => {
    if (/^\d?$/.test(value)) {
      const newGuesses = [...guesses];
      newGuesses[guessIndex][digitIndex] = { ...newGuesses[guessIndex][digitIndex], value };
      setGuesses(newGuesses);
      checkWin(newGuesses);
    }
  };

  // Cambiar color de una casilla individual
  const toggleColor = (guessIndex: number, digitIndex: number) => {
    const newGuesses = [...guesses];
    const currentColor = newGuesses[guessIndex][digitIndex].color;
    const colors = ["bg-gray-200", "bg-red-500", "bg-yellow-500", "bg-green-500"];
    const nextColorIndex = (colors.indexOf(currentColor) + 1) % colors.length;
    newGuesses[guessIndex][digitIndex] = {
      ...newGuesses[guessIndex][digitIndex],
      color: colors[nextColorIndex],
    };
    setGuesses(newGuesses);
    checkWin(newGuesses);
  };

  // Verificar si ganaste
  const checkWin = (currentGuesses: { value: string; color: string }[][]) => {
    const lastGuess = currentGuesses[currentGuesses.length - 1];
    if (lastGuess && lastGuess.every((digit) => digit.color === "bg-green-500")) {
      setGameWon(true);
    }
  };

  // Reiniciar el juego
  const resetGame = () => {
    setSecretCode(["", "", "", "", ""]);
    setGuesses([]);
    setGameWon(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-100 p-4">
      {/* Título */}
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6 text-center">
        Juego de Números
      </h1>

      {/* Código secreto */}
      <div className="mb-8 w-full max-w-xs sm:max-w-sm">
        <h2 className="text-lg font-semibold text-gray-700 mb-2 text-center">Tu código secreto</h2>
        <div className="flex justify-center gap-2">
          {secretCode.map((digit, index) => (
            <input
              key={index}
              type="text"
              value={digit}
              onChange={(e) => handleSecretChange(index, e.target.value)}
              className="w-12 h-12 text-center text-xl border-2 border-gray-300 rounded bg-white text-gray-800 focus:outline-none focus:border-blue-500"
              maxLength={1}
              disabled={gameWon}
            />
          ))}
        </div>
      </div>

      {/* Intentos */}
      <div className="w-full max-w-xs sm:max-w-sm">
        <h2 className="text-lg font-semibold text-gray-700 mb-2 text-center">Tus intentos</h2>
        {guesses.map((guess, guessIndex) => (
          <div key={guessIndex} className="flex justify-center gap-2 mb-2">
            {guess.map((digit, digitIndex) => (
              <div
                key={digitIndex}
                className={`w-12 h-12 flex items-center justify-center text-xl border-2 border-gray-300 rounded cursor-pointer ${digit.color}`}
                onClick={() => !gameWon && toggleColor(guessIndex, digitIndex)}
              >
                <input
                  type="text"
                  value={digit.value}
                  onChange={(e) => handleGuessChange(guessIndex, digitIndex, e.target.value)}
                  className="w-full h-full text-center bg-transparent text-gray-800 focus:outline-none"
                  maxLength={1}
                  disabled={gameWon}
                />
              </div>
            ))}
          </div>
        ))}
        {!gameWon && (
          <button
            onClick={addGuess}
            className="mt-4 w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Agregar intento
          </button>
        )}
      </div>

      {/* Mensaje de victoria */}
      {gameWon && (
        <div className="mt-6 text-center">
          <h2 className="text-2xl font-bold text-green-600">¡Ganaste!</h2>
          <div className="mt-4 flex justify-center gap-4">
            <button
              onClick={() => setGameWon(false)}
              className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Ver historial
            </button>
            <button
              onClick={resetGame}
              className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Jugar de nuevo
            </button>
          </div>
        </div>
      )}

      {/* Botón de reiniciar siempre visible cuando no has ganado */}
      {!gameWon && guesses.length > 0 && (
        <button
          onClick={resetGame}
          className="mt-6 py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Reiniciar partida
        </button>
      )}
    </div>
  );
}
