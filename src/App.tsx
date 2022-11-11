import { Routes, Route } from 'react-router-dom'
import Public from './Public'
import Login from './Login'
import User from './User'
import Root from './Root'
import Protected from './Routes'
import { Role } from './types'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Public />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/user"
        element={<Protected roles={[Role.User]} element={<User />} />}
      />
      <Route
        path="/adm"
        element={<Protected roles={[Role.Root]} element={<Root />} />}
      />
      <Route
        path="/admin"
        element={<Protected roles={[Role.Root]} element={<Root />} />}
      />
    </Routes>
  )
}

export default App
