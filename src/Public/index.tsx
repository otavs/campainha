import { useEffect, useState } from 'react'
import { User } from '../types'
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
  LoginLink,
} from './styles'

export default function Public() {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    fetch('.netlify/functions/user/all')
      .then((res) => res.json())
      .then((res) => setUsers(res))
      .catch((err) => console.log(err))
  }, [])

  return (
    <Main>
      <List>
        {users.map((user) => (
          <Item key={user._id}>
            <Infos>
              <Info bold>{user.address}</Info>
              <Info> {user.name} </Info>
              <Info> {user.description} </Info>
            </Infos>
            <CallButtons>
              <CallButton
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
              </CallButton>
            </CallButtons>
          </Item>
        ))}
      </List>
      <LoginLink href="https://www.omfgdogs.com/#">Config</LoginLink>
    </Main>
  )
}
