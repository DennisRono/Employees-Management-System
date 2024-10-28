import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { User, Mail, Phone, Building, Briefcase, MapPin } from 'lucide-react'

const Employee = () => {
  let { id } = useParams()

  const [employee, setEmployee] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await fetch(`/api/employees/${id}`)
        if (!response.ok) {
          throw new Error('Failed to fetch employee data')
        }
        const result = await response.json()
        setEmployee(result)
      } catch (error) {
        console.error(error)
        setError('Failed to load employee data. Please try again later.')
      } finally {
        setLoading(false)
      }
    }
    fetchEmployee()
  }, [id])

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto my-8 px-4">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-600">{error}</div>
        ) : employee ? (
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="bg-primary text-primary-foreground p-4">
              <h1 className="text-3xl font-bold">
                {employee.first_name} {employee.last_name}
              </h1>
              <p className="text-xl">{employee.role.role_name}</p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoItem
                  icon={<Mail className="h-5 w-5" />}
                  label="Email"
                  value={employee.email}
                />
                <InfoItem
                  icon={<Phone className="h-5 w-5" />}
                  label="Phone"
                  value={employee.phone_number}
                />
                <InfoItem
                  icon={<Building className="h-5 w-5" />}
                  label="Department"
                  value={employee.department.department_name}
                />
                <InfoItem
                  icon={<Briefcase className="h-5 w-5" />}
                  label="Role"
                  value={employee.role.role_name}
                />
                <InfoItem
                  icon={<MapPin className="h-5 w-5" />}
                  label="Location"
                  value={employee.department.location}
                />
                <InfoItem
                  icon={<User className="h-5 w-5" />}
                  label="Employee ID"
                  value={employee.employee_id.toString()}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-600">
            No employee data available.
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}

const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-center space-x-2">
    <div className="text-primary">{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  </div>
)

export default Employee
