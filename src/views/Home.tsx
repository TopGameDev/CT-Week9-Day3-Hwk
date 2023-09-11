import { useState, useEffect } from "react";
import { getAllQuestions } from "../lib/apiWrapper";
import UserType from "../types/user";
import QuestionType from "../types/question";


type HomeProps = {
  isLoggedIn: boolean,
  user: UserType|null,
}

export default function Home({ user, isLoggedIn }: HomeProps) {
  const [questions, setQuestions] = useState<QuestionType[]>([])

  useEffect(() => {
    async function fetchData(){
        const response = await getAllQuestions();
        console.log(response)
        if (response.data){
            setQuestions(response.data)
        }

        // Using Axios
        // let response = await axios.get('https://cae-bookstore.herokuapp.com/question/all');
        // console.log(response)
        // setQuestions(response.data.questions)
    };

    fetchData();
}, [])

  return (
    <>
        {!isLoggedIn && <h1 className="text-center">Welcome {isLoggedIn ? user?.first_name + ' ' + user?.last_name : 'New Guy'}</h1>}
        {!isLoggedIn && <h3 className="text-center">Please Log In</h3>}
        {isLoggedIn && <h2 className="text-center">Do Something</h2>}
    </>
  )
}