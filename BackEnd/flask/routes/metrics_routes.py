from flask import Blueprint
from prometheus_client import generate_latest, CONTENT_TYPE_LATEST

metrics_routes = Blueprint('metrics_routes', __name__)

# Prometheus Metrics Route 
@metrics_routes.route("/metrics")
def metrics():
    return generate_latest(), 200, {'Content-Type': CONTENT_TYPE_LATEST}