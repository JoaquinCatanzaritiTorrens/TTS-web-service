import { Request, Response } from 'express';
import { TTSService } from '../application/tts-service';
import { ApiKeyService } from '../../apikeys/application/apikey-service';
import multer from 'multer';

const apiKeyService = new ApiKeyService();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 15 * 1024 * 1024 }, // 15MB limit
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      'audio/wav', 'audio/wave', 'audio/x-wav', 'audio/vnd.wave',
      'audio/mpeg', 'audio/mp3', 'audio/x-mpeg',
      'audio/mp4', 'audio/aac', 'audio/ogg',
      'audio/webm', 'audio/flac', 'audio/x-flac',
      'application/octet-stream',
    ];
    if (allowedMimes.includes(file.mimetype) || file.mimetype.startsWith('audio/')) {
      cb(null, true);
    } else {
      cb(new Error(`Invalid file type: ${file.mimetype}. Only audio files are allowed.`));
    }
  }
});

export class TTSController {
  private ttsService = new TTSService();
  private static processingQueue: number = 0;
  private static isProcessing: boolean = false;

  getQueueStatus = async (req: Request, res: Response) => {
    try {
      res.json({
        queueLength: TTSController.processingQueue,
        isProcessing: TTSController.isProcessing
      });
    } catch (error: any) {
      console.error('Error getting queue status:', error);
      res.status(500).json({
        message: error.message || 'Failed to get queue status'
      });
    }
  };

  synthesizeSpeech = [
    upload.single('refAudio'),
    async (req: Request, res: Response) => {
      try {
        TTSController.processingQueue++;

        if (!req.file) {
          TTSController.processingQueue--;
          return res.status(400).json({ message: 'Reference audio file is required' });
        }

        const { refText = '', genText } = req.body;

        if (!genText) {
          TTSController.processingQueue--;
          return res.status(400).json({ message: 'genText is required' });
        }

        if (genText.length > 500) {
          TTSController.processingQueue--;
          return res.status(400).json({ message: 'genText exceeds maximum length of 500 characters' });
        }

        while (TTSController.isProcessing) {
          await new Promise(resolve => setTimeout(resolve, 500));
        }
        TTSController.isProcessing = true;

        const audioBuffer = await this.ttsService.synthesizeSpeech(
          req.file.buffer,
          req.file.originalname,
          refText,
          genText
        );

        const apiKeyId: number | null = (req as any).apiKeyId ?? null;
        const userId: number | null = (req as any).userId ?? null;
        await apiKeyService.recordRequest(apiKeyId, userId);

        res.set({
          'Content-Type': 'audio/wav',
          'Content-Length': audioBuffer.length,
          'Content-Disposition': 'inline; filename="synthesized.wav"'
        });
        res.send(audioBuffer);

      } catch (error: any) {
        console.error('Error synthesizing speech:', error);
        res.status(500).json({ message: error.message || 'Failed to synthesize speech' });
      } finally {
        TTSController.isProcessing = false;
        TTSController.processingQueue--;
      }
    }
  ];
}
