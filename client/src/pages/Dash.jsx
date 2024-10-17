const Dash = () => {
  return (
    <>
      <div className="w-9/12 h-1/6 bg-white pt-10 pl-12 rounded-xl">
        <p className="text-blue-800 text-2xl">Welcome back, Name</p>
        <p>We&apos;re delighted to have you.</p>
      </div>
      <div className="bg-white w-9/12 h-2/6 pt-12 pl-12 rounded-2xl">
        <p className="text-blue-800 text-2xl pb-4">
          We are here to make your Management Easy
        </p>
        <p className="pl-12 text-xl">The services we provide are:</p>
        <ol className="pl-16 list-decimal">
          <li>
            Admins can update both their details and the Employees details
          </li>
          <li>Employees can view and update their details</li>
          <li>Customers can veiw and update their details</li>
          <li>Admins can add or remove departments</li>
          <li>Admins can assign roles to various employees</li>
        </ol>
      </div>
    </>
  )
}

export default Dash
