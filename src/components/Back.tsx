import React from "react"

type Props = {
  onClick?: VoidFunction
  color?: string
  containerClass?: string
}

export const Back = ({ onClick = undefined, containerClass, color }: Props) => {
  return (
    <svg
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2.5"
      className={`w-12 h-12 ${color ? color : "stroke-zinc-400"} ${containerClass}`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 19.5L8.25 12l7.5-7.5"
      />
    </svg>
  )
}