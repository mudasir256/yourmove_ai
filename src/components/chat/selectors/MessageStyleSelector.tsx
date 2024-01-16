import { MessageStyle } from "../../../constants/chat";
import { useChatStore } from "../../../stores/chat";

interface Props {
  wrap?: boolean;
  hideSettings?: boolean;
}

export const MessageStyleSelector = ({ wrap, hideSettings }: Props) => {
  const {
    selectedMessageStyle,
    setSelectedMessageStyle,
    setSettingsModalOpen,
  } = useChatStore();
  return (
    <div className={`flex ${wrap ? "flex-wrap" : "overflow-x-auto"}`}>
      {!hideSettings && (
        <div
          className="p-2 mb-2 bg-white mr-3 border border-black rounded-full cursor-pointer"
          onClick={() => setSettingsModalOpen(true)}
        >
          <svg
            width="20"
            height="21"
            viewBox="0 0 20 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.4165 7.16675C5.4165 7.8571 4.85686 8.41675 4.1665 8.41675C3.47615 8.41675 2.9165 7.8571 2.9165 7.16675C2.9165 6.47639 3.47615 5.91675 4.1665 5.91675C4.85686 5.91675 5.4165 6.47639 5.4165 7.16675ZM6.58774 7.79175C6.31022 8.87002 5.3314 9.66675 4.1665 9.66675C2.78579 9.66675 1.6665 8.54746 1.6665 7.16675C1.6665 5.78604 2.78579 4.66675 4.1665 4.66675C5.3314 4.66675 6.31022 5.46348 6.58774 6.54175H17.7082C18.0534 6.54175 18.3332 6.82157 18.3332 7.16675C18.3332 7.51193 18.0534 7.79175 17.7082 7.79175H6.58774ZM2.2915 13.2084C1.94633 13.2084 1.6665 13.4882 1.6665 13.8334C1.6665 14.1786 1.94633 14.4584 2.2915 14.4584H13.4119C13.6895 15.5367 14.6683 16.3334 15.8332 16.3334C17.2139 16.3334 18.3332 15.2141 18.3332 13.8334C18.3332 12.4527 17.2139 11.3334 15.8332 11.3334C14.6683 11.3334 13.6895 12.1301 13.4119 13.2084H2.2915ZM15.8332 15.0834C16.5235 15.0834 17.0832 14.5238 17.0832 13.8334C17.0832 13.1431 16.5235 12.5834 15.8332 12.5834C15.1428 12.5834 14.5832 13.1431 14.5832 13.8334C14.5832 14.5238 15.1428 15.0834 15.8332 15.0834Z"
              fill="black"
            />
          </svg>
        </div>
      )}
      {Object.values(MessageStyle).map((messageStyle, index) => (
        <div
          key={index}
          onClick={() => setSelectedMessageStyle(messageStyle as MessageStyle)}
          className={`border min-w-1/4 mr-3 py-1 mb-2 flex-none border px-2 rounded-full flex items-center cursor-pointer ${
            selectedMessageStyle == messageStyle
              ? "border-brand-primary bg-brand-primary/30 text-brand-primary font-semibold"
              : "border-black bg-white"
          }`}
        >
          {messageStyle}
        </div>
      ))}
    </div>
  );
};
