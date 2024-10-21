from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin

db = SQLAlchemy()


class Employee(db.Model, SerializerMixin):
    __tablename__ = "employees"
    employee_id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    phone_number = db.Column(db.String(15))
    password = db.Column(db.String)

    department_id = db.Column(db.Integer, db.ForeignKey("departments.department_id"))
    role_id = db.Column(db.Integer, db.ForeignKey("roles.role_id"))

    department = db.relationship("Department", back_populates="employees")
    role = db.relationship("Role", back_populates="employees")

    customers = db.relationship(
        "Customer", secondary="employee_customers", back_populates="employees"
    )

    serialize_rules = (
        "-department.employees",
        "-role.employees",
        "-customers.employees",
    )


class Department(db.Model, SerializerMixin):
    __tablename__ = "departments"
    department_id = db.Column(db.Integer, primary_key=True)
    department_name = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(100))

    employees = db.relationship("Employee", back_populates="department")

    administrators = db.relationship(
        "Administrator", secondary="admin_departments", back_populates="departments"
    )

    serialize_rules = ("-employees.department", "-administrators.departments")


class Role(db.Model, SerializerMixin):
    __tablename__ = "roles"
    role_id = db.Column(db.Integer, primary_key=True)
    role_name = db.Column(db.String(50), nullable=False)

    employees = db.relationship("Employee", back_populates="role")

    serialize_rules = (
        "-employees.role",
        "-employees.password",
        "-employees.department.administrators.password",
    )


class Customer(db.Model, SerializerMixin):
    __tablename__ = "customers"
    customer_id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    phone_number = db.Column(db.String(15))

    employees = db.relationship(
        "Employee", secondary="employee_customers", back_populates="customers"
    )

    serialize_rules = ("-employees.customers",)


class Administrator(db.Model, SerializerMixin):
    __tablename__ = "administrators"
    admin_id = db.Column(db.Integer, primary_key=True)
    admin_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    phone_number = db.Column(db.String(15))
    password = db.Column(db.String)

    departments = db.relationship(
        "Department", secondary="admin_departments", back_populates="administrators"
    )

    serialize_rules = ("-departments.administrators",)


class EmployeeCustomer(db.Model):
    __tablename__ = "employee_customers"
    employee_id = db.Column(
        db.Integer, db.ForeignKey("employees.employee_id"), primary_key=True
    )
    customer_id = db.Column(
        db.Integer, db.ForeignKey("customers.customer_id"), primary_key=True
    )
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())


class AdminDepartment(db.Model):
    __tablename__ = "admin_departments"
    admin_id = db.Column(
        db.Integer, db.ForeignKey("administrators.admin_id"), primary_key=True
    )
    department_id = db.Column(
        db.Integer, db.ForeignKey("departments.department_id"), primary_key=True
    )
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())


class TokenBlocklist(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    jti = db.Column(db.String(36), nullable=False, index=True)
    created_at = db.Column(db.DateTime, nullable=False)
