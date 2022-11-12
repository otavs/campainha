import { useEffect, useState } from 'react'
import {
  Form,
  InputDiv,
  Input,
  Label,
  Main,
  Submit,
  Title,
  SubmitDiv,
  ErrorDiv,
  Spinner
} from './styles'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  return (
    <Main>
      <Form onSubmit={onSubmit}>
        <Title>Login</Title>
        <InputDiv>
          <Input
            type="text"
            name="username"
            required
            onChange={(e) => setUserName(e.target.value)}
          />
          <Label>Usuário</Label>
        </InputDiv>
        <InputDiv>
          <Input
            type="password"
            name="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <Label>Senha</Label>
        </InputDiv>
        <Error />
        <SubmitDiv>
          <Submit>{isLoading ? <Spinner size={12} /> : 'Entrar'}</Submit>
        </SubmitDiv>
      </Form>
    </Main>
  )

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    axios
      .post('.netlify/functions/auth', {
        email: userName,
        password,
      })
      .then((res) => {
        console.log(res)
        setError('')
        localStorage.setItem('token', res.data.token)
        redirectRole(res.data.user.role)
        return
      })
      .catch((err) => {
        console.log(err)
        if (err.response.status == 404) {
          setError('Usuário não existe')
          return
        }
        if (err.response.status == 401) {
          setError('Senha inválida')
          return
        }
        setError('Erro no servidor')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  function Error() {
    if (!error) return <></>
    return <ErrorDiv>Erro: {error}</ErrorDiv>
  }

  function redirectRole(role: string) {
    if (role == 'root') {
      return navigate('/adm')
    }
    if (role == 'user') {
      return navigate('/user')
    }
  }
}
