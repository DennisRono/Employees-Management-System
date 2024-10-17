import { Menu, User } from 'lucide-react'
import { Link } from 'react-router-dom'

const Header = () => {
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
          <div className="relative">
            <button className="p-2 text-gray-600 hover:text-gray-800 flex items-center">
              <User className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
