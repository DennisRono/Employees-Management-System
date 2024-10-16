import datetime
from functools import wraps
from datetime import timezone
from flask import Blueprint, jsonify
from flask_restful import Resource, Api, reqparse
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import (
    create_access_token,
    get_jwt,
    JWTManager,
    create_refresh_token,
    jwt_required,
    get_jwt_identity,
    current_user,
)

jwt = JWTManager()

from models import User, db, TokenBlocklist


auth_bp = Blueprint("auth_bp", __name__, url_prefix="/auth")

api = Api(auth_bp)


def allow(*roles):
    def wrapper(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):
            user_roles = [role.name for role in current_user.roles]
            for user_role in user_roles:
                if user_role in roles:
                    return fn(*args, **kwargs)
            else:
                return {"msg": "Not Authorized!"}, 403

        return decorator

    return wrapper


# @allow('admin', 'teacher')


@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    identity = jwt_data["sub"]
    return User.query.filter_by(id=identity).first()


@jwt.token_in_blocklist_loader
def check_if_token_is_revoked(jwt_header, jwt_payload: dict):
    jti = jwt_payload["jti"]
    token_in_blocklist = TokenBlocklist.query.filter_by(jti=jti).first()
    return token_in_blocklist or None


user_register_args = reqparse.RequestParser()

user_register_args.add_argument(
    "email", type=str, required=True, help="email is required and must me a string"
)
user_register_args.add_argument(
    "password", type=str, required=True, help="Password is required"
)


user_login_args = reqparse.RequestParser()

user_login_args.add_argument(
    "email", type=str, required=True, help="email is required and must me a string"
)
user_login_args.add_argument(
    "password", type=str, required=True, help="Password is required"
)


class Register(Resource):

    def post(self):
        data = user_register_args.parse_args()
        # ipdb.set_trace()
        user = User.query.filter_by(email=data.get("email")).first()
        if user:
            return {"msg": f"User with email {data.get('email')} already exists"}, 402
        password = generate_password_hash(data.get("password"))
        new_user = User(email=data.get("email"), password=password)
        db.session.add(new_user)
        db.session.commit()

        return {"msg": "user Registration Successful"}, 201


class Login(Resource):

    def post(self):
        data = user_login_args.parse_args()
        user = User.query.filter_by(email=data.get("email")).first()
        if not user:
            return {"msg": f"User with email {data.get('email')} does not exist!"}, 404

        if not check_password_hash(user.password, data.get("password")):
            return {"msg": "Incorrect Password"}, 403

        access_token = create_access_token(identity=user.id)
        refresh_token = create_refresh_token(identity=user.id)
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
        return {"msg": "You have been logged out"}


api.add_resource(Register, "/register")
api.add_resource(Login, "/login")
api.add_resource(Logout, "/logout")
