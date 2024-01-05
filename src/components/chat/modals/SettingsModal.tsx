import { Switch } from "@headlessui/react";
import { Modal } from "../../modals/Modal";
import { GenderSelector } from "../selectors/GenderSelector";
import { MessageStyleSelector } from "../selectors/MessageStyleSelector";
import { useChatStore } from "../../../stores/chat";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const SettingsModal = ({ open, setOpen }: Props) => {
  const { curiosityModeEnabled, setCuriosityModeEnabled } = useChatStore();
  return (
    <Modal open={open} setOpen={setOpen} backgroundColor="#ffffff">
      <div className="w-full px-2 z-50">
        <div className="flex mb-6">
          <div className="w-1/3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="3.5"
              stroke="currentColor"
              onClick={() => setOpen(false)}
              className="w-6 h-6 text-zinc-400 cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <div className="w-1/3 flex items-center justify-center">
            <h1 className="text-xl font-bold">Settings</h1>
          </div>
        </div>

        <div className="mt-2">
          <div className="mb-2">
            <h3 className="font-bold">Style</h3>
          </div>
          <MessageStyleSelector wrap={true} hideSettings={true} />
        </div>

        <div className="mt-5">
          <div className="mb-2">
            <h3 className="font-bold">Gender</h3>
          </div>
          <GenderSelector />
        </div>

        <div className="my-5">
          <div className="mb-2 flex">
            <div className="w-3/4">
              <h3 className="font-bold">Curiosity Mode</h3>
              <div className="mt-1">
                <p className="text-gray-500 leading-5">
                  Add more question to the replies - keeps the conversation
                  rolling.
                </p>
              </div>
            </div>
            <div className="w-1/4 flex justify-end mt-1">
              <Switch
                checked={curiosityModeEnabled}
                onChange={setCuriosityModeEnabled}
                className={`${
                  curiosityModeEnabled ? "bg-brand-primary" : "bg-gray-200"
                } relative inline-flex h-6 w-11 items-center rounded-full`}
              >
                <span className="sr-only">Enable notifications</span>
                <span
                  className={`${
                    curiosityModeEnabled ? "translate-x-6" : "translate-x-1"
                  } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                />
              </Switch>
            </div>
          </div>
        </div>

        <div
          onClick={() => setOpen(false)}
          className="bg-brand-primary w-full py-2 font-bold text-white text-lg flex items-center justify-center rounded-lg"
        >
          Save
        </div>
      </div>
    </Modal>
  );
};
