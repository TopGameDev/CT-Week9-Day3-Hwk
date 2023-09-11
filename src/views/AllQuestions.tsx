import { useState, useEffect } from "react";
import { getAllQuestions } from "../lib/apiWrapper";
import QuestionCard from "../components/QuestionCard";
import QuestionType from "../types/question";

type AllQuestionsProps = {
  isLoggedIn: boolean
}

export default function AllQuestions({isLoggedIn}: AllQuestionsProps) {
    const [questions, setQuestions] = useState<QuestionType[]>([])

  useEffect(() => {
    async function fetchData(){
        const response = await getAllQuestions();
        console.log(response)
        if (response.data){
            setQuestions(response.data)
        }
    };

        fetchData();
    }, [])

  return (
    <>
        {isLoggedIn && <h2 className="text-center">Questions</h2>}
        {isLoggedIn && questions.map(q => <QuestionCard question={q} key={q.id}/>)}
    </>
  )
}