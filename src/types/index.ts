export interface User {
  _id?: string,
  email?: string,
  name?: string,
  role?: string,
  phone?:string,
  address?: string,
  description?: string
  enabled?: boolean
}

export enum Role {
  Root = 'root',
  User = 'user',
}