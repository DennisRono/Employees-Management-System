import { Menu, User } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const Header = () => {
  const navigate = useNavigate()
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto py-4 px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button className="block lg:hidden p-2 text-gray-600 hover:text-gray-800">
            <Menu className="w-6 h-6" />
          </button>
          <div className="text-2xl font-bold text-gray-800">
            Employee Management
          </div>
        </div>

        <nav className="hidden lg:flex space-x-8 text-gray-600 font-medium"></nav>

        <div className="flex items-center space-x-4">
          <Link to="/">Home</Link>
          <div className="relative flex items-center justify-between gap-4">
            <button className="p-2 text-gray-600 hover:text-gray-800 flex items-center">
              <User className="w-6 h-6 mr-2" />
              <span>{Cookies.get('username')}</span>
            </button>
            <button
              className="py-2 px-3 rounded-md bg-blue-600 text-white cursor-pointer"
              onClick={() => {
                Cookies.remove('username', { path: '' })
                Cookies.remove('access_token', { path: '' })
                Cookies.remove('refresh_token', { path: '' })
                //window.location.reload()
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
