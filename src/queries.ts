import axios, { AxiosResponse } from "axios";
import { ClientSecretResponse } from "./models/payment";
import { ProfileRequest } from "./models/profile";

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

export const generateProfile = (
  profileRequest: ProfileRequest
): Promise<AxiosResponse<any>> => {
  return axios.post(`${BASE_URL}/profile`, profileRequest);
};
