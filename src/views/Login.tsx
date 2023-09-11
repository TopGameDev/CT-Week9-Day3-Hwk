import { useState } from "react"
import { useNavigate } from "react-router-dom"
import CategoryType from "../types/category"
import UserType from "../types/user"
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { login, getMe } from "../lib/apiWrapper"

type Props = {
    isLoggedIn: boolean,
    logUserIn: (user:UserType) => void,
    flashMessage: (message: string|null, category: CategoryType|null) => void, 
}

export default function Login({ isLoggedIn, logUserIn, flashMessage }: Props) {
  const [user, setUser] = useState<Partial<UserType>>({email: '', password: ''});
  
  const navigate = useNavigate();

  if (isLoggedIn){
    navigate('/')
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUser({...user, [e.target.name]: e.target.value})
  };

  const handleFormSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    const response = await login(user.email!, user.password!)
    if (response.error){
        flashMessage(response.error, 'danger')
    } else {
        localStorage.setItem('token', response.data?.token as string)
        localStorage.setItem('tokenExp', response.data?.tokenExpiration as string)
        const userResponse = await getMe(response.data?.token as string)
        logUserIn(userResponse.data!);
        navigate('/')
    }
  }

  const validPassword = (password:string):boolean => password.length > 7


  return (
    <>
        <h1 className = 'text-center'>Log In</h1>
        <Card className='mt-3'>
            <Card.Body>
                <Form onSubmit={handleFormSubmit}>
                    <Form.Label>Email</Form.Label>
                    <Form.Control name='email' value={user.email} onChange={handleInputChange}/>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' name="password" value={user.password} onChange={handleInputChange}/>
                    <Button type="submit" variant="outline-primary" className="w-100 mt-3" disabled={!validPassword(user.password!)}>Log In</Button>
                </Form>
            </Card.Body>
        </Card>
    </>
  )
}