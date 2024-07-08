import { PlanType } from "../constants/payments";

export interface ClientSecretResponse {
  clientSecret: string;
  price: number;
}

export interface CreateSubscriptionRequest {
  email: string;
  term: PlanType;
  group?: number;
  source?: string;
  campaign?: string;
  promoCode?: string
  toltReferral?: string
}
