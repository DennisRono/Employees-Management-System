import os
from dotenv import load_dotenv
from datetime import timedelta

load_dotenv()


class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URI", "sqlite:///employees.db")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_TOKEN_LOCATION = ["headers"]
    JWT_HEADER_NAME = "Authorization"
    JWT_HEADER_TYPE = "Bearer"
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(minutes=30)
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=14)
    SECRET_KEY = os.getenv("SECRET_KEY", "46ergsgwet5w5fewfweffhdgh")
