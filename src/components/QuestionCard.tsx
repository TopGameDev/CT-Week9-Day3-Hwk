import { useState } from "react"
import QuestionType from "../types/question"
import Button from "react-bootstrap/Button"

type QuestionCardProps = {
    question: QuestionType
}

export default function QuestionCard({ question }: QuestionCardProps) {
  const [showAnswer, setShowAnswer] = useState(false)

  return (
    <div className="question-card text-center">
      <div>
        <h3>{question.question}</h3>
        <h5>By {question.author}</h5>
        <p>{question.created_on}</p>
        <Button variant="warning" onClick={() => setShowAnswer(!showAnswer)}>Answer</Button>
        {showAnswer && <p>{question.answer}</p>}
      </div>      
    </div>
  )
}