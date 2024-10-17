from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api, Resource
from models import db, Employee, Department, Role, Customer, Administrator
from config import Config
from auth import auth
from flask_jwt_extended import JWTManager


app = Flask(__name__)
CORS(app)
app.config.from_object(Config)
jwt = JWTManager(app)
app.register_blueprint(auth)

db.init_app(app)
migrate = Migrate(app, db)
api = Api(app)


class EmployeeResource(Resource):
    def get(self, employee_id=None):
        if employee_id:
            employee = Employee.query.filter(
                Employee.employee_id == employee_id
            ).first()
            if employee:
                return make_response(jsonify(employee.to_dict()), 200)
            else:
                return make_response(jsonify({"error": "Employee not found"}), 404)
        else:
            employees = Employee.query.all()
            return make_response(jsonify([emp.to_dict() for emp in employees]), 200)

    def post(self):
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
        return make_response(jsonify(new_employee.to_dict()), 201)

    def patch(self, employee_id):
        employee = Employee.query.filter(Employee.employee_id == employee_id).first()
        data = request.get_json()
        employee.first_name = data.get("first_name", employee.first_name)
        employee.last_name = data.get("last_name", employee.last_name)
        employee.email = data.get("email", employee.email)
        employee.phone_number = data.get("phone_number", employee.phone_number)
        employee.department_id = data.get("department_id", employee.department_id)
        employee.role_id = data.get("role_id", employee.role_id)
        db.session.commit()
        return make_response(jsonify(employee.to_dict()), 200)

    def delete(self, employee_id):
        employee = Employee.query.filter(Employee.employee_id == employee_id).first()

        if not employee:
            return make_response(jsonify({"message": "Employee not found"}), 404)

        db.session.delete(employee)
        db.session.commit()
        return make_response(
            jsonify({"message": f"Employee {employee.employee_id} deleted"}), 200
        )


class DepartmentResource(Resource):
    def get(self, department_id=None):
        if department_id:
            department = Department.query.filter(Department.id == department_id).first()
            if department:
                return make_response(jsonify(department.to_dict()), 200)
        else:
            departments = Department.query.all()
            return make_response(jsonify([dept.to_dict() for dept in departments]), 200)

    def post(self):
        data = request.get_json()
        new_department = Department(
            department_name=data["department_name"], location=data.get("location")
        )
        db.session.add(new_department)
        db.session.commit()
        return make_response(jsonify(new_department.to_dict()), 201)

    def patch(self, department_id):
        department = Department.query.filter(Department.id == department_id).first()
        data = request.get_json()
        department.department_name = data.get(
            "department_name", department.department_name
        )
        department.location = data.get("location", department.location)
        db.session.commit()
        return make_response(jsonify(department.to_dict()), 200)

    def delete(self, department_id):
        department = Department.query.filter(Department.id == department_id).first()
        db.session.delete(department)
        db.session.commit()
        return make_response(
            jsonify({"message": f"Department {department.id} deleted"}), 204
        )


class RoleResource(Resource):

    def get(self, role_id=None):
        if role_id:
            role = Role.query.filter(Role.id == role_id).first()
            return make_response(jsonify(role.to_dict()), 200)
        else:
            roles = Role.query.all()
            return make_response(jsonify([role.to_dict() for role in roles]), 200)

    def post(self):
        data = request.get_json()
        new_role = Role(role_name=data["role_name"])
        db.session.add(new_role)
        db.session.commit()
        return make_response(jsonify(new_role.to_dict()), 201)

    def patch(self, role_id):
        role = Role.query.filter(Role.id == role_id).first()
        data = request.get_json()
        role.role_name = data.get("role_name", role.role_name)
        db.session.commit()
        return make_response(jsonify(role.to_dict()), 200)

    def delete(self, role_id):
        role = Role.query.filter(Role.id == role_id).first()
        db.session.delete(role)
        db.session.commit()
        return make_response(jsonify({"message": f"Role {role.id} deleted"}), 204)


class CustomerResource(Resource):
    def get(self, customer_id=None):

        if customer_id:
            customer = Customer.query.filter(Customer.id == customer_id).first()
            if customer:
                return make_response(jsonify(customer.to_dict()), 200)
            else:
                return make_response(
                    jsonify({"error": f"customer {customer.id} not found"}), 404
                )
        else:
            customers = Customer.query.all()
            return make_response(
                jsonify([customer.to_dict() for customer in customers]), 200
            )

    def post(self):
        data = request.get_json()
        new_customer = Customer(customer_name=data["customer_name"])
        db.session.add(new_customer)
        db.session.commit()
        return make_response(jsonify(new_customer.to_dict()), 201)

    def patch(self, customer_id):
        customer = Customer.query.filter(customer_id == customer_id).first()
        if not customer:
            return make_response(jsonify({"error": "Customer not found"}), 404)
        data = request.get_json()
        customer.first_name = data.get("first_name", customer.first_name)
        customer.last_name = data.get("last_name", customer.last_name)
        customer.email = data.get("email", customer.email)
        customer.phone_number = data.get("phone_number", customer.phone_number)
        db.session.commit()
        return make_response(jsonify(customer.to_dict()), 200)

    def delete(self, customer_id):
        customer = Customer.query.filter(Customer.id == customer_id).first()
        db.session.delete(customer)
        db.session.commit()
        return make_response(
            jsonify({"message": f"Customer {customer.id} deleted"}), 204
        )


class AdministratorResource(Resource):
    def get(self, admin_id=None):

        if admin_id:
            administrator = Administrator.query.filter(
                Administrator.id == admin_id
            ).first()
            if administrator:
                return make_response(jsonify(administrator.to_dict()), 200)
            else:
                return make_response(
                    jsonify({"error": f"Admistrator {administrator.id} not found"}), 404
                )
        else:
            administrators = Administrator.query.all()
            return make_response(
                jsonify([admin.to_dict() for admin in administrators]), 200
            )

    def post(self):
        data = request.get_json()
        new_admin = Administrator(
            admin_name=data["customer_name"],
            email=data["email"],
            phone_number=data["phone_number"],
        )
        db.session.add(new_admin)
        db.session.commit()
        return make_response(jsonify(new_admin.to_dict()), 201)

    def patch(self, admin_id):
        admin = Administrator.query.filter(Administrator.id == admin_id).first()
        if not admin:
            return make_response(jsonify({"error": "Admin not found"}), 404)
        data = request.get_json()
        admin.name = data.get("first_name", admin.first_name)
        admin.last_name = data.get("last_name", admin.last_name)
        admin.email = data.get("email", admin.email)
        admin.phone_number = data.get("phone_number", admin.phone_number)
        db.session.commit()
        return make_response(jsonify(admin.to_dict()), 200)

    def delete(self, admin_id):
        admin = Administrator.query.filter(Administrator.id == admin_id).first()
        db.session.delete(admin)
        db.session.commit()
        return make_response(
            jsonify({"message": f"Administrator {admin.id} deleted"}), 204
        )


api.add_resource(EmployeeResource, "/employees", "/employees/<int:employee_id>")
api.add_resource(DepartmentResource, "/departments", "/departments/<int:department_id>")
api.add_resource(RoleResource, "/roles", "/roles/<int:role_id>")
api.add_resource(CustomerResource, "/customers", "/customers/<int:id>")
api.add_resource(AdministratorResource, "/administrators", "/administrators/<int:id>")


if __name__ == "__main__":
    app.run(port=5555, debug=True)
