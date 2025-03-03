"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Trophy, X } from "lucide-react"
import Confetti from "react-confetti"

interface VictoryModalProps {
  onClose: () => void
  secretCode: string[]
  attempts: number
}

export function VictoryModal({ onClose, secretCode, attempts }: VictoryModalProps) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    // Set dimensions for confetti
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    })

    // Add event listener for window resize
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <>
      <Confetti
        width={dimensions.width}
        height={dimensions.height}
        recycle={false}
        numberOfPieces={500}
        gravity={0.2}
      />
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn">
        <div className="bg-background rounded-lg p-6 max-w-md w-full mx-4 shadow-xl border-2 border-primary animate-scaleIn">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center">
              <Trophy className="h-8 w-8 text-yellow-500 mr-2" />
              <h2 className="text-2xl font-bold text-primary">Victory!</h2>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>

          <div className="text-center mb-6">
            <p className="mb-4">
              Congratulations! You&apos;ve cracked the code in{" "}
              <span className="font-bold text-primary">
                {attempts} {attempts === 1 ? "attempt" : "attempts"}
              </span>
              !
            </p>

            <div className="flex justify-center gap-2 my-4">
              {secretCode.map((digit, index) => (
                <div
                  key={index}
                  className="w-10 h-10 flex items-center justify-center rounded-md bg-green-500 text-white font-bold text-lg"
                >
                  {digit}
                </div>
              ))}
            </div>

            <p className="text-sm text-muted-foreground">Can you do better next time?</p>
          </div>

          <Button onClick={onClose} className="w-full">
            Continue
          </Button>
        </div>
      </div>
    </>
  )
}

