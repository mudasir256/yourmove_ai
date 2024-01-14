import { Modal } from "./Modal";
import Image1 from "../../assets/images/ai-1.png";
import Image2 from "../../assets/images/ai-2.png";
import Image3 from "../../assets/images/ai-3.png";
import Image4 from "../../assets/images/ai-4.png";
import { Carousel } from "flowbite-react";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const LearnMoreModal = ({ open, setOpen }: Props) => {
  const images = [Image1, Image2, Image3, Image4];
  return (
    <Modal open={open} setOpen={setOpen}>
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
        <div className="flex items-center justify-center -mt-3">
          <h1 className="text-2xl font-semibold">AI Enhanced Photos</h1>
        </div>
        <div className="flex items-center justify-center mt-2 text-center">
          <p className="text-xl">
            Professional-looking photos at a fraction of the cost.
          </p>
        </div>
        <div className="flex items-center justify-center my-4 h-72">
          <Carousel>
            {images.map((image) => {
              return <img alt="..." src={image} />;
            })}
          </Carousel>
        </div>
        <div className="mt-8">
          <button
            type="button"
            onClick={() => alert("123")}
            className="mt-2 flex items-center justify-center w-full bg-brand-primary text-white py-3 rounded-full font-semibold"
          >
            Enhance my photos now
          </button>
        </div>
      </div>
    </Modal>
  );
};
