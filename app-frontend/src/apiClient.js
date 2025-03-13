import axios from "axios";

const BASE_URL = process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_BASE_URL_DEVELOPMENT
    : process.env.REACT_APP_BASE_URL_PRODUCTION

const apiClient = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers:{
        "Content-Type": "application/json",
    },
})

console.log(apiClient)
console.log(BASE_URL)

export default apiClient;