import { envs } from './../constants/envs.const';
import axios from "axios";

export const api = axios.create({
  baseURL: envs.AUTH_API_URL,
});
