import { useState } from "react";
import { ChatOnboardingStep } from './ChatOnboardingStep'
import { onboardingSteps } from './onboardingSteps'
import { useSwipeable } from "react-swipeable";

type Props = {
  onClose?: VoidFunction
}

export const ChatOnboarding = ({ onClose = undefined }: Props) => {
  const [step, setStep] = useState(0);

  const goToNext = () => {
    if (step < onboardingSteps.length - 1) setStep(prev => prev + 1)
  }

  const goToPrev = () => {
    if (step > 0) setStep(prev => prev - 1)
  }

  const handlers = useSwipeable({
    onSwipedLeft: goToNext,
    onSwipedRight: goToPrev,
    trackMouse: true
  });

  return (
    <div className="relative w-full">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${step * 100}%)` }}
        {...handlers}
      >
        {onboardingSteps.map((step, index) => (
          <div key={index} className="w-full flex-shrink-0">
            <ChatOnboardingStep illustration={step.illustration} title={step.title} description={step.content} onNext={goToNext} />
          </div>
        ))}
      </div>
      <div className="mt-4 mx-2">
        <button
          className="flex items-center justify-center w-full bg-brand-primary text-white py-3 rounded-xl font-semibold"
          onClick={() => {
            if (step < onboardingSteps.length - 1) goToNext()
            else onClose?.()
          }}>
          {step === onboardingSteps.length - 1 ? "Understood!" : "Next"}
        </button>
      </div>
    </div>
  );
};