import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import UserType from '../types/user'
import CategoryType from '../types/category'
import { register } from '../lib/apiWrapper'

type RegisterProps = {
  flashMessage: (message: string|null, category: CategoryType|null) => void,
}

export default function Register({ flashMessage }: RegisterProps) {
  const navigate = useNavigate()
  const [userFormData, setUserFormData] = useState<Partial<UserType>>(
    {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: '',

    }
  )

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
  setUserFormData({...userFormData, [e.target.name]: e.target.value})
}

const handleFormSubmit = async (e: React.FormEvent): Promise<void> => {
  e.preventDefault()
  let response = await register(userFormData)
  if (response.error) {
      flashMessage(response.error, 'danger')
  } else {
      flashMessage(`Enjoy your questions ${userFormData.firstName}`, 'success')
      console.log(userFormData)
      navigate('/')
  }
}

const validatePasswords = (password: string, confirmPassword: string) => {
  return (password.length > 5 && password === confirmPassword)
}

const validPasswords:boolean = validatePasswords(userFormData.password!, userFormData.confirmPassword!);

  return (
    <>
        <h1 className="text-center">Register</h1>
        <Card className='mt-3'>
            <Card.Body>
                <Form onSubmit={handleFormSubmit}>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control name='firstName' value={userFormData.firstName} onChange={handleInputChange}/>

                    <Form.Label>Last Name</Form.Label>
                    <Form.Control name='lastName' value={userFormData.lastName} onChange={handleInputChange}/>

                    <Form.Label>Email</Form.Label>
                    <Form.Control name='email' type='email' value={userFormData.email} onChange={handleInputChange}/>

                    <Form.Label>Password</Form.Label>
                    <Form.Control name='password' type='password' value={userFormData.password} onChange={handleInputChange}/>

                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control name='confirmPassword' type='password' value={userFormData.confirmPassword} onChange={handleInputChange}/>
                    {!validPasswords && <Form.Text>Your Password must be at least 6 characters long and must match</Form.Text>}
                    <Button type='submit' variant='outline-success' className='w-100 mt-3' disabled={!validPasswords}>Sign Up</Button>
                </Form>
            </Card.Body>
        </Card>
    </>
  )
}