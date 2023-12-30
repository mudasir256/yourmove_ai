import { PlanType } from "../constants/payments";

export interface ClientSecretResponse {
  clientSecret: string;
  price: number;
}

export interface CreateSubscriptionRequest {
  firstName: string;
  lastName: string;
  email: string;
  term: PlanType;
}
