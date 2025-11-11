import FormData from 'form-data';
import * as fs from 'fs';
import * as path from 'path';
import axios from 'axios';

export class TTSService {
  private readonly TTS_SERVICE_URL = process.env.TTS_SERVICE_URL || 'http://tts:7005';

  constructor() { }

  async synthesizeSpeech(
    refAudioPath: string,
    refText: string,
    genText: string
  ): Promise<Buffer> {
    try {
      const formData = new FormData();

      const ext = path.extname(refAudioPath).toLowerCase();
      let contentType = 'audio/wav';
      let filename = 'reference-audio.wav';

      if (ext === '.mp3' || ext === '.mpeg') {
        contentType = 'audio/mpeg';
        filename = 'reference-audio.mp3';
      } else if (ext === '.webm') {
        contentType = 'audio/webm';
        filename = 'reference-audio.webm';
      } else if (ext === '.ogg') {
        contentType = 'audio/ogg';
        filename = 'reference-audio.ogg';
      }

      const fileBuffer = fs.readFileSync(refAudioPath);

      formData.append('files', fileBuffer, {
        filename: filename,
        contentType: contentType,
      });

      const uploadResponse = await axios.post(`${this.TTS_SERVICE_URL}/upload`, formData, {
        headers: formData.getHeaders(),
        maxBodyLength: Infinity,
        maxContentLength: Infinity,
      });

      const uploadData: any = uploadResponse.data;
      const audioPath = Array.isArray(uploadData) ? uploadData[0] : uploadData;

      const callPayload = {
        data: [
          { path: audioPath, meta: { _type: 'gradio.FileData' } },
          refText,
          genText,
          'F5-TTS',
          false, // remove_silence
          0.15,  // cross_fade_duration
          1.0    // speed
        ]
      };

      const callResponse = await axios.post(`${this.TTS_SERVICE_URL}/call/infer`, callPayload, {
        headers: { 'Content-Type': 'application/json' },
      });

      const callData: any = callResponse.data;
      const eventId = callData.event_id;
      const resultResponse = await axios.get(`${this.TTS_SERVICE_URL}/call/infer/${eventId}`, {
        responseType: 'stream',
      });

      if (!resultResponse.data) {
        throw new Error('Failed to get result stream');
      }

      let audioUrl: string | null = null;
      const reader = resultResponse.data;
      const decoder = new TextDecoder();
      let buffer = '';

      for await (const chunk of reader as any) {
        buffer += decoder.decode(chunk, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ') && !line.includes('[DONE]')) {
            const data = line.slice(6);
            if (data && data !== 'null') {
              try {
                const parsed = JSON.parse(data);
                if (Array.isArray(parsed) && parsed[0]?.url) {
                  audioUrl = parsed[0].url;
                  break;
                }
              } catch (e) {
              }
            }
          }
        }

        if (audioUrl) break;
      }

      if (!audioUrl) {
        console.error('No audio URL found in SSE stream');
        throw new Error('No audio URL received from Gradio');
      }

      const audioResponse = await axios.get(audioUrl, {
        responseType: 'arraybuffer',
      });

      const arrayBuffer = audioResponse.data;

      return Buffer.from(arrayBuffer);

    } catch (error) {
      console.error('=== TTS synthesis failed ===');
      console.error('Error details:', error);
      throw error;
    }
  }
}
