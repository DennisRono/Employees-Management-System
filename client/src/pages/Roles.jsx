import { useEffect, useState } from 'react'
import { useAppDispatch } from '../store/hooks'
import { setDashTab } from '../store/slices/dashtabSlice'
import Cookies from 'js-cookie'
import { setCache } from '../store/slices/cacheSlice'

const Roles = () => {
  const [roles, setRoles] = useState(null)
  const [loading, setLoading] = useState(true)
  const dispatch = useAppDispatch()

  const fetchAllRoles = async () => {
    setLoading(true)
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/roles`)
    const data = await res.json()
    setLoading(false)
    if (res.ok) {
      setRoles(data)
    } else {
      console.log('Error Fetching data')
    }
  }

  useEffect(() => {
    fetchAllRoles()
  }, [])

  const deleteRole = async (id) => {
    try {
      const response = await fetch(`/api/roles/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + Cookies.get('access_token'),
          'Content-Type': 'application/json',
        },
        redirect: 'follow',
      })
      const result = await response.text()
      console.log(result)
      fetchAllRoles()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <div className="mx-auto w-full">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            {/* Loading animation */}
            <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <div className="flex items-center justify-between mb-2">
              <h1 className="my-2 text-2xl ml-2">All Roles</h1>
              <button
                onClick={() => dispatch(setDashTab('newrole'))}
                className="mr-2 bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                New Role
              </button>
            </div>
            {roles && roles.length > 0 ? (
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">Role ID</th>
                    <th className="py-3 px-6 text-left">Role Name</th>
                    <th className="py-3 px-6 text-left">Employee Count</th>
                    <th className="py-3 px-6 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-black font-light">
                  {roles.map((role) => (
                    <tr
                      key={role.role_id}
                      className="border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        dispatch(setCache(role.role_id))
                        dispatch(setDashTab('role'))
                      }}
                    >
                      <td className="py-3 px-6 text-left">{role.role_id}</td>
                      <td className="py-3 px-6 text-left">{role.role_name}</td>
                      <td className="py-3 px-6 text-left">
                        {role?.employees?.length || 0}
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
                              deleteRole(role.role_id)
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
                                  id: role.role_id,
                                  role_name: role.role_name,
                                })
                              )
                              dispatch(setDashTab('updaterole'))
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
              <p className="text-center text-gray-500">No roles found.</p>
            )}
          </div>
        )}
      </div>
    </>
  )
}

export default Roles
