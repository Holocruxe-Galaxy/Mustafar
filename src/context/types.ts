export type ErrCallbackType = (err: { [key: string]: string }) => void

export type LoginParams = {
  rememberMe?: boolean
}

export type UserDataType = {
<<<<<<< HEAD
  id: number
=======
  id: any
>>>>>>> alex/auth
  role: any
  email: any
  fullName: any
  username: any
<<<<<<< HEAD
  avatar?: any | null
=======
  name: any
  avatar?: string | null
>>>>>>> alex/auth
}

export type AuthValuesType = {
  loading: boolean
  logout: () => void
  user: UserDataType | null
  setLoading: (value: boolean) => void
  setUser: (value: UserDataType | null) => void
<<<<<<< HEAD
  login: () => void
=======
  login: (params: any, errorCallback?: ErrCallbackType) => void
  handleRegister: () => void
>>>>>>> alex/auth
}
