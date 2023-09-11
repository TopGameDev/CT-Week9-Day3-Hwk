import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import UserType from '../types/user'
import CategoryType from '../types/category'
import { editUserByToken, deleteUserByToken } from '../lib/apiWrapper'

type EditUserProps = {
    flashMessage: (message: string|null, category: CategoryType|null) => void,
    isLoggedIn:boolean
}

export default function EditUser({flashMessage, isLoggedIn}: EditUserProps) {
    const navigate = useNavigate();

    const [userToEdit, setUserToEdit] = useState<UserType|null>(null);
    const [showModal, setShowModal] = useState(false);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    useEffect(() => {
        async function getUser(){
            let token = localStorage.getItem('token') || ''
            let response = await editUserByToken(token, userToEdit!);
            if (response.error){
                flashMessage(response.error, 'danger')
                navigate('/')
            } else {
                setUserToEdit(response.data!)
            }
        }
        getUser()
    }, [flashMessage, navigate])

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserToEdit({...userToEdit, [event.target.name]: event.target.value} as UserType)
    }

    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        let token = localStorage.getItem('token') || ''
        let response = await editUserByToken(token, userToEdit!);
        if (response.error){
            flashMessage(response.error, 'danger')
        } else {
            flashMessage(`User has been updated`, 'success')
            navigate('/')
        }
    }

    const handleDeleteUser = async () => {
        const token = localStorage.getItem('token') || ''
        const response = await deleteUserByToken(token);
        if (response.error){
            flashMessage(response.error, 'danger')
        } else {
            flashMessage(response.data!, 'primary')
            navigate('/')
        }
    }

  return (
    <>
        {isLoggedIn && <h1 className="text-center">Register</h1>}
        {isLoggedIn && <Card className='mt-3'>
            <Card.Body>
                <Form onSubmit={handleFormSubmit}>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control name='first_name' value={userToEdit?.first_name} onChange={handleInputChange}/>

                    <Form.Label>Last Name</Form.Label>
                    <Form.Control name='last_name' value={userToEdit?.last_name} onChange={handleInputChange}/>

                    <Form.Label>Email</Form.Label>
                    <Form.Control name='email' type='email' value={userToEdit?.email} onChange={handleInputChange}/>

                    <Form.Label>Password</Form.Label>
                    <Form.Control name='password' type='password' value={userToEdit?.password} onChange={handleInputChange}/>

                    <Button type='submit' variant='success' className='w-100 mt-3'>Edit User</Button>
                    <Button variant='danger' className='w-100 mt-3' onClick={openModal}>Delete User</Button>
                </Form>
            </Card.Body>
        </Card>}
        <Modal show={showModal} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>Delete {userToEdit?.email}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to delete? This action cannot be undone.
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>Close</Button>
                <Button variant="danger" onClick={handleDeleteUser}>Delete Post</Button>
            </Modal.Footer>
        </Modal>
    </>
  )
}