import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Public from '../Public'
import Login from '../Login'
import User from '../User'
import Root from '../Root'

interface User {
  id: number
}

function App() {
  // const [users, setUsers] = useState<User[]>([])

  // useEffect(() => {
  //   fetch('.netlify/functions/user')
  //     .then((res) => res.json())
  //     .then((res) => {
  //       console.log(res)
  //       setUsers(res)
  //     })
  // }, [])

  return (
    <Routes>
      <Route path="/" element={<Public />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/user" element={<User />}></Route>
      <Route path="/admin" element={<Root />}></Route>
    </Routes>
  )
}

export default App
