import React, { useState, useEffect } from 'react';

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);          // List of all employees
  const [selectedEmployee, setSelectedEmployee] = useState(null); // Selected employee
  const [isEditing, setIsEditing] = useState(false);        // Toggle between view and edit mode

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const response = await fetch('/api/employees');
    const data = await response.json();
    setEmployees(data);
  };

  const handleSelectEmployee = (employee) => {
    setSelectedEmployee(employee);
    setIsEditing(false);
  };

  const handleEdit = () => setIsEditing(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedEmployee(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`/api/employees/${selectedEmployee.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(selectedEmployee),
    });
    if (response.ok) {
      alert('Employee details updated successfully');
      setIsEditing(false);
      fetchEmployees();
    }
  };

  const FormField = ({ label, name, type = "text", value }) => (
    <div>
      <label>{label}</label>
      <input type={type} name={name} value={value || ''} onChange={handleChange} />
    </div>
  );

  return (
    <div>
      <h2>Employee Management</h2>

      <ul>
        {employees.map(emp => (
          <li key={emp.id}>
            {emp.firstName} {emp.lastName}
            <button onClick={() => handleSelectEmployee(emp)}>View / Edit</button>
          </li>
        ))}
      </ul>

      {selectedEmployee && (
        <div>
          <h3>{isEditing ? "Update Employee Details" : "Employee Details"}</h3>
          {!isEditing ? (
            <div>
              <p><strong>Name:</strong> {selectedEmployee.firstName} {selectedEmployee.lastName}</p>
              <p><strong>Email:</strong> {selectedEmployee.email}</p>
              <p><strong>Phone:</strong> {selectedEmployee.phoneNumber}</p>
              <p><strong>Role:</strong> {selectedEmployee.role}</p>
              <p><strong>Department:</strong> {selectedEmployee.department}</p>
              <button onClick={handleEdit}>Edit Details</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <FormField label="First Name" name="firstName" value={selectedEmployee.firstName} />
              <FormField label="Last Name" name="lastName" value={selectedEmployee.lastName} />
              <FormField label="Email" name="email" type="email" value={selectedEmployee.email} />
              <FormField label="Phone Number" name="phoneNumber" value={selectedEmployee.phoneNumber} />
              <FormField label="Role" name="role" value={selectedEmployee.role} />
              <FormField label="Department" name="department" value={selectedEmployee.department} />
              <button type="submit">Save Changes</button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default EmployeeManagement;
