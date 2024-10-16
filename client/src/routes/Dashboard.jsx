import Footer from '../components/Footer'
import Header from '../components/Header'

const Home = () => {
  return (
    <>
      <Header />
      <div className="flex flex-row">
        <div className="align-vertical md:align-top bg-blue-800 justify-self-start w-1/5 h-screen">
          <li className="text-white text-2xl list-none">Dashboard</li>
          <li className="text-white text-2xl list-none"> Admins</li>
          <li className="text-white text-2xl list-none">Employees</li>
          <li className="text-white text-2xl list-none">Customers</li>
          <li className="text-white text-2xl list-none">Roles</li>
        </div>
        <div className="bg-gray-200 w-screen pt-12 pl-12">
          <div className="w-9/12 h-1/6 bg-white pt-10 pl-12">
            <p className="text-blue-800 text-2xl">Welcome back, Name</p>
            <p>We're delighted to have you.</p>
          </div>
          <div></div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Home
