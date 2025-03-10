Here’s a **spruced-up** version of your README with better formatting, additional clarity, and instructions for setting up the project. 🚀  

---

# **Production Management Project 2: Weather App** ☁️🌍

This project is a **weather data service** that fetches real-time weather data using the OpenWeather API. It includes:
- 🌐 **Flask Backend** – A lightweight API for retrieving weather data.
- 🏗️ **Dockerized Deployment** – Easily deployable via Docker Compose.
- 🚀 **Nginx Reverse Proxy** – Handles external requests and forwards them to Flask.

---

## **🚀 Quick Start**
### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/nugentmichael/production-management-project-2-weather-app.git
cd production-management-project-2-weather-app
```

### **2️⃣ Set Up Your Environment**
Create a `.env` file in the project root:
```sh
OPENWEATHER_API_KEY=<Your OpenWeatherMap API Key>
```

### **3️⃣ Deploy with Docker Compose**
```sh
docker-compose up -d --build
```
This will:
- 🚀 Pull the latest Flask backend & Nginx images.
- 🔄 Start the Flask API & Nginx reverse proxy.

---

## **📡 Flask Backend**
The backend fetches weather data and serves it to the frontend via API routes.

### **🛠️ API Endpoints**
| **Route** | **Description** |
|-----------|----------------|
| `/` | Returns a welcome message. |
| `/current_weather` | Fetches real-time weather data. |
| `/forecast` | Provides a 5-day, 3-hour forecast. |
| `/weather_maps` | Returns weather map data. |
| `/air_pollution` | Retrieves air pollution data. |
| `/geocoding` | Converts location names into coordinates. |
| `/metrics` | Exposes Prometheus metrics for monitoring. |

---

## **📦 Docker Deployment**
Use the prebuilt images for quick setup.

### **📄 `.env` File**
Ensure you have the **OpenWeather API key** set in `.env`:
```sh
OPENWEATHER_API_KEY=<Your OpenWeatherMap API Key>
```

### **📜 `docker-compose.yml` Configuration**
```yaml
services:
  flask:
    image: nugentmichael/backend-flask:latest
    restart: always
    ports:
      - "5000:5000"
    env_file:
      - .env
    networks:
      - app-network

  nginx:
    image: nugentmichael/backend-nginx:latest
    restart: always
    ports:
      - "80:80"
    depends_on:
      - flask
    networks:
      - app-network

networks:
  app-network:
    driver: bridge
```

### **🔄 Start & Stop Services**
- **Start** the services:
  ```sh
  docker-compose up -d --build
  ```
- **Stop** the services:
  ```sh
  docker-compose down
  ```
- **View logs**:
  ```sh
  docker logs flask-container
  docker logs nginx-container
  ```

---

## **🛠 Troubleshooting**
**Q: I get a "Missing API Key" error.**  
✅ Ensure your `.env` file is correctly formatted and contains `OPENWEATHER_API_KEY`.

**Q: Nginx is restarting continuously.**  
✅ Check the logs using:
```sh
docker logs nginx-container
```
✅ Ensure `nginx.conf` correctly points to `flask-container:5000`.

---

## **📜 License**
This project is licensed under the **MIT License**.

---

## **📬 Contact**
👨‍💻 Developed by **Michael Nugent**  
📧 Email: [your.email@example.com](mailto:your.email@example.com)  
🌍 GitHub: [nugentmichael](https://github.com/nugentmichael)

---

### **🚀 Ready to Go? Deploy & Get Live Weather Data!** 🔥  
Let me know if you want further refinements! 🚀