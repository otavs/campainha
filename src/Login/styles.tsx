import styled from 'styled-components'

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  justify-content: center;
  align-items: center;
  justify-content: space-evenly;
  background-color: #cdf6f7;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 25px 40px;
  background-color: #eefcff;
  box-shadow: 0 10px 10px 10px 10px rgba(0, 0, 0, 0.6);
  border-radius: 10px;
  border: 1px solid;
`

export const Title = styled.div`
  text-align: center;
  font-size: 24px;
  margin-bottom: 16px;
`

export const InputDiv = styled.div`
  position: relative;
  input:focus ~ label,
  input:valid ~ label,
  input:-webkit-autofill ~ label {
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

export const Input = styled.input`
  width: 100%;
  padding: 14px 0 4px 0;
  font-size: 16px;
  margin-bottom: 18px;
  border: none;
  border-bottom: 1px solid;
  outline: none;
  background-color: #eefcff;
  &:-webkit-autofill {
    box-shadow: 0 0 0 30px #eefcff inset;
    -webkit-box-shadow: 0 0 0 30px #eefcff inset;
  }
`

export const SubmitDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Submit = styled.button`
  width: 80px;
  background-color: transparent;
  border: 1px solid #1326ca;
  padding: 6px 2px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  transition-duration: 0.4s;
  cursor: pointer;
  border-radius: 4px;
  &:hover {
    background-color: #cdf6f7;
  }
`

export const ErrorDiv = styled.div`
  color: red;
  margin-bottom: 8px;
  text-align: center;
`
