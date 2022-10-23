import styled from 'styled-components'
import whatsLogo from './whatsapp-logo.png'
import phoneLogo from './blue-phone.png'

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  justify-content: center;
  align-items: center;
  justify-content: space-evenly;
`

export const List = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto
`

export const Item = styled.div`
  border: 1px solid;
  margin: 10px 10px;
  padding: 8px;
  background-color: #eefcff;
  flex-direction: row;
  border: 1px solid;
  border-radius: 10px;
  display: flex;
`

export const Infos = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 400px;
`

export const Info = styled.div<{ bold?: boolean; center?: boolean }>`
  display: flex;
  flex-direction: column;
  min-width: 100px;
  margin: 4px 0;
  font-weight: ${({ bold }) => (bold ? 'bold' : '')};
  text-align: ${({ center }) => (center ? 'center' : '')};
  margin-right: auto;
`

export const CallButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  flex-direction: column;
`

export const CallButton = styled.button`
  margin: 4px 8px;
  padding: 8px 8px;
  width: 100px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border: 1px solid;
  border-radius: 10px;
`

export const WhatsIcon = styled.img.attrs({
  src: `${whatsLogo}`,
})`
  width: 30px;
  height: 30px;
`

export const PhoneIcon = styled.img.attrs({
  src: `${phoneLogo}`,
})`
  width: 28px;
  height: 28px;
`

export const ButtonText = styled.div`
  margin-left: 5px;
`

export const LoginLink = styled.a`
  margin: 4px 0
`
