from flask import Flask, request
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api, Resource
from models import db, Employee, Department, Role
from config import Config

# Create Flask app
app = Flask(__name__)
CORS(app)
app.config.from_object(Config)

# Initialize database and migration
db.init_app(app)
migrate = Migrate(app, db)
api = Api(app)


# Employee Resource
class EmployeeResource(Resource):
    def get(self, employee_id=None):
        if employee_id:
            employee = Employee.query.get_or_404(employee_id)
            return employee.to_dict(), 200
        else:
            employees = Employee.query.all()
            return [emp.to_dict() for emp in employees], 200

    def post(self):
        # Create a new employee
        data = request.get_json()
        new_employee = Employee(
            first_name=data["first_name"],
            last_name=data["last_name"],
            email=data["email"],
            phone_number=data.get("phone_number"),
            department_id=data["department_id"],
            role_id=data["role_id"],
        )
        db.session.add(new_employee)
        db.session.commit()
        return new_employee.to_dict(), 201

    def put(self, employee_id):
        # Update an existing employee
        employee = Employee.query.get_or_404(employee_id)
        data = request.get_json()

        employee.first_name = data.get("first_name", employee.first_name)
        employee.last_name = data.get("last_name", employee.last_name)
        employee.email = data.get("email", employee.email)
        employee.phone_number = data.get("phone_number", employee.phone_number)
        employee.department_id = data.get("department_id", employee.department_id)
        employee.role_id = data.get("role_id", employee.role_id)

        db.session.commit()
        return employee.to_dict(), 200

    def delete(self, employee_id):
        # Delete an employee
        employee = Employee.query.get_or_404(employee_id)
        db.session.delete(employee)
        db.session.commit()
        return {"message": "Employee deleted"}, 204


# Department Resource
class DepartmentResource(Resource):
    def get(self, department_id=None):
        # Get all departments or specific department by ID
        if department_id:
            department = Department.query.get_or_404(department_id)
            return department.to_dict(), 200
        else:
            departments = Department.query.all()
            return [dept.to_dict() for dept in departments], 200

    def post(self):
        # Create a new department
        data = request.get_json()
        new_department = Department(
            department_name=data["department_name"], location=data.get("location")
        )
        db.session.add(new_department)
        db.session.commit()
        return new_department.to_dict(), 201

    def put(self, department_id):
        # Update an existing department
        department = Department.query.get_or_404(department_id)
        data = request.get_json()

        department.department_name = data.get(
            "department_name", department.department_name
        )
        department.location = data.get("location", department.location)

        db.session.commit()
        return department.to_dict(), 200

    def delete(self, department_id):
        # Delete a department
        department = Department.query.get_or_404(department_id)
        db.session.delete(department)
        db.session.commit()
        return {"message": "Department deleted"}, 204


# Role Resource
class RoleResource(Resource):
    def get(self, role_id=None):
        # Get all roles or specific role by ID
        if role_id:
            role = Role.query.get_or_404(role_id)
            return role.to_dict(), 200
        else:
            roles = Role.query.all()
            return [role.to_dict() for role in roles], 200

    def post(self):
        # Create a new role
        data = request.get_json()
        new_role = Role(role_name=data["role_name"])
        db.session.add(new_role)
        db.session.commit()
        return new_role.to_dict(), 201

    def put(self, role_id):
        # Update an existing role
        role = Role.query.get_or_404(role_id)
        data = request.get_json()

        role.role_name = data.get("role_name", role.role_name)

        db.session.commit()
        return role.to_dict(), 200

    def delete(self, role_id):
        # Delete a role
        role = Role.query.get_or_404(role_id)
        db.session.delete(role)
        db.session.commit()
        return {"message": "Role deleted"}, 204


# Endpoints
api.add_resource(EmployeeResource, "/employees", "/employees/<int:employee_id>")
api.add_resource(DepartmentResource, "/departments", "/departments/<int:department_id>")
api.add_resource(RoleResource, "/roles", "/roles/<int:role_id>")

# Run the app
if __name__ == "__main__":
    app.run(debug=True)
