import toast from "react-hot-toast";
import { ProfileResponse } from "../../models/profile";
import ListBox from "../ListBox";

interface Props {
  lockItem: boolean;
  profileResponse: ProfileResponse;
}

export const ProfileItem = ({ lockItem, profileResponse }: Props) => {
  return (
    <div className="bg-white mb-4 shadow-md rounded-md p-4 relative">
      {lockItem && (
        <div className="-m-4 absolute h-full w-full z-50 flex flex items-center justify-center backdrop-blur-md rounded-md">
          <button className="cursor-pointer border border-black bg-white mx-10 py-2 text-lg font-semibold w-full flex items-center justify-center shadow-lg rounded-md">
            Unlock Full Profile
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2.5"
              stroke="currentColor"
              className="w-5 h-5 ml-3"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
          </button>
        </div>
      )}
      <div className="mb-4">
        <ListBox />
      </div>
      <p className="text-xl font-medium">{profileResponse.answer}</p>
      <div className="flex flex-row-reverse mt-4">
        <button
          type="button"
          className="bg-brand-primary p-2 rounded-full"
          onClick={() => {
            navigator.clipboard.writeText(profileResponse.answer);
            toast.success("Answer copied to clipboard");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-5 w-5 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
            />
          </svg>
        </button>
        <button type="button" className="bg-zinc-200 p-2 rounded-full mr-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
