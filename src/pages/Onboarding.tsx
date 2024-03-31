import { useEffect, useState } from "react";
import { Logo } from "../components/Logo";
import { Product } from "../components/onboarding/Product";
import ProfileReview from "../assets/images/onboarding/profile-review.png";
import ProfileWriter from "../assets/images/onboarding/profile-writer.png";
import ChatAssistant from "../assets/images/onboarding/chat-assistant.png";
import { useNavigate } from "react-router-dom";

const OPTIONS = [
  {
    emoji: "💞",
    title: "Get more matches",
    recommended: "/profile-review",
  },
  {
    emoji: "🍷",
    title: "Get more dates",
    recommended: "/chat-assistant",
  },
];

export const Onboarding = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const isOptionSelected = (option: string) => {
    return selectedOption === option;
  };

  // Once we show the onboarding once, we don't want to show it again,
  // so we set a flag in local storage to indicate that the user has onboarded
  useEffect(() => {
    localStorage.setItem("hasOnboarded", "true");
  }, []);

  return (
    <div className="-mt-8 max-w-lg mx-auto mt-3">
      <div>
        <div className="flex items-center justify-center">
          <Logo />
        </div>
        <div className="mt-4 px-4">
          <h1 className="text-2xl font-semibold">What's your next move?</h1>
        </div>

        <div className="ml-4 mt-3 overflow-x-scroll flex no-scrollbar">
          {OPTIONS.map((option) => {
            return (
              <div
                className={`bg-white border-2 mr-4 p-4 w-1/2 rounded-2xl cursor-pointer ${
                  isOptionSelected(option.title)
                    ? "border-brand-primary"
                    : "border-black"
                }`}
                onClick={() => setSelectedOption(option.title)}
              >
                <h1 className="text-4xl">{option.emoji}</h1>
                <h2
                  className={`leading-7 text-2xl font-semibold mt-2 ${
                    isOptionSelected(option.title)
                      ? "text-brand-primary"
                      : "text-black"
                  }`}
                >
                  {option.title}
                </h2>
              </div>
            );
          })}
        </div>
        {selectedOption && (
          <>
            <div
              className="overflow-y-scroll p-4"
              style={{
                height: window.innerHeight - 310,
              }}
            >
              {selectedOption === "Get more matches" && (
                <>
                  <Product
                    isRecommended={true}
                    title="Try Profile Writer"
                    description="Tell us about yourself. Get an instant bio. Tested and optimized for conversion. Works with Hinge, Tinder, Bumble, and more."
                    image={ProfileWriter}
                    url="/profile-writer"
                  />
                  <Product
                    isRecommended={false}
                    title="Try Profile Reviewer"
                    description="Detailed review of your profile photos + bio with actionable tips to improve your matches."
                    image={ProfileReview}
                    url="/profile-review"
                  />

                </>
              )}
              {selectedOption === "Get more dates" && (
                <>
                  <Product
                    isRecommended={true}
                    title="Try Chat Assistant"
                    description="Access winning icebreakers and reply suggestions to ignite connections and turn matches into dates."
                    image={ChatAssistant}
                    url="/chat-assistant"
                  />
                </>
              )}
            </div>
            <div className="fixed bottom-0 left-0 w-full h-16 z-10 px-4">
              <div className="max-w-lg mx-auto">
                <div
                  className="bg-brand-primary text-center text-white font-semibold p-3 rounded-lg"
                  onClick={() => {
                    const option = OPTIONS.find(
                      (option) => option.title === selectedOption
                    );
                    if (option) {
                      navigate(option.recommended);
                    }
                  }}
                >
                  <h1 className="text-lg">Get Started</h1>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
