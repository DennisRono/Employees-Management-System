import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AllEmployees = () => {
  const [employees, setEmployees] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  useEffect(() => {
    const fetchAllEmployees = async () => {
      setLoading(true)
      const res = await fetch('/api/employees')
      const data = await res.json()
      setLoading(false)
      if (res.ok) {
        setEmployees(data)
      } else {
        console.log('Error Fetching data')
      }
    }
    fetchAllEmployees()
  }, [])

  console.log(employees)
  return (
    <>
      <div className="mx-auto">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            {/* Loading animation */}
            <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <h1 className="my-2 text-2xl ml-2">All Employees</h1>
            {employees && employees.length > 0 ? (
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">No.</th>
                    <th className="py-3 px-6 text-left">Employee ID</th>
                    <th className="py-3 px-6 text-left">First Name</th>
                    <th className="py-3 px-6 text-left">Last Name</th>
                    <th className="py-3 px-6 text-left">Email</th>
                    <th className="py-3 px-6 text-left">Phone Number</th>
                    <th className="py-3 px-6 text-left">Role</th>
                    <th className="py-3 px-6 text-left">Department</th>
                  </tr>
                </thead>
                <tbody className="text-black font-light">
                  {employees.map((employee, index) => (
                    <tr
                      key={employee.employee_id}
                      className="border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
                      onClick={() =>
                        navigate(`/employee/${employee.employee_id}`)
                      }
                    >
                      <td className="py-3 px-6 text-left">{index + 1}</td>
                      <td className="py-3 px-6 text-left">
                        {employee?.employee_id}
                      </td>
                      <td className="py-3 px-6 text-left">
                        {employee?.first_name}
                      </td>
                      <td className="py-3 px-6 text-left">
                        {employee?.last_name}
                      </td>
                      <td className="py-3 px-6 text-left">{employee?.email}</td>
                      <td className="py-3 px-6 text-left">
                        {employee?.phone_number || 'N/A'}
                      </td>
                      <td className="py-3 px-6 text-left">
                        {employee.role?.role_name || 'N/A'}
                      </td>
                      <td className="py-3 px-6 text-left">
                        {employee.department?.department_name || 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center text-gray-500">No employees found.</p>
            )}
          </div>
        )}
      </div>
    </>
  )
}

export default AllEmployees
