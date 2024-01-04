import { useEffect } from "react";
import { useChatStore } from "../../stores/chat";
import { useAuthStore } from "../../stores/auth";

export const PremiumUpsellPrompt = () => {
  const { chatResponse } = useChatStore();
  const { isSubscribed } = useAuthStore();

  useEffect(() => {
    console.log("responses:");
    console.log(chatResponse);
  }, [chatResponse]);

  return chatResponse?.queriesRemaining &&
    chatResponse?.queriesRemaining < 5 ? (
    <div className="w-full text-center mt-4">
      You have {chatResponse.queriesRemaining} / {chatResponse.queriesAvailable}{" "}
      queries remaining for today{" "}
      <span className="font-bold text-brand-primary">Upgrade for more</span>
      {/* Only show option to upgrade if they are not subscribed */}
      {/* {!isSubscribed && (
        <span className="font-bold text-brand-primary">Upgrade for more</span>
      )} */}
    </div>
  ) : null;
};
