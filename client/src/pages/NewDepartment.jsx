import { useState } from 'react'
import { useAppDispatch } from '../store/hooks'
import { setDashTab } from '../store/slices/dashtabSlice'
import Cookies from 'js-cookie'

const NewDepartment = () => {
  const [formData, setFormData] = useState({
    department_name: '',
    location: '',
  })
  const dispatch = useAppDispatch()

  const [errors, setErrors] = useState({})

  const validateForm = () => {
    let formErrors = {}

    if (!formData.department_name.trim()) {
      formErrors.department_name = 'Department name is required'
    }

    if (!formData.location.trim()) {
      formErrors.location = 'Location is required'
    }

    setErrors(formErrors)

    return Object.keys(formErrors).length === 0
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (validateForm()) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/departments`,
          {
            method: 'POST',
            headers: {
              Authorization: 'Bearer ' + Cookies.get('access_token'),
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          }
        )

        if (!response.ok) {
          throw new Error('Error submitting form')
        }

        const data = await response.json()
        console.log('Department added successfully:', data)

        setFormData({
          department_name: '',
          location: '',
        })
        setErrors({})
        dispatch(setDashTab('departments'))
      } catch (error) {
        console.error('Error adding department:', error)
      }
    }
  }

  return (
    <div className="max-w-md w-full mx-auto mt-10 bg-white shadow-md rounded-lg p-8">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Add New Department
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="department_name"
          >
            Department Name
          </label>
          <input
            type="text"
            name="department_name"
            value={formData.department_name}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md ${
              errors.department_name ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.department_name && (
            <p className="text-red-500 text-sm mt-1">
              {errors.department_name}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="location"
          >
            Location
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md ${
              errors.location ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.location && (
            <p className="text-red-500 text-sm mt-1">{errors.location}</p>
          )}
        </div>

        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={() => dispatch(setDashTab('departments'))}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            cancel
          </button>
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

export default NewDepartment
