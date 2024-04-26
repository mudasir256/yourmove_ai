import { useNavigate } from "react-router-dom";
import blaine from "../../assets/images/blaine_ad.png";


import { useEffect } from "react";
import { useChatStore } from "../../stores/chat";
import { useAuthStore } from "../../stores/auth";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";
import { useUIStore } from "../../stores/ui";

export const BlaineNudge = () => {
  const { chatResponse } = useChatStore();
  const { hideUpsell } = useUIStore();
  // only show if there are queries remaining, and they are less than 5 and the user is signed in
  return chatResponse?.queriesRemaining !== undefined &&
        auth.currentUser &&
        !hideUpsell ? (
            <div className="my-4 mx-2 flex flex-row items-center rounded-xl border-2 border-black 	bg-gradient-to-tr from-purple-400 via-purple-100 to-white ">
                <div className="basis-2/5 pr-4 pl-2 align-bottom align-text-bottom items-end">
                    <img className="object-scale-down" src={blaine} alt="Blaine Graphic">
                    </img>
                </div>
                <div className="basis-3/5 py-1 items-center flex-col ">
                    <div className="pt-1">
                        <div className="font-bold text-xs text-purple-700 md:text-base">LEARN FROM THE BEST</div>
                        <p className="text-gray-700 text-sm md:text-lg my-1 pr-2">
                            Get your dating life unstuck with coach Blaine→
                        </p>
                        </div>
                    <div className="pb-1">
                        <a className="inline-block bg-white text-purple-700 text-xs md:text-base text-font-bold py-1 px-2 rounded"
                            href="https://clients.datingbyblaine.com/a/2147708898/sLdDvypd" target="_blank"
                        >
                        Learn More
                    </a>
                    </div>
                </div>
            </div>
  ) : null;
};

export const BlaineNudgeAlways = () => {
    // only show if there are queries remaining, and they are less than 5 and the user is signed in
    return (
        <a href="https://clients.datingbyblaine.com/a/2147708898/sLdDvypd" target="_blank" className="no-underline">
            <div className="my-4 mx-2 flex flex-row items-center rounded-xl border-2 border-black bg-gradient-to-tr from-purple-400 via-purple-100 to-white ">
                <div className="basis-2/5 pr-4 pl-2 align-bottom align-text-bottom items-end">
                    <img className="object-scale-down" src={blaine} alt="Blaine Graphic" />
                </div>
                <div className="basis-3/5 py-1 items-center flex-col ">
                    <div className="pt-1">
                        <div className="font-bold text-xs text-purple-700 md:text-base">LEARN FROM THE BEST</div>
                        <p className="text-gray-700 text-sm md:text-lg my-1 pr-2">
                            Get your dating life unstuck with coach Blaine→
                        </p>
                    </div>
                    <div className="pb-1">
                        <span className="inline-block bg-white text-purple-700 text-xs md:text-base text-font-bold py-1 px-2 rounded">
                            Learn More
                        </span>
                    </div>
                </div>
            </div>
        </a>
    );
};

// export const BlaineNudge = () => {
//     const navigate = useNavigate();
//     return (

//     );
//     };