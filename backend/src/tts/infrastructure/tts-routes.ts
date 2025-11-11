import { Router } from 'express';
import { TTSController } from './tts-controller';

const router = Router();
const ttsController = new TTSController();

router.get('/queue-status', ttsController.getQueueStatus);
router.post('/synthesize', ttsController.synthesizeSpeech);

export default router;
