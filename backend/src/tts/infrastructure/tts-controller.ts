import { Request, Response } from 'express';
import { TTSService } from '../application/tts-service';
import multer from 'multer';
import * as fs from 'fs';
import * as path from 'path';

const upload = multer({
  storage: multer.diskStorage({
    destination: './uploads/temp/',
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname) || '.wav';
      const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + ext;
      cb(null, uniqueName);
    }
  }),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['audio/wav', 'audio/mpeg', 'audio/mp3', 'audio/x-wav', 'audio/webm', 'audio/ogg'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only audio files are allowed.'));
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
      let tempFilePath: string | undefined;

      try {
        TTSController.processingQueue++;
        const myPosition = TTSController.processingQueue;

        if (!req.file) {
          TTSController.processingQueue--;
          return res.status(400).json({ message: 'Reference audio file is required' });
        }

        const { refText = '', genText } = req.body;

        if (!genText) {
          TTSController.processingQueue--;
          return res.status(400).json({ 
            message: 'genText is required' 
          });
        }

        tempFilePath = req.file.path;

        while (TTSController.isProcessing) {
          await new Promise(resolve => setTimeout(resolve, 500));
        }

        TTSController.isProcessing = true;

        const audioBuffer = await this.ttsService.synthesizeSpeech(
          tempFilePath,
          refText,
          genText
        );

        res.set({
          'Content-Type': 'audio/wav',
          'Content-Length': audioBuffer.length,
          'Content-Disposition': 'inline; filename="synthesized.wav"'
        });

        res.send(audioBuffer);

      } catch (error: any) {
        console.error('Error synthesizing speech:', error);
        res.status(500).json({ 
          message: error.message || 'Failed to synthesize speech' 
        });
      } finally {
        TTSController.isProcessing = false;
        TTSController.processingQueue--;
        
        if (tempFilePath && fs.existsSync(tempFilePath)) {
          fs.unlinkSync(tempFilePath);
        }
      }
    }
  ];
}
