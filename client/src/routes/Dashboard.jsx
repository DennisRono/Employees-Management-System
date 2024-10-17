import Footer from '../components/Footer'
import Header from '../components/Header'
import { Home } from 'lucide-react'
import Dash from '../pages/Dash'
import { useState } from 'react'
import AllEmployees from '../pages/AllEmployees'
import Departments from '../pages/Departments'
import AllCustomers from '../pages/AllCustomers'

const Dashboard = () => {
  const [playtab, setPlayTab] = useState('dashboard')
  const menuItems = [
    {
      name: 'Dashboard',
      icon: <Home style={{ color: '#fff', fontSize: 18 }} />,
      key: 'dashboard',
    },
    {
      name: 'Employees',
      icon: <Home style={{ color: '#fff', fontSize: 18 }} />,
      key: 'employees',
    },
    {
      name: 'Departments',
      icon: <Home style={{ color: '#fff', fontSize: 18 }} />,
      key: 'departments',
    },
    {
      name: 'Customers',
      icon: <Home style={{ color: '#fff', fontSize: 18 }} />,
      key: 'customers',
    },
  ]
  return (
    <>
      <Header />
      <div className="flex flex-row container">
        <div className="align-vertical md:align-top bg-blue-800 justify-self-start w-1/5 h-screen p-2">
          <ul className="">
            {menuItems.map((item) => (
              <li
                key={item.key}
                className={`flex items-center gap-2 p-4 rounded cursor-pointer mb-2 overflow-hidden ${
                  playtab === item.key ? 'bg-[#000000d7]' : 'bg-[#0005]'
                }`}
                onClick={() => {
                  setPlayTab(item.key)
                }}
              >
                {item.icon}
                <span className="text-xs text-nowrap text-white">
                  {item.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-gray-200 w-screen p-2 flex flex-col space-y-10 h-[calc(100vh-64px)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-transparent">
          {playtab === 'dashboard' ? (
            <Dash />
          ) : playtab === 'employees' ? (
            <AllEmployees />
          ) : playtab === 'departments' ? (
            <Departments />
          ) : playtab === 'customers' ? (
            <AllCustomers />
          ) : (
            <Dash />
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Dashboard
