export const AIProfileConsulting = () => {
  return (
    <>
      {/* Premium Brainpower */}
      <div className="border-2 border-black rounded-lg bg-white mb-4">
        <div className="p-4">
          <h2 className="text-2xl font-semibold text-brand-primary">
            AI Profile Consulting
          </h2>
          <p>Expert tips from our AI to boost your profile.</p>
        </div>
        <div className="bg-brand-primary py-8 px-16 h-80 overflow-y-hidden">
          <h1 className="text-white text-2xl font-semibold mb-2">
            Your Review
          </h1>
          <div className="bg-white rounded-t-lg p-4">
            <div>
              <p>
                <strong>Rating:</strong> Overall, I would rate this profile a 7
                out of 10. The profile appears friendly and genuine but could
                benefit significantly from a few tweaks. With the feedback
                provided below, I estimate you could imrpove your profile to a
                solid 9 out of 10
              </p>

              <p className="mt-4">
                <strong>Photo Analysis:</strong> Photo 1 (With Audio
                Pronounciation): Rating 7/10 Your friendly smile and casual
                posture create a welcoming vibe. The quality of the photo is
                excellent, with good lighting and focus. The background is
                colorful and interesting without being distracting. A minor
                suggestion would be to try a photo with
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
