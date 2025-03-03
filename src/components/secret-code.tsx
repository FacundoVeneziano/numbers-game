import type React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"

interface SecretCodeProps {
  secretCode: string[]
  onSecretCodeChange: (index: number, value: string) => void
  onSubmit: () => void
}

export function SecretCode({ secretCode, onSecretCodeChange, onSubmit }: SecretCodeProps) {
  const handleInputChange = (index: number, value: string) => {
    // Only allow digits
    if (/^\d?$/.test(value)) {
      onSecretCodeChange(index, value)

      // Auto-focus next input if a digit was entered
      if (value && index < 4) {
        const nextInput = document.getElementById(`secret-${index + 1}`)
        if (nextInput) nextInput.focus()
      }
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !secretCode[index] && index > 0) {
      // Move to previous input on backspace if current is empty
      const prevInput = document.getElementById(`secret-${index - 1}`)
      if (prevInput) prevInput.focus()
    }
  }

  const isComplete = secretCode.every((digit) => digit !== "")

  return (
    <Card className="border-2 border-primary/20 shadow-lg animate-fadeIn">
      <CardHeader>
        <CardTitle className="text-xl text-center">Set Your Secret Code</CardTitle>
        <CardDescription className="text-center">Enter a 5-digit code for others to guess</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center gap-2">
          {secretCode.map((digit, index) => (
            <Input
              key={index}
              id={`secret-${index}`}
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
      <CardFooter className="flex justify-center">
        <Button onClick={onSubmit} disabled={!isComplete} className="w-full transition-all">
          Start Game
        </Button>
      </CardFooter>
    </Card>
  )
}

