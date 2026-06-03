import { Auth0Provider } from '@auth0/auth0-react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import 'semantic-ui-css/semantic.min.css'
import App from './App'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <Auth0Provider
    domain={'dev-yiid3pn1blque42e.us.auth0.com'}
    clientId={'xgEGAPZRm8h3F6Mq3EPEHqeHv3G1hNtV'}
    redirectUri={window.location.origin}
    audience={`https://e1gvt2oie4.execute-api.us-east-1.amazonaws.com/dev`}
    scope="read:todo write:todo delete:todo"
  >
    <App />
  </Auth0Provider>
)