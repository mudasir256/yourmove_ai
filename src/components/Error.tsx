export const Error = () => {
  return (
    <div className="relative h-screen">
      <div>
        <div className="mt-6">
          <div className="mt-10">
            <h1 className="text-5xl font-bold">Sorry</h1>
            <div className="mt-8">
              <p className="text-2xl">
                Our AI encountered an error. Please wait a few minutes and try
                again.
              </p>
            </div>

            <div className="mt-6">
              <button
                type="button"
                className="mt-4 flex items-center justify-center w-full bg-brand-primary text-white py-3 rounded-full font-semibold -mb-1 border border-transparent"
              >
                create my profile
              </button>
              <button
                type="button"
                className="mt-4 flex items-center justify-center w-full bg-white text-black py-3 rounded-full font-semibold -mb-1 border border-black"
              >
                leave feedback
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
