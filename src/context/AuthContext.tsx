// ** React Imports
import { createContext, useEffect, useState, ReactNode } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Axios
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'

// ** Types
import { AuthValuesType, LoginParams, ErrCallbackType, UserDataType } from './types'
import jwt from 'jsonwebtoken'
import { useAuth0 } from '@auth0/auth0-react'

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve()
}

const AuthContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)
  const { user: userAuht0 } = useAuth0()
  // ** Hooks
  const router = useRouter()

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)!
      if (storedToken) {
        await axios
          .get(authConfig.meEndpoint, {
            headers: {
              Authorization: storedToken
            }
          })
          .then(async response => {
            setLoading(false)
            setUser({ ...response.data.userData })
          })
          .catch(() => {
            localStorage.removeItem('userData')
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('accessToken')
            setUser(null)
            setLoading(false)
            if (authConfig.onTokenExpiration === 'logout' && !router.pathname.includes('login')) {
              router.replace('/login')
            }
          })
      } else {
        setLoading(false)
      }
    }

    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogin = async (params: LoginParams, errorCallback?: ErrCallbackType) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: userAuht0?.email
      })
    }
    const response = await fetch('http://ec2-54-86-172-177.compute-1.amazonaws.com/users/login', options)
    const res = await response.json()

    const token = jwt.sign(res, '/jwt/register', {
      expiresIn: '1h' // Tiempo de expiración del token (opcional)
    })

    const microservice_user: UserDataType = {
      name: res.name,
      email: res.id,
      fullName: res.name,
      id: res.id,
      role: !res.admin ? 'admin' : 'client',
      username: res.username
    }
    params.rememberMe
      ? window.localStorage.setItem(
          authConfig.storageTokenKeyName,
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjg3ODA3MDMzLCJleHAiOjE2ODc4MDczMzN9.CvgFyVYPaSCrVUdFi-EbLmlWV2yttExHcltc0ok7naE'
        )
      : null
    const returnUrl = router.query.returnUrl
    setUser(microservice_user)
    const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'

    router.replace(redirectURL as string)

    // await axios
    //   .post(authConfig.loginEndpoint, params)
    //   .then(async response => {
    //     console.log(response)
    //     params.rememberMe
    //       ? window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.accessToken)
    //       : null
    //     const returnUrl = router.query.returnUrl
    //     console.log(returnUrl)
    //     setUser({ ...response.data.userData })
    //     console.log(response.data.userData)
    //     params.rememberMe ? window.localStorage.setItem('userData', JSON.stringify(response.data.userData)) : null

    //     const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'

    //     router.replace(redirectURL as string)
    //   })

    //   .catch(err => {
    //     if (errorCallback) errorCallback(err)
    //   })
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('userData')
    window.localStorage.removeItem(authConfig.storageTokenKeyName)
    router.push('/login')
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
