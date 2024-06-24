import { useEffect } from "react"
import {
  useLocation,
} from "react-router-dom";

export const useCampaignQueryParams = () => {
  const { search } = useLocation()

  const useSearchParams = (param: string) => {
    const queryParams = new URLSearchParams(search)
    return queryParams.get(param)
  }

  useEffect(() => {
    const source = useSearchParams("utm_source")
    const campaign = useSearchParams("utm_campaign")
    if (source) localStorage.setItem('utm_source', source);
    if (campaign) localStorage.setItem("utm_campaign", campaign)
  }, [])
}