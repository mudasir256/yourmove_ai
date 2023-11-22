import Lottie from "lottie-react";
import loadingAnimation from "../assets/loadingAnimation.json";

interface Props {
  title?: string;
}

export const Loading = ({ title }: Props) => {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="-mt-64">
        <div className="flex items-center justify-center h-44">
          <Lottie animationData={loadingAnimation} loop={true} />
        </div>
        {title && (
          <div className="text-center -mt-6">
            <h2 className="text-2xl font-semibold">{title}</h2>
          </div>
        )}
      </div>
    </div>
  );
};
