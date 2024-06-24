import { useEffect } from "react"
import {
  useLocation,
} from "react-router-dom";
import { logEvent } from "../../analytics";

export const useReferralQueryParams = () => {
  const { search } = useLocation()

  const useSearchParams = () => {
    const queryParams = new URLSearchParams(search)
    return queryParams.get('referralCode')
  }

  useEffect(() => {
    const referralCode = useSearchParams()
    if (referralCode) {
      const currentCode = localStorage.getItem('referredCode')
      if (!currentCode || currentCode !== referralCode) {
        logEvent('referral_user_arrive', 'referrals')
        // if ((window as any).gtag) {
        //   (window as any).gtag('event', 'referral_user_arrive', {
        //     event_category: 'funnel', product: 'referrals',
        //   })
        // }
      }
      localStorage.setItem('referredCode', referralCode);
    }
  }, [])
}