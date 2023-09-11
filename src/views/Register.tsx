import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import UserType from '../types/user'
import CategoryType from '../types/category'
import { register, login } from '../lib/apiWrapper'

type RegisterProps = {
  logUserIn: (user:UserType) => void
  flashMessage: (message: string|null, category: CategoryType|null) => void,
}

export default function Register({ flashMessage, logUserIn }: RegisterProps) {
  const navigate = useNavigate()
  const [userFormData, setUserFormData] = useState<Partial<UserType>>(
    {
      email: '',
      first_name: '',
      last_name: '',
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
      flashMessage(`Enjoy your questions ${userFormData.first_name}`, 'success')
      console.log(userFormData)
      const newUser = response.data
      let loginResponse = await login(userFormData.email!, userFormData.password!)
      localStorage.setItem('token', loginResponse.data?.token!)
      localStorage.setItem('tokenExp', loginResponse.data?.tokenExpiration!)
      logUserIn(newUser!);
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
                    <Form.Control name='first_name' value={userFormData.first_name} onChange={handleInputChange}/>

                    <Form.Label>Last Name</Form.Label>
                    <Form.Control name='last_name' value={userFormData.last_name} onChange={handleInputChange}/>

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