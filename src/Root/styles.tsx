import styled from 'styled-components'
import InputMask from 'react-input-mask'
import { SlPencil as PencilIcon } from 'react-icons/sl'

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  justify-content: center;
  align-items: center;
  background-color: #cdf6f7;
`

export const TitleDiv = styled.div`
  margin-top: auto;
  display: flex;
  justify-content: center;
`

export const TitleText = styled.div`
  margin-top: 12px;
  text-align: center;
  font-weight: bold;
  font-size: 20px;
`

export const List = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
`

export const Item = styled.div<{ enabled?: boolean }>`
  border: 1px solid;
  margin: 10px 10px;
  padding: 8px;
  background-color: ${({ enabled }) => (enabled ? '#eefcff' : '#ffd5d5')};
  flex-direction: row;
  border: 1px solid;
  border-radius: 10px;
  display: flex;
  &:hover {
    background-color: ${({ enabled }) => (enabled ? '#dff9ff' : '#ffcbcb')};
    cursor: pointer;
  }
`

export const Infos = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 400px;
  margin-right: 10px;
`

export const Info = styled.div<{ bold?: boolean; center?: boolean }>`
  display: flex;
  flex-direction: column;
  /* min-width: 100px; */
  min-width: 80px;
  margin: 4px 0;
  font-weight: ${({ bold }) => (bold ? 'bold' : '')};
  text-align: ${({ center }) => (center ? 'center' : '')};
  margin-right: auto;
  &:empty {
    display: none;
  }
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

export const EditIcon = styled(PencilIcon)`
  width: 20px;
  height: 20px;
  margin-right: 2px;
`

export const ButtonText = styled.div`
  margin-left: 5px;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`

export const InputDiv = styled.div`
  position: relative;
  margin-top: 14px;
  input:focus ~ label,
  input:valid ~ label {
    top: -20px;
    left: 0;
    color: #1326ca;
    font-size: 14px;
  }
`

export const Label = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 0;
  font-size: 16px;
  pointer-events: none;
  transition: 0.5s;
`

export const Input = styled(InputMask)`
  width: 100%;
  padding: 14px 0 4px 0;
  font-size: 16px;
  margin-bottom: 18px;
  border: none;
  border-bottom: 1px solid;
  outline: none;
  background-color: white;
  &:-webkit-autofill {
    box-shadow: 0 0 0 30px white inset;
    -webkit-box-shadow: 0 0 0 30px white inset;
  }
`

export const CheckBoxDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 12px;
`

export const CheckBoxLabel = styled.div`
  margin-right: 10px;
`

export const SubmitDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 12px;
`

export const Submit = styled.button`
  width: 80px;
  background-color: transparent;
  border: 1px solid #1326ca;
  color: #1326ca;
  padding: 6px 2px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 10px;
  transition-duration: 0.4s;
  cursor: pointer;
  border-radius: 4px;
  &:hover {
    background-color: #cdf6f7;
  }
`

export const Cancel = styled.button`
  width: 80px;
  background-color: transparent;
  border: 1px solid #000000;
  padding: 6px 2px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 10px;
  transition-duration: 0.4s;
  cursor: pointer;
  border-radius: 4px;
  &:hover {
    background-color: #e9e9e9;
  }
`

export const Erro = styled.div`
  color: red;
  margin-top: 8px;
  text-align: center;
`

export const Logout = styled.a`
  margin: auto;
  cursor: pointer;
  text-decoration: none;
`
