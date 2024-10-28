import Routes from './Routes'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  console.log(process.env.VITE_BACKEND_URL)
  return (
    <>
      <ToastContainer />
      <Routes />
    </>
  )
}

export default App
