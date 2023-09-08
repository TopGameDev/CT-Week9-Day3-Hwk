import { Routes, Route } from "react-router-dom"
import { useState } from "react"
import Container from "react-bootstrap/Container"
import Navigation from "./components/Navigation"
import AlertMessage from "./components/AlertMessage"
import Register from "./views/Register"
import Home from "./views/Home"
import CategoryType from "./types/category"

export default function App() {
  const [message, setMessage] = useState<string|null>(null);
  const [category, setCategory] = useState<CategoryType|null>(null)

  const flashMessage = (newMessage:string|null, newCategory:CategoryType|null):void =>{
    setMessage(newMessage);
    setCategory(newCategory)
  }

  return (
    <div>
      <Navigation/>
      <Container>
        {message && <AlertMessage category={category!} message={message} flashMessage={flashMessage}/>}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register flashMessage={flashMessage}/>} />
        </Routes>
      </Container>
    </div>
  )
}