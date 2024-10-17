from flask_jwt_extended import (
    create_access_token,
    get_jwt,
    JWTManager,
    create_refresh_token,
    jwt_required,
    get_jwt_identity,
    current_user,
)
from werkzeug.security import generate_password_hash, check_password_hash
from flask_restful import Resource, Api, reqparse
from flask import Blueprint, jsonify, make_response
import datetime
from datetime import timezone
from functools import wraps
from flask_jwt_extended.exceptions import NoAuthorizationError

from models import Employee, Administrator, Role, Department, db, TokenBlocklist

jwt = JWTManager()

auth = Blueprint("auth", __name__, url_prefix="/auth")
api = Api(auth)


from flask_jwt_extended import get_jwt_identity, verify_jwt_in_request


def roles_required(*roles):
    def decorator(fn):
        @wraps(fn)
        def wrapper(*args, **kwargs):
            try:
                verify_jwt_in_request()
                identity = get_jwt_identity()
                user = Employee.query.filter_by(employee_id=identity).first()

                if user is None or user.role is None:
                    return {
                        "message": "Access unauthorized. User not authenticated or no role assigned."
                    }, 403

                return fn(*args, **kwargs)
            except NoAuthorizationError:
                return make_response(
                    jsonify({"message": "Missing or invalid Authorization token"}), 401
                )

        return wrapper

    return decorator


@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    identity = jwt_data["sub"]
    return Employee.query.filter_by(employee_id=identity).first()


@jwt.token_in_blocklist_loader
def check_if_token_is_revoked(jwt_header, jwt_payload: dict):
    jti = jwt_payload["jti"]
    token_in_blocklist = TokenBlocklist.query.filter_by(jti=jti).first()
    return token_in_blocklist is not None


user_register_args = reqparse.RequestParser()
user_register_args.add_argument(
    "first_name",
    type=str,
    required=True,
    help="First Name is required and must be a string",
)
user_register_args.add_argument(
    "last_name",
    type=str,
    required=True,
    help="Last Name is required and must be a string",
)
user_register_args.add_argument(
    "email", type=str, required=True, help="Email is required and must be a string"
)
user_register_args.add_argument(
    "phone_number",
    type=str,
    required=True,
    help="Phone Number is required",
)
user_register_args.add_argument(
    "password", type=str, required=True, help="Password is required"
)
user_register_args.add_argument(
    "role_id", type=int, required=True, help="Role ID is required"
)
user_register_args.add_argument(
    "department_id", type=int, required=False, help="Optional: Department ID"
)


user_login_args = reqparse.RequestParser()
user_login_args.add_argument(
    "email", type=str, required=True, help="Email is required and must be a string"
)
user_login_args.add_argument(
    "password", type=str, required=True, help="Password is required"
)


class Register(Resource):

    @jwt_required(optional=True)
    @roles_required("admin")  # Only admins can register new Employees
    def post(self):
        data = user_register_args.parse_args()
        print(data)
        user = Employee.query.filter_by(email=data.get("email")).first()
        if user:
            return {
                "message": f"User with email {data.get('email')} already exists"
            }, 409

        # Verify that the role and (optionally) the department exist
        role = Role.query.get(data.get("role_id"))
        if not role:
            return {"message": "Invalid Role ID"}, 400

        department = None
        if data.get("department_id"):
            department = Department.query.get(data.get("department_id"))
            if not department:
                return {"message": "Invalid Department ID"}, 400

        password = generate_password_hash(data.get("password"))

        # Create new Employee
        new_employee = Employee(
            first_name=data.get("first_name"),
            last_name=data.get("last_name"),
            email=data.get("email"),
            password=password,
            role_id=role.role_id,
            department_id=department.department_id if department else None,
        )
        db.session.add(new_employee)
        db.session.commit()

        return {"message": "User registration successful"}, 201


class Login(Resource):
    def post(self):
        data = user_login_args.parse_args()
        user = Employee.query.filter_by(email=data.get("email")).first()
        if not user:
            return {
                "message": f"User with email {data.get('email')} does not exist!"
            }, 404

        if not check_password_hash(user.password, data.get("password")):
            return {"message": "Incorrect Password"}, 403

        access_token = create_access_token(identity=user.employee_id)
        refresh_token = create_refresh_token(identity=user.employee_id)
        return {"access_token": access_token, "refresh_token": refresh_token}

    @jwt_required(refresh=True)
    def get(self):
        identity = get_jwt_identity()
        access_token = create_access_token(identity=identity)
        return jsonify(access_token=access_token)


class Logout(Resource):
    @jwt_required()
    def get(self):
        jti = get_jwt()["jti"]
        now = datetime.datetime.now(timezone.utc)
        db.session.add(TokenBlocklist(jti=jti, created_at=now))
        db.session.commit()
        return {"message": "You have been logged out"}


class AdminRegister(Resource):
    @jwt_required()
    @roles_required("admin")
    def post(self):
        data = user_register_args.parse_args()
        user = Administrator.query.filter_by(email=data.get("email")).first()
        if user:
            return {
                "message": f"Admin with email {data.get('email')} already exists"
            }, 409

        # Verify that the role exists and is 'admin'
        role = Role.query.get(data.get("role_id"))
        if not role or role.role_name != "admin":
            return {"message": "Invalid or unauthorized Role ID"}, 400

        department = None
        if data.get("department_id"):
            department = Department.query.get(data.get("department_id"))
            if not department:
                return {"message": "Invalid Department ID"}, 400

        password = generate_password_hash(data.get("password"))

        # Create new Administrator
        new_admin = Administrator(
            first_name=data.get("first_name"),
            last_name=data.get("last_name"),
            email=data.get("email"),
            password=password,
            role_id=role.role_id,
            department_id=department.department_id if department else None,
        )
        db.session.add(new_admin)
        db.session.commit()

        return {"message": "Admin registration successful"}, 201


class AdminLogin(Resource):
    def post(self):
        data = user_login_args.parse_args()

        # Find the admin by email
        user = Administrator.query.filter_by(email=data.get("email")).first()
        if not user:
            return {
                "message": f"Admin with email {data.get('email')} does not exist!"
            }, 404

        # Check password
        if not check_password_hash(user.password, data.get("password")):
            return {"message": "Incorrect Password"}, 403

        # Generate access and refresh tokens for admin
        access_token = create_access_token(identity=user.admin_id)
        refresh_token = create_refresh_token(identity=user.admin_id)
        return {"access_token": access_token, "refresh_token": refresh_token}

    @jwt_required(refresh=True)
    def get(self):
        identity = get_jwt_identity()
        access_token = create_access_token(identity=identity)
        return jsonify(access_token=access_token)


api.add_resource(Register, "/register")
api.add_resource(Login, "/login")
api.add_resource(Logout, "/logout")
api.add_resource(AdminRegister, "/register-admin")
api.add_resource(AdminLogin, "/login-admin")
