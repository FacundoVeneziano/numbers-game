"use client"

import { useState } from "react"
import { Header } from "@/components/header"

import { GuessHistory } from "@/components/guess-history"
import { NewGuess } from "@/components/new-guess"
import { SecretCode } from "./secret-code"
import { GameControls } from "./game-control"
import { VictoryModal } from "./victory-modal"


export type Guess = {
  id: number
  digits: string[]
  feedback: ("correct" | "wrong-position" | "incorrect")[]
}

export function NumberGuessingGame() {
  const [secretCode, setSecretCode] = useState<string[]>(Array(5).fill(""))
  const [guesses, setGuesses] = useState<Guess[]>([])
  const [currentGuess, setCurrentGuess] = useState<string[]>(Array(5).fill(""))
  const [isVictory, setIsVictory] = useState(false)
  const [isSecretSet, setIsSecretSet] = useState(false)
  const [showVictory, setShowVictory] = useState(false)

  const handleSecretCodeChange = (index: number, value: string) => {
    const newSecretCode = [...secretCode]
    newSecretCode[index] = value
    setSecretCode(newSecretCode)
  }

  const handleSecretCodeSubmit = () => {
    if (secretCode.every((digit) => digit !== "")) {
      setIsSecretSet(true)
    }
  }

  const handleCurrentGuessChange = (index: number, value: string) => {
    const newGuess = [...currentGuess]
    newGuess[index] = value
    setCurrentGuess(newGuess)
  }

  const handleAddGuess = () => {
    if (currentGuess.some((digit) => digit === "")) return

    const feedback = currentGuess.map((digit, index) => {
      if (digit === secretCode[index]) return "correct"
      if (secretCode.includes(digit)) return "wrong-position"
      return "incorrect"
    })

    const newGuess: Guess = {
      id: Date.now(),
      digits: [...currentGuess],
      feedback,
    }

    setGuesses([...guesses, newGuess])
    setCurrentGuess(Array(5).fill(""))

    // Check for victory
    if (feedback.every((f) => f === "correct")) {
      setIsVictory(true)
      setShowVictory(true)
    }
  }

  const handleReset = () => {
    setSecretCode(Array(5).fill(""))
    setGuesses([])
    setCurrentGuess(Array(5).fill(""))
    setIsVictory(false)
    setIsSecretSet(false)
    setShowVictory(false)
  }

  return (
    <div className="max-w-md mx-auto space-y-8">
      <Header />

      {!isSecretSet ? (
        <SecretCode
          secretCode={secretCode}
          onSecretCodeChange={handleSecretCodeChange}
          onSubmit={handleSecretCodeSubmit}
        />
      ) : (
        <>
          <div className="space-y-8">
            <GuessHistory guesses={guesses} />

            {!isVictory && <NewGuess currentGuess={currentGuess} onCurrentGuessChange={handleCurrentGuessChange} />}

            <GameControls
              onAddGuess={handleAddGuess}
              onReset={handleReset}
              isGuessComplete={currentGuess.every((digit) => digit !== "")}
              isVictory={isVictory}
            />
          </div>

          {showVictory && (
            <VictoryModal onClose={() => setShowVictory(false)} secretCode={secretCode} attempts={guesses.length} />
          )}
        </>
      )}
    </div>
  )
}

