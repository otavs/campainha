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
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { parseJwt } from '../utils'

export default function Login() {
  const [password, setPassword] = useState('')
  const [confirmation, setConfirmation] = useState('')
  const [msg, setMsg] = useState<{
    text: string
    type: 'error' | 'success'
  } | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  useEffect(() => {}, [])

  return (
    <Main>
      <Form onSubmit={onSubmit}>
        <Title>Criar Nova Senha</Title>
        <InputDiv>
          <Input
            type="password"
            name="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <Label>Nova Senha</Label>
        </InputDiv>
        <InputDiv>
          <Input
            type="password"
            name="confirmation"
            value={confirmation}
            required
            onChange={(e) => setConfirmation(e.target.value)}
          />
          <Label>Digite novamente</Label>
        </InputDiv>
        <Msg />
        <SubmitDiv>
          <Submit>{isLoading ? <Spinner size={12} /> : 'Enviar'}</Submit>
        </SubmitDiv>
      </Form>
    </Main>
  )

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (password != confirmation) {
      setMsg({
        text: 'As senhas estão diferentes',
        type: 'error',
      })
      return
    }
    setIsLoading(true)
    setMsg(null)

    const token = searchParams.get('token')
    const { id } = parseJwt(token!)

    axios
      .put(
        '.netlify/functions/user/updatePassword',
        {
          _id: id,
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res)
        navigate('/login', {
          state: {
            msg: {
              text: 'Senha alterada com sucesso',
              type: 'success',
            },
          },
        })
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
}
