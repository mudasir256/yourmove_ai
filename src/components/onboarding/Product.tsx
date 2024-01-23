import { useNavigate } from "react-router-dom";

interface Props {
  isRecommended?: boolean;
  title: string;
  description: string;
  image: string;
  url: string;
}

export const Product = ({
  isRecommended,
  title,
  description,
  image,
  url,
}: Props) => {
  const navigate = useNavigate();
  return (
    <div
      className="border border-2 border-black rounded-lg mb-4"
      onClick={() => navigate(url)}
    >
      <div className="flex justify-center items-center overflow-hidden bg-brand-primary">
        <div className="h-[10rem] w-[18rem] -translate-y-[4rem]">
          <img src={image} />
        </div>
      </div>
      {isRecommended && (
        <div className="bg-black flex text-white py-1.5 items-center font-semibold px-4">
          <div className="mr-2">
            <svg
              width="14"
              height="15"
              viewBox="0 0 14 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9.34273 5.51857C9.37515 5.5286 9.40054 5.55398 9.41058 5.5864C9.73488 6.63293 10.2397 7.4989 10.9251 8.18431C11.611 8.87018 12.4777 9.37525 13.5251 9.69952L13.523 9.70638C13.5773 9.72319 13.6077 9.78082 13.5909 9.83511C13.5809 9.86753 13.5555 9.89292 13.5231 9.90296C12.4765 10.2273 11.6106 10.7321 10.9251 11.4175C10.2393 12.1034 9.73421 12.9701 9.40993 14.0175L9.40307 14.0154C9.38627 14.0697 9.32863 14.1001 9.27435 14.0833C9.24193 14.0732 9.21654 14.0479 9.20649 14.0154C8.88219 12.9689 8.37734 12.1029 7.69193 11.4175C7.00606 10.7317 6.13939 10.2266 5.09193 9.90231L5.09405 9.89545C5.03976 9.87865 5.00938 9.82102 5.02619 9.76673C5.03622 9.73431 5.0616 9.70892 5.09402 9.69887C6.14055 9.37457 7.00652 8.86972 7.69193 8.18431C8.3778 7.49844 8.88287 6.63177 9.20714 5.58431L9.214 5.58643C9.23081 5.53215 9.28844 5.50176 9.34273 5.51857ZM2.66028 6.1617C2.67774 6.16711 2.69141 6.18077 2.69682 6.19823C2.87144 6.76174 3.14328 7.22804 3.51235 7.5971C3.88167 7.96642 4.34833 8.23838 4.91235 8.41299L4.91121 8.41668C4.94044 8.42573 4.9568 8.45676 4.94775 8.48599C4.94235 8.50345 4.92868 8.51712 4.91122 8.52253C4.34771 8.69715 3.88142 8.969 3.51235 9.33807C3.14304 9.70738 2.87108 10.174 2.69647 10.7381L2.69277 10.7369C2.68372 10.7662 2.65269 10.7825 2.62346 10.7735C2.606 10.7681 2.59233 10.7544 2.58692 10.7369C2.4123 10.1734 2.14046 9.70713 1.77139 9.33807C1.40207 8.96875 0.935407 8.69679 0.371388 8.52218L0.372531 8.51849C0.3433 8.50944 0.32694 8.47841 0.335989 8.44918C0.341394 8.43172 0.35506 8.41805 0.372517 8.41264C0.93603 8.23802 1.40232 7.96617 1.77139 7.5971C2.1407 7.22779 2.41266 6.76112 2.58727 6.1971L2.59097 6.19825C2.60002 6.16901 2.63105 6.15265 2.66028 6.1617ZM5.99887 0.836213C6.02132 0.843162 6.03889 0.860733 6.04585 0.883177C6.27036 1.60769 6.61988 2.20721 7.09439 2.68173C7.56923 3.15656 8.16923 3.50622 8.8944 3.73072L8.89293 3.73547C8.93051 3.74711 8.95154 3.787 8.93991 3.82459C8.93296 3.84703 8.91539 3.86461 8.89294 3.87156C8.16843 4.09608 7.56891 4.44559 7.09439 4.92011C6.61956 5.39494 6.2699 5.99494 6.0454 6.72011L6.04065 6.71864C6.02902 6.75622 5.98912 6.77726 5.95153 6.76562C5.92909 6.75867 5.91151 6.7411 5.90456 6.71866C5.68004 5.99414 5.33053 5.39462 4.85601 4.92011C4.38118 4.44528 3.78118 4.09561 3.05601 3.87111L3.05748 3.86636C3.0199 3.85473 2.99886 3.81483 3.0105 3.77725C3.01745 3.7548 3.03502 3.73723 3.05746 3.73027C3.78198 3.50576 4.3815 3.15624 4.85601 2.68173C5.33085 2.20689 5.68051 1.60689 5.90501 0.881725L5.90976 0.883196C5.92139 0.845613 5.96129 0.824578 5.99887 0.836213Z"
                fill="white"
              />
            </svg>
          </div>
          <div>
            <h3>Recommended</h3>
          </div>
        </div>
      )}
      <div className="bg-white px-4 pt-2.5 pb-3 rounded-b-lg">
        <h1 className="text-lg font-semibold text-brand-primary">{title}</h1>
        <div>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};
