import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { ProfileResponse, Prompt } from "../models/profile";
import { useProfileStore } from "../stores/profile";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

interface Props {
  prompts: Array<Prompt>;
  promptSelected: string;
  onChange: (promptText: string) => void;
}

export const PromptsListBox = ({
  prompts,
  promptSelected,
  onChange,
}: Props) => {
  const { profile } = useProfileStore();
  const [selected, setSelected] = useState<Prompt>();

  // Prompts returned in the profile
  const [profilePrompts, setProfilePrompts] = useState<Array<string>>([]);

  // For setting profile prompts
  useEffect(() => {
    setProfilePrompts(
      profile.map((profile: ProfileResponse) => profile.prompt)
    );
  }, [profile]);

  // For setting the selected prompt
  useEffect(() => {
    if (prompts) {
      setSelected(
        prompts.find(
          (prompt: Prompt) => prompt.text.toLowerCase() === promptSelected
        )
      );
    }
  }, [prompts]);

  return (
    <>
      {selected && (
        <Listbox
          value={selected}
          onChange={(prompt: Prompt) => onChange(prompt.text)}
        >
          {({ open }) => (
            <>
              <div className="relative mt-2">
                <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-primary sm:text-sm sm:leading-6">
                  <span className="block truncate">{selected.text}</span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>

                <Transition
                  show={open}
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {/* Only show prompts that have been returned, that aren't in the current profile but also the selected profile for this card */}
                    {[
                      selected,
                      ...prompts.filter(
                        (prompt: Prompt) =>
                          !profilePrompts.includes(prompt.text.toLowerCase())
                      ),
                    ].map((prompt: Prompt) => (
                      <Listbox.Option
                        key={prompt.text}
                        className={({ active }) =>
                          classNames(
                            active
                              ? "bg-brand-primary text-white"
                              : "text-gray-900",
                            "relative cursor-default select-none py-2 pl-8 pr-4"
                          )
                        }
                        value={prompt}
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={classNames(
                                selected ? "font-semibold" : "font-normal",
                                "block truncate"
                              )}
                            >
                              {prompt.text}
                            </span>

                            {selected ? (
                              <span
                                className={classNames(
                                  active ? "text-white" : "text-brand-primary",
                                  "absolute inset-y-0 left-0 flex items-center pl-1.5"
                                )}
                              >
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </>
          )}
        </Listbox>
      )}
    </>
  );
};
