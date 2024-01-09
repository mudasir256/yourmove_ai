import { Link, useLocation } from "react-router-dom";

const NAV_ITEMS = [
  {
    title: "Chat Assistant",
    link: "/chat-assistant",
    icon: (
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7.16667 4.66675H21.1667C22.7775 4.66675 24.0833 5.97258 24.0833 7.58341V23.0417L20.3679 21.4937C19.5859 21.1678 18.7472 21.0001 17.9 21.0001H7.16667C5.55584 21.0001 4.25 19.6942 4.25 18.0834V7.58341C4.25 5.97258 5.55584 4.66675 7.16667 4.66675ZM2.5 7.58341C2.5 5.00609 4.58934 2.91675 7.16667 2.91675H21.1667C23.744 2.91675 25.8333 5.00609 25.8333 7.58341V23.9167C25.8333 24.7493 24.9864 25.3139 24.2179 24.9937L19.6949 23.1091C19.1261 22.8721 18.5161 22.7501 17.9 22.7501H7.16667C4.58934 22.7501 2.5 20.6607 2.5 18.0834V7.58341ZM17.4115 7.41112C17.7375 5.98621 15.9978 5.02109 14.9615 6.05194L8.71828 12.2621C7.79583 13.1797 8.44564 14.7544 9.74674 14.7544H11.6727L10.7429 18.1408C10.3507 19.5696 12.092 20.605 13.16 19.5781L19.5623 13.4219C20.5088 12.5118 19.8646 10.9124 18.5515 10.9124H16.6104L17.4115 7.41112ZM10.4535 13.0044L15.4807 8.00378L14.8229 10.8788C14.614 11.7919 15.3078 12.6624 16.2445 12.6624H17.8274L12.7111 17.582L13.4615 14.8488C13.7164 13.9205 13.0179 13.0044 12.0553 13.0044H10.4535Z"
      />
    ),
  },
  {
    title: "Profile Writer",
    link: "/profile-writer",
    icon: (
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M17.9999 9.33325C17.9999 11.2662 16.4329 12.8333 14.4999 12.8333C12.5669 12.8333 10.9999 11.2662 10.9999 9.33325C10.9999 7.40026 12.5669 5.83325 14.4999 5.83325C16.4329 5.83325 17.9999 7.40026 17.9999 9.33325ZM19.7499 9.33325C19.7499 12.2327 17.3994 14.5833 14.4999 14.5833C11.6004 14.5833 9.24992 12.2327 9.24992 9.33325C9.24992 6.43376 11.6004 4.08325 14.4999 4.08325C17.3994 4.08325 19.7499 6.43376 19.7499 9.33325ZM17.2758 16.2018C17.7642 16.3652 17.9689 16.9237 17.7545 17.392C17.5402 17.8602 16.9878 18.0593 16.4949 17.9101C15.757 17.6867 14.9845 17.5882 14.2098 17.6209C13.1235 17.6668 12.0635 17.9692 11.1166 18.5036C10.1697 19.0379 9.36281 19.7888 8.76196 20.695C8.33343 21.3412 8.0184 22.0533 7.82809 22.8005C7.70098 23.2995 7.24497 23.6694 6.73333 23.6108C6.2217 23.5523 5.84945 23.0883 5.9621 22.5858C6.19506 21.5467 6.61634 20.5562 7.20771 19.6644C7.97131 18.5128 8.99678 17.5584 10.2002 16.8794C11.4036 16.2004 12.7507 15.816 14.1312 15.7577C15.2003 15.7126 16.266 15.864 17.2758 16.2018ZM23.6313 17.3068L22.5583 16.2338L22.0149 16.7773L23.0879 17.8503L23.6313 17.3068ZM21.8504 19.0877L20.7774 18.0147L18.003 20.7891L18.0018 21.8634L19.076 21.8621L21.8504 19.0877ZM23.3833 14.5839C22.9277 14.1283 22.189 14.1283 21.7334 14.5839L16.595 19.7223C16.3766 19.9407 16.2537 20.2369 16.2533 20.5459L16.2511 22.446C16.2503 23.0914 16.7737 23.6148 17.4191 23.6141L19.3193 23.6118C19.6282 23.6115 19.9244 23.4886 20.1429 23.2701L25.2812 18.1318C25.7369 17.6761 25.7369 16.9375 25.2812 16.4818L23.3833 14.5839Z"
      />
    ),
  },
  {
    title: "Profile Reviewer",
    link: "/profile-review",
    icon: (
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7.83317 5.25H21.8332C23.444 5.25 24.7498 6.55584 24.7498 8.16667V18.6667C24.7498 20.2775 23.444 21.5833 21.8332 21.5833H20.6428C19.1111 21.5833 17.6299 22.1313 16.4669 23.1281L15.2128 24.2031C14.9943 24.3903 14.672 24.3903 14.4535 24.2031L13.1994 23.1281C12.0365 22.1313 10.5553 21.5833 9.02352 21.5833H7.83317C6.22234 21.5833 4.9165 20.2775 4.9165 18.6667V8.16667C4.9165 6.55584 6.22234 5.25 7.83317 5.25ZM3.1665 8.16667C3.1665 5.58934 5.25584 3.5 7.83317 3.5H21.8332C24.4105 3.5 26.4998 5.58934 26.4998 8.16667V18.6667C26.4998 21.244 24.4105 23.3333 21.8332 23.3333H20.6428C19.5288 23.3333 18.4516 23.7318 17.6058 24.4568L16.3517 25.5318C15.4779 26.2807 14.1885 26.2807 13.3147 25.5318L12.0606 24.4568C11.2147 23.7318 10.1375 23.3333 9.02352 23.3333H7.83317C5.25584 23.3333 3.1665 21.244 3.1665 18.6667V8.16667ZM16.2106 8.29796C15.7567 6.99193 13.9096 6.99194 13.4557 8.29796L12.5608 10.8724L9.83575 10.928C8.45336 10.9561 7.8826 12.7128 8.98442 13.5481L11.1564 15.1948L10.3671 17.8036C9.96671 19.127 11.461 20.2127 12.5959 19.4229L14.8331 17.8661L17.0704 19.4229C18.2053 20.2127 19.6996 19.127 19.2992 17.8036L18.5099 15.1948L20.6819 13.5481C21.7837 12.7128 21.2129 10.9561 19.8305 10.928L17.1055 10.8724L16.2106 8.29796ZM14.1471 11.6387L14.8331 9.66511L15.5192 11.6387C15.7194 12.2149 16.2571 12.6055 16.867 12.6179L18.956 12.6605L17.2909 13.9229C16.8049 14.2914 16.5995 14.9234 16.7761 15.5073L17.3812 17.5072L15.6661 16.3137C15.1655 15.9653 14.5008 15.9653 14.0002 16.3137L12.2851 17.5072L12.8902 15.5073C13.0668 14.9234 12.8614 14.2914 12.3754 13.9229L10.7103 12.6605L12.7993 12.6179C13.4092 12.6055 13.9468 12.2149 14.1471 11.6387Z"
      />
    ),
  },
];

export const BottomNav = () => {
  const location = useLocation();

  return (
    <div className="fixed inset-x-0 bottom-0 bg-white shadow-md border-t">
      <nav className="flex sticky justify-around items-center h-16 max-w-xl mx-auto">
        {NAV_ITEMS.map((navItem) => {
          return (
            <Link to={navItem.link} className="cursor-pointer">
              <div className="">
                <div className="flex items-center justify-center">
                  <svg
                    width="29"
                    height="28"
                    viewBox="0 0 29 28"
                    fill={
                      location.pathname == navItem.link ? "black" : "#999999"
                    }
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {navItem.icon}
                  </svg>
                </div>
                <div className="flex items-center justify-center mt-0.5">
                  <span
                    className="text-sm"
                    style={{
                      color:
                        location.pathname == navItem.link ? "black" : "#999999",
                    }}
                  >
                    {navItem.title}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
