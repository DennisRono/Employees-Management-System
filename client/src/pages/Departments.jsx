import { useEffect, useState } from 'react'

const Departments = () => {
  const [departments, setDepartments] = useState(null)
  const [loading, setLoading] = useState(true)
  const [expandedDepartment, setExpandedDepartment] = useState(null)

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
        <h1 className="my-2 text-2xl ml-2">Departments</h1>
        {departments && (
          <table className="min-w-full bg-white border-collapse border">
            <thead>
              <tr>
                <th className="border p-2 text-left">No.</th>
                <th className="border p-2 text-left">Department Name</th>
                <th className="border p-2 text-left">Location</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((department, index) => (
                <>
                  <tr
                    key={department.department_id}
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => toggleDepartment(department.department_id)}
                  >
                    <td className="border p-2">{index + 1}</td>
                    <td className="border p-2">{department.department_name}</td>
                    <td className="border p-2">{department.location}</td>
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
                                        <span className="font-bold">Name:</span>{' '}
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
                                {department.administrators.map((admin) => (
                                  <div
                                    key={admin.admin_id}
                                    className="pl-4 mb-1"
                                  >
                                    <p>
                                      <span className="font-bold">Name:</span>{' '}
                                      {admin.admin_name}
                                    </p>
                                    <p>
                                      <span className="font-bold">Email:</span>{' '}
                                      {admin.email}
                                    </p>
                                    <p>
                                      <span className="font-bold">Phone:</span>{' '}
                                      {admin.phone_number}
                                    </p>
                                  </div>
                                ))}
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
        )}
      </div>
    </>
  )
}

export default Departments
