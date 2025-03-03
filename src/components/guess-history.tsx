import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { Guess } from "@/components/number-guessing-game"

interface GuessHistoryProps {
  guesses: Guess[]
}

export function GuessHistory({ guesses }: GuessHistoryProps) {
  if (guesses.length === 0) {
    return (
      <Card className="border border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Guess History</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground py-4">No guesses yet</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border border-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Guess History</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[200px] pr-4">
          <div className="space-y-3">
            {guesses.map((guess) => (
              <div key={guess.id} className="flex gap-2 p-2 border rounded-md animate-slideIn">
                <div className="flex gap-1 flex-1">
                  {guess.digits.map((digit, index) => (
                    <div
                      key={index}
                      className={`
                        w-8 h-8 flex items-center justify-center rounded-md font-bold text-sm
                        ${
                          guess.feedback[index] === "correct"
                            ? "bg-green-500 text-white"
                            : guess.feedback[index] === "wrong-position"
                              ? "bg-yellow-500 text-white"
                              : "bg-gray-200 dark:bg-gray-700 text-foreground"
                        }
                      `}
                    >
                      {digit}
                    </div>
                  ))}
                </div>
                <div className="text-xs text-muted-foreground self-center">
                  #{guesses.length - guesses.indexOf(guess)}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

