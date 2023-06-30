'use client'
import { Auth0Provider } from '@auth0/auth0-react'

const ProviderAuth0 = ({ children }: { children: React.ReactNode }) => {
  return (
    <Auth0Provider
      domain='dev-7vk8vxpbjwabxxmu.us.auth0.com'
      clientId='viIoEU0gLFUQn9NGOOYjO0USFvheZxIM'
      authorizationParams={{
        redirect_uri: 'https://alex-auth.d19n3mgta93hy5.amplifyapp.com'
      }}
    >
      {children}
    </Auth0Provider>
  )
}

export default ProviderAuth0
