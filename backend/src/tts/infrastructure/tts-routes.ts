import { Router } from 'express';
import { TTSController } from './tts-controller';
import { checkJwtOrApiKey } from '../../__shared__/middleware/checkJwtOrApiKey';

const router = Router();
const ttsController = new TTSController();

router.get('/queue-status', checkJwtOrApiKey, ttsController.getQueueStatus);
router.post('/synthesize', checkJwtOrApiKey, ttsController.synthesizeSpeech);

export default router;
