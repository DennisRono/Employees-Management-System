import Cookies from 'js-cookie'

const Dash = () => {
  return (
    <>
      <div className="w-9/12 h-1/6 bg-white pt-10 pl-12 rounded-xl">
        <p className="text-blue-800 text-2xl">Welcome back, {Cookies.get('username')}</p>
        <p>We&apos;re delighted to have you.</p>
      </div>
      <div className="bg-white w-9/12 h-2/6 pt-12 pl-12 rounded-2xl">
        <p className="text-blue-800 text-2xl pb-4">
          We are here to make your Management Easy
        </p>
        <p className="pl-12 text-xl">The services we provide are:</p>
        <ol className="pl-16 list-decimal">
          <li>
            Admins can remove an employee and add a new department
          </li>
          <li>Employees can view their details and also see the customers they are attached to</li>
          <li>On clicking a particular department one can view emplyees in that department</li>
          <li>You can be able to veiw the employees assigned to a particular customer</li>
        </ol>
      </div>
    </>
  )
}

export default Dash
