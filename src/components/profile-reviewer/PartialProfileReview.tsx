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
      <p className="text-base font-semibold flex-1">{title}</p>
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
      <p className="text-xl text-neutral-900 font-semibold mb-2">Summary</p>
      <div className="prose prose-base leading-tight">
        <Markdown>{summary}</Markdown>
      </div>
      <LockedItem className="mt-4" title="Step by Step Improvement Plan" />
      <LockedItem className="mt-2" title="Detailed Photo review" />
      <LockedItem className="mt-2" title="Suggested Photo order" />
      <LockedItem className="mt-2" title="Bio review & improvements" />
      <LockedItem className="mt-2" title="Style tips + suggestions" />
      <button
        className="mt-4 flex items-center justify-center w-full bg-brand-primary text-white py-5 rounded-lg font-semibold"
        onClick={onUnlockFullReviewClick}>
        <span className="mr-2"><LockIcon color="white" /></span>
        <p className="text-xl">Get Full Review</p>
      </button>
    </>
  )
}