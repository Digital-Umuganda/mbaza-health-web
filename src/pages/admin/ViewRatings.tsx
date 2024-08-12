import { useParams } from 'react-router-dom';
import LinguistHomePage from '../linguist/LinguistHomePage';
import HealthWorkerHomePage from '../health-worker/HealthWorkerHomePage';
import VoiceAnnotatorHomePage from '../voice-annotator/VoiceAnnotatorHomePage';

const ViewRatings = () => {
  const { role } = useParams<{ role: string }>();

  switch (role) {
    case 'linguist':
      return <LinguistHomePage />;
    //   PROFESSIONAL_HEALTH_WORKER
    case 'professional-health-worker':
      return <HealthWorkerHomePage />;
    // VOICE_ANNOTATOR
    case 'voice-annotator':
      return <VoiceAnnotatorHomePage />;
    default:
      return null;
  }
};

export default ViewRatings;
