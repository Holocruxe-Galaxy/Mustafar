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
}

export const status = ['COMPLETE', 'INACTIVE', 'PENDING', 'BANNED'] as const;

export type StatusType = (typeof status)[number];


export type User = {
  status: StatusType;
  step: number;
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
