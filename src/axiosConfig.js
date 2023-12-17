import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

const instance = axios.create({
    headers: {
        "Content-Type": "application/json", 
        "ngrok-skip-browser-warning": "true",
        "Authorization": `Bearer ${localStorage.getItem("auth-token")}`
    }
})

export default instance; 