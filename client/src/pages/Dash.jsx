import { Users, UserPlus, UserMinus, DollarSign } from 'lucide-react'

export default function Dash() {
  const stats = [
    {
      title: 'Total Employees',
      value: '248',
      icon: Users,
      color: 'bg-blue-500',
    },
    { title: 'New Hires', value: '12', icon: UserPlus, color: 'bg-green-500' },
    { title: 'Resignations', value: '4', icon: UserMinus, color: 'bg-red-500' },
    {
      title: 'Total Payroll',
      value: '$360,240',
      icon: DollarSign,
      color: 'bg-yellow-500',
    },
  ]

  const recentActivities = [
    {
      action: 'New employee added',
      name: 'John Doe',
      department: 'Marketing',
      date: '2023-04-15',
    },
    {
      action: 'Salary updated',
      name: 'Jane Smith',
      department: 'Engineering',
      date: '2023-04-14',
    },
    {
      action: 'Leave approved',
      name: 'Mike Johnson',
      department: 'HR',
      date: '2023-04-13',
    },
    {
      action: 'Performance review',
      name: 'Emily Brown',
      department: 'Sales',
      date: '2023-04-12',
    },
  ]

  const employees = [
    {
      name: 'Alice Cooper',
      position: 'Software Engineer',
      department: 'Engineering',
      status: 'Active',
    },
    {
      name: 'Bob Marley',
      position: 'Marketing Specialist',
      department: 'Marketing',
      status: 'On Leave',
    },
    {
      name: 'Charlie Puth',
      position: 'HR Manager',
      department: 'Human Resources',
      status: 'Active',
    },
    {
      name: 'Diana Ross',
      position: 'Sales Representative',
      department: 'Sales',
      status: 'Inactive',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-2xl font-semibold text-gray-900">
            Dashboard Overview
          </h1>

          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((item) => (
              <div
                key={item.title}
                className="bg-white overflow-hidden shadow rounded-lg"
              >
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <item.icon
                        className={`h-6 w-6 text-white ${item.color} p-1 rounded`}
                      />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          {item.title}
                        </dt>
                        <dd className="text-lg font-semibold text-gray-900">
                          {item.value}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <h2 className="text-lg leading-6 font-medium text-gray-900">
                  Recent Activities
                </h2>
                <div className="mt-5 flow-root">
                  <ul className="-my-4 divide-y divide-gray-200">
                    {recentActivities.map((activity, index) => (
                      <li key={index} className="py-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-blue-500">
                              <span className="text-sm font-medium leading-none text-white">
                                {activity.name.charAt(0)}
                              </span>
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {activity.action}
                            </p>
                            <p className="text-sm text-gray-500 truncate">{`${activity.name} - ${activity.department}`}</p>
                          </div>
                          <div className="flex-shrink-0 text-sm text-gray-500">
                            {activity.date}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <h2 className="text-lg leading-6 font-medium text-gray-900">
                  Employee List
                </h2>
                <div className="mt-5 flow-root">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Position
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Department
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {employees.map((employee, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0">
                                <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-blue-500">
                                  <span className="text-sm font-medium leading-none text-white">
                                    {employee.name.charAt(0)}
                                  </span>
                                </span>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {employee.name}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {employee.position}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {employee.department}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                employee.status === 'Active'
                                  ? 'bg-green-100 text-green-800'
                                  : employee.status === 'Inactive'
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}
                            >
                              {employee.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
