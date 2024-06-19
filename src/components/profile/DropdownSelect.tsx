import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { DropDownOption } from "./data";
import LockIcon from "../LockIcon";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

interface Props {
  options: DropDownOption[];
  selected: DropDownOption;
  onDropdownSelected: (value: DropDownOption) => void;
  className?: string
  hasPaid?: boolean
}

export const DropdownSelect = ({
  selected,
  options,
  onDropdownSelected,
  className = undefined,
  hasPaid = false
}: Props) => {
  return (
    <div className={`flex-1 mt-2 ${className}`}>
      <Listbox
        value={selected}
        onChange={onDropdownSelected}
      >
        {({ open }) => (
          <div className="relative">
            <Listbox.Button className="relative w-full h-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-primary sm:text-sm sm:leading-6">
              <span className="block truncate">{selected.title}</span>
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
                {options.map((option, index) => (
                  <Listbox.Option
                    key={index}
                    value={option}
                    className={({ active }) =>
                      classNames(
                        active
                          ? "bg-brand-primary text-white"
                          : "text-gray-900",
                        "relative cursor-default select-none py-2 pl-12 pr-4"
                      )
                    }
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={classNames(
                            selected ? "font-semibold" : "font-normal",
                            "block truncate"
                          )}
                        >
                          {option.title}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-brand-primary",
                              "absolute inset-y-0 left-2 flex items-center pl-1.5"
                            )}
                          >
                            <CheckIcon
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          </span>
                        ) : null}

                        {option.paid && !hasPaid ? (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-brand-primary",
                              "absolute inset-y-0 left-2 flex items-center pl-1.5"
                            )}
                          >
                            <LockIcon className={`${active ? "text-white" : "text-black"}`} />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        )}
      </Listbox>
    </div >
  )
};
