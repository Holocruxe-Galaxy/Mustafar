// ** React Imports
import { createContext, useEffect, useState, ReactNode } from 'react';

// ** Next Import
import { useRouter } from 'next/router';

// ** Axios
import axios from 'axios';

// ** Config
import authConfig from 'src/configs/auth';

// ** Types
import { AuthValuesType, LoginParams, UserDataType } from './types';
import { useUser } from '@auth0/nextjs-auth0/client';
import { afterLogin, afterSignup } from './functions';

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  handleRegister: () => Promise.resolve()
};

const AuthContext = createContext(defaultProvider);

type Props = {
  children: ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  // ** States

  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user);
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading);
  const { user: userAuht0 } = useUser();

  // ** Hooks
  const router = useRouter();

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)!;
      if (storedToken) {
        await axios
          .get(authConfig.meEndpoint, {
            headers: {
              Authorization: storedToken
            }
          })
          .then(async response => {
            setLoading(false);
            setUser({ ...response.data.userData });
          })
          .catch(() => {
            localStorage.removeItem('userData');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('accessToken');
            localStorage.removeItem('step');
            localStorage.removeItem('status');
            setUser(null);
            setLoading(false);
            if (authConfig.onTokenExpiration === 'logout' && !router.pathname.includes('login')) {
              router.replace('/login');
            }
          });
      } else {
        setLoading(false);
      }
    };

    initAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    };

    const response = await fetch('http://lb-ms-auth-1623749626.us-east-1.elb.amazonaws.com/users/register', options);
    const res = await response.json();
    const AuthorizationToken = response.headers.get('Authorization');
    if (AuthorizationToken !== null) {
      window.localStorage.setItem('AuthorizationToken', AuthorizationToken);
      await afterSignup();
    }

    if (response.status === 201) {
      const microservice_user: UserDataType = {
        name: res.name,
        email: res.id,
        fullName: res.name,
        id: res.id,
        role: !res.admin ? 'admin' : 'client',
        username: res.username
      };
      window.localStorage.setItem(
        authConfig.storageTokenKeyName,
        'eJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjg3ODA3MDMzLCJleHAiOjE2ODc4MDczMzN9.CvgFyVYPaSCrVUdFi-EbLmlWV2yttExHcltc0ok7naE'
      );

      const returnUrl = router.query.returnUrl;

      setUser(microservice_user);
      window.localStorage.removeItem('createAccount');


      const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/dashboard';
      router.replace(redirectURL as string);
    } else {
      window.alert(res.message);
      window.localStorage.removeItem('createAccount');
      router.push('/api/auth/logout');
    }
  };
  const handleLogin = async (params: LoginParams) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: userAuht0?.email
      })
    };
    const response = await fetch('http://lb-ms-auth-1623749626.us-east-1.elb.amazonaws.com/users/login', options);
    const res = await response.json();
    const AuthorizationToken = response.headers.get('Authorization');
    if (AuthorizationToken !== null) {
      window.localStorage.setItem('AuthorizationToken', AuthorizationToken);
    }
    if (response.status === 202) {
      const microservice_user: UserDataType = {
        name: res.name,
        email: res.id,
        fullName: res.name,
        id: res.id,
        role: !res.admin ? 'admin' : 'client',
        username: res.username
      };
      params.rememberMe
        ? window.localStorage.setItem(
          authConfig.storageTokenKeyName,
          'eJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjg3ODA3MDMzLCJleHAiOjE2ODc4MDczMzN9.CvgFyVYPaSCrVUdFi-EbLmlWV2yttExHcltc0ok7naE'
        )
        : null;

      // const returnUrl = router.query.returnUrl

      setUser(microservice_user);
      await afterLogin();
      const redirectURL = '/';
      router.replace(redirectURL as string);
    } else {
      window.alert(res.message);
      router.push('/api/auth/logout');
    }
  };

  const handleLogout = async () => {
    setUser(null);
    window.localStorage.removeItem('AuthorizationToken');
    window.localStorage.removeItem('userData');
    window.localStorage.removeItem(authConfig.storageTokenKeyName);
    window.localStorage.removeItem('step');
    window.localStorage.removeItem('status');
    router.push('/api/auth/logout');
    router.push('/login');
  };

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout,
    handleRegister
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
