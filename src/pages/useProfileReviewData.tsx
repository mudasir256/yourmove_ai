import { auth } from "../firebase";
import { generateProfileReview } from "../queries";
import { useWizardStore } from "../stores/wizard";

export const useProfileReviewData = () => {
  const {
    profileReviewerFiles,
    profileReviewerStepResults,
  } = useWizardStore();

  const fetchReview = async () => {
    try {
      const { data: reviewData } = await generateProfileReview(
        auth.currentUser && auth.currentUser.email ? auth.currentUser.email : profileReviewerStepResults.email,
        profileReviewerFiles
      )
      return reviewData
    }
    catch (error) {
      throw error
    };
  }

  return {
    fetchReview
  }
}