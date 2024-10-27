import Footer from '../components/Footer'
import Header from '../components/Header'
import {
  Home,
  Users,
  AlignHorizontalJustifyStart,
  UsersRound,
  BriefcaseBusiness,
} from 'lucide-react'
import Dash from '../pages/Dash'
import AllEmployees from '../pages/AllEmployees'
import Departments from '../pages/Departments'
import AllCustomers from '../pages/AllCustomers'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { setDashTab } from '../store/slices/dashtabSlice'
import NewEmployee from '../pages/NewEmployee'
import NewDepartment from '../pages/NewDepartment'
import Roles from '../pages/Roles'
import Role from '../pages/Role'
import NewRole from '../pages/NewRole'
import UpdateRole from '../pages/UpdateRole'
import UpdateDepartment from '../pages/UpdateDepartment'
import UpdateEmployee from '../pages/UpdateEmployee'

const Dashboard = () => {
  const playtab = useAppSelector((state) => state.dashtab).tab
  const dispatch = useAppDispatch()
  const menuItems = [
    {
      name: 'Dashboard',
      icon: <Home style={{ color: '#fff', fontSize: 18 }} />,
      key: 'dashboard',
    },
    {
      name: 'Employees',
      icon: <Users style={{ color: '#fff', fontSize: 18 }} />,
      key: 'employees',
    },
    {
      name: 'Departments',
      icon: (
        <AlignHorizontalJustifyStart style={{ color: '#fff', fontSize: 18 }} />
      ),
      key: 'departments',
    },
    {
      name: 'Customers',
      icon: <UsersRound style={{ color: '#fff', fontSize: 18 }} />,
      key: 'customers',
    },
    {
      name: 'Roles',
      icon: <BriefcaseBusiness style={{ color: '#fff', fontSize: 18 }} />,
      key: 'roles',
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
                  dispatch(setDashTab(item.key))
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
          ) : playtab === 'newemployee' ? (
            <NewEmployee />
          ) : playtab === 'newdepartment' ? (
            <NewDepartment />
          ) : playtab === 'roles' ? (
            <Roles />
          ) : playtab === 'role' ? (
            <Role />
          ) : playtab === 'newrole' ? (
            <NewRole />
          ) : playtab === 'updaterole' ? (
            <UpdateRole />
          ) : playtab === 'updatedepartment' ? (
            <UpdateDepartment />
          ) : playtab === 'updatemployee' ? (
            <UpdateEmployee />
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
