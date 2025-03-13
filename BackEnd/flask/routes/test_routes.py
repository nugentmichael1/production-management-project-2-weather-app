from flask import Blueprint, jsonify

test_routes = Blueprint('test_routes',__name__)

@test_routes.route("/welcome")
def welcome():
    return jsonify({"message": "Welcome to the Revature P2 Group 3's Weather API!"})