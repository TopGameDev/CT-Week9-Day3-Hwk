import { Routes, Route } from "react-router-dom"
import { useState } from "react"
import Container from "react-bootstrap/Container"
import Navigation from "./components/Navigation"
import AlertMessage from "./components/AlertMessage"
import Register from "./views/Register"
import Home from "./views/Home"
import CategoryType from "./types/category"
import UserType from "./types/user"
import Login from "./views/Login"
import EditUser from "./views/EditUser"
import AllQuestions from "./views/AllQuestions"
import MyQuestions from "./views/MyQuestions"
import EditQuestion from "./views/EditQuestion"

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState((localStorage.getItem('token') ? true : false))
  const [loggedInUser, setLoggedInUser] = useState<UserType|null>(null);


  const [message, setMessage] = useState<string|null>(null);
  const [category, setCategory] = useState<CategoryType|null>(null)

  const flashMessage = (newMessage:string|null, newCategory:CategoryType|null):void =>{
    setMessage(newMessage);
    setCategory(newCategory)
  }

  const logUserIn = (user:UserType): void => {
    setIsLoggedIn(true);
    setLoggedInUser(user);
    console.log(loggedInUser)
  }

  const logUserOut = (): void => {
    setIsLoggedIn(false);
    setLoggedInUser(null);
    localStorage.removeItem('token')
    localStorage.removeItem('tokenExp')
    flashMessage('You have logged out', 'info');
  }

  return (
    <div>
      <Navigation handleClick={logUserOut} isLoggedIn={isLoggedIn}/>
      <Container>
        {message && <AlertMessage category={category!} message={message} flashMessage={flashMessage}/>}
        <Routes>
          <Route path='/' element={<Home isLoggedIn={isLoggedIn} user={loggedInUser} />} />
          <Route path='/register' element={<Register logUserIn={logUserIn} flashMessage={flashMessage}/>} />
          <Route path='/login' element={<Login isLoggedIn={isLoggedIn} logUserIn={logUserIn} flashMessage={flashMessage}/>} />
          <Route path='/edituser' element={<EditUser flashMessage={flashMessage} isLoggedIn={isLoggedIn}/>} />
          <Route path='/allquestions' element={<AllQuestions isLoggedIn={isLoggedIn} />} />
          <Route path='/myquestions' element={<MyQuestions flashMessage={flashMessage} isLoggedIn={isLoggedIn} />} />
          <Route path='/question/:questionId' element={<EditQuestion flashMessage={flashMessage} isLoggedIn={isLoggedIn}/>} />
        </Routes>
      </Container>
    </div>
  )
}