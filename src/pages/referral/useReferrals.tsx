import { useEffect, useState } from "react"
import { fetchReferralsCount, fetchUserReferralCode, claimSubscription, fetchReferralSubscriptionStatus } from "../../queries"
import { auth } from "../../firebase"
import { useAuthStore } from "../../stores/auth"
import { AuthState } from "../../constants/auth"

export const useReferrals = () => {
  const { authState } = useAuthStore()
  const [referralCode, setReferralCode] = useState<string | undefined>(undefined)
  const [referralCount, setReferralCount] = useState<number | undefined>(undefined)
  const [referralSubStatus, setReferralSubStatus] = useState<boolean>(false)

  const fetchReferralSubStatus = async (email: string) => {
    const { data: { status = false } } = await fetchReferralSubscriptionStatus(email)
    console.log("REFERRAL SUB STATUS:: ", status)
    setReferralSubStatus(status)

  }

  const claimReferralSubscription = async () => {
    if (authState === AuthState.Authenticated && auth.currentUser?.email) {
      console.log("CLAIM REFERRAL SUBMISSION CALLED::")
      const response = await claimSubscription(auth.currentUser.email)
      console.log("RESPONSE:: ", response)
    }
  }

  const getReferralsCount = async () => {
    if (referralCode) {
      const { data: { count = 0 } } = await fetchReferralsCount(referralCode) || {}
      setReferralCount(count)
    }
  }

  const fetchReferralCode = async (email: string) => {
    console.log("FETCHING REFERRALS:: ", auth.currentUser?.email)
    const { data: { referralCode = undefined } } = (await fetchUserReferralCode(email)) || {}
    setReferralCode(referralCode)
  }

  useEffect(() => {
    if (authState === AuthState.Authenticated && auth.currentUser?.email) {
      fetchReferralCode(auth.currentUser.email)
      fetchReferralSubStatus(auth.currentUser.email)
    }
  }, [authState])

  useEffect(() => {
    getReferralsCount()
  }, [referralCode])

  return {
    referralCode,
    referralCount,
    claimReferralSubscription,
    referralSubStatus
  }
}