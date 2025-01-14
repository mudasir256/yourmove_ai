import ReviewIllustration from '../assets/images/review-illustration.png'
import StarIcon from '../components/StarIcon'
import WheelIcon from '../components/WheelIcon'
import ArrowIcon from '../components/ArrowIcon'
import { useEffect, useState } from 'react'
import { FamewallReviews } from "./FamewallReviews"

const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

type Props = {
  onProfileReviewClick?: VoidFunction
  onPhotoReviewClick?: VoidFunction
}

export const ProfileReviewLanding = ({ onProfileReviewClick = undefined, onPhotoReviewClick = undefined }: Props) => {
  const getInitialCount = () => parseInt(localStorage.getItem("reviewsGenerated") ?? "0") || getRandomNumber(240, 300)

  const [profileReviewsCount, setProfileReviewsCount] = useState(getInitialCount);

  useEffect(() => {
    if (profileReviewsCount)
      localStorage.setItem("reviewsGenerated", profileReviewsCount.toString())
  }, [profileReviewsCount])

  useEffect(() => {
    const interval = setInterval(() => {
      setProfileReviewsCount((prevCount) => {
        const shouldStaySame = Math.random() < 0.3; // 30% chance to stay the same
        if (shouldStaySame) {
          return prevCount;
        }
        const newNumber = Math.min(prevCount + getRandomNumber(0, 5), 300);
        return newNumber;
      });
    }, 5000); // Update every second

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="mx-auto max-w-xl pb-8">
        <div className="flex flex-col flex-1">
          <h1 className="text-[32px] font-bold mt-8 self-center">AI Profile Reviews</h1>
          <img src={ReviewIllustration} alt="profile" className="w-auto h-full mt-4" />
          <p className="my-3 text-3xl font-bold">AI Profile Reviews</p>
          <p className="text-base font-semibold">Choose things you want to review</p>

          <div className='mt-3 border-2 border-black rounded-xl p-4 bg-white cursor-pointer' onClick={onProfileReviewClick}>
            <div className='flex flex-1 justify-between'>
              <div className='flex items-center'>
                <p className='font-bold text-brand-primary'>Full Profile Review</p>
                <div className="ml-1"><ArrowIcon /></div>
              </div>
              <StarIcon />
            </div>
            <p className='text-sm'>Screenshots of your profile bio</p>
          </div>
          <div className='mt-3 border-2 border-black rounded-xl p-4 bg-white cursor-pointer' onClick={onPhotoReviewClick}>
            <div className='flex flex-1 justify-between'>
              <div className='flex items-center'>
                <p className='font-bold text-brand-primary'>Individual Photo Review</p>
                <div className="ml-1"><ArrowIcon /></div>
              </div>
              <WheelIcon />
            </div>
            <p className='text-sm'>Get your photos rated and reviewed</p>
          </div>
          {/* <div className="grid grid-cols-2 grid-rows-1 gap-2 mt-2">
            <div
              className="bg-white row-start-1 row-end-1 col-start-1 col-end-1 p-4 flex rounded-xl shadow-xl border-2 border-black items-center"
            >
              <StarIcon />
              <div>
                <span className="font-medium ml-2 text-sm">Current</span>
                <p className="font-medium ml-2 text-sm">Profile Rating</p>
              </div>
            </div>
            <div
              className="bg-white row-start-1 row-end-1 col-start-2 col-end-2 p-4 flex rounded-xl shadow-xl border-2 border-black items-center"
            >
              <WheelIcon />
              <div>
                <span className="font-medium ml-2 text-sm">Bio & Photo</span>
                <p className="font-medium ml-2 text-sm">Analysis</p>
              </div>
            </div>
          </div>
          <div
            className="bg-white row-start-1 row-end-1 col-start-1 col-end-1 p-4 flex rounded-xl shadow-xl border-2 border-black items-center mt-4"
          >
            <TrendingIcon />
            <div>
              <span className="font-medium ml-2 text-sm">Improvement Plan</span>
            </div>
          </div>
          <div className='flex justify-center mt-5'>
            <UploadIcon />
            <p className='ml-4 text-sm'>Upload your profile to get reviews</p>
          </div> */}
          {/* <button
            className="mt-2 flex items-center justify-center w-full bg-brand-primary text-white py-3 rounded-lg font-semibold"
            onClick={onGetStartedPress}>
            Get Started
          </button> */}
          <span className='self-center mt-4 text-sm font-normal'>
            <span className='text-brand-primary text-sm font-semibold'>
              {`${profileReviewsCount} profiles`}
            </span> reviewed in the last 24h</span>
        </div>
      </div>
      <FamewallReviews
        containerStyle='-mx-4'
        title='150,000+ profiles reviewed'
      />
    </>
  )
}