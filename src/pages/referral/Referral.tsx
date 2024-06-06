import { Back } from "../../components/Back"
import ReferralImage from "../../assets/images/referral-img.png"
import { useNavigate } from "react-router-dom";
import { useReferrals } from "./useReferrals"
import { useEffect, useRef, useState } from "react";


const REFERRAL_REQUIRED_FOR_PREMIUM_ACCESS = parseInt(import.meta.env.VITE_REFERRAL_REQUIRED_FOR_PREMIUM_ACCESS || 0)

export const UserReferrals = () => {
  const navigate = useNavigate()

  const {
    referralCode,
    referralCount = 0,
    claimReferralSubscription,
    referralSubStatus,
    disabled
  } = useReferrals()

  const [referralLink, setReferralLink] = useState(`https://web.yourmove.ai/?referralCode=${referralCode}`)

  useEffect(() => {
    setReferralLink(`https://web.yourmove.ai/?referralCode=${referralCode}`)
  }, [referralCode])

  const onShareReferralClicked = async () => {
    (window as any).gtag('event', 'referral_share', {
      event_category: 'referral_share',
      product: 'share',
    });

    try {
      await navigator.share({
        title: 'Join YourMove',
        text: 'Check out YourMove and sign up with my referral code to get benefits!',
        url: referralLink,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const onCopyReferralClicked = () => {
    (window as any).gtag('event', 'referral_copy', {
      event_category: 'referral_copy',
      product: 'share',
    });
    navigator.clipboard.writeText(referralLink)
  }

  const canShare = typeof navigator.share === 'function';

  return (
    <div className="flex-col flex-1 max-w-lg mx-auto mt-0 bg-white">
      <Back containerClass="ml-2 w-6 h-10" color="stroke-black" onClick={() => { navigate(-1) }} />
      <div className="mx-8 flex-1">
        <div className="flex shrink-0 items-center">
          <p className="font-bold">YourMove</p>
          <div className="bg-brand-primary text-white text-sm px-1.5 py-0.5 ml-1 rounded-md">
            Referral
          </div>
        </div>
        <img src={ReferralImage} alt="Group of friends" className="w-full h-auto rounded-md mt-4" />

        <div className="text-center text-sm mt-4">
          <p className="text-3xl font-bold text-black text-left">{`Invite ${REFERRAL_REQUIRED_FOR_PREMIUM_ACCESS} friends, get free premium access`}</p>
          <p className="text-black mt-4 text-left">Earn rewards when friends join using your referral link.</p>
        </div>

        {referralCode &&
          <>
            <p className="mt-10 mb-2 text-xs text-gray-500 text-center">YOUR REFERRAL LINK</p>
            <div className="flex justify-between items-center border py-2 rounded-full bg-zinc-200 border-black border-opacity-30">
              {referralCode && (
                <>
                  <span className="text-black ml-6 truncate flex-grow max-w-[60%]">{referralLink}</span>
                  <button className="text-brand-primary mr-6 py-1 rounded font-semibold" onClick={onCopyReferralClicked}>Copy Link</button>
                </>
              )}
            </div>
          </>
        }
        {canShare && referralCode && <div className="flex justify-center mt-2">
          <button className="text-brand-primary rounded font-semibold" onClick={onShareReferralClicked}>
            Share Link
          </button>
        </div>}

        <div className="mt-4 bg-gray-100 -mx-8 py-6 px-8">
          <p className="text-center text-xs text-gray-500 font-semibold">REFERRAL OVERVIEW</p>
          <div className="bg-white mt-4 py-4 rounded-md w-full items-center justify-center text-center">
            <p className="text-black text-sm font-medium">Sign-ups</p>
            <p className="mt-4 text-black text-2xl font-bold">{`${referralCount}/${REFERRAL_REQUIRED_FOR_PREMIUM_ACCESS} friends`}</p>
          </div>

          <button
            className={`w-full bg-brand-primary text-white py-2 rounded-xl mt-4 ${disabled ? "opacity-50" : ""}`}
            disabled={disabled}
            onClick={claimReferralSubscription}
          >
            {`${referralSubStatus ? "Claimed Subscription Already!" : "Claim Your Free Subscription"}`}
          </button>
        </div>
      </div>
    </div >
  )
}