import axios, { AxiosResponse } from "axios";
import { ClientSecretResponse } from "./models/payment";

const BASE_URL = "http://127.0.0.1:8000";

export const getClientSecret = (
  email: string,
  product: string
): Promise<AxiosResponse<ClientSecretResponse>> => {
  return axios.post(`${BASE_URL}/client-secret`, {
    email,
    product,
  });
};
