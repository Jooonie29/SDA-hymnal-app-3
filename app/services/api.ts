import axios from "axios";
import { useAuthStore } from "../store/authStore";
import { Platform } from "react-native";

const baseURL = (process.env.EXPO_PUBLIC_API_URL as string) || (Platform.OS === "android" ? "http://10.0.2.2:4000" : "http://localhost:4000");
const instance = axios.create({ baseURL });

instance.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) config.headers = { ...(config.headers || {}), Authorization: `Bearer ${token}` };
  return config;
});

export const api = instance;
