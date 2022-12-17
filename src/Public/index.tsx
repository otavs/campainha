import { useEffect, useState } from 'react'
import { User, Config } from '../types'
import {
  Item,
  List,
  Main,
  CallButtons,
  CallButton,
  Infos,
  Info,
  WhatsIcon,
  PhoneIcon,
  ButtonText,
  Login,
  EmptyUsers,
  TitleDiv,
  TitleText,
} from './styles'
import { useNavigate } from 'react-router-dom'
import { parseJwt } from '../utils'
import { ClipLoader } from 'react-spinners'

export default function Public() {
  const [users, setUsers] = useState<User[]>([])
  const [config, setConfig] = useState<Config>({})
  const [isLoadingUsers, setLoadingUsers] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetch('.netlify/functions/user/all')
      .then((res) => res.json())
      .then((res) => {
        setUsers(res)
        setLoadingUsers(false)
      })
      .catch((err) => {
        console.log(err)
        setLoadingUsers(false)
      })
    fetch('.netlify/functions/config')
      .then((res) => res.json())
      .then((res) => {
        setConfig(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const usersFiltered = users.filter((user) => user.enabled)

  return (
    <Main>
      {config.title && (
        <TitleDiv>
          <TitleText>{config.title}</TitleText>
        </TitleDiv>
      )}
      <List>
        {isLoadingUsers && <ClipLoader />}
        {usersFiltered.length == 0 && !isLoadingUsers && (
          <EmptyUsers>Nenhum usuário encontrado</EmptyUsers>
        )}
        {usersFiltered.map((user) => (
          <Item
            key={user._id}
            onClick={() => {
              if (!!user.phone) window.open(`https://wa.me/${user.phone}`)
            }}
            clickable={!!user.phone}
          >
            <Infos>
              <Info bold>{user.address}</Info>
              <Info>{user.name}</Info>
              {/* <Info>{user.description}</Info> */}
            </Infos>
            <CallButtons>
              {user.phone ? <WhatsIcon /> : ''}
              {/* <CallButton
                onClick={() => {
                  window.open(`https://wa.me/${user.phone}`)
                }}
              >
                <WhatsIcon />
                <ButtonText>Whats</ButtonText>
              </CallButton>
              <CallButton
                onClick={() => {
                  window.open(`tel://${user.phone}`)
                }}
              >
                <PhoneIcon />
                <ButtonText>Ligar</ButtonText>
              </CallButton> */}
            </CallButtons>
          </Item>
        ))}
      </List>
      {config.title && <TitleDiv />}
      {/* <Login href="#" onClick={login}>
        Config
      </Login> */}
    </Main>
  )

  function login(e: React.MouseEvent) {
    e.preventDefault()
    const token = localStorage.getItem('token')
    if (token) {
      const tokenObj = parseJwt(token)
      if (tokenObj.exp * 1000 >= Date.now()) {
        return redirectRole(tokenObj.role)
      }
    }
    navigate('/login')
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
