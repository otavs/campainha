import { Navigate, useLocation } from 'react-router-dom'
import { Role } from '../types'
import { parseJwt } from '../utils'

type Props = {
  roles: Role[]
  element: JSX.Element
}

export default function Protected({ roles, element }: Props) {
  const location = useLocation()
  const token = localStorage.getItem('token')

  if (!token) return <Navigate to="/login" state={{ from: location }} replace />

  const tokenObj = parseJwt(token)

  const { exp, role } = tokenObj

  if (exp * 1000 < Date.now() || !roles.includes(role))
    return <Navigate to="/login" state={{ from: location }} replace />

  return element
}
