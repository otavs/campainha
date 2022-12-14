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
  RecoverPasswordDiv,
} from './styles'
import axios from 'axios'
import { useNavigate, useLocation, Link } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState<{
    text: string
    type: 'error' | 'success'
  } | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (location.state?.msg) setMsg(location.state.msg)
  }, [])

  return (
    <Main>
      <Form onSubmit={onSubmit}>
        <Title>Login</Title>
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
        <InputDiv>
          <Input
            type="password"
            name="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <Label>Senha</Label>
        </InputDiv>
        <Msg />
        <SubmitDiv>
          <Submit>{isLoading ? <Spinner size={12} /> : 'Entrar'}</Submit>
        </SubmitDiv>
        <RecoverPasswordDiv>
          <Link to="/forgotPass" state={{ email }}>
            Recuperar Senha
          </Link>
        </RecoverPasswordDiv>
      </Form>
    </Main>
  )

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    axios
      .post('.netlify/functions/auth/login', {
        email: email,
        password,
      })
      .then((res) => {
        console.log(res)
        setMsg(null)
        localStorage.setItem('token', res.data.token)
        redirectRole(res.data.user.role)
        return
      })
      .catch((err) => {
        console.log(err)
        if (err.response.status == 404) {
          setMsg({ text: 'Usu??rio n??o existe', type: 'error' })
          return
        }
        if (err.response.status == 401) {
          setMsg({ text: 'Senha inv??lida', type: 'error' })
          return
        }
        setMsg({ text: 'Erro no servidor', type: 'error' })
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
