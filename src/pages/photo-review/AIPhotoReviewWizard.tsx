
import { Helmet } from 'react-helmet-async';
import { Wizard } from "../../components/wizard/Wizard";
import { AI_PHOTO_REVIEW_WIZARD_STEPS } from "../../constants/wizard";
import { useWizardStore } from "../../stores/wizard";
import { AIPhotoReview } from './AIPhotoReview';
import { useNavigate } from 'react-router-dom';
import { useLogEvent } from '../../analytics';

export const AIPhotoReviewWizard = () => {
  const navigate = useNavigate()
  const {
    photoReviewStep,
    setPhotoReviewStep,
    photoReviewStepResults,
    setPhotoReviewStepResults,
    photoReviewWizardComplete,
    setPhotoReviewWizardComplete,
  } = useWizardStore();

  useLogEvent('start', 'photo_review')

  return (
    <div className="px-4">
      <Helmet>
        <meta name="description" content="Bio and prompt writer for dating apps. Personalized to you. Tested and optimized for maximum matches." />
      </Helmet>
      <Wizard
        name="photoReview"
        steps={AI_PHOTO_REVIEW_WIZARD_STEPS}
        step={photoReviewStep}
        setStep={setPhotoReviewStep}
        stepResults={photoReviewStepResults}
        setStepResult={setPhotoReviewStepResults}
        storeStep={true}
        wizardComplete={photoReviewWizardComplete}
        setWizardComplete={setPhotoReviewWizardComplete}
        onBackPress={() => navigate(-1)}
      >
        {photoReviewWizardComplete && <AIPhotoReview />}
      </Wizard>
    </div>
  );
};
