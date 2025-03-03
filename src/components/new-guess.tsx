import type React from "react"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface NewGuessProps {
  currentGuess: string[]
  onCurrentGuessChange: (index: number, value: string) => void
}

export function NewGuess({ currentGuess, onCurrentGuessChange }: NewGuessProps) {
  const handleInputChange = (index: number, value: string) => {
    // Only allow digits
    if (/^\d?$/.test(value)) {
      onCurrentGuessChange(index, value)

      // Auto-focus next input if a digit was entered
      if (value && index < 4) {
        const nextInput = document.getElementById(`guess-${index + 1}`)
        if (nextInput) nextInput.focus()
      }
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !currentGuess[index] && index > 0) {
      // Move to previous input on backspace if current is empty
      const prevInput = document.getElementById(`guess-${index - 1}`)
      if (prevInput) prevInput.focus()
    }
  }

  return (
    <Card className="border border-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Make a Guess</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center gap-2">
          {currentGuess.map((digit, index) => (
            <Input
              key={index}
              id={`guess-${index}`}
              type="text"
              inputMode="numeric"
              value={digit}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-12 text-center text-lg font-bold border-2 focus:border-primary focus:ring-primary transition-all"
              maxLength={1}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

