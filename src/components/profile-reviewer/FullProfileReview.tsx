import React from "react"
import Markdown from "react-markdown"

type Props = {
  review: string
}

export const FullProfileReview = ({ review }: Props) => {
  return <Markdown className="text-neutral-900 text-sm mb-4">{review}</Markdown>
}