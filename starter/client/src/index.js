import { Auth0Provider } from '@auth0/auth0-react'
import React from 'react'
import ReactDOM from 'react-dom'
import 'semantic-ui-css/semantic.min.css'
import App from './App'
import './index.css'

const domain = process.env.REACT_APP_AUTH0_DOMAIN
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID
ReactDOM.render(
  <Auth0Provider
    domain={'dev-yiid3pn1blque42e.us.auth0.com'}
    clientId={'VOyLkD5kcPo0DOrmYVd3hgOF6Ztu7rXL'}
    redirectUri={window.location.origin}
    audience={`https://sp76174uyh.execute-api.us-east-1.amazonaws.com/dev`}
    scope="read:todo write:todo delete:todo"
  >
    <App />
  </Auth0Provider>,
  document.getElementById('root')
)
