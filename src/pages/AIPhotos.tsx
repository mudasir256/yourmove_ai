import { useState, useEffect } from "react";

import Slider from "react-slick";
import Image1 from "../assets/images/ai-1.png";
import Image2 from "../assets/images/ai-2.png";
import Image3 from "../assets/images/ai-3.png";
import Image4 from "../assets/images/ai-4.png";
import { useAuthStore } from "../stores/auth";
import { Helmet } from 'react-helmet-async';
import { UnlockAIPhotosModal } from "./../components/modals/UnlockAIPhotosModal"
import { ProductType } from "../constants/payments";
import { auth } from "../firebase";
import { hasUserPaid } from "../queries";
import toast from "react-hot-toast";

const AI_PHOTOS_URL = import.meta.env.VITE_AI_PHOTOS_URL

export const AIPhotos = () => {
  const { isSubscribed, authState } = useAuthStore();
  const [aiPhotosModalShown, setAIPhotosModalShow] = useState(false)
  const images = [Image1, Image2, Image3, Image4];
  var settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const [showLink, setShowLink] = useState(false)

  useEffect(() => {
    if (auth.currentUser?.email) {
      const products = [ProductType.AIPhotos]
      // Check if the user has paid for AI Photos
      hasUserPaid(auth.currentUser?.email, products).then((response) => {
        // if any products bought by the user are in the requiredProductsToSkipPaywall
        if (
          response.data.purchasedProducts.some((product: ProductType) =>
            products.includes(product)
          )
        ) {
          setShowLink(true)
        }
      });
    } else {
      setShowLink(false)
    }
  }, [authState])

  useEffect(() => {
    if ((window as any).gtag) {
      (window as any).gtag("event", "photos_start", {
        event_category: "funnel",
        product: "photos",
      });
    }
  }, []);

  return (
    <div className="-mt-8 max-w-lg mx-auto mt-6">
      <Helmet>
        <meta name="description" content="AI Enhanced Photos. Double your swipes with more charming you" />
      </Helmet>
      <div className="w-full mt-2">
        {/* <div className="flex items-center justify-center mt-3">
                <span className="text-sm font-semibold text-red-400 bg-red-100 py-2 px-4 rounded-full">
                        AI Photo Generator
                </span>
            </div> */}
        <div className="flex items-center text-center justify-center my-4 px-10">
          <h1 className="text-2xl font-bold">
            Stand out with AI-Enhanced Photos
          </h1>
        </div>
        <div className="flex items-center justify-center text-center">
          <p className="text-base">
            💕 Double your swipes with more charming you
          </p>
        </div>
        <div className="flex items-center justify-center text-center">
          <p className="text-base text-slate-500">
            Look your best while staying true to who you are.
          </p>
        </div>
        <div className="items-center text-center my-8 mx-12 max-w-full">
          <Slider {...settings}>
            {images.map((image) => {
              return (
                <div className="items-center">
                  <img
                    className="items-center"
                    alt="profile photo improved using AI"
                    src={image}
                  />
                </div>
              );
            })}
          </Slider>
        </div>
        <div className="mt-4 mx-4">
          <h4 className="font-semibold text-sm md:text-md mb-2">
            What's included:
          </h4>
          <ul className="list-none space-y-1">
            <h5 className="flex text-sm md:text-md">✓ Show your best self</h5>
            <h5 className="flex text-sm md:text-md">
              ✓ 90 photos in 15 different backgrounds & styles
            </h5>
            <h5 className="flex text-sm md:text-md">
              ✓ Up to 74% more matches on average
            </h5>
          </ul>
          <h4 className="font-semibold text-sm md:text-md mt-4 mb-2">
            What we won't do:
          </h4>
          <ul className="list-none space-y-1">
            <h5 className="flex text-sm md:text-md">
              ✗ Create fake-looking photos
            </h5>
            <h5 className="flex text-sm md:text-md">
              ✗ Make you taller or give you a dog
            </h5>
          </ul>
        </div>
        <div className="mt-8 mb-4 mx-4">
          {!showLink ? (
            isSubscribed === null ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin h-10 w-10 text-black"
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
              <button
                type="button"
                onClick={() => {
                  setAIPhotosModalShow(true);
                  if (window.gtag) {
                    window.gtag("event", "photos_unlock", {
                      event_category: "funnel",
                      product: "photos",
                    });
                  }
                }}
                className="mt-2 flex items-center justify-center w-full bg-brand-primary text-white py-3 rounded-full font-semibold"
              >
                Enhance my photos -
                {isSubscribed === null ? (
                  <svg
                    className="animate-spin ml-2 mr-2 h-5 w-5 text-white"
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
                ) : (
                  <>
                    {isSubscribed ? (
                      <>
                        <span className="line-through ml-1">$29</span>
                        <span className="ml-1">$15 (50% discount)</span>
                      </>
                    ) : (
                      "$29"
                    )}
                  </>
                )}
              </button>
            )
          ) : (
            <button
              type="button"
              onClick={() => {
                window.open(AI_PHOTOS_URL, "_blank", "noopener,noreferrer");
              }}
              className="mt-2 flex items-center justify-center w-full bg-brand-primary text-white py-3 rounded-full font-semibold"
            >
              Open AI Photos
            </button>
          )}
        </div>
      </div>
      <UnlockAIPhotosModal
        open={aiPhotosModalShown}
        setOpen={setAIPhotosModalShow}
        redirectHandler={async () => {
          setAIPhotosModalShow(false);
          window.open(AI_PHOTOS_URL, "_blank", "noopener,noreferrer");
          toast.success("You have successfully unlocked AI Photos!");
          setShowLink(true)
        }} />
    </div >
  );
};
