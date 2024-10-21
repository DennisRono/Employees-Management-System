import { useEffect, useState } from 'react'
import { useAppDispatch } from '../store/hooks'
import { setDashTab } from '../store/slices/dashtabSlice'

const Departments = () => {
  const [departments, setDepartments] = useState(null)
  const [loading, setLoading] = useState(true)
  const [expandedDepartment, setExpandedDepartment] = useState(null)
  const dispatch = useAppDispatch()

  useEffect(() => {
    fetch('/api/departments')
      .then((response) => response.json())
      .then((data) => {
        setDepartments(data)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [])

  const toggleDepartment = (department_id) => {
    if (expandedDepartment === department_id) {
      setExpandedDepartment(null)
    } else {
      setExpandedDepartment(department_id)
    }
  }

  if (loading) {
    return <div className="text-center text-xl font-bold">Loading...</div>
  }

  return (
    <>
      <div className="">
        {departments && (
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center justify-between">
                <h2 className="text-lg leading-6 font-medium text-gray-900">
                  Departments
                </h2>
                <button
                  className="text-sm p-2 bg-green-600 rounded-md text-white font-bold hover:bg-green-800"
                  onClick={() => {
                    dispatch(setDashTab('newdepartment'))
                  }}
                >
                  New Department
                </button>
              </div>
              <div className="mt-5 flow-root">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        No.
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Position
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Department
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {departments.map((department, index) => (
                      <>
                        <tr
                          key={index}
                          onClick={() =>
                            toggleDepartment(department.department_id)
                          }
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {index + 1}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {department?.department_name}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {department.location}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center justify-start gap-2">
                              <button
                                className="text-sm p-2 bg-red-600 rounded-md text-white font-bold hover:bg-red-800"
                                onClick={(e) => {
                                  e.stopPropagation()
                                }}
                              >
                                Delete
                              </button>
                              <button
                                className="text-sm p-2 bg-blue-600 rounded-md text-white font-bold hover:bg-blue-800"
                                onClick={(e) => {
                                  e.stopPropagation()
                                }}
                              >
                                Update
                              </button>
                            </div>
                          </td>
                        </tr>
                        {expandedDepartment === department.department_id && (
                          <tr>
                            <td colSpan="3" className="border p-4 bg-gray-100">
                              <div>
                                <h3 className="text-xl font-bold mb-4">
                                  Employees in {department.department_name}
                                </h3>
                                {department.employees.map((employee) => (
                                  <div
                                    key={employee.employee_id}
                                    className="border p-4 rounded-md mb-4 bg-white"
                                  >
                                    <h4 className="text-lg font-semibold">
                                      {employee.first_name} {employee.last_name}
                                    </h4>
                                    <p className="mb-1">
                                      <span className="font-bold">Role:</span>{' '}
                                      {employee.role.role_name}
                                    </p>
                                    <p className="mb-1">
                                      <span className="font-bold">Email:</span>{' '}
                                      {employee.email}
                                    </p>
                                    <p className="mb-1">
                                      <span className="font-bold">Phone:</span>{' '}
                                      {employee.phone_number || 'N/A'}
                                    </p>

                                    <div className="mt-3">
                                      <h5 className="font-bold">
                                        Customers Assigned:
                                      </h5>
                                      {employee.customers.length > 0 ? (
                                        employee.customers.map((customer) => (
                                          <div
                                            key={customer.customer_id}
                                            className="pl-4 mb-1"
                                          >
                                            <p>
                                              <span className="font-bold">
                                                Name:
                                              </span>{' '}
                                              {customer.first_name}{' '}
                                              {customer.last_name}
                                            </p>
                                            <p>
                                              <span className="font-bold">
                                                Email:
                                              </span>{' '}
                                              {customer.email}
                                            </p>
                                            <p>
                                              <span className="font-bold">
                                                Phone:
                                              </span>{' '}
                                              {customer.phone_number}
                                            </p>
                                          </div>
                                        ))
                                      ) : (
                                        <p>No customers assigned</p>
                                      )}
                                    </div>

                                    <div className="mt-3">
                                      <h6 className="font-bold">
                                        Department Administrators:
                                      </h6>
                                      {department.administrators.map(
                                        (admin) => (
                                          <div
                                            key={admin.admin_id}
                                            className="pl-4 mb-1"
                                          >
                                            <p>
                                              <span className="font-bold">
                                                Name:
                                              </span>{' '}
                                              {admin.admin_name}
                                            </p>
                                            <p>
                                              <span className="font-bold">
                                                Email:
                                              </span>{' '}
                                              {admin.email}
                                            </p>
                                            <p>
                                              <span className="font-bold">
                                                Phone:
                                              </span>{' '}
                                              {admin.phone_number}
                                            </p>
                                          </div>
                                        )
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </td>
                          </tr>
                        )}
                      </>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Departments
