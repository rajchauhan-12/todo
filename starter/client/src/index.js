import { Auth0Provider } from '@auth0/auth0-react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'semantic-ui-css/semantic.min.css'
import './index.css'

const domain = process.env.REACT_APP_AUTH0_DOMAIN
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
<Auth0Provider
  domain={domain}
  clientId={clientId}
  redirectUri={window.location.origin}
  audience="https://your-todo-api"
  scope="openid profile email read:todo write:todo delete:todo"
  cacheLocation="localstorage"
  useRefreshTokens={true}
  onRedirectCallback={(appState) => {
    window.history.replaceState(
      {},
      document.title,
      appState?.returnTo || window.location.pathname
    )
  }}
>
  <App />
</Auth0Provider>
)