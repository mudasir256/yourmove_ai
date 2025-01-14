import toast from "react-hot-toast";
import { MessageAuthorType } from "../../constants/chat";
import { Message as MessageModel } from "../../models/chat";

interface Props {
  message: MessageModel;
}

export const Message = ({ message }: Props) => {
  return (
    <div
      className={`mb-4 relative flex z-10 ${
        message.author === MessageAuthorType.User ? "" : ""
      }`}
    >
      {message.content && (
        <>
          <div
            className={`w-full px-4 py-3 rounded-tr-lg z-50 relative ${
              message.author === MessageAuthorType.User
                ? "bg-brand-dark text-white rounded-tl-lg rounded-br-lg"
                : "bg-white rounded-l-lg"
            }`}
          >
            {message.author === MessageAuthorType.User && (
              <div className="font-bold text-sm">Their message</div>
            )}
            {message.content}
          </div>
          <div className="absolute bottom-0 right-0 mr-[2.1rem]">
            <svg
              width="10"
              height="16"
              viewBox="0 0 10 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 16V0C0 0 0.5 5.1811 3.87097 10.6667C5.9114 13.9871 10 16 10 16H0Z"
                fill="white"
              />
            </svg>
          </div>
        </>
      )}

      {message.author == MessageAuthorType.Generated && (
        <div className="ml-6 flex items-center cursor-pointer">
          <svg
            onClick={() => {
              navigator.clipboard.writeText(message.content);
              toast.success("Message copied to clipboard");
            }}
            width="20"
            height="20"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M17 12.7324C17.5978 12.3866 18 11.7403 18 11V2C18 0.895431 17.1046 0 16 0H7C6.25972 0 5.61337 0.402199 5.26756 1C5.09739 1.29417 5 1.63571 5 2V3H7V2H16V11H15V13H16C16.3643 13 16.7058 12.9026 17 12.7324ZM2 5C0.895431 5 0 5.89543 0 7V16C0 17.1046 0.89543 18 2 18H11C12.1046 18 13 17.1046 13 16V7C13 5.89543 12.1046 5 11 5H2ZM11 7H2L2 16H11V7Z"
              fill="#999999"
            />
          </svg>
        </div>
      )}
    </div>
  );
};
