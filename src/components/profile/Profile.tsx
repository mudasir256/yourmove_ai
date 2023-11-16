import { ProfileResponse } from "../../models/profile";
import { FeedbackModal } from "../FeedbackModal";
import { ProfileItem } from "./ProfileItem";

export const PROFILE_RESPONSE: Array<ProfileResponse> = [
  {
    question: "I'm known for",
    answer:
      "Being a sports fanatic, devouring delicious food, and always having a squad of awesome friends by my side. Basically, I'm the triple threat you never knew you needed",
  },
  {
    question: "Swipe right if",
    answer:
      "You're looking for a kind heart, confident spirit, and a helpful hand to hold. Let's write our happily ever after together! ",
  },
  {
    question: "My real life superpower is",
    answer:
      "Killing it when I get passed the aux cord. Let me play you a little something and we'll see where the night takes us.",
  },
];

export const Profile = () => {
  return (
    <div className="mt-4">
      <FeedbackModal />
      <svg
        onClick={() => {}}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2.5"
        className="w-12 h-12 stroke-zinc-400"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 19.5L8.25 12l7.5-7.5"
        />
      </svg>
      <div className="mt-4 px-2">
        <div className="mb-5">
          <h1 className="text-4xl font-bold">Your profile</h1>
        </div>
        {PROFILE_RESPONSE.map((profileResponse: ProfileResponse) => {
          return (
            <ProfileItem
              key={profileResponse.answer}
              profileResponse={profileResponse}
            />
          );
        })}
      </div>
    </div>
  );
};
