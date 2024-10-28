import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/output.css'
import Providers from './store/redux-provider.jsx'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Providers>
      <App />
    </Providers>
  </React.StrictMode>
)
