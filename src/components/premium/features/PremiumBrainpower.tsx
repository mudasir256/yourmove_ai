export const PremiumBrainpower = () => {
  const RESPONSES = [
    "I'm part dolphin for my love of deep chats, and part patner for my mysterious, graceful vibe. Your turn!",
    "I'm a mix of a clever fox and a showy peacock. What about you, wild or tame?",
    "I'm a bold lion and a chill koala. Fierce yet cuddly. How about you?",
  ];
  return (
    <>
      {/* Premium Brainpower */}
      <div className="border-2 border-black rounded-lg bg-white mb-4">
        <div className="p-4">
          <h2 className="text-2xl font-semibold text-brand-primary">
            Premium Brainpower
          </h2>
          <p>Fine-tuned on human conversations.</p>
        </div>
        <div className="bg-brand-primary py-8 px-16">
          <div>
            <h4 className="text-white font-semibold">
              "Hey, tell me 2 animals that match your vibe"
            </h4>
            {RESPONSES.map((response: string) => (
              <div className="bg-white my-2 p-4 rounded-lg flex">
                <div>{response}</div>
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-6 w-6 text-stone-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
                    />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
