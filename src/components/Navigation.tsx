import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import { Link } from 'react-router-dom'

type Props = {
  isLoggedIn: boolean,
  handleClick: ()=>void
}

export default function Navigation({isLoggedIn, handleClick}: Props) {
  return (
    <Navbar bg='success' data-bs-theme='dark'>
            <Container>
                <Navbar.Brand as={Link} to='/'>Quiz Up</Navbar.Brand>
                <Nav className='me-auto'>
                  {isLoggedIn ? (
                      <>
                        <Nav.Link as={Link} to='/allquestions'>All Questions</Nav.Link>
                        <Nav.Link as={Link} to='/myquestions'>My Questions</Nav.Link>
                        <Nav.Link as={Link} to='/edituser'>Edit User</Nav.Link>
                        <Nav.Link as='button' onClick={handleClick}>Log Out</Nav.Link>
                      </>
                  ): (
                      <>
                        <Nav.Link as={Link} to='/register'>Sign Up</Nav.Link>
                        <Nav.Link as={Link} to='/login'>Log In</Nav.Link>
                      </>
                  )}
                </Nav>
            </Container>
        </Navbar>
  )
}