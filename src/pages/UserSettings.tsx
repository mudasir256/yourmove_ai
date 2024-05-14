import { useState } from "react"
import { SideNavListItem } from "../components/nav/SideNavListItem";
import { FeedbackModal } from "../components/modals/FeedbackModal";

const STRIPE_UNSUBSCRIBE_LINK = "https://billing.stripe.com/p/login/9AQ14Sc4N0EX7E48ww"

export const UserSettings = () => {
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);

  return (
    <>
      <FeedbackModal open={feedbackModalOpen} setOpen={setFeedbackModalOpen} />
      <div className="flex-col flex-1 max-w-lg mx-auto mt-0">
        <div className="w-full mt-2">
          <div className="flex items-center text-center justify-center mt-4 px-10 mb-10">
            <h1 className="text-2xl font-bold">
              User Settings
            </h1>
          </div>
          <ul >
            <SideNavListItem key="4" containerStyle="mt-auto mb-4" title="Contact Us" onNavItemClick={() => {
              setFeedbackModalOpen(true)
            }} />
            <SideNavListItem key="4" containerStyle="mt-auto mb-4" title="Manage Subscription" target="_blank" href={STRIPE_UNSUBSCRIBE_LINK} onNavItemClick={() => {
            }} />
          </ul>
        </div>
      </div>
    </>
  )
}