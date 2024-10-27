import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { setDashTab } from '../store/slices/dashtabSlice'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'

const UpdateEmployee = () => {
  const employee = useAppSelector((state) => state.cache).id
  const dispatch = useAppDispatch()

  const [editEmployeeData, setEditEmployeeData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    department_id: 1,
    role_id: 2,
  })

  useEffect(() => {
    if (employee) {
      setEditEmployeeData({
        first_name: employee.first_name || '',
        last_name: employee.last_name || '',
        email: employee.email || '',
        phone_number: employee.phone_number || '',
        department_id: employee.department_id || '',
        role_id: employee.role_id || 2,
      })
    }
  }, [employee])

  const updateEmployee = async () => {
    try {
      const res = await fetch(`/api/employees/${employee.id}`, {
        method: 'PATCH',
        headers: {
          Authorization: 'Bearer ' + Cookies.get('access_token'),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editEmployeeData),
      })

      if (res.ok) {
        console.log('Update successful')
        dispatch(setDashTab('employees'))
        toast('Employee updated successfully', { type: 'success' })
      } else {
        const result = await res.json()
        toast(result.message, { type: 'error' })
      }
    } catch (error) {
      console.error(error)
      toast('An error occurred. Please try again.', { type: 'error' })
    }
  }

  return (
    <div className="mx-auto w-full">
      <div className="p-4 bg-white rounded shadow-md w-full max-w-md mx-auto">
        <h2 className="text-2xl mb-4">
          Update Employee ({employee?.first_name || ''}{' '}
          {employee?.last_name || ''})
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            updateEmployee()
          }}
        >
          <div className="flex items-center justify-between gap-2">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                First Name
              </label>
              <input
                type="text"
                value={editEmployeeData.first_name}
                onChange={(e) =>
                  setEditEmployeeData({
                    ...editEmployeeData,
                    first_name: e.target.value,
                  })
                }
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Last Name
              </label>
              <input
                type="text"
                value={editEmployeeData.last_name}
                onChange={(e) =>
                  setEditEmployeeData({
                    ...editEmployeeData,
                    last_name: e.target.value,
                  })
                }
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              value={editEmployeeData.email}
              onChange={(e) =>
                setEditEmployeeData({
                  ...editEmployeeData,
                  email: e.target.value,
                })
              }
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              value={editEmployeeData.phone_number}
              onChange={(e) =>
                setEditEmployeeData({
                  ...editEmployeeData,
                  phone_number: e.target.value,
                })
              }
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="button"
              className="bg-gray-600 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => dispatch(setDashTab('employees'))}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UpdateEmployee
