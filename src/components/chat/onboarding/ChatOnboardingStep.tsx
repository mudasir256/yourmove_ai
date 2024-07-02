type Props = {
  title: string
  description: string
  illustration: string | undefined
}

export const ChatOnboardingStep = ({ title, description, illustration }: Props) => (
  <div className="p-2 select-none">
    <img style={{ userSelect: 'none', WebkitUserDrag: 'none' } as any}
      src={illustration} />
    <p className="text-xl text-black font-bold mt-2 text-center">{title}</p>
    <p className="text-center text-sm mt-2 mx-4">{description}</p>
  </div>
);