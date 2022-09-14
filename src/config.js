import axios from "axios";

export const axiosInstance = axios.create({
    baseURL : "https://alarmreminderserver.herokuapp.com"
})