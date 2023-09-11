import { useState, useEffect } from "react";
import { getMyQuestions, createQuestion } from "../lib/apiWrapper";
import MyQuestionCard from "../components/MyQuestionCard";
import QuestionType from "../types/question";
import CategoryType from "../types/category";
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

type MyQuestionsProps = {
    isLoggedIn: boolean,
    flashMessage: (message: string|null, category: CategoryType|null) => void,
}

export default function MyQuestions({ isLoggedIn, flashMessage }: MyQuestionsProps) {
    const [myQuestions, setMyQuestions] = useState<QuestionType[]>([])
    const [newQuestion, setNewQuestion] = useState<Partial<QuestionType>>({id: 170, answer: '', question: ''})

    useEffect(() => {
        async function myQuestions(){
            let token = localStorage.getItem('token') || ''
            const response = await getMyQuestions(token);
            console.log(response)
            if (response.data){
                setMyQuestions(response.data)
            }
        };
    
            myQuestions();
        }, [newQuestion.id])

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value, event.target.name)
        setNewQuestion({...newQuestion, [event.target.name]: event.target.value})
    }

    const handleFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
    
        // setPosts([...posts, newPost])
        const token = localStorage.getItem('token') || ''
        const response = await createQuestion(token, newQuestion!);
        if(response.error){
            flashMessage(response.error, 'danger')
        } else {
            setNewQuestion({id: myQuestions.length + 2, answer: '', question: ''})
            flashMessage(`${newQuestion.answer} has been created`, 'primary')
        }
    }

  return (
    <>
        {isLoggedIn && <h2 className="text-center">Questions</h2>}
        {isLoggedIn && <Form onSubmit={handleFormSubmit}>
            <Form.Label>Question</Form.Label>
            <Form.Control name="question" onChange={handleInputChange} value={newQuestion.question} placeholder="Enter Question" />
            <Form.Label>Answer</Form.Label>
            <Form.Control name="answer" onChange={handleInputChange} value={newQuestion.answer} placeholder="Enter Answer"/>
            <Button className="mt-3 w-100" variant="warning" type="submit">Create Question</Button>
        </Form>}
        {isLoggedIn && myQuestions.map(q => <MyQuestionCard myquestion={q} key={q.id}/>)}
    </>
  )
}