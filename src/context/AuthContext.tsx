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
import { useAuth0 } from '@auth0/auth0-react'

// ** Defaults
import jwt from 'jsonwebtoken'

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
  const { user: userAuth, isLoading, isAuthenticated, logout } = useAuth0()
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)

  // ** Hooks
  const router = useRouter()

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

      if (storedToken) {
        setLoading(true)
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
            // if (authConfig.onTokenExpiration === 'logout' && !router.pathname.includes('login')) {
            //   router.replace('/login')
            // }
          })
      } else {
        setLoading(false)
      }
      setLoading(false)
    }

    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userAuth, isAuthenticated])

  // const handleLogin = (params: LoginParams, errorCallback?: ErrCallbackType) => {
  //   axios
  //     .post(authConfig.loginEndpoint, params)
  //     .then(async response => {
  //       params.rememberMe
  //         ? window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.accessToken)
  //         : null
  //       const returnUrl = router.query.returnUrl

  //       setUser({ ...response.data.userData })
  //       params.rememberMe ? window.localStorage.setItem('userData', JSON.stringify(response.data.userData)) : null

  //       const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'

  //       router.replace(redirectURL as string)
  //     })

  //     .catch(err => {
  //       if (errorCallback) errorCallback(err)
  //     })
  // }
  const handleLogin = async () => {
    try {
      //el usuario de auth0
      const data = {
        username: userAuth?.nickname,
        name: userAuth?.name,
        lastname: userAuth?.family_name,
        email: userAuth?.email
      }
      const response = await fetch('http://ec2-54-86-172-177.compute-1.amazonaws.com/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(res => res.json())
        .then(res => res)

      if (response.username) {
        //si el inicio de sesión es correcto
        //creo un jwt para más seguridad. No es necesario pero es para adaptar a la configuración de éste projecto en next
        const secretKey = 'prueba'

        const token = jwt.sign(data, secretKey, { expiresIn: '3h' })

        window.localStorage.setItem('jwtToken', token)
        router.replace('/home')
      } else {
        logout()
        window.alert(response.message)
      }
    } catch (response) {
      console.log(response)
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('jwtToken')

    // router.push('/login')
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
