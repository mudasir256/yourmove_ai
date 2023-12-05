import toast from "react-hot-toast";
import { MessageAuthorType } from "../../constants/chat";
import { Message as MessageModel } from "../../models/chat";

interface Props {
  message: MessageModel;
}

export const Message = ({ message }: Props) => {
  return (
    <div
      className={`mb-4 relative flex ${
        message.author === MessageAuthorType.User ? "pr-4" : "pl-4"
      }`}
    >
      <div
        className={`absolute ${
          message.author === MessageAuthorType.Generated
            ? "left-0 ml-2 bg-white"
            : "right-0 mr-2 bg-brand-primary z-10"
        } top-1/2 transform -translate-y-1/2 w-4 h-4 rotate-45`}
      ></div>
      <div
        className={`w-full px-4 py-3 rounded-md z-50 relative ${
          message.author === MessageAuthorType.User
            ? "bg-brand-primary"
            : "bg-white"
        }`}
      >
        {message.content}
      </div>
      {message.author == MessageAuthorType.Generated && (
        <div className="ml-3 flex items-center cursor-pointer">
          <svg
            onClick={() => {
              navigator.clipboard.writeText(message.content);
              toast.success("Message copied to clipboard");
            }}
            width="24"
            height="24"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M17 12.7324C17.5978 12.3866 18 11.7403 18 11V2C18 0.895431 17.1046 0 16 0H7C6.25972 0 5.61337 0.402199 5.26756 1C5.09739 1.29417 5 1.63571 5 2V3H7V2H16V11H15V13H16C16.3643 13 16.7058 12.9026 17 12.7324ZM2 5C0.895431 5 0 5.89543 0 7V16C0 17.1046 0.89543 18 2 18H11C12.1046 18 13 17.1046 13 16V7C13 5.89543 12.1046 5 11 5H2ZM11 7H2L2 16H11V7Z"
              fill="#999999"
            />
          </svg>
        </div>
      )}
    </div>
  );
};
