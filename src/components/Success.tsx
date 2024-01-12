import Lottie from "lottie-react";
import successAnimation from "../assets/successAnimation.json";

interface Props {
  title?: string;
}

export const Success = ({ title }: Props) => {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="-mt-64">
        <div className="flex items-center justify-center h-64">
          <Lottie
            animationData={successAnimation}
            loop={false}
            style={{ height: "125px" }}
          />
        </div>
        {title && (
          <div className="text-center -mt-14">
            <h2 className="text-2xl">{title}</h2>
          </div>
        )}
      </div>
    </div>
  );
};
