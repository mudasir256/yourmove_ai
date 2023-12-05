import { Gender } from "../../../constants/chat";
import { useChatStore } from "../../../stores/chat";

export const GenderSelector = () => {
  const { selectedGender, setSelectedGender } = useChatStore();
  return (
    <div className={`flex flex-wrap`}>
      {Object.values(Gender).map((gender, index) => (
        <div
          key={index}
          onClick={() => setSelectedGender(gender as Gender)}
          className={`border min-w-1/4 mr-3 py-1 mb-2 flex-none border px-2 rounded-full flex items-center ${
            selectedGender == gender
              ? "border-brand-primary bg-brand-primary/30 text-brand-primary font-semibold"
              : "border-black bg-white"
          }`}
        >
          {gender}
        </div>
      ))}
    </div>
  );
};
