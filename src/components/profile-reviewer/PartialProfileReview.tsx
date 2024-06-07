import React from "react"
import Markdown from "react-markdown"
import LockIcon from '../../components/LockIcon'

type LockedItemProps = {
  title: string
  className?: string
}
const LockedItem = ({ title, className }: LockedItemProps) => {
  return (
    <div className={`flex py-2 ${className}`}>
      <p className="text-sm font-semibold flex-1">{title}</p>
      <LockIcon />
    </div>
  )
}

type Props = {
  summary: string
  onUnlockFullReviewClick?: VoidFunction
}
export const PartialProfileReview = ({ summary, onUnlockFullReviewClick = undefined }: Props) => {
  return (
    <>
      <p className="text-sm text-neutral-900 font-semibold mb-2">Summary</p>
      <Markdown className="text-neutral-900 text-sm mb-4">{summary}</Markdown>
      <LockedItem className="mt-4" title="Detailed Improvement Plan" />
      <LockedItem className="mt-2" title="Detailed Photo Review" />
      <LockedItem className="mt-2" title="Suggested Photo Order" />
      <LockedItem className="mt-2" title="Bio review and suggestions" />
      <LockedItem className="mt-2" title="Style suggestions" />
      <button
        className="mt-4 flex items-center justify-center w-full bg-brand-primary text-white py-5 rounded-lg font-semibold"
        onClick={onUnlockFullReviewClick}>
        <span className="mr-2"><LockIcon color="white" /></span>
        <p className="text-xl">Get Full Review</p>
      </button>
    </>
  )
}