import QuestionType from "../types/question"

type QuestionCardProps = {
    question: QuestionType
}

export default function QuestionCard({ question }: QuestionCardProps) {
  return (
    <div className="question-card text-center">
      <div>
        <h3>{question.question}</h3>
        <h5>By {question.author}</h5>
        <p>{question.created_on}</p>
      </div>      
    </div>
  )
}