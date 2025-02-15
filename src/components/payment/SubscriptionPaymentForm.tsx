import { XCircleIcon } from "@heroicons/react/24/outline";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { StripePaymentElementOptions } from "@stripe/stripe-js";
import { useMemo, useRef, useState } from "react";
import { useUIStore } from "../../stores/ui";
import { createSubscription, validatePromoCode } from "../../queries";
import { PlanType } from "../../constants/payments";
import toast from "react-hot-toast";
import axios from "axios";
import { auth } from "../../firebase";

interface Props {
  redirectSuffix: string;
  redirectHandler?: () => void;
  returnUrl?: string | null;
  email: string
  planType: PlanType
}

const PROMO_CODE_ENABLED = Boolean(parseInt(import.meta.env.VITE_PROMO_CODE_ENABLED || 0))

const MONTHLY_PRICE = 14
const ANNUAL_PRICE = 60
const ANNUAL_MONTHLY_PRICE = 5

export default function SubscriptionPaymentForm({
  redirectSuffix,
  redirectHandler,
  returnUrl,
  email,
  planType,
}: Props) {
  const { abTestGroup } = useUIStore()
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<string | null>(null);
  const { paymentIsLoading, setPaymentIsLoading } = useUIStore();

  const [percentageOff, setPercentageOff] = useState<number | undefined>(0)
  const userEmail = useRef<string | undefined>(email)
  const promoCode = useRef<string | undefined>(undefined)

  const [applyPromoEnabled, setApplyPromoEnabled] = useState(false)

  const promoId = useRef<string | undefined>(undefined)

  const price = planType === PlanType.Monthly ? MONTHLY_PRICE : ANNUAL_PRICE
  const discountedPrice = useMemo(() => percentageOff
    ? (price - (price * (percentageOff / 100))).toFixed(2).replace(/\.00$/, '')
    : price, [percentageOff])
  const discountedAnnualMonthly = useMemo(() => percentageOff
    ? (ANNUAL_MONTHLY_PRICE - (ANNUAL_MONTHLY_PRICE * (percentageOff / 100))).toFixed(2).replace(/\.00$/, '')
    : ANNUAL_MONTHLY_PRICE, [percentageOff])

  const validateEmail = () => {
    if (!userEmail.current) return false
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const check = emailRegex.test(userEmail.current);
    return check
  }

  const applyPromoCode = async () => {
    if (promoCode.current) {
      setMessage(null)

      const promoResponse = await validatePromoCode(promoCode.current) || {}
      const {
        data: {
          verified = false,
          promo: {
            id = undefined,
            active = true,
            coupon: {
              percent_off = 0,
              valid = false
            } = {}
          } = {}
        } = {}
      } = promoResponse || {}

      if (!verified || !active || !valid) {
        toast.error("Promo code invalid or expired. ")
        setPaymentIsLoading(false);
        return
      } else {
        promoId.current = id
        setPercentageOff(percent_off)
        setApplyPromoEnabled(false)
        toast.success("Promo code successful")
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    if (!validateEmail()) {
      setMessage("Please enter a valid email.")
      return;
    }

    setMessage(null)
    setPaymentIsLoading(true);

    // Trigger form validation and wallet collection
    const { error: submitError } = await elements.submit();
    if (submitError) {
      setMessage(`${submitError.message ? submitError.message : "An unknown error occurred!"}`)
      setPaymentIsLoading(false);
      return;
    }

    try {
      const subscriptionResponse = await createSubscription({ email: userEmail.current, term: planType, group: abTestGroup, promoCode: promoId.current, toltReferral: window.tolt_referral })
      const { data: { clientSecret = undefined } = {} } = subscriptionResponse || {}

      if (!clientSecret) {
        toast.error("Failed to get response from our backend. Please try again later or contact support@yourmove.ai for assistance")
        setPaymentIsLoading(false);
        return
      }

      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: returnUrl
            ? returnUrl
            : `${import.meta.env.VITE_UI_BASE_URL}/${redirectSuffix}`,
        },
        redirect: redirectHandler ? "if_required" : "always",
      });

      // This point is reached if we have a payment intent
      if (paymentIntent && paymentIntent.status === "succeeded") {
        redirectHandler?.();
      }

      // This point will only be reached if there is an immediate error when
      // confirming the payment. Otherwise, your customer will be redirected to
      // your `return_url`. For some payment methods like iDEAL, your customer will
      // be redirected to an intermediate site first to authorize the payment, then
      // redirected to the `return_url`.

      if (error) {
        setMessage(`${error.message ? error.message : "An unknown error occurred!"}`)
        setPaymentIsLoading(false);
      }

    } catch (err) {
      setPaymentIsLoading(false);
      if (axios.isAxiosError(err))
        toast.error(`Error: ${err.response?.data?.message ?? err.message}`)
      else
        toast.error(`Error: ${err}`);
      return
    }
  }

  const paymentElementOptions: StripePaymentElementOptions = {
    layout: "tabs",
  };

  return (
    <div className="mt-0">
      <div className="flex items-center">
        <div className="w-1/2">
          <svg
            width="149"
            height="25"
            viewBox="0 0 149 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.308239 7.81818H2.39134L4.8821 12.3224H4.98153L7.4723 7.81818H9.5554L5.85156 14.2017V18H4.01207V14.2017L0.308239 7.81818ZM12.6912 18.1491C11.9455 18.1491 11.2992 17.9851 10.7523 17.657C10.2054 17.3288 9.78119 16.8698 9.47958 16.2798C9.18129 15.6899 9.03214 15.0005 9.03214 14.2116C9.03214 13.4228 9.18129 12.7318 9.47958 12.1385C9.78119 11.5452 10.2054 11.0845 10.7523 10.7564C11.2992 10.4283 11.9455 10.2642 12.6912 10.2642C13.437 10.2642 14.0833 10.4283 14.6301 10.7564C15.177 11.0845 15.5996 11.5452 15.8979 12.1385C16.1995 12.7318 16.3503 13.4228 16.3503 14.2116C16.3503 15.0005 16.1995 15.6899 15.8979 16.2798C15.5996 16.8698 15.177 17.3288 14.6301 17.657C14.0833 17.9851 13.437 18.1491 12.6912 18.1491ZM12.7012 16.7074C13.1055 16.7074 13.4436 16.5964 13.7154 16.3743C13.9872 16.1489 14.1893 15.8473 14.3219 15.4695C14.4578 15.0916 14.5257 14.6707 14.5257 14.2067C14.5257 13.7393 14.4578 13.3168 14.3219 12.9389C14.1893 12.5578 13.9872 12.2545 13.7154 12.0291C13.4436 11.8037 13.1055 11.6911 12.7012 11.6911C12.2869 11.6911 11.9422 11.8037 11.6671 12.0291C11.3953 12.2545 11.1915 12.5578 11.0556 12.9389C10.923 13.3168 10.8567 13.7393 10.8567 14.2067C10.8567 14.6707 10.923 15.0916 11.0556 15.4695C11.1915 15.8473 11.3953 16.1489 11.6671 16.3743C11.9422 16.5964 12.2869 16.7074 12.7012 16.7074ZM22.745 14.7884V10.3636H24.5447V18H22.7997V16.6428H22.7202C22.5478 17.0703 22.2644 17.42 21.87 17.6918C21.4789 17.9635 20.9967 18.0994 20.4233 18.0994C19.9228 18.0994 19.4804 17.9884 19.0959 17.7663C18.7147 17.541 18.4164 17.2145 18.201 16.7869C17.9856 16.3561 17.8778 15.8357 17.8778 15.2259V10.3636H19.6776V14.9474C19.6776 15.4313 19.8101 15.8158 20.0753 16.1009C20.3404 16.3859 20.6884 16.5284 21.1193 16.5284C21.3845 16.5284 21.6413 16.4638 21.8899 16.3345C22.1385 16.2053 22.3423 16.013 22.5014 15.7578C22.6638 15.4993 22.745 15.1761 22.745 14.7884ZM26.3954 18V10.3636H28.1404V11.6364H28.22C28.3592 11.1955 28.5978 10.8558 28.9359 10.6172C29.2773 10.3752 29.6667 10.2543 30.1042 10.2543C30.2037 10.2543 30.3147 10.2592 30.4373 10.2692C30.5633 10.2758 30.6677 10.2874 30.7505 10.304V11.9595C30.6743 11.933 30.5533 11.9098 30.3876 11.8899C30.2252 11.8667 30.0678 11.8551 29.9153 11.8551C29.5872 11.8551 29.2922 11.9264 29.0304 12.0689C28.7718 12.2081 28.568 12.402 28.4189 12.6506C28.2697 12.8991 28.1951 13.1858 28.1951 13.5107V18H26.3954ZM32.0257 7.81818H34.2828L37.3056 15.196H37.4249L40.4476 7.81818H42.7047V18H40.9348V11.005H40.8404L38.0265 17.9702H36.704L33.8901 10.9901H33.7956V18H32.0257V7.81818ZM47.9647 18.1491C47.2189 18.1491 46.5726 17.9851 46.0257 17.657C45.4789 17.3288 45.0546 16.8698 44.753 16.2798C44.4547 15.6899 44.3056 15.0005 44.3056 14.2116C44.3056 13.4228 44.4547 12.7318 44.753 12.1385C45.0546 11.5452 45.4789 11.0845 46.0257 10.7564C46.5726 10.4283 47.2189 10.2642 47.9647 10.2642C48.7104 10.2642 49.3567 10.4283 49.9036 10.7564C50.4505 11.0845 50.873 11.5452 51.1713 12.1385C51.473 12.7318 51.6238 13.4228 51.6238 14.2116C51.6238 15.0005 51.473 15.6899 51.1713 16.2798C50.873 16.8698 50.4505 17.3288 49.9036 17.657C49.3567 17.9851 48.7104 18.1491 47.9647 18.1491ZM47.9746 16.7074C48.379 16.7074 48.717 16.5964 48.9888 16.3743C49.2606 16.1489 49.4628 15.8473 49.5953 15.4695C49.7312 15.0916 49.7992 14.6707 49.7992 14.2067C49.7992 13.7393 49.7312 13.3168 49.5953 12.9389C49.4628 12.5578 49.2606 12.2545 48.9888 12.0291C48.717 11.8037 48.379 11.6911 47.9746 11.6911C47.5603 11.6911 47.2156 11.8037 46.9405 12.0291C46.6687 12.2545 46.4649 12.5578 46.329 12.9389C46.1964 13.3168 46.1301 13.7393 46.1301 14.2067C46.1301 14.6707 46.1964 15.0916 46.329 15.4695C46.4649 15.8473 46.6687 16.1489 46.9405 16.3743C47.2156 16.5964 47.5603 16.7074 47.9746 16.7074ZM59.7125 10.3636L56.9931 18H55.0044L52.285 10.3636H54.204L55.959 16.0362H56.0385L57.7985 10.3636H59.7125ZM64.0788 18.1491C63.3132 18.1491 62.652 17.9901 62.0952 17.6719C61.5417 17.3504 61.1158 16.8963 60.8175 16.3097C60.5192 15.7197 60.37 15.0253 60.37 14.2266C60.37 13.4411 60.5192 12.7517 60.8175 12.1584C61.1191 11.5618 61.54 11.0978 62.0803 10.7663C62.6205 10.4316 63.2552 10.2642 63.9844 10.2642C64.455 10.2642 64.8991 10.3404 65.3168 10.4929C65.7377 10.642 66.1089 10.8741 66.4304 11.1889C66.7552 11.5038 67.0104 11.9048 67.196 12.392C67.3816 12.8759 67.4744 13.4527 67.4744 14.1222V14.674H61.2152V13.4609H65.7493C65.746 13.1162 65.6714 12.8097 65.5256 12.5412C65.3797 12.2694 65.1759 12.0556 64.9141 11.8999C64.6555 11.7441 64.3539 11.6662 64.0092 11.6662C63.6413 11.6662 63.3182 11.7557 63.0398 11.9347C62.7614 12.1103 62.5443 12.3423 62.3885 12.6307C62.236 12.9157 62.1581 13.2289 62.1548 13.5703V14.6293C62.1548 15.0734 62.236 15.4545 62.3984 15.7727C62.5608 16.0876 62.7879 16.3295 63.0795 16.4986C63.3712 16.6643 63.7126 16.7472 64.1037 16.7472C64.3655 16.7472 64.6025 16.7107 64.8146 16.6378C65.0268 16.5616 65.2107 16.4505 65.3665 16.3047C65.5223 16.1589 65.6399 15.9782 65.7195 15.7628L67.3999 15.9517C67.2938 16.3958 67.0916 16.7836 66.7933 17.1151C66.4983 17.4432 66.1205 17.6984 65.6598 17.8807C65.1991 18.0597 64.6721 18.1491 64.0788 18.1491Z"
              fill="black"
            />
            <rect x="73" width="76" height="25" rx="4" fill="#E85E5C" />
            <path
              d="M82.0043 18V7.81818H85.8224C86.6046 7.81818 87.2609 7.96401 87.7912 8.25568C88.3248 8.54735 88.7275 8.94839 88.9993 9.45881C89.2744 9.96591 89.4119 10.5426 89.4119 11.1889C89.4119 11.8419 89.2744 12.4219 88.9993 12.929C88.7242 13.4361 88.3182 13.8355 87.7812 14.1271C87.2443 14.4155 86.5831 14.5597 85.7976 14.5597H83.267V13.0433H85.549C86.0064 13.0433 86.3809 12.9638 86.6726 12.8047C86.9643 12.6456 87.1797 12.4268 87.3189 12.1484C87.4614 11.87 87.5327 11.5502 87.5327 11.1889C87.5327 10.8277 87.4614 10.5095 87.3189 10.2344C87.1797 9.95928 86.9626 9.7455 86.6676 9.59304C86.3759 9.43726 85.9998 9.35938 85.5391 9.35938H83.8487V18H82.0043ZM90.9345 18V10.3636H92.6795V11.6364H92.7591C92.8983 11.1955 93.1369 10.8558 93.475 10.6172C93.8163 10.3752 94.2058 10.2543 94.6433 10.2543C94.7427 10.2543 94.8538 10.2592 94.9764 10.2692C95.1023 10.2758 95.2067 10.2874 95.2896 10.304V11.9595C95.2134 11.933 95.0924 11.9098 94.9267 11.8899C94.7643 11.8667 94.6068 11.8551 94.4544 11.8551C94.1262 11.8551 93.8313 11.9264 93.5694 12.0689C93.3109 12.2081 93.1071 12.402 92.9579 12.6506C92.8088 12.8991 92.7342 13.1858 92.7342 13.5107V18H90.9345ZM99.5515 18.1491C98.7859 18.1491 98.1246 17.9901 97.5678 17.6719C97.0143 17.3504 96.5884 16.8963 96.2901 16.3097C95.9918 15.7197 95.8427 15.0253 95.8427 14.2266C95.8427 13.4411 95.9918 12.7517 96.2901 12.1584C96.5917 11.5618 97.0127 11.0978 97.5529 10.7663C98.0932 10.4316 98.7279 10.2642 99.457 10.2642C99.9277 10.2642 100.372 10.3404 100.789 10.4929C101.21 10.642 101.582 10.8741 101.903 11.1889C102.228 11.5038 102.483 11.9048 102.669 12.392C102.854 12.8759 102.947 13.4527 102.947 14.1222V14.674H96.6879V13.4609H101.222C101.219 13.1162 101.144 12.8097 100.998 12.5412C100.852 12.2694 100.649 12.0556 100.387 11.8999C100.128 11.7441 99.8266 11.6662 99.4819 11.6662C99.114 11.6662 98.7908 11.7557 98.5124 11.9347C98.234 12.1103 98.0169 12.3423 97.8612 12.6307C97.7087 12.9157 97.6308 13.2289 97.6275 13.5703V14.6293C97.6275 15.0734 97.7087 15.4545 97.8711 15.7727C98.0335 16.0876 98.2605 16.3295 98.5522 16.4986C98.8439 16.6643 99.1853 16.7472 99.5763 16.7472C99.8382 16.7472 100.075 16.7107 100.287 16.6378C100.499 16.5616 100.683 16.4505 100.839 16.3047C100.995 16.1589 101.113 15.9782 101.192 15.7628L102.873 15.9517C102.766 16.3958 102.564 16.7836 102.266 17.1151C101.971 17.4432 101.593 17.6984 101.132 17.8807C100.672 18.0597 100.145 18.1491 99.5515 18.1491ZM104.47 18V10.3636H106.19V11.6612H106.279C106.438 11.2237 106.702 10.8823 107.07 10.6371C107.438 10.3885 107.877 10.2642 108.387 10.2642C108.904 10.2642 109.34 10.3902 109.695 10.642C110.053 10.8906 110.305 11.2304 110.45 11.6612H110.53C110.699 11.237 110.984 10.8989 111.385 10.647C111.789 10.3918 112.268 10.2642 112.822 10.2642C113.525 10.2642 114.098 10.4863 114.542 10.9304C114.986 11.3745 115.208 12.0225 115.208 12.8743V18H113.404V13.1527C113.404 12.6787 113.278 12.3324 113.026 12.1136C112.774 11.8916 112.466 11.7805 112.101 11.7805C111.667 11.7805 111.327 11.9164 111.082 12.1882C110.84 12.4567 110.719 12.8063 110.719 13.2372V18H108.954V13.0781C108.954 12.6837 108.835 12.3688 108.596 12.1335C108.361 11.8982 108.052 11.7805 107.671 11.7805C107.413 11.7805 107.177 11.8468 106.965 11.9794C106.753 12.1087 106.584 12.2926 106.458 12.5312C106.332 12.7666 106.269 13.0417 106.269 13.3565V18H104.47ZM117.034 18V10.3636H118.834V18H117.034ZM117.939 9.27983C117.654 9.27983 117.409 9.18537 117.203 8.99645C116.998 8.80421 116.895 8.57386 116.895 8.3054C116.895 8.03362 116.998 7.80327 117.203 7.61435C117.409 7.42211 117.654 7.32599 117.939 7.32599C118.227 7.32599 118.473 7.42211 118.675 7.61435C118.88 7.80327 118.983 8.03362 118.983 8.3054C118.983 8.57386 118.88 8.80421 118.675 8.99645C118.473 9.18537 118.227 9.27983 117.939 9.27983ZM125.552 14.7884V10.3636H127.351V18H125.606V16.6428H125.527C125.354 17.0703 125.071 17.42 124.677 17.6918C124.286 17.9635 123.803 18.0994 123.23 18.0994C122.729 18.0994 122.287 17.9884 121.903 17.7663C121.521 17.541 121.223 17.2145 121.008 16.7869C120.792 16.3561 120.684 15.8357 120.684 15.2259V10.3636H122.484V14.9474C122.484 15.4313 122.617 15.8158 122.882 16.1009C123.147 16.3859 123.495 16.5284 123.926 16.5284C124.191 16.5284 124.448 16.4638 124.697 16.3345C124.945 16.2053 125.149 16.013 125.308 15.7578C125.47 15.4993 125.552 15.1761 125.552 14.7884ZM129.202 18V10.3636H130.922V11.6612H131.012C131.171 11.2237 131.434 10.8823 131.802 10.6371C132.17 10.3885 132.609 10.2642 133.12 10.2642C133.637 10.2642 134.073 10.3902 134.427 10.642C134.785 10.8906 135.037 11.2304 135.183 11.6612H135.262C135.431 11.237 135.717 10.8989 136.118 10.647C136.522 10.3918 137.001 10.2642 137.554 10.2642C138.257 10.2642 138.83 10.4863 139.275 10.9304C139.719 11.3745 139.941 12.0225 139.941 12.8743V18H138.136V13.1527C138.136 12.6787 138.01 12.3324 137.758 12.1136C137.506 11.8916 137.198 11.7805 136.833 11.7805C136.399 11.7805 136.06 11.9164 135.814 12.1882C135.572 12.4567 135.451 12.8063 135.451 13.2372V18H133.686V13.0781C133.686 12.6837 133.567 12.3688 133.328 12.1335C133.093 11.8982 132.785 11.7805 132.404 11.7805C132.145 11.7805 131.91 11.8468 131.698 11.9794C131.486 12.1087 131.317 12.2926 131.191 12.5312C131.065 12.7666 131.002 13.0417 131.002 13.3565V18H129.202Z"
              fill="white"
            />
          </svg>
        </div>
        <div className="w-1/2 flex justify-end items-center text-right">
          {planType === PlanType.Monthly ?
            (
              <>
                <div className="flex flex-row">
                  <div className="flex flex-col items-start">
                    {!!percentageOff && (
                      <span className="text-red-500">${discountedPrice}</span>
                    )}
                    <div className={`${percentageOff ? 'line-through -mt-1' : ''}`}>
                      ${price}
                    </div>
                  </div>
                  <div className="self-end ml-1">per month</div>
                </div>
              </>
            )
            :
            (planType === PlanType.Yearly ?
              (
                <div className="my-auto">
                  <div className="flex flex-row justify-end">
                    <div className="flex flex-col">
                      {!!percentageOff && (
                        <span className="text-red-500">${discountedAnnualMonthly}</span>
                      )}
                      <div className={`${percentageOff ? 'line-through -mt-1' : ''}`}>
                        ${ANNUAL_MONTHLY_PRICE}
                      </div>
                    </div>
                    <div className="self-end ml-1">per month</div>
                  </div>
                  <div className="ml-2">
                    <small>Billed at</small>
                    <div className="flex flex-row justify-end">
                      <div className="flex flex-col">
                        {!!percentageOff && (
                          <span className="text-red-500 text-sm">${discountedPrice}</span>
                        )}
                        <div className={`${percentageOff ? 'line-through -mt-1' : ''} text-sm`}>
                          ${price}
                        </div>
                      </div>
                      <div className="self-end ml-1 text-sm">per year</div>
                    </div>
                  </div>
                </div>
              ) : null
            )
          }
        </div>
      </div>

      <div id="payment-form" className="max-h-90">
        <div className="mt-4">
          {!auth.currentUser && (
            <>
              <label className="block mb-2 text-zinc-700">Email</label>
              <input
                className="p-2 w-full border-solid border-[1px] border-neutral-200 rounded"
                type="text"
                placeholder="Enter email"
                value={userEmail.current}
                onChange={e => userEmail.current = e.target.value}
              />
            </>
          )}
          {PROMO_CODE_ENABLED &&
            (
              <div>
                <label className="block my-2 text-zinc-700">Promo Code</label>
                <div className="flex mb-4">
                  <input
                    className="p-2 w-full border-solid border-[1px] border-neutral-200 rounded"
                    type="text"
                    placeholder="Enter Promo Code here"
                    disabled={!!percentageOff}
                    onChange={e => {
                      promoCode.current = e.target.value
                      setApplyPromoEnabled(!!promoCode.current)
                    }}
                  />
                  <button
                    disabled={!applyPromoEnabled}
                    type="button"
                    onClick={applyPromoCode}
                    id="submit"
                    className={`bg-brand-primary text-white rounded-lg w-28 font-semibold ml-4 my-1 ${!applyPromoEnabled ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}`}
                  >Apply</button>
                </div>
              </div>
            )
          }

        </div>
        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <button
          type="button"
          onClick={(e) => handleSubmit(e)}
          // disabled={isLoading || !stripe || !elements}
          id="submit"
          className="mt-4 flex items-center justify-center w-full bg-brand-primary text-white py-3 rounded-full font-semibold -mb-1"
        >
          <span id="button-text">
            {paymentIsLoading ? (
              <div className="flex items-center justify-center">
                Processing
                <svg
                  className="animate-spin -ml-1 ml-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
            ) : (
              "Pay now"
            )}
          </span>
        </button>
        {/* Show any error or success messages */}
        {
          message && (
            <div className="rounded-md bg-red-50 p-4 mt-5">
              <div className="flex">
                <div className="flex-shrink-0">
                  <XCircleIcon
                    className="h-5 w-5 text-red-400"
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">{message}</h3>
                </div>
              </div>
            </div>
          )
        }
      </div >
    </div >
  );
}
