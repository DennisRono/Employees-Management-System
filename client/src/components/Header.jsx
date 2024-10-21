import { Menu, User, BarChart2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { setIdentity } from '../store/slices/identitySlice'

const Header = () => {
  const identity = useAppSelector((state) => state.identity)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (!identity.is_logged) navigate('/')
  }, [identity.is_logged, navigate])
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto py-4 px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button className="block lg:hidden p-2 text-gray-600 hover:text-gray-800">
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex-shrink-0 flex items-center">
            <BarChart2 className="h-8 w-8 text-blue-500" />
            <span className="ml-2 text-xl font-semibold">EMS</span>
          </div>
        </div>

        <nav className="hidden lg:flex space-x-8 text-gray-600 font-medium"></nav>

        <div className="flex items-center space-x-4">
          <Link to="/">Home</Link>
          <div className="relative flex items-center justify-between gap-4">
            <button className="p-2 text-gray-600 hover:text-gray-800 flex items-center">
              <User className="w-6 h-6 mr-2" />
              <span>
                {identity.user?.username}
                <span
                  className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    identity?.user?.level === 'admin'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  {identity?.user?.level}
                </span>
              </span>
            </button>
            <button
              className="py-2 px-3 rounded-md bg-blue-600 text-white cursor-pointer"
              onClick={() => {
                Cookies.remove('access_token', { path: '' })
                Cookies.remove('refresh_token', { path: '' })
                dispatch(
                  setIdentity({
                    is_logged: false,
                    user: { username: '', level: 'employee' },
                  })
                )
                navigate('/')
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
