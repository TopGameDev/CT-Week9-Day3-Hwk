import QuestionType from "../types/question"
import { Link } from "react-router-dom"
import Button from "react-bootstrap/Button"

type MyQuestionCardProps = {
    myquestion: QuestionType
}

export default function MyQuestionCard({ myquestion }: MyQuestionCardProps) {
  return (
    <div className="question-card text-center">
      <div>
        <h3>{myquestion.question}</h3>
        <h5>By {myquestion.author}</h5>
        <p>{myquestion.created_on}</p>
        <Link to={`/question/${myquestion.id}`}>
            <Button variant='success'>Edit Post</Button>
        </Link>
      </div>      
    </div>
  )
}