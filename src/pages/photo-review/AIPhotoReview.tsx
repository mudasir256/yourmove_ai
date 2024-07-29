import { Back } from "../../components/Back"
import { useEffect, useRef, useState } from "react"
import LoadingSpinner from "../../components/LoadingSpinner"
import { checkUserSubscription, fetchPhotoReviews, fetchPhotoReviewsCount, reviewPhoto } from "../../queries"
import { UploadPhotoContainer } from "./UploadPhotoContainer"
import { useAuthStore } from "../../stores/auth"
import { PhotoReviewItem } from "./PhotoReviewItem"
import { UnlockPhotoReviewModal } from "../../components/modals/UnlockPhotoReviewModal"
import { useWizardStore } from "../../stores/wizard"

type PhotoReviewType = {
  rating: number,
  review: string,
  photo: string
}

export const AIPhotoReview = () => {
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [reviewInProgress, setReviewInProgress] = useState(false);
  const [results, setResults] = useState<PhotoReviewType[]>([])
  const [showLoadMore, setShowLoadMore] = useState(false)

  const [unlockPhotoReviewModalOpen, setUnlockPhotoReviewModalOpen] = useState(false)

  const { setIsSubscribed } = useAuthStore()
  const { setPhotoReviewWizardComplete, photoReviewStepResults } = useWizardStore()

  const [reviewCount, setReviewCount] = useState<number | undefined>(undefined)
  const totalReviews = useRef<number | undefined>(undefined)

  const email = photoReviewStepResults.email

  const token = useRef<string | undefined>(undefined)

  const fetchReviewsCount = async () => {
    const subscriptionResponse = await checkUserSubscription(email)
    const subscribed = subscriptionResponse.data.isSubscribed
    setIsSubscribed(subscribed)

    if (!subscribed) {
      const { data } = await fetchPhotoReviewsCount(email)
      return data
    } return {}
  }

  const fetchReviews = async () => {
    setShowLoadMore(false)
    const { data } = await fetchPhotoReviews(email, token.current)
    const { reviews, nextPageToken } = data || {};
    token.current = nextPageToken
    setShowLoadMore(!!nextPageToken)

    const filteredReviews = reviews.map((review: any) => ({
      rating: review.rating,
      review: review.review,
      photo: review.photo,
    }));

    setResults(prevResults => [...prevResults, ...filteredReviews]);
  }

  const onLoadMorePressed = async () => {
    setLoadingReviews(true)
    await fetchReviews()
    setLoadingReviews(false)
  }

  const setCount = (count: number, total: number) => {
    if (count === -1) {
      setIsSubscribed(true)
      setReviewCount(undefined)
    }
    else {
      totalReviews.current = total
      setReviewCount(count)
    }
  }

  useEffect(() => {
    const fetchAllData = async () => {
      setLoadingReviews(true);
      try {
        const [reviewsCountData, reviewsData] = await Promise.all([fetchReviewsCount(), fetchReviews()]);
        const { count = -1, total = -1 } = reviewsCountData || {};
        setCount(count, total);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoadingReviews(false);
      }
    };

    fetchAllData();
  }, []);

  const getAIPhotoReview = async (url?: string) => {
    if (!url) return

    setReviewInProgress(true)
    const { data } = await reviewPhoto(email, url)

    const { count = -1, total = -1, photo, review, rating } = data || {}
    setResults([{ review, rating, photo }, ...results])
    setCount(count, total)
    setReviewInProgress(false)

  }

  return (
    <div className="flex-col flex-1 max-w-lg mx-auto mt-0 bg-transparent px-2">
      <>
        <Back containerClass="w-6 h-10" color="stroke-black" onClick={() => { setPhotoReviewWizardComplete(false) }} />
        <div className="flex-1 justify-start ml-2 mt-1 mb-6">
          <p className="font-bold text-3xl">Your Photo Review</p>
          <p className="mt-2">Upload photos that you use for the dating app and we’ll review it for you</p>
          <UploadPhotoContainer
            count={reviewCount}
            total={totalReviews.current}
            disabled={loadingReviews || reviewInProgress}
            onUploadComplete={getAIPhotoReview}
            onUnlockPress={() => setUnlockPhotoReviewModalOpen(true)} />
          {reviewInProgress && <div className="mt-4"><LoadingSpinner /></div>}
          {results.map((review, index) => (
            <PhotoReviewItem key={index} {...review} />
          ))}
          {loadingReviews && (
            <div className="mt-4">
              <LoadingSpinner />
            </div>
          )}
          {showLoadMore && (
            <div className="flex items-center justify-center">
              <button
                onClick={onLoadMorePressed}
                className="bg-brand-primary self-center mt-4 px-4 py-2 font-bold text-white text-sm flex items-center justify-center rounded-lg"
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </>
      <UnlockPhotoReviewModal
        open={unlockPhotoReviewModalOpen}
        setOpen={setUnlockPhotoReviewModalOpen}
      />
    </div>
  )
}   