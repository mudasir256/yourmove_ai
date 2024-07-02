import { useChatStore } from "../../stores/chat";
import { useAuthStore } from "../../stores/auth";
import { Link } from "react-router-dom";
import { useUIStore } from "../../stores/ui";

export const PremiumUpsellPrompt = () => {
  const { chatResponse } = useChatStore();
  const { isSubscribed } = useAuthStore();
  const { hideUpsell } = useUIStore();

  // only show if there are queries remaining, and they are less than 5 and the user is signed in
  return chatResponse?.queriesRemaining !== undefined &&
    chatResponse?.queriesRemaining < 7 &&
    !hideUpsell ? (
    <div className="w-full text-center mt-4">
      You have {chatResponse.queriesRemaining} / {chatResponse.queriesAvailable}{" "}
      free messages remaining for today.{" "}
      {/* Only show option to upgrade if they are not subscribed */}
      {!isSubscribed && (
        <Link to="/premium" className="font-bold text-brand-primary">
          Upgrade for unlimited messages, profiles, reviews, and more.
        </Link>
      )}
    </div>
  ) : null;
};
