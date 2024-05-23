import { useEffect, useRef, useState } from "react"
import { fetchReferralsCount, fetchUserReferralCode, claimSubscription, fetchReferralSubscriptionStatus } from "../../queries"
import { auth } from "../../firebase"
import { useAuthStore } from "../../stores/auth"
import { AuthState } from "../../constants/auth"
import { useWizardStore } from "../../stores/wizard"

const REFERRAL_REQUIRED_FOR_PREMIUM_ACCESS = parseInt(import.meta.env.VITE_REFERRAL_REQUIRED_FOR_PREMIUM_ACCESS || 0)

export const useReferrals = () => {
  const { authState, setAuthModalIsOpen, isSubscribed, setIsSubscribed } = useAuthStore()
  const { profileWriterStepResults, profileReviewerStepResults } =
    useWizardStore();
  const { email: writerEmail } = profileWriterStepResults || {}
  const { email: reviewEmail } = profileReviewerStepResults || {}

  const [referralCode, setReferralCode] = useState<string | undefined>(undefined)
  const [referralCount, setReferralCount] = useState<number>(0)
  const [referralSubStatus, setReferralSubStatus] = useState<boolean>(false)
  const [disabled, setDisbaled] = useState(false)

  const noAuthEmail = writerEmail || reviewEmail
  const email = auth.currentUser?.email || noAuthEmail || undefined

  const redeemSubscription = useRef(false)

  useEffect(() => {
    setDisbaled(referralSubStatus || isSubscribed || (referralCount < REFERRAL_REQUIRED_FOR_PREMIUM_ACCESS))
  }, [referralSubStatus, referralCount, isSubscribed])

  const fetchReferralCode = async (email: string) => {
    const { data: { referralCode = undefined } } = (await fetchUserReferralCode(email)) || {}
    setReferralCode(referralCode)
  }

  useEffect(() => {
    if (redeemSubscription.current && authState === AuthState.Authenticated && !isSubscribed && auth.currentUser?.email) {
      if (auth.currentUser.email === noAuthEmail) {
        claimReferralSubscription()
      } else {
        fetchReferralCode(auth.currentUser.email)
      }
    }
  }, [authState, isSubscribed])

  const fetchReferralSubStatus = async () => {
    if (!email) return
    const { data: { status = false } } = await fetchReferralSubscriptionStatus(email)
    setReferralSubStatus(status)
  }

  const claimReferralSubscription = async () => {
    if (authState === AuthState.Authenticated && auth.currentUser?.email) {
      try {
        await claimSubscription(auth.currentUser.email)
        setIsSubscribed(true)
        fetchReferralSubStatus()
      } catch (e) { }
    } else {
      redeemSubscription.current = true
      setAuthModalIsOpen(true)
    }
  }

  const getReferralsCount = async () => {
    if (referralCode) {
      const { data: { count = 0 } } = await fetchReferralsCount(referralCode) || {}
      setReferralCount(count)
    }
  }

  useEffect(() => {
    if (!email) return
    fetchReferralCode(email)
    if (authState === AuthState.Authenticated && auth.currentUser?.email) {
      fetchReferralSubStatus()
    }
  }, [authState])

  useEffect(() => {
    getReferralsCount()
  }, [referralCode])

  return {
    referralCode,
    referralCount,
    claimReferralSubscription,
    referralSubStatus,
    disabled
  }
}