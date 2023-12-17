import { useState } from "react";
import { useProfileStore } from "../../stores/profile";

export const ProfileReview = () => {
  const [hasPaid, setHasPaid] = useState(false);
  const { reviewedProfile, setReviewedProfile } = useProfileStore();

  const PHOTOS = [
    {
      name: "Red Jacket",
      rating: 8,
      description:
        "This photo displays a great balance of casual and put-together with the neat layering of clothing, and the background gives an urban feel. Your clear glasses add to a smart look, and again, your smile is engaging. Lighting and quality are on point.",
    },
    {
      name: "Striped Hoodie",
      rating: 6,
      description:
        "You have a relaxed and approachable demeanor in this photo. However, compared to the others, it's a little more casual and doesn't stand out as much. The setting is less interesting, and it might benefit from a bit more energy or variation in expression.",
    },
    {
      name: "Jersey Over Blue Shirt",
      rating: 7,
      description:
        "This photo with the sports jersey adds a dynamic of enjoying sports or outdoor activities. While the expression is joyful, a more candid posture could improve the overall feel.Photo Summary: Ideally, lead with the photo in the red jacket, followed by the pronounced name photo, then the jersey photo, and lastly the hoodie photo. I'd suggest mixing in a photo that captures you in a hobby or passion and maybe one more where you're more dressed up to show range.",
    },
  ];

  return (
    <>
      <div className="mb-5">
        <h1 className="text-4xl font-bold">Your Review</h1>
      </div>
      <div className="bg-white p-4 border-2 border-black rounded-md shadow-lg">
        {reviewedProfile?.review}
      </div>
    </>
  );
};
