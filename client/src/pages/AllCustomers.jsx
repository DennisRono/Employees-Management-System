import { useEffect, useState } from 'react'

const AllCustomers = () => {
  const [allCustomers, setAllCustomers] = useState(null)
  const [loading, setLoading] = useState(true)
  const [expandedCustomer, setExpandedCustomer] = useState(null) // Track expanded customer

  useEffect(() => {
    fetch('/api/customers')
      .then((response) => response.json())
      .then((data) => {
        setAllCustomers(data)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [])

  // Toggles the dropdown visibility for a specific customer
  const toggleCustomer = (customer_id) => {
    if (expandedCustomer === customer_id) {
      setExpandedCustomer(null) // Collapse if the same customer is clicked again
    } else {
      setExpandedCustomer(customer_id) // Expand the clicked customer
    }
  }

  if (loading) {
    return <div className="text-center text-xl font-bold">Loading...</div>
  }

  return (
    <>
      <div className="">
        {allCustomers && (
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <h2 className="text-lg leading-6 font-medium text-gray-900">
                All Customers
              </h2>
              <div className="mt-5 flow-root">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        No.
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Full Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Phone
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {allCustomers.map((customer, index) => (
                      <>
                        <tr
                          key={index}
                          onClick={() => toggleCustomer(customer.customer_id)}
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {index + 1}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0">
                                <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-blue-500">
                                  <span className="text-sm font-medium leading-none text-white">
                                    {customer?.first_name.charAt(0) || '#'}
                                  </span>
                                </span>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  <span>
                                    {customer?.first_name} {customer?.last_name}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {customer?.email}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {customer?.phone_number}
                            </div>
                          </td>
                        </tr>
                        {expandedCustomer === customer.customer_id && (
                          <tr>
                            <td colSpan="5" className="border p-4 bg-gray-100">
                              <div>
                                <h3 className="text-xl font-bold mb-4">
                                  Employees Assigned To {customer.first_name}{' '}
                                  {customer.last_name}
                                </h3>
                                {customer.employees.map((employee) => (
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
                                      {employee.phone_number}
                                    </p>

                                    <div className="mt-3">
                                      <h5 className="font-bold">
                                        Department:{' '}
                                        {employee.department.department_name}
                                      </h5>
                                      <p>
                                        <span className="font-bold">
                                          Location:
                                        </span>{' '}
                                        {employee.department.location}
                                      </p>
                                      <h6 className="font-semibold mt-2">
                                        Administrators:
                                      </h6>
                                      {employee.department.administrators.map(
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

export default AllCustomers
