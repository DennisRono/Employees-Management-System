import { useState, useEffect } from 'react'
import { Briefcase, MapPin, Phone, Mail, User } from 'lucide-react'
import { useAppSelector } from '../store/hooks'

const Role = () => {
  const roleId = useAppSelector((state) => state.cache).id
  const [roleData, setRoleData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  console.log(roleId)

  useEffect(() => {
    const fetchRoleData = async () => {
      try {
        const response = await fetch(`/api/roles/${roleId}`)
        if (!response.ok) {
          throw new Error('Failed to fetch role data')
        }
        const data = await response.json()
        setRoleData(data)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    fetchRoleData()
  }, [roleId])

  if (loading) {
    return <div className="text-center py-10">Loading...</div>
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">Error: {error}</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <Briefcase className="mr-2" />
        {roleData.role_name} (ID: {roleData.role_id})
      </h1>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-xl leading-6 font-medium text-gray-900">
            Employees
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            List of employees with this role
          </p>
        </div>
        <div className="border-t border-gray-200">
          <ul className="divide-y divide-gray-200">
            {roleData.employees.map((employee) => (
              <li key={employee?.employee_id} className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <User className="h-10 w-10 rounded-full bg-gray-200 p-2" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {employee?.first_name} {employee?.last_name}
                      </div>
                      <div className="text-sm text-gray-500">
                        ID: {employee?.employee_id}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <span className="text-sm text-gray-500">
                      {employee?.email}
                    </span>
                    <Phone className="h-5 w-5 text-gray-400" />
                    <span className="text-sm text-gray-500">
                      {employee?.phone_number || 'N/A'}
                    </span>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="text-sm text-gray-500 flex items-center">
                    <Briefcase className="h-4 w-4 mr-1" />
                    Department: {employee.department?.department_name}
                  </div>
                  <div className="text-sm text-gray-500 flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    Location: {employee.department?.location}
                  </div>
                </div>
                {employee.customers.length > 0 && (
                  <div className="mt-2">
                    <div className="text-sm font-medium text-gray-900">
                      Customers:
                    </div>
                    <ul className="mt-1 space-y-1">
                      {employee.customers.map((customer) => (
                        <li
                          key={customer?.customer_id}
                          className="text-sm text-gray-500"
                        >
                          {customer?.first_name} {customer?.last_name} (
                          {customer?.email})
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Role
