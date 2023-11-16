import { Toaster } from "react-hot-toast";
import { Wizard } from "./components/wizard/Wizard";
import { useWizardStore } from "./stores/wizard";
import { PaymentPlans } from "./components/payment/PaymentPlans";
import { PaymentForm } from "./components/payment/PaymentForm";
import { Loading } from "./components/Loading";
import { Error } from "./components/Error";
import { Profile } from "./components/profile/Profile";

function App() {
  const { wizardComplete } = useWizardStore();
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <Toaster />
      <div className="mx-auto max-w-xl">
        <div className="flex">
          <div className="w-1/2">
            <svg
              width="36"
              height="31"
              viewBox="0 0 36 31"
              className="fill-zinc-400"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M19.0136 0.0926825C19.5623 0.0926825 20.111 0.0926825 20.6597 0.0926825C20.6603 0.122794 20.6609 0.152905 20.6615 0.183017C20.5123 0.194081 20.3631 0.205145 20.2139 0.216209C20.2188 0.202773 20.2237 0.189337 20.2286 0.175901C21.5261 0.409949 22.8285 0.623657 24.1191 0.887218C24.7039 1.00664 25.2715 1.20947 25.836 1.40228C26.6102 1.66675 27.3818 1.9409 28.1384 2.24571C28.4314 2.36379 28.6805 2.57674 28.9494 2.74674C29.544 3.12262 30.1686 3.46399 30.7251 3.88362C31.3891 4.38424 32.0086 4.93886 32.6191 5.49686C32.877 5.73257 33.0653 6.035 33.281 6.30996C33.7424 6.89793 34.2606 7.45646 34.642 8.08668C34.9506 8.59667 35.0945 9.19342 35.3089 9.75252C35.6581 10.663 35.8772 11.5991 35.9286 12.5662C35.9584 13.1258 36.0191 13.6874 35.9941 14.2454C35.9296 15.6897 35.5959 17.0831 35.0934 18.4551C34.7348 19.4339 34.2184 20.3198 33.5951 21.1572C33.303 21.5497 32.9323 21.8925 32.588 22.2501C32.2668 22.584 31.9581 22.9336 31.5994 23.2296C31.0763 23.6614 30.5334 24.0778 29.9631 24.4536C28.9182 25.1424 27.7394 25.5995 26.594 26.1214C25.55 26.5971 24.4657 26.9206 23.358 27.1816C22.4422 27.3974 21.4896 27.4735 20.5617 27.6499C19.1663 27.9153 17.7559 27.8603 16.3509 27.8372C15.2213 27.8185 14.0847 27.7738 12.9858 27.4658C12.866 27.4322 12.7116 27.4276 12.597 27.468C11.2172 27.9544 9.83595 28.4378 8.46882 28.9536C7.97897 29.1384 7.54016 29.4391 7.05311 29.6323C6.32515 29.921 5.57575 30.1631 4.83428 30.422C4.3031 30.6075 3.76997 30.7882 3.15334 31C3.24919 30.6006 3.33376 30.2619 3.41139 29.9218C3.57605 29.2006 3.72439 28.4759 3.90252 27.7576C4.1897 26.5996 4.49183 25.4447 4.79659 24.2906C4.85844 24.0564 4.68032 23.9022 4.57278 23.7665C4.01451 23.0623 3.45216 22.3556 2.82315 21.707C2.25722 21.1235 1.81862 20.4713 1.42532 19.791C0.78126 18.6769 0.346564 17.4789 0.16073 16.2324C0.0142026 15.2496 -0.0210685 14.2423 0.0108321 13.2492C0.0445103 12.2007 0.259799 11.1629 0.678107 10.1777C0.93352 9.57617 1.21426 8.98372 1.49372 8.39131C1.92061 7.48635 2.65986 6.7844 3.31487 6.03348C3.86864 5.39864 4.488 4.81144 5.10432 4.22693C5.3491 3.99479 5.66559 3.82877 5.94649 3.62906C6.48127 3.24886 6.99548 2.84027 7.55411 2.49364C7.91244 2.2713 8.33472 2.13827 8.72873 1.96599C9.1177 1.79591 9.49964 1.60905 9.89862 1.46249C10.2699 1.32611 10.6558 1.22011 11.0418 1.12357C12.0374 0.874561 13.0367 0.638178 13.9992 0.405289C14.0156 0.416001 13.9746 0.389231 13.8894 0.333673C14.1441 0.364203 14.3479 0.388629 14.5517 0.413055C14.5549 0.394028 14.5581 0.375001 14.5613 0.355973C14.477 0.342983 14.3927 0.329992 14.3084 0.317001C14.3113 0.298772 14.3142 0.280542 14.3171 0.262312C14.5587 0.2894 14.8003 0.316488 15.0418 0.343575C15.0453 0.329961 15.0489 0.316347 15.0524 0.302733C14.973 0.279844 14.8937 0.256954 14.8144 0.234064C14.8155 0.205464 14.8165 0.176863 14.8176 0.148262C16.087 0.0980659 17.3563 0.0462835 18.6258 0.000353929C18.7411 -0.00381454 18.8578 0.029649 18.9583 0.0580137C18.2807 0.0703906 17.6187 0.0703906 16.9567 0.0703906C16.9571 0.0778212 16.9576 0.0852518 16.958 0.0926825C17.6432 0.0926825 18.3284 0.0926825 19.0136 0.0926825ZM10.4302 17.0048C10.5588 17.1244 10.7093 17.2297 10.8122 17.3661C11.3276 18.0496 12.0704 18.5088 12.7161 19.0633C13.1693 19.4524 13.6344 19.8294 14.0926 20.2135C14.3637 20.4408 14.6229 20.6814 14.903 20.8986C15.3995 21.2838 15.9155 21.6472 16.4088 22.0358C16.8719 22.4007 17.3178 22.7847 17.7678 23.1638C17.8964 23.2722 18.0078 23.3153 18.1539 23.1819C18.3992 22.9578 18.6443 22.7308 18.9119 22.5311C19.5516 22.0538 20.2181 21.607 20.8479 21.1189C21.3955 20.6945 21.906 20.2288 22.4359 19.7845C22.8634 19.4262 23.3048 19.0817 23.7229 18.7143C24.1579 18.3319 24.5871 17.9419 24.9917 17.532C25.3853 17.1332 25.7427 16.7035 26.1195 16.2901C26.4074 15.9743 26.7617 15.6957 26.9811 15.3436C28.0069 13.6975 28.3637 11.9607 27.6317 10.1216C27.3574 9.43273 26.9641 8.78055 26.3381 8.33559C25.6899 7.87479 25.0057 7.41572 24.1486 7.32149C23.4625 7.24607 22.7752 7.18091 22.0881 7.1142C22.0172 7.10732 21.9387 7.1063 21.8728 7.1274C21.48 7.25333 21.0761 7.35932 20.702 7.52361C20.1214 7.77863 19.5338 8.03625 19.0025 8.36696C18.6227 8.60327 18.3303 8.96121 18.0105 9.25424C17.5739 8.90561 17.1402 8.55216 16.6983 8.20794C15.7791 7.49204 14.6894 7.19361 13.519 7.11863C13.2482 7.10128 12.9652 7.13022 12.6996 7.18603C12.0693 7.31844 11.412 7.40893 10.8303 7.65121C10.3441 7.85376 9.88166 8.1331 9.47478 8.51208C8.83644 9.10664 8.46966 9.80285 8.2081 10.5764C7.95138 11.3355 7.94448 12.104 8.06216 12.8871C8.17847 13.6611 8.39193 14.4077 8.85541 15.0562C9.32884 15.7186 9.87804 16.334 10.4302 17.0048Z" />
              <path d="M19.0136 0.0926825C19.5623 0.0926825 20.111 0.0926825 20.6597 0.0926825C20.6603 0.122794 20.6609 0.152905 20.6615 0.183017C20.5123 0.194081 20.3631 0.205145 20.2139 0.216209C20.2188 0.202773 20.2237 0.189337 20.2286 0.175901C21.5261 0.409949 22.8285 0.623657 24.1191 0.887218C24.7039 1.00664 25.2715 1.20947 25.836 1.40228C26.6102 1.66675 27.3818 1.9409 28.1384 2.24571C28.4314 2.36379 28.6805 2.57674 28.9494 2.74674C29.544 3.12262 30.1686 3.46399 30.7251 3.88362C31.3891 4.38424 32.0086 4.93886 32.6191 5.49686C32.877 5.73257 33.0653 6.035 33.281 6.30996C33.7424 6.89793 34.2606 7.45646 34.642 8.08668C34.9506 8.59667 35.0945 9.19342 35.3089 9.75252C35.6581 10.663 35.8772 11.5991 35.9286 12.5662C35.9584 13.1258 36.0191 13.6874 35.9941 14.2454C35.9296 15.6897 35.5959 17.0831 35.0934 18.4551C34.7348 19.4339 34.2184 20.3198 33.5951 21.1572C33.303 21.5497 32.9323 21.8925 32.588 22.2501C32.2668 22.584 31.9581 22.9336 31.5994 23.2296C31.0763 23.6614 30.5334 24.0778 29.9631 24.4536C28.9182 25.1424 27.7394 25.5995 26.594 26.1214C25.55 26.5971 24.4657 26.9206 23.358 27.1816C22.4422 27.3974 21.4896 27.4735 20.5617 27.6499C19.1663 27.9153 17.7559 27.8603 16.3509 27.8372C15.2213 27.8185 14.0847 27.7738 12.9858 27.4658C12.866 27.4322 12.7116 27.4276 12.597 27.468C11.2172 27.9544 9.83595 28.4378 8.46882 28.9536C7.97897 29.1384 7.54016 29.4391 7.05311 29.6323C6.32515 29.921 5.57575 30.1631 4.83428 30.422C4.3031 30.6075 3.76997 30.7882 3.15334 31C3.24919 30.6006 3.33376 30.2619 3.41139 29.9218C3.57605 29.2006 3.72439 28.4759 3.90252 27.7576C4.1897 26.5996 4.49183 25.4447 4.79659 24.2906C4.85844 24.0564 4.68032 23.9022 4.57278 23.7665C4.01451 23.0623 3.45216 22.3556 2.82315 21.707C2.25722 21.1235 1.81862 20.4713 1.42532 19.791C0.78126 18.6769 0.346564 17.4789 0.16073 16.2324C0.0142026 15.2496 -0.0210685 14.2423 0.0108321 13.2492C0.0445103 12.2007 0.259799 11.1629 0.678107 10.1777C0.93352 9.57617 1.21426 8.98372 1.49372 8.39131C1.92061 7.48635 2.65986 6.7844 3.31487 6.03348C3.86864 5.39864 4.488 4.81144 5.10432 4.22693C5.3491 3.99479 5.66559 3.82877 5.94649 3.62906C6.48127 3.24886 6.99548 2.84027 7.55411 2.49364C7.91244 2.2713 8.33472 2.13827 8.72873 1.96599C9.1177 1.79591 9.49964 1.60905 9.89862 1.46249C10.2699 1.32611 10.6558 1.22011 11.0418 1.12357C12.0374 0.874561 13.0367 0.638178 13.9992 0.405289C14.0156 0.416001 13.9746 0.389231 13.8894 0.333673C14.1441 0.364203 14.3479 0.388629 14.5517 0.413055C14.5549 0.394028 14.5581 0.375001 14.5613 0.355973C14.477 0.342983 14.3927 0.329992 14.3084 0.317001C14.3113 0.298772 14.3142 0.280542 14.3171 0.262312C14.5587 0.2894 14.8003 0.316488 15.0418 0.343575C15.0453 0.329961 15.0489 0.316347 15.0524 0.302733C14.973 0.279844 14.8937 0.256954 14.8144 0.234064C14.8155 0.205464 14.8165 0.176863 14.8176 0.148262C16.087 0.0980659 17.3563 0.0462835 18.6258 0.000353929C18.7411 -0.00381454 18.8578 0.029649 18.9583 0.0580137C18.2807 0.0703906 17.6187 0.0703906 16.9567 0.0703906C16.9571 0.0778212 16.9576 0.0852518 16.958 0.0926825C17.6432 0.0926825 18.3284 0.0926825 19.0136 0.0926825ZM10.4302 17.0048C10.5588 17.1244 10.7093 17.2297 10.8122 17.3661C11.3276 18.0496 12.0704 18.5088 12.7161 19.0633C13.1693 19.4524 13.6344 19.8294 14.0926 20.2135C14.3637 20.4408 14.6229 20.6814 14.903 20.8986C15.3995 21.2838 15.9155 21.6472 16.4088 22.0358C16.8719 22.4007 17.3178 22.7847 17.7678 23.1638C17.8964 23.2722 18.0078 23.3153 18.1539 23.1819C18.3992 22.9578 18.6443 22.7308 18.9119 22.5311C19.5516 22.0538 20.2181 21.607 20.8479 21.1189C21.3955 20.6945 21.906 20.2288 22.4359 19.7845C22.8634 19.4262 23.3048 19.0817 23.7229 18.7143C24.1579 18.3319 24.5871 17.9419 24.9917 17.532C25.3853 17.1332 25.7427 16.7035 26.1195 16.2901C26.4074 15.9743 26.7617 15.6957 26.9811 15.3436C28.0069 13.6975 28.3637 11.9607 27.6317 10.1216C27.3574 9.43273 26.9641 8.78055 26.3381 8.33559C25.6899 7.87479 25.0057 7.41572 24.1486 7.32149C23.4625 7.24607 22.7752 7.18091 22.0881 7.1142C22.0172 7.10732 21.9387 7.1063 21.8728 7.1274C21.48 7.25333 21.0761 7.35932 20.702 7.52361C20.1214 7.77863 19.5338 8.03625 19.0025 8.36696C18.6227 8.60327 18.3303 8.96121 18.0105 9.25424C17.5739 8.90561 17.1402 8.55216 16.6983 8.20794C15.7791 7.49204 14.6894 7.19361 13.519 7.11863C13.2482 7.10128 12.9652 7.13022 12.6996 7.18603C12.0693 7.31844 11.412 7.40893 10.8303 7.65121C10.3441 7.85376 9.88166 8.1331 9.47478 8.51208C8.83644 9.10664 8.46966 9.80285 8.2081 10.5764C7.95138 11.3355 7.94448 12.104 8.06216 12.8871C8.17847 13.6611 8.39193 14.4077 8.85541 15.0562C9.32884 15.7186 9.87804 16.334 10.4302 17.0048Z" />
            </svg>
          </div>
          <div className="flex flex-row-reverse w-1/2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              className="w-8 h-8 stroke-zinc-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
              />
            </svg>
          </div>
        </div>
        {wizardComplete ? <Profile /> : <Wizard />}
      </div>
    </div>
  );
}

export default App;
