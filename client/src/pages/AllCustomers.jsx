import { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

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
        <h1 className="my-2 text-2xl ml-2">All Customers</h1>
        {allCustomers && (
          <table className="min-w-full bg-white border-collapse border">
            <thead>
              <tr>
                <th className="border p-2 text-left">No.</th>
                <th className="border p-2 text-left">First Name</th>
                <th className="border p-2 text-left">Last Name</th>
                <th className="border p-2 text-left">Email</th>
                <th className="border p-2 text-left">Phone</th>
              </tr>
            </thead>
            <tbody>
              {allCustomers.map((customer, index) => (
                <>
                  <tr
                    key={customer.customer_id}
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => toggleCustomer(customer.customer_id)}
                  >
                    <td className="border p-2">{index + 1}</td>
                    <td className="border p-2">{customer.first_name}</td>
                    <td className="border p-2">{customer.last_name}</td>
                    <td className="border p-2">{customer.email}</td>
                    <td className="border p-2">{customer.phone_number}</td>
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
                                  <span className="font-bold">Location:</span>{' '}
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
                                        <span className="font-bold">Name:</span>{' '}
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
        )}
      </div>
    </>
  )
}

export default AllCustomers
