import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import { Link } from 'react-router-dom'

type Props = {}

export default function Navigation({}: Props) {
  return (
    <Navbar bg='success' data-bs-theme='dark'>
            <Container>
                <Navbar.Brand href='/'>Quiz Up</Navbar.Brand>
                <Nav className='me-auto'>
                    <Nav.Link as={Link} to='/'>Home</Nav.Link>
                    <Nav.Link as={Link} to='/register'>Sign Up</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
  )
}