import Footer from '../components/Footer'
import Header from '../components/Header'

const Dashboard = () => {
  return (
    <>
      <Header />
      <div className="flex flex-row">
        <div className="align-vertical md:align-top bg-blue-800 justify-self-start w-1/5 h-screen">
          <li className="text-white text-2xl list-none">Dashboard</li>
          <li className="text-white text-2xl list-none"> Admins</li>
          <li className="text-white text-2xl list-none">Employees</li>
          <li className="text-white text-2xl list-none">Departments</li>
          <li className="text-white text-2xl list-none">Customers</li>
          <li className="text-white text-2xl list-none">Roles</li>
        </div>
        <div className="bg-gray-200 w-screen pt-12 pl-12 flex flex-col space-y-10">
          <div className="w-9/12 h-1/6 bg-white pt-10 pl-12 rounded-xl">
            <p className="text-blue-800 text-2xl">Welcome back, Name</p>
            <p>We&apos;re delighted to have you.</p>
          </div>
          <div className='bg-white w-9/12 h-2/6 pt-12 pl-12 rounded-2xl'>
            <p className='text-blue-800 text-2xl pb-4'>We are here to make your Management Easy</p>
            <p className='pl-12 text-xl'>The services we provide are:</p>
            <ol className='pl-16 list-decimal'>
              <li>Admins can update both their details and the Employees details</li>
              <li>Employees can view and update their details</li>
              <li>Customers can veiw and update their details</li>
              <li>Admins can add or remove departments</li>
              <li>Admins can assign roles to various employees</li>
            </ol>
            
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}


export default Dashboard
