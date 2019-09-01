import axios from "axios";

const api = axios.create({
  baseURL: "https://meetup-ricardo-backend.herokuapp.com"
});

export default api;
