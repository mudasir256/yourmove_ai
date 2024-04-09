import { useNavigate } from "react-router-dom";
import Image1 from "../../assets/images/ai-photos/image-1.png";
import Image2 from "../../assets/images/ai-photos/image-2.png";
import Image3 from "../../assets/images/ai-photos/image-3.png";

const IMAGES = [Image1, Image2, Image3];

export const AIPhotosModal = () => {
  const navigate = useNavigate();
  return (
    <div className="border-2 border-black rounded-lg relative overflow-hidden mx-2">
      <div
        className="bg-brand-alt opacity-20 absolute z-50 rounded-full absolute -top-1/2 left-1/2 transform -translate-x-1/2"
        style={{ width: "160%", height: "110%" }}
      >
        d &nbsp;
      </div>
      <div className="relative z-50">
        <div className="flex items-center justify-center">
          <div className="bg-white rounded-xl mt-8 mb-5 px-3 py-2">
            <h3 className="font-semibold text-brand-primary">
              Complete your profile
            </h3>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-center">
            <div className="flex">
              <div>
                <div className="flex items-center justify-center">
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 26 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-7 h-7 mr-2"
                  >
                    <path
                      d="M13 23C18.5228 23 23 18.5228 23 13C23 7.47715 18.5228 3 13 3C7.47715 3 3 7.47715 3 13C3 18.5228 7.47715 23 13 23Z"
                      stroke="#BA1F33"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M15.3101 9L21.0501 18.94"
                      stroke="#BA1F33"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M10.6899 9H22.1699"
                      stroke="#BA1F33"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M8.37988 12.9996L14.1199 3.05957"
                      stroke="#BA1F33"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M10.6902 16.9996L4.9502 7.05957"
                      stroke="#BA1F33"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M15.3101 17H3.83008"
                      stroke="#BA1F33"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M17.6199 13L11.8799 22.94"
                      stroke="#BA1F33"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>

                  <h1
                    className="text-2xl font-semibold"
                    style={{ color: "#BA1F33" }}
                  >
                    AI Photo Generator
                  </h1>
                </div>
                <p className="lg:text-xl text-brand-dark mt-2 lg:mx-14 text-center">
                  Boost your right swipes by showing your charming side
                </p>
              </div>
            </div>
          </div>
          <div className="w-full flex items-center justify-center my-4 px-4">
            {IMAGES.map((image) => {
              return <img alt="..." src={image} className="w-1/3 mx-1.5" />;
            })}
          </div>
          <div className="px-4 mb-4">
            <button
              onClick={() => navigate("/ai-photo")}
              className="bg-brand-primary w-full py-3 text-white font-semibold rounded-lg"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
