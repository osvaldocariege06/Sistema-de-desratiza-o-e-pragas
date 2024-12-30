import axios from "axios";

export const api = axios.create({
  baseURL: "http://38.242.144.83:8282/api",
});
