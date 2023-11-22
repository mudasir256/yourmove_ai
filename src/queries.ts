import axios, { AxiosResponse } from "axios";
import { ClientSecretResponse } from "./models/payment";
import {
  FeedbackRequest,
  HasUserPaidResponse,
  ProfileRequest,
  ProfileResponse,
  Prompt,
} from "./models/profile";
import { useProfileStore } from "./stores/profile";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// temporary for testing
axios.defaults.headers.common["ngrok-skip-browser-warning"] = "something";

axios.interceptors.response.use((response) => {
  // Was successful - return the response
  return response;
}, (error) => {
  // Was an error
  useProfileStore.getState().setError("Our AI encountered an error. Please wait a few minutes and try again.");
})

export const getClientSecret = (
  email: string,
  product: string
): Promise<AxiosResponse<ClientSecretResponse>> => {
  return axios.post(`${BASE_URL}/client-secret`, {
    email,
    product,
  });
};

export const getPrompts = (
  app: string
): Promise<AxiosResponse<Array<Prompt>>> => {
  return axios.get(`${BASE_URL}/prompts?app=${app}`);
};

export const generateProfile = (
  profileRequest: ProfileRequest
): Promise<AxiosResponse<any>> => {
  return axios.post(`${BASE_URL}/profile`, profileRequest);
};

export const generateSingleProfileResponse = (
  profileRequest: ProfileRequest,
  prompt: string
): Promise<AxiosResponse<ProfileResponse>> => {
  return axios.post(
    `${BASE_URL}/profile/prompt?prompt=${prompt}`,
    profileRequest
  );
};

export const hasUserPaid = (
  email: string
): Promise<AxiosResponse<HasUserPaidResponse>> => {
  return axios.get(`${BASE_URL}/user/has-paid?email=${email}`);
};

export const submitFeedback = (feedbackRequest: FeedbackRequest) => {
  return axios.post(`${BASE_URL}/email/feedback`, feedbackRequest);
};

export const createCopy = (email: string, prompt: string, response: string) => {
  return axios.post(`${BASE_URL}/profile/prompt/copy`, {
    email,
    prompt,
    response,
  });
}