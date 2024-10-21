import { useState } from 'react'
import { useAppDispatch } from '../store/hooks'
import { setDashTab } from '../store/slices/dashtabSlice'
import Cookies from 'js-cookie'

const NewRole = () => {
  const [formData, setFormData] = useState({
    role_name: '',
  })
  const dispatch = useAppDispatch()
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const validateForm = () => {
    let formErrors = {}
    if (!formData.role_name.trim()) {
      formErrors.role_name = 'Role name is required'
    }
    setErrors(formErrors)
    return Object.keys(formErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (validateForm()) {
      try {
        const response = await fetch('/api/roles', {
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + Cookies.get('access_token'),
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        })

        if (!response.ok) {
          throw new Error('Error submitting form')
        }

        const data = await response.json()
        console.log('Role added successfully:', data)

        setFormData({
          role_name: '',
        })
        setErrors({})
        dispatch(setDashTab('roles'))
      } catch (error) {
        console.error('Error adding role:', error)
      }
    }
  }

  return (
    <div className="max-w-md w-full mx-auto mt-10 bg-white shadow-md rounded-lg p-8">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Add New Role
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="Role Name"
          >
            Role Name
          </label>
          <input
            type="text"
            name="role_name"
            value={formData.role_name}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md ${
              errors.role_name ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.role_name && (
            <p className="text-red-500 text-sm mt-1">{errors.role_name}</p>
          )}
        </div>

        <div className="flex justify-end items-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default NewRole
