import { useEffect, useState } from 'react'
import { useAppDispatch } from '../store/hooks'
import { setDashTab } from '../store/slices/dashtabSlice'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { setCache } from '../store/slices/cacheSlice'

const AllEmployees = () => {
  const [employees, setEmployees] = useState(null)
  const [loading, setLoading] = useState(true)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const fetchAllEmployees = async () => {
    setLoading(true)
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/employees`)
    const data = await res.json()
    setLoading(false)
    if (res.ok) {
      setEmployees(data)
    } else {
      console.log('Error Fetching data')
    }
  }
  useEffect(() => {
    fetchAllEmployees()
  }, [])

  const deleteEmployee = async (id) => {
    try {
      const response = await fetch(`/api/employees/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + Cookies.get('access_token'),
          'Content-Type': 'application/json',
        },
        redirect: 'follow',
      })
      const result = await response.text()
      console.log(result)
      fetchAllEmployees()
    } catch (error) {
      console.error(error)
    }
  }
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
            <div className="flex items-center justify-between mb-2">
              <h1 className="my-2 text-2xl ml-2">All Employees</h1>
              <button
                onClick={() => dispatch(setDashTab('newemployee'))}
                className="mr-2 bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                New Employee
              </button>
            </div>
            {employees && employees.length > 0 ? (
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">ID</th>
                    <th className="py-3 px-6 text-left">Full Name</th>
                    <th className="py-3 px-6 text-left">Email</th>
                    <th className="py-3 px-6 text-left">Phone Number</th>
                    <th className="py-3 px-6 text-left">Role</th>
                    <th className="py-3 px-6 text-left">Department</th>
                    <th className="py-3 px-6 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-black font-light">
                  {employees.map((employee) => (
                    <tr
                      key={employee.employee_id}
                      className="border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
                      onClick={() =>
                        navigate(`/employee/${employee.employee_id}`)
                      }
                    >
                      <td className="py-3 px-6 text-left">
                        {employee?.employee_id}
                      </td>
                      <td className="py-3 px-6 text-left">
                        <span>
                          {employee?.first_name} {employee?.last_name}
                        </span>
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
                      <td
                        className="py-3 px-6 text-left"
                        onClick={(e) => {
                          e.stopPropagation()
                        }}
                      >
                        <div className="flex items-center justify-start gap-2">
                          <button
                            className="text-sm p-2 bg-red-600 rounded-md text-white font-bold hover:bg-red-800"
                            onClick={(e) => {
                              e.stopPropagation()
                              deleteEmployee(employee.employee_id)
                            }}
                          >
                            Delete
                          </button>
                          <button
                            className="text-sm p-2 bg-blue-600 rounded-md text-white font-bold hover:bg-blue-800"
                            onClick={(e) => {
                              e.stopPropagation()
                              dispatch(
                                setCache({
                                  id: employee?.employee_id,
                                  first_name: employee?.first_name,
                                  last_name: employee?.last_name,
                                  email: employee?.email,
                                  phone_number: employee?.phone_number,
                                  department_id: employee?.department_id,
                                  role_id: employee?.role_id,
                                })
                              )
                              dispatch(setDashTab('updatemployee'))
                            }}
                          >
                            Update
                          </button>
                        </div>
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
