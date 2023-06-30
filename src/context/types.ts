import { AnyListenerPredicate } from '@reduxjs/toolkit'

export type ErrCallbackType = (err: { [key: string]: string }) => void

export type LoginParams = {
  rememberMe?: boolean
}

export type UserDataType = {
  id: any
  role: any
  email: any
  fullName: any
  username: any
  name: any
  avatar?: string | null
  // "name": "Alexander",
  // "lastname": "Cañete",
  // "email": "alexander1@gmail.com",
  // "birthdate": "2023-06-12"
}

export type AuthValuesType = {
  loading: boolean
  logout: () => void
  user: UserDataType | null
  setLoading: (value: boolean) => void
  setUser: (value: UserDataType | null) => void
  login: (params: any, errorCallback?: ErrCallbackType) => void
  handleRegister: () => void
}
