import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useAppDispatch } from '../store/hooks'
import { setIdentity } from '../store/slices/identitySlice'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })
      const data = await response.json()
      if (response.ok) {
        Cookies.set('access_token', data.access_token)
        Cookies.set('refresh_token', data.refresh_token)
        dispatch(
          setIdentity({
            is_logged: true,
            user: { username: data.name, level: 'employee' },
          })
        )
        navigate('/dash')
      } else {
        setError(data.message || 'Failed to login')
      }
    } catch (err) {
      setError('An error occurred. ' + err.message)
    }
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="max-w-lg w-[350px] mx-auto bg-white rounded-lg shadow-md px-8 py-10 flex flex-col items-center">
        <h1 className="text-xl font-bold text-center text-gray-700 mb-8">
          Employee Login
        </h1>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <div className="flex items-start flex-col justify-start">
            <label htmlFor="email" className="text-sm text-gray-700 mr-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-start flex-col justify-start">
            <label htmlFor="password" className="text-sm text-gray-700 mr-2">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-sm"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-center">
          <Link to="/" className="text-blue-500 hover:text-blue-600">
            Back Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
