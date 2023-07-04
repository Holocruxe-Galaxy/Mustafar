// ** React Imports
import { createContext, useEffect, useState, ReactNode } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Axios
import axios from 'axios'
// ** Config
import authConfig from 'src/configs/auth'

// ** Types
<<<<<<< HEAD
import { AuthValuesType, LoginParams, ErrCallbackType, UserDataType } from './types'
import { useAuth0 } from '@auth0/auth0-react'
=======
import { AuthValuesType, LoginParams, UserDataType } from './types'
import { useUser } from '@auth0/nextjs-auth0/client'
>>>>>>> alex/auth

// ** Defaults
import jwt from 'jsonwebtoken'

const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  handleRegister: () => Promise.resolve()
}

const AuthContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  // ** States
<<<<<<< HEAD
  const { user: userAuth, isLoading, isAuthenticated, logout } = useAuth0()
=======

>>>>>>> alex/auth
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)
  const { user: userAuht0 } = useUser()

  // ** Hooks
  const router = useRouter()

  useEffect(() => {
    const initAuth = async () => {
<<<<<<< HEAD
      const storedToken = window.localStorage.getItem('jwtToken')

      // if (storedToken) {
      //   setLoading(true)
      //   setLoading(false)
      //   setUser({
      //     id: 129,
      //     role: 'Admin',
      //     email: userAuth?.email,
      //     fullName: userAuth?.name,
      //     username: userAuth?.nickname,
      //     avatar: userAuth?.picture
      //   })
      // }

=======
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)!
>>>>>>> alex/auth
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

<<<<<<< HEAD
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
      console.log(response)

      if (response.username) {
        //si el inicio de sesión es correcto
        //creo un jwt para más seguridad. No es necesario pero es para adaptar a la configuración de éste projecto en next
        const secretKey = 'prueba'

        const token = jwt.sign(data, secretKey, { expiresIn: '3h' })

        // window.localStorage.setItem('jwtToken', token)

        // setLoading(true)
        // setLoading(false)
        // setUser({
        //   id: 129,
        //   role: 'admin',
        //   email: userAuth?.email,
        //   fullName: userAuth?.name,
        //   username: userAuth?.nickname,
        //   avatar: userAuth?.picture
        // })
        // router.replace('/home')
      } else {
        logout()
        window.alert(response.message)
      }
    } catch (response) {
      console.log(response)
    }
=======
  const handleRegister = async () => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: userAuht0?.nickname,
        name: userAuht0?.given_name,
        lastname: userAuht0?.family_name,
        email: userAuht0?.email
      })
    }

    const response = await fetch('http://localhost:3001/users/register', options)
    const res = await response.json()
    const AuthorizationToken = response.headers.get('Authorization')
    if (AuthorizationToken !== null) {
      window.localStorage.setItem('AuthorizationToken', AuthorizationToken)
    }

    if (response.status === 201) {
      const microservice_user: UserDataType = {
        name: res.name,
        email: res.id,
        fullName: res.name,
        id: res.id,
        role: !res.admin ? 'admin' : 'client',
        username: res.username
      }
      window.localStorage.setItem(
        authConfig.storageTokenKeyName,
        'eJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjg3ODA3MDMzLCJleHAiOjE2ODc4MDczMzN9.CvgFyVYPaSCrVUdFi-EbLmlWV2yttExHcltc0ok7naE'
      )
      const returnUrl = router.query.returnUrl
      setUser(microservice_user)
      window.localStorage.removeItem('createAccount')
      const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
      router.replace(redirectURL as string)
    } else {
      window.alert(res.message)
      window.localStorage.removeItem('createAccount')
      router.push('/api/auth/logout')
    }
  }
  const handleLogin = async (params: LoginParams) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: userAuht0?.email
      })
    }
    const response = await fetch('http://localhost:3001/users/login', options)
    const res = await response.json()
    const AuthorizationToken = response.headers.get('Authorization')
    if (AuthorizationToken !== null) {
      window.localStorage.setItem('AuthorizationToken', AuthorizationToken)
    }
    if (response.status === 202) {
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
            'eJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjg3ODA3MDMzLCJleHAiOjE2ODc4MDczMzN9.CvgFyVYPaSCrVUdFi-EbLmlWV2yttExHcltc0ok7naE'
          )
        : null

      // const returnUrl = router.query.returnUrl

      setUser(microservice_user)
      const redirectURL = '/'
      router.replace(redirectURL as string)
    } else {
      window.alert(res.message)
      router.push('/api/auth/logout')
    }

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
>>>>>>> alex/auth
  }

  const handleLogout = async () => {
    setUser(null)
<<<<<<< HEAD
    window.localStorage.removeItem('jwtToken')
=======
    window.localStorage.removeItem('AuthorizationToken')
    window.localStorage.removeItem('userData')
    window.localStorage.removeItem(authConfig.storageTokenKeyName)
    router.push('/api/auth/logout')
>>>>>>> alex/auth
    router.push('/login')
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout,
    handleRegister
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
