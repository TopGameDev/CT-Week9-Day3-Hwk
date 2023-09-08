import { useState, useEffect } from "react";
import QuestionCard from "../components/QuestionCard";
import { getAllQuestions } from "../lib/apiWrapper";
// import UserType from "../types/user";
import QuestionType from "../types/question";


type HomeProps = {}

export default function Home({ }: HomeProps) {
  const [questions, setQuestions] = useState<QuestionType[]>([])

  useEffect(() => {
    async function fetchData(){
        const response = await getAllQuestions();
        console.log(response)
        if (response.data){
            setQuestions(response.data['questions'])
        }
    };

    fetchData();
}, [])

  return (
    <>
        <h1 className="text-center">Questions</h1>
        {questions.map(q => <QuestionCard question={q} key={q.id}/>)}
    </>
  )
}