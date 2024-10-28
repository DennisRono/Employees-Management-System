from faker import Faker
from server.app import db, app
from server.models import (
    Employee,
    Department,
    Role,
    Customer,
    Administrator,
    EmployeeCustomer,
    AdminDepartment,
)
from werkzeug.security import generate_password_hash

faker = Faker()

# Path to the file where plain text passwords will be stored
PASSWORDS_FILE = "passwords.txt"


def clear_data():
    EmployeeCustomer.query.delete()
    AdminDepartment.query.delete()
    Employee.query.delete()
    Customer.query.delete()
    Administrator.query.delete()
    Department.query.delete()
    Role.query.delete()
    db.session.commit()


def seed_departments(num_departments=5):
    departments = []
    for _ in range(num_departments):
        department = Department(department_name=faker.company(), location=faker.city())
        departments.append(department)
        db.session.add(department)
    db.session.commit()
    return departments


def seed_roles(num_roles=5):
    roles = []
    for _ in range(num_roles):
        role = Role(role_name=faker.job())
        roles.append(role)
        db.session.add(role)
    db.session.commit()
    return roles


def seed_employees(departments, roles, num_employees=20):
    employees = []
    with open(PASSWORDS_FILE, "a") as f:
        for _ in range(num_employees):
            plain_password = faker.password()
            hashed_password = generate_password_hash(plain_password)

            employee = Employee(
                first_name=faker.first_name(),
                last_name=faker.last_name(),
                email=faker.unique.email(),
                phone_number=faker.phone_number(),
                password=hashed_password,  # Store hashed password
                department_id=faker.random_element(departments).department_id,
                role_id=faker.random_element(roles).role_id,
            )
            employees.append(employee)
            db.session.add(employee)

            # Log the email and plain password for testing purposes
            f.write(f"Employee: {employee.email}, Password: {plain_password}\n")

    db.session.commit()
    return employees


def seed_customers(num_customers=20):
    customers = []
    for _ in range(num_customers):
        customer = Customer(
            first_name=faker.first_name(),
            last_name=faker.last_name(),
            email=faker.unique.email(),
            phone_number=faker.phone_number(),
        )
        customers.append(customer)
        db.session.add(customer)
    db.session.commit()
    return customers


def seed_administrators(num_administrators=5):
    administrators = []
    with open(PASSWORDS_FILE, "a") as f:
        for _ in range(num_administrators):
            plain_password = faker.password()
            hashed_password = generate_password_hash(plain_password)

            admin = Administrator(
                admin_name=faker.name(),
                email=faker.unique.email(),
                phone_number=faker.phone_number(),
                password=hashed_password,  # Store hashed password
            )
            administrators.append(admin)
            db.session.add(admin)

            # Log the email and plain password for testing purposes
            f.write(f"Administrator: {admin.email}, Password: {plain_password}\n")

    db.session.commit()
    return administrators


def seed_employee_customers(employees, customers):
    for _ in range(20):
        employee_id = faker.random_element(employees).employee_id
        customer_id = faker.random_element(customers).customer_id

        if (
            not db.session.query(EmployeeCustomer)
            .filter_by(employee_id=employee_id, customer_id=customer_id)
            .first()
        ):
            new_entry = EmployeeCustomer(
                employee_id=employee_id, customer_id=customer_id
            )
            db.session.add(new_entry)

    db.session.commit()


def seed_admin_departments(administrators, departments):
    for _ in range(10):
        admin_id = faker.random_element(administrators).admin_id
        department_id = faker.random_element(departments).department_id

        # Check if the combination of admin_id and department_id already exists
        if (
            not db.session.query(AdminDepartment)
            .filter_by(admin_id=admin_id, department_id=department_id)
            .first()
        ):
            admin_department = AdminDepartment(
                admin_id=admin_id,
                department_id=department_id,
            )
            db.session.add(admin_department)

    db.session.commit()


def seed_data():
    # Clear any existing data in the database
    # clear_data()

    # Seed departments and roles
    departments = seed_departments()
    roles = seed_roles()

    # Seed employees, customers, administrators and their relationships
    employees = seed_employees(departments, roles)
    customers = seed_customers()
    administrators = seed_administrators()

    # Seed relationships between employees and customers, and admins and departments
    seed_employee_customers(employees, customers)
    seed_admin_departments(administrators, departments)


if __name__ == "__main__":
    with app.app_context():
        # Clear the passwords file before writing
        open(PASSWORDS_FILE, "w").close()

        # Seed the database
        seed_data()

        print("Database has been seeded and passwords are stored in passwords.txt!")
