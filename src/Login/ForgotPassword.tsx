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
  MsgDiv,
  Spinner,
} from './styles'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState<{
    text: string
    type: 'error' | 'success'
  } | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (location.state?.email) setEmail(location.state.email)
  }, [])

  return (
    <Main>
      <Form onSubmit={onSubmit}>
        <Title>Recuperar Senha</Title>
        <InputDiv>
          <Input
            type="text"
            name="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <Label>Email</Label>
        </InputDiv>
        <Msg />
        {msg?.type != 'success' && (
          <SubmitDiv>
            <Submit>{isLoading ? <Spinner size={12} /> : 'Enviar'}</Submit>
          </SubmitDiv>
        )}
      </Form>
    </Main>
  )

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    setMsg(null)
    const emailToSend = email
    axios
      .post('.netlify/functions/auth/forgotPassword', {
        email,
      })
      .then((res) => {
        console.log(res)
        setMsg({
          text: `Email de recuperação enviado para ${emailToSend}`,
          type: 'success',
        })
        return
      })
      .catch((err) => {
        console.log(err)
        if (err.response.status == 404) {
          setMsg({
            text: 'Usuário não existe',
            type: 'error',
          })
          return
        }
        setMsg({
          text: 'Erro no servidor',
          type: 'error',
        })
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  function Msg() {
    if (!msg) return <></>
    return (
      <MsgDiv type={msg.type}>
        {msg.type == 'error' && 'Erro: '}
        {msg.text}
      </MsgDiv>
    )
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
