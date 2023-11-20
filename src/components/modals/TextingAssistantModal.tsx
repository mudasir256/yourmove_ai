import { useEffect, useRef, useState } from "react";
import { Field, Formik } from "formik";
import * as yup from "yup";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const TextingAssistantModal = ({ open, setOpen }: Props) => {
  return (
    <>
      {open ? (
        <div className="h-screen w-full left-0 top-0 flex items-center justify-center z-50 backdrop-blur-sm fixed z-50">
          <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6 border-2 border-black w-full z-50 mx-8">
            <div className="w-full">
              <div className="w-full flex justify-end">
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
              <div className="flex items-center justify-center mt-4">
                <h1 className="text-2xl font-semibold text-center">
                  Dating app conversations are exhausting
                </h1>
              </div>
              <div className="flex items-center justify-center mt-4">
                <p>
                  YourMove AI makes it easier. So you can spend less time
                  texting and more time dating
                </p>
              </div>
              <div className="mt-4 flex">
                <div className="w-1/2">
                  <img src="https://firstpaloalto.com/wp-content/uploads/2020/02/apple-store-logo-png-1-transparent.png" />
                </div>
                <div className="w-1/2 flex border-2 border-black mt-1.5 mb-2 ml-3 items-center justify-center rounded-md">
                  <span className="font-semibold">Try it out</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    className="w-5 h-5 ml-2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};