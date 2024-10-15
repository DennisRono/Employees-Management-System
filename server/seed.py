from faker import Faker
from app import db, app
from models import (
    Employee,
    Department,
    Role,
    Customer,
    Administrator,
    EmployeeCustomer,
    AdminDepartment,
)


faker = Faker()


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
    for _ in range(num_employees):
        employee = Employee(
            first_name=faker.first_name(),
            last_name=faker.last_name(),
            email=faker.unique.email(),
            phone_number=faker.phone_number(),
            department_id=faker.random_element(departments).department_id,
            role_id=faker.random_element(roles).role_id,
        )
        employees.append(employee)
        db.session.add(employee)
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
    for _ in range(num_administrators):
        admin = Administrator(
            admin_name=faker.name(),
            email=faker.unique.email(),
            phone_number=faker.phone_number(),
        )
        administrators.append(admin)
        db.session.add(admin)
    db.session.commit()
    return administrators


def seed_employee_customers(employees, customers):
    for _ in range(50):
        employee_customer = EmployeeCustomer(
            employee_id=faker.random_element(employees).employee_id,
            customer_id=faker.random_element(customers).customer_id,
        )
        db.session.add(employee_customer)
    db.session.commit()


def seed_admin_departments(administrators, departments):
    for _ in range(10):
        admin_department = AdminDepartment(
            admin_id=faker.random_element(administrators).admin_id,
            department_id=faker.random_element(departments).department_id,
        )
        db.session.add(admin_department)
    db.session.commit()


def seed_data():
    clear_data()

    departments = seed_departments()
    roles = seed_roles()

    employees = seed_employees(departments, roles)
    customers = seed_customers()
    administrators = seed_administrators()

    seed_employee_customers(employees, customers)
    seed_admin_departments(administrators, departments)


if __name__ == "__main__":
    with app.app_context():
        seed_data()
        print("Database has been seeded!")
