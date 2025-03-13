from dotenv import load_dotenv
import os
# import logging

load_dotenv()

# OpenWeather API key
API_KEY = os.getenv("OPENWEATHER_API_KEY")
if not API_KEY:
    raise ValueError("OPENWEATHER_API_KEY environment variable is not set")

OAUTH_CLIENT_ID = os.getenv("OAUTH_CLIENT_ID")
if not OAUTH_CLIENT_ID:
    raise ValueError("OAUTH_CLIENT_ID environment variable is not set")