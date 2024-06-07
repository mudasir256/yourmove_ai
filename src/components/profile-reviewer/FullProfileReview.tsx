import Markdown from "react-markdown"
import { ReviewedProfile } from "../../models/profile"

type Props = {
  review: ReviewedProfile | null
}

export const FullProfileReview = ({ review }: Props) => {
  const { reviewSummary = "", summary = "" } = review || {}
  return (
    <>
      <p className="text-xl text-neutral-900 font-semibold mb-2">Summary</p>
      <div className="prose prose-base leading-tight">
        <Markdown>{summary}</Markdown>
        <Markdown>{reviewSummary}</Markdown>
      </div>
    </>
  )
}