import { useEffect } from "react"
import { EventParams, logEvent } from './analyticsUtils'
import { useUIStore } from "../stores/ui"

export const useLogEvent = (
  name: string,
  product: string | undefined = undefined,
  params: EventParams = {},
  category: string = 'funnel'
) => {
  const { abTestGroup } = useUIStore()
  useEffect(() => {
    if (abTestGroup !== undefined) logEvent(name, product, params, category)
  }, [abTestGroup])
}
