import { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const [roles, setRoles] = useState([])
  const [departments, setDepartments] = useState([])
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone_number: '',
    email: '',
    password: '',
    confirm_password: '',
    department: '',
    role_id: '',
  })
  const [errors, setErrors] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchRolesAndDepartments = async () => {
      try {
        const [rolesResponse, departmentsResponse] = await Promise.all([
          fetch('/api/roles'),
          fetch('/api/departments'),
        ])

        const rolesData = await rolesResponse.json()
        const departmentsData = await departmentsResponse.json()

        setRoles(rolesData)
        setDepartments(departmentsData)
      } catch (error) {
        console.error('Error fetching roles or departments:', error)
        setErrors('Failed to load roles or departments.')
      }
    }

    fetchRolesAndDepartments()
  }, [])

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (
      !formData.first_name ||
      !formData.last_name ||
      !formData.phone_number ||
      !formData.email ||
      !formData.password ||
      !formData.department ||
      !formData.role_id
    ) {
      setErrors('All fields are required.')
      return
    }
    if (formData.password !== formData.confirm_password) {
      setErrors('Passwords do not match.')
      return
    }

    // Send form data to the registration endpoint
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + Cookies.get('access_token'),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        navigate('/employees')
      } else {
        const errorData = await response.json()
        console.log(errorData.message)
        setErrors('Registration failed.')
      }
    } catch (error) {
      console.error('Error registering user:', error)
      setErrors('Failed to register user.')
    }
  }

  return (
    <>
      <Header />
      <div className="h-screen flex items-center justify-center">
        <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md px-8 py-10 flex flex-col items-center">
          <h1 className="text-xl font-bold text-center text-gray-700 mb-8">
            Register an Employee
          </h1>
          {errors && <div className="text-red-500 mb-4">{errors}</div>}
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-start flex-col justify-start w-full">
                <label htmlFor="firstName" className="text-sm text-gray-700">
                  First Name:
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-start flex-col justify-start w-full">
                <label htmlFor="lastName" className="text-sm text-gray-700">
                  Last Name:
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex items-start flex-col justify-start">
              <label htmlFor="Phone Number" className="text-sm text-gray-700">
                Phone Number:
              </label>
              <input
                type="text"
                id="phonenumber"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-start flex-col justify-start">
              <label htmlFor="email" className="text-sm text-gray-700">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center justify-between gap-2">
              <div className="flex items-start flex-col justify-start w-full">
                <label htmlFor="password" className="text-sm text-gray-700">
                  Password:
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-start flex-col justify-start w-full">
                <label
                  htmlFor="confirmPassword"
                  className="text-sm text-gray-700"
                >
                  Confirm Password:
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirm_password"
                  value={formData.confirm_password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-between gap-2">
              <div className="flex items-start flex-col justify-start w-full">
                <label htmlFor="department" className="text-sm text-gray-700">
                  Department
                </label>
                <select
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Select Department</option>
                  {departments.map((dept) => (
                    <option key={dept.department_id} value={dept.department_id}>
                      {dept.department_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-start flex-col justify-start w-full">
                <label htmlFor="role" className="text-sm text-gray-700">
                  Role
                </label>
                <select
                  id="role"
                  name="role_id"
                  value={formData.role_id}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Select Role</option>
                  {roles.map((role) => (
                    <option key={role.role_id} value={role.role_id}>
                      {role.role_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-sm"
            >
              Register
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Register
