import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { editQuestionById, deleteQuestionById } from "../lib/apiWrapper";
import QuestionType from "../types/question";
import CategoryType from "../types/category";
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'

type EditQuestionsProps = {
    flashMessage: (message: string|null, category: CategoryType|null) => void,
    isLoggedIn: boolean
}

export default function EditQuestion({ flashMessage, isLoggedIn }: EditQuestionsProps) {
    const [questionToEdit, setQuestionToEdit] = useState<QuestionType|null>(null);
    const [showModal, setShowModal] = useState(false);

    const { questionId } = useParams();
    const navigate = useNavigate();

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    useEffect(() => {
        async function getQuestion(){
            let token = localStorage.getItem('token') || ''
            let response = await editQuestionById(token, questionId!, questionToEdit!);
            if (response.error){
                flashMessage(response.error, 'danger')
                navigate('/')
            } else {
                setQuestionToEdit(response.data!)
            }
        }
        getQuestion()
    }, [flashMessage, navigate, questionId])

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuestionToEdit({...questionToEdit, [event.target.name]: event.target.value} as QuestionType)
    }

    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        let token = localStorage.getItem('token') || ''
        let response = await editQuestionById(token, questionId!, questionToEdit!);
        if (response.error){
            flashMessage(response.error, 'danger')
        } else {
            flashMessage(`Question with ID: ${questionId} has been Edited`, 'success')
            navigate('/allquestions')
        }
    }

    const handleDeleteQuestion = async () => {
        const token = localStorage.getItem('token') || ''
        const response = await deleteQuestionById(token, questionId!);
        if (response.error){
            flashMessage(response.error, 'danger')
        } else {
            flashMessage(response.data!, 'success')
            navigate('/allquestions')
        }
    }

  return (
    <>
    {isLoggedIn && <h1 className="text-center">Edit Question</h1>}
    {isLoggedIn && <Form onSubmit={handleFormSubmit}>
        <Form.Label>Question</Form.Label>
        <Form.Control name="question" onChange={handleInputChange} value={questionToEdit?.question} placeholder="Enter Question" />
        <Form.Label>Answer</Form.Label>
        <Form.Control name="answer" onChange={handleInputChange} value={questionToEdit?.answer} placeholder="Enter Answer"/>
        <Button className="mt-3 w-50" variant="warning" type="submit">Edit</Button>
        <Button className="mt-3 w-50" variant="danger" onClick={openModal}>Delete</Button>
    </Form>}
    <Modal show={showModal} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to delete? This action cannot be undone.
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>Close</Button>
                <Button variant="danger" onClick={handleDeleteQuestion}>Delete Post</Button>
            </Modal.Footer>
        </Modal>
    </>
  )
}