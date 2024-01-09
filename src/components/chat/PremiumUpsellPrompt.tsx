import { useEffect } from "react";
import { useChatStore } from "../../stores/chat";
import { useAuthStore } from "../../stores/auth";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";

export const PremiumUpsellPrompt = () => {
  const { chatResponse } = useChatStore();
  const { isSubscribed } = useAuthStore();

  useEffect(() => {
    console.log("responses:");
    console.log(chatResponse);
  }, [chatResponse]);

  // only show if there are queries remaining, and they are less than 5 and the user is signed in
  return chatResponse?.queriesRemaining !== undefined &&
    chatResponse?.queriesRemaining < 5 &&
    auth.currentUser ? (
    <div className="w-full text-center mt-4">
      You have {chatResponse.queriesRemaining} / {chatResponse.queriesAvailable}{" "}
      queries remaining for today.{" "}
      {/* Only show option to upgrade if they are not subscribed */}
      {!isSubscribed && (
        <Link to="/premium" className="font-bold text-brand-primary">
          Upgrade for more
        </Link>
      )}
    </div>
  ) : null;
};
