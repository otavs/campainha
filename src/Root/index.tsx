import { useEffect, useState } from 'react'
import { User } from '../types'
import {
  Item,
  List,
  Main,
  CallButtons,
  Infos,
  Info,
  EditIcon,
  Logout,
  TitleDiv,
  TitleText,
  Form,
  Input,
  Label,
  InputDiv,
  SubmitDiv,
  Submit,
  CheckBoxDiv,
  CheckBoxLabel,
  Erro,
  Cancel,
} from './styles'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { parseJwt } from '../utils'
import BootstrapModal from 'react-bootstrap/Modal'
import BootstrapForm from 'react-bootstrap/Form'

export default function Public() {
  const [users, setUsers] = useState<User[]>([])
  const [editUser, setEditUser] = useState<User>({})
  const [showModal, setShowModal] = useState(false)
  const [error, setError] = useState('')
  const [isEditLoading, setIsEditLoading] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (!token) return navigate('/login')

    const tokenObj = parseJwt(token)
    if (tokenObj.exp * 1000 < Date.now()) {
      return navigate('/login')
    }

    fetch('.netlify/functions/user/all')
      .then((res) => res.json())
      .then((res) =>
        setUsers(
          res.map((user: User) => ({ ...user, phone: user.phone?.slice(2) }))
        )
      )
      .catch((err) => console.log(err))
  }, [])

  return (
    <Main>
      <TitleDiv>
        <TitleText>Editar Usuários</TitleText>
      </TitleDiv>
      <List>
        {users.map((user) => (
          <Item
            key={user._id}
            onClick={() => {
              setEditUser({ ...user })
              setShowModal(true)
              setError('')
            }}
            enabled={user.enabled}
          >
            <Infos>
              <Info bold>{user.address}</Info>
              <Info>
                {user.name}
              </Info>
              <Info>
                {formatPhone(user.phone)}
              </Info>
            </Infos>
            <CallButtons>
              <EditIcon />
            </CallButtons>
          </Item>
        ))}
      </List>
      <Logout href="#" onClick={logout}>
        Sair
      </Logout>
      <BootstrapModal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="sm"
        centered
      >
        <BootstrapModal.Body>
          <Form onSubmit={onSubmit}>
            <InputDiv>
              <Input
                type="text"
                mask=""
                value={editUser.address}
                onChange={(e) =>
                  setEditUser({ ...editUser, address: e.target.value })
                }
              />
              <Label>Endereço</Label>
            </InputDiv>
            <InputDiv>
              <Input
                type="text"
                mask=""
                value={editUser.name}
                onChange={(e) =>
                  setEditUser({ ...editUser, name: e.target.value })
                }
              />
              <Label>Nome</Label>
            </InputDiv>
            <InputDiv>
              <Input
                type="text"
                mask="(99) 99999-9999"
                alwaysShowMask
                value={editUser.phone}
                onChange={(e) =>
                  setEditUser({ ...editUser, phone: e.target.value })
                }
              />
              <Label>Whats</Label>
            </InputDiv>
            <CheckBoxDiv>
              <CheckBoxLabel>Ativo:</CheckBoxLabel>
              <BootstrapForm.Check
                type="switch"
                checked={editUser.enabled || false}
                onChange={(e) =>
                  setEditUser({ ...editUser, enabled: e.target.checked })
                }
              />
            </CheckBoxDiv>
            <SubmitDiv>
              <Cancel type="button" onClick={() => setShowModal(false)}>
                Cancelar
              </Cancel>
              <Submit>Salvar</Submit>
            </SubmitDiv>
            <Erro>{error}</Erro>
          </Form>
        </BootstrapModal.Body>
      </BootstrapModal>
    </Main>
  )

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    editUser.phone = editUser.phone?.replace(/[^\d]/g, '')
    if (editUser.phone?.length && editUser.phone.length < 11) {
      setError('Erro: Telefone inválido')
      return
    }
    setIsEditLoading(true)
    const phone = editUser.phone ? `55${editUser.phone}` : ''
    axios
      .put(
        '.netlify/functions/user',
        { ...editUser, phone },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      .then((res) => {
        setIsEditLoading(false)
        setShowModal(false)
        setUsers((users) => {
          const i = users.findIndex(({ _id }) => _id == editUser._id)
          users[i] = { ...editUser }
          return [...users]
        })
        setError('')
      })
      .catch((err) => {
        if (err.response.status == 401) {
          return navigate('/login')
        }
        setIsEditLoading(false)
        setError('Erro no servidor')
      })
  }

  function logout(e: React.MouseEvent) {
    e.preventDefault()
    localStorage.removeItem('token')
    navigate('/')
  }

  function formatPhone(phone?: string) {
    if (!phone) return ''
    return `(${phone.substring(0, 2)}) ${phone.substring(2, 6)}-${phone.slice(6)}`
  }
}
