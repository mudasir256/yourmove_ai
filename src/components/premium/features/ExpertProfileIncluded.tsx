import { ChevronDownIcon } from "@heroicons/react/24/outline";

export const ExpertProfileIncluded = () => {
  return (
    <>
      {/* Premium Brainpower */}
      <div className="border-2 border-black rounded-lg bg-white mb-4">
        <div className="p-4">
          <h2 className="text-2xl font-semibold text-brand-primary">
            Expert Profile Included
          </h2>
          <p>Our AI profile maximize right swipes.</p>
        </div>
        <div className="bg-brand-primary py-8 px-16 h-52 overflow-y-hidden">
          <div className="bg-white rounded-t-lg p-4">
            <div className="border border-stone-400 rounded-lg px-3 py-1 flex">
              <div className="w-3/4">
                <h3>I'm known for</h3>
              </div>
              <div className="w-1/4 flex items-center justify-end">
                <ChevronDownIcon className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4">
              <h1 className="text-2xl font-semibold">
                Being a sports fanatic, devouring delicious food, and always
                having a squad of awesome friends by my side. Basically, I'm the
                triple threat you never knew you needed
              </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
