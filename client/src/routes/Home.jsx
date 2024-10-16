import { Users, Building2, UserCircle } from 'lucide-react'
import Employees from '../assets/images/employees.jpg'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-primary text-primary-foreground shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Users className="h-8 w-8" />
            <span className="text-2xl font-bold">EMS</span>
          </div>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <a href="#" className="hover:underline">
                  Home
                </a>
              </li>
              <li className="">
                <Link
                  to="/login"
                  className="py-3 px-5 rounded-md bg-blue-600 text-white cursor-pointer"
                >
                  Login / Register
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        <section className="bg-muted py-20">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Streamline Your Workforce Management
              </h1>
              <p className="text-xl mb-6">
                Efficiently manage your employees, departments, and roles with
                our comprehensive Employee Management System.
              </p>
              <button size="lg">Get Started</button>
            </div>
            <div className="md:w-1/2">
              <img
                src={Employees}
                alt="Employee Management"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Users className="h-12 w-12 mb-4 text-primary" />}
                title="Employee Management"
                description="Easily create, update, and manage employee records with our intuitive interface."
              />
              <FeatureCard
                icon={<Building2 className="h-12 w-12 mb-4 text-primary" />}
                title="Department Organization"
                description="Organize your company structure with customizable department management."
              />
              <FeatureCard
                icon={<UserCircle className="h-12 w-12 mb-4 text-primary" />}
                title="Role Assignment"
                description="Assign and manage roles to clearly define responsibilities within your organization."
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-muted text-muted-foreground">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About EMS</h3>
              <p>
                Empowering businesses with efficient employee management
                solutions since 2023.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:underline">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <p>123 Biashara Street</p>
              <p>Nairobi, Kenya 00100</p>
              <p>Email: info@ems.com</p>
              <p>Phone: +254712345678</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
              <p className="mb-4">
                Stay updated with our latest features and news.
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-muted-foreground/20 text-center">
            <p>&copy; 2023 Employee Management System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-muted p-6 rounded-lg shadow-md text-center">
      <div className="flex justify-center">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p>{description}</p>
    </div>
  )
}
