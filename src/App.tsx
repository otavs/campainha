import { useEffect, useState } from 'react'

interface User {
  id: number
}

function App() {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    fetch('.netlify/functions/users')
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
        setUsers(res)
      })
  }, [])

  return <div>{JSON.stringify(users)}</div>
}

export default App
