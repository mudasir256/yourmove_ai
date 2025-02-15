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
import { useChatStore } from "./stores/chat";
import { auth } from "./firebase";
import { history } from "./main";
import * as Sentry from "@sentry/react";
import toast from "react-hot-toast";
import { getEndpoint } from "./utils";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// temporary for testing
axios.defaults.headers.common["ngrok-skip-browser-warning"] = "something";

axios.defaults.timeout = 240000;

const retryCount = 3;
const retryDelay = 2000; // Delay between retries in milliseconds

axios.interceptors.response.use(
  (response) => {
    // Was successful - return the response
    return response;
  },
  (error) => {
    const config = error.config;

    const shouldRetry =
      (error.response && error.response.status === 500) ||
      error.message === "Network Error";

    if (shouldRetry) {
      // Check if we've already tried to retry this request
      if (!config.__retryCount) {
        config.__retryCount = 0;
      }

      // Check if we've reached the max retry count
      if (config.__retryCount < retryCount) {
        // Increase the retry count
        config.__retryCount += 1;

        // Create new promise to handle exponential backoff
        const backoff = new Promise((resolve) => {
          setTimeout(() => {
            resolve(null);
          }, retryDelay || 1);
        });

        // Return the promise in which recalls axios to retry the request
        return backoff.then(() => {
          return axios(config);
        });
      }
    }

    // If it's a chat error
    if (error.config.url.includes("chat")) {
      // If it was a 429 for the chat assistant
      if (error?.response?.status === 429) {
        // If they are signed in, redirect to premium
        toast.error(
          "You have ran out of free messages for today. Upgrade for unlimited messages, profiles,reviews, and more"
        );
        history.push("/premium");
        useChatStore.getState().setSendingMessage(false);
      } else {
        useChatStore.getState().setSendingMessage(false);
        toast.error(
          "There was an issue with our AI. Please wait a few minutes and try again."
        );
      }
    } else {
      console.log("ERROR:: ", JSON.stringify(error))
      // If it timed out
      if (error.code === "ECONNABORTED") {
        useUIStore
          .getState()
          .setError(
            "Our AI is taking longer than usual. Please wait a few minutes and try again."
          );
        // Handle the timeout error here
      } else if (getEndpoint(error.config?.url) !== 'validate-promo-code') {
        useUIStore
          .getState()
          .setError(
            "There was an issue with our AI. Please wait a few minutes and try again."
          );
      }
      // Log error details to Sentry or console
      const errorDetails = {
        url: error.config.url,
        method: error.config.method,
        statusCode: error?.response?.status,
        statusText: error?.response?.statusText,
        headers: error.config.headers,
        data: error.config.data,
        errorMessage: error.response.data.message,
      };

      console.error("Axios request failed:", error);
      Sentry.captureException(new Error("Axios request failed"), {
        extra: errorDetails,
      });
    }
    return Promise.reject(error);
  }
);

export const getClientSecret = (
  email: string,
  product: string,
  group: number = 0,
  toltReferral: string | undefined = undefined
): Promise<AxiosResponse<ClientSecretResponse>> => {
  const source = localStorage.getItem('utm_source')
  const campaign = localStorage.getItem('utm_campaign')
  const params = {
    email,
    product,
    group,
    ...(source && { source: source }),
    ...(campaign && { campaign: campaign }),
    toltReferral
  }

  return axios.post(`${BASE_URL}/client-secret`, params);
};

export const getPrompts = (
  app: string
): Promise<AxiosResponse<Array<Prompt>>> => {
  return axios.get(`${BASE_URL}/prompts?app=${app}`);
};

export const generateProfile = (
  profileRequest: ProfileRequest
): Promise<AxiosResponse<any>> => {
  if (auth.currentUser && auth.currentUser.email) {
    profileRequest.email = auth.currentUser.email
  }
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
  return axios.post(
    `${BASE_URL}/profile/prompt/copy`,
    {
      email,
      prompt,
      response,
    },
    { timeout: 600000 }
  );
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
  // Define the validation criteria
  const validFileTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif'];
  const maxFileSize = 20 * 1024 * 1024; // 20MB in bytes
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
  return axios.post(
    `${BASE_URL}/profile-reviewer`,
    { email, screenshots },
    { timeout: 120000 }
  );
};

export const createSubscription = (
  createSubscriptionRequest: CreateSubscriptionRequest
) => {
  const source = localStorage.getItem('utm_source')
  const campaign = localStorage.getItem('utm_campaign')
  if (source) createSubscriptionRequest.source = source
  if (campaign) createSubscriptionRequest.campaign = campaign

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

export const checkIfUserRequiresMigration = (email: string) => {
  return axios.get(`${BASE_URL}/user/requires-migration?email=${email}`);
};

export const migrateUser = (email: string, password?: string) => {
  const body: any = { email };
  if (password) {
    body["password"] = password;
  }
  return axios.post(`${BASE_URL}/user/migrate`, body);
};

export const createOrGetAuthUser = (uid: string, email: string) => {
  const body: any = { uid, email };
  return axios.post(`${BASE_URL}/user/createAuthUser`, body);
};

export const setUserSubscription = (email: string, subscriptionId: string) => {
  const body = { email, subscription_id: subscriptionId };
  return axios.post(`${BASE_URL}/set-subscription`, body);
}

export const paymentIntentForAIPhotos = (email: string) => {
  const body = {
    email
  }
  return axios.post(`${BASE_URL}/payment-intent-ai-photos`, body);
}

export const fetchUserReferralCode = (email: string) => {
  const body = {
    email
  }
  return axios.post(`${BASE_URL}/user/get-referral-code`, body);
}

export const addUserReferral = (userId: string, userEmail: string, referralCode: string) => {
  const body = {
    userId,
    userEmail,
    referralCode
  }
  return axios.post(`${BASE_URL}/user/add-referral`, body);
}

export const fetchReferralsCount = (referralCode: string) => {
  const body = {
    referralCode
  }
  return axios.post(`${BASE_URL}/user/fetch-referrals-count`, body);
}

export const claimSubscription = (email: string) => {
  const body = {
    email
  }
  return axios.post(`${BASE_URL}/user/claim-referral-subscription`, body);
}

export const fetchReferralSubscriptionStatus = (email: string) => {
  const body = {
    email
  }
  return axios.post(`${BASE_URL}/user/fetch-referral-subscription-status`, body);
}

export const checkUserSubscription = (email: string) => {
  return axios.get(`${BASE_URL}/user/subscribed`, { params: { email } });
};

export const validatePromoCode = (promoCode: string) => {
  const body = { promo_code: promoCode }
  return axios.post(`${BASE_URL}/validate-promo-code`, body);
};

export const reviewPhoto = (email: string, url: string) => {
  const body = { email, photo: url }
  return axios.post(`${BASE_URL}/photo-review`, body);
};

export const fetchPhotoReviewsCount = (email: string) => {
  return axios.get(`${BASE_URL}/fetch-photo-reviews-count?email=${email}`);
};

export const fetchPhotoReviews = (email: string, loadMore: string | undefined = undefined) => {
  const url = new URL(`${BASE_URL}/photo-reviews`);
  url.searchParams.append('email', email);
  if (loadMore) url.searchParams.append('lastVisible', loadMore);

  return axios.get(url.toString());
};