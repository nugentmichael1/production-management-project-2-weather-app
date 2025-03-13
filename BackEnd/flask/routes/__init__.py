from flask import Flask
from flask_cors import CORS
from .auth_routes import auth_routes
from .metrics_routes import metrics_routes
from .weather_routes import weather_routes
from .test_routes import test_routes

def register_routes(app: Flask):
    app.register_blueprint(auth_routes)
    app.register_blueprint(metrics_routes)
    app.register_blueprint(weather_routes)
    app.register_blueprint(test_routes)