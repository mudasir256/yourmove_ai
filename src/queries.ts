import axios, { AxiosResponse } from "axios";
import {
  ClientSecretResponse,
  CreateSubscriptionRequest,
} from "./models/payment";
import {
  FeedbackRequest,
  HasUserPaidResponse,
  ProfileRequest,
  ProfileResponse,
  Prompt,
} from "./models/profile";
import { ProductType } from "./constants/payments";
import { useUIStore } from "./stores/ui";
import toast from "react-hot-toast";
import { useAuthStore } from "./stores/auth";
import { useChatStore } from "./stores/chat";
import { auth } from "./firebase";
import { history } from "./main";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// temporary for testing
axios.defaults.headers.common["ngrok-skip-browser-warning"] = "something";

axios.defaults.timeout = 30000;

axios.interceptors.response.use(
  (response) => {
    console.log("was a success");
    // Was successful - return the response
    return response;
  },
  (error) => {
    console.log("was an error");
    console.log(error);

    // If it timed out
    if (error.code === "ECONNABORTED") {
      useUIStore
        .getState()
        .setError(
          "Our AI is taking longer than usual. Please wait a few minutes and try again."
        );
      // Handle the timeout error here
    }
    console.log(error.response.status === 429);
    // If it was a 429 for the chat assistant
    if (error.response.status === 429) {
      // If they are signed in, redirect to premium
      if (auth.currentUser) {
        toast.error("You have ran out of Chats for today, upgrade for more.");
        history.push("/premium");
        useChatStore.getState().setSendingMessage(false);
      }
      // If they aren't signed in, show a toast and ask to sign in
      else {
        toast.error("You have ran out of Chats for today, sign in for more.");
        useAuthStore.getState().setAuthModalIsOpen(true);

        // Say we aren't submitting chats
        useChatStore.getState().setSendingMessage(false);

        // Hide the Upsell as we only want to show that if we are signed in
        useUIStore.getState().setHideUpsell(true);
      }
    }
    return Promise.reject(error);
    // Was an error
    // useProfileStore
    //   .getState()
    //   .setError(
    //     "Our AI encountered an error. Please wait a few minutes and try again."
    //   );
  }
);

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
  email: string,
  products: Array<ProductType>
): Promise<AxiosResponse<HasUserPaidResponse>> => {
  return axios.post(`${BASE_URL}/user/has-paid`, { email, products });
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
};

export const sendChatText = (
  type: string,
  style: string,
  query: string,
  curiosityMode: boolean,
  accessToken?: string
) => {
  const headers = {
    "Content-Type": "application/json",
  };
  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return axios.post(
    `${BASE_URL}/chat/text`,
    {
      type,
      style,
      query,
      curiosityMode,
    },
    {
      headers,
    }
  );
};

export const uploadFiles = (files: FileList) => {
  const formData = new FormData();

  Array.from(files).forEach((file) => {
    formData.append("files", file);
  });

  return axios.post(`${BASE_URL}/files/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const sendChatImage = (
  type: string,
  style: string,
  // query: string,
  curiosityMode: boolean,
  // pass the URL to the server so it will pass it back
  image: string | null,
  file: File | null,
  recentQuery: string | null,
  accessToken?: string
) => {
  const formData = new FormData();

  formData.append("type", type);
  formData.append("style", style);

  if (recentQuery) {
    formData.append("recentQuery", JSON.stringify(recentQuery));
  }

  formData.append("curiosityMode", curiosityMode.toString());

  // Append the file
  if (file) {
    formData.append("file", file);
  }

  // If an image URL was sent
  if (image) {
    formData.append("image", image);
  }

  const headers = {
    "Content-Type": "multipart/form-data",
  };
  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  return axios.post(`${BASE_URL}/chat/image`, formData, {
    headers,
  });
};

export const generateProfileReview = (
  email: string,
  screenshots: Array<string>
) => {
  console.log("in client");
  console.log(typeof screenshots);
  return axios.post(`${BASE_URL}/profile-reviewer`, { email, screenshots });
};

export const createSubscription = (
  createSubscriptionRequest: CreateSubscriptionRequest
) => {
  return axios.post(`${BASE_URL}/subscribe`, createSubscriptionRequest);
};

export const checkIfUserSubscribed = (idToken: string) => {
  return axios.get(`${BASE_URL}/user/is-subscribed`, {
    headers: {
      Authorization: `Bearer ${idToken}`,
      "Content-Type": "application/json",
    },
  });
};
