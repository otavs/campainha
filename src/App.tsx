import { Routes, Route } from 'react-router-dom'
import Public from './Public'
import Login from './Login'
import User from './User'
import Root from './Root'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Public />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/user" element={<User />}></Route>
      <Route path="/adm" element={<Root />}></Route>
      <Route path="/admin" element={<Root />}></Route>
    </Routes>
  )
}

export default App
