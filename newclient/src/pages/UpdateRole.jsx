import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { setDashTab } from '../store/slices/dashtabSlice'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'

const UpdateRole = () => {
  const role = useAppSelector((state) => state.cache).id
  const [editRoleData, setEditRoleData] = useState({
    role_name: role.role_name,
  })
  const dispatch = useAppDispatch()

  const updateRole = async () => {
    try {
      const res = await fetch(`/api/roles/${role.id}`, {
        method: 'PATCH',
        headers: {
          Authorization: 'Bearer ' + Cookies.get('access_token'),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editRoleData),
      })
      if (res.ok) {
        console.log('success')
        dispatch(setDashTab('roles'))
      } else {
        const result = await res.json()
        toast(result.message, { type: 'error' })
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <div className="mx-auto w-full">
        <div className="p-4 bg-white rounded shadow-md w-full max-w-md mx-auto">
          <h2 className="text-2xl mb-4">Update Role ({role.role_name})</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              updateRole()
            }}
          >
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Role Name
              </label>
              <input
                type="text"
                value={editRoleData.role_name}
                onChange={(e) =>
                  setEditRoleData({
                    ...editRoleData,
                    role_name: e.target.value,
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
                onClick={() => dispatch(setDashTab('roles'))}
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
    </>
  )
}

export default UpdateRole
