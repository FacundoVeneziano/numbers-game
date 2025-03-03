import { Button } from "@/components/ui/button"
import { RefreshCw, Check } from "lucide-react"

interface GameControlsProps {
  onAddGuess: () => void
  onReset: () => void
  isGuessComplete: boolean
  isVictory: boolean
}

export function GameControls({ onAddGuess, onReset, isGuessComplete, isVictory }: GameControlsProps) {
  return (
    <div className="flex gap-4">
      {!isVictory && (
        <Button onClick={onAddGuess} disabled={!isGuessComplete} className="flex-1 transition-all">
          <Check className="mr-2 h-4 w-4" />
          Submit Guess
        </Button>
      )}
      <Button variant="outline" onClick={onReset} className="transition-all">
        <RefreshCw className="mr-2 h-4 w-4" />
        Reset Game
      </Button>
    </div>
  )
}

