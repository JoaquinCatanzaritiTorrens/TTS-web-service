import { useState, useRef, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

export const useAppPage = () => {
  const { t } = useTranslation();
  const [refAudioFile, setRefAudioFile] = useState<File | null>(null);
  const [refText, setRefText] = useState('');
  const [genText, setGenText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const [generatedAudioUrl, setGeneratedAudioUrl] = useState<string | null>(null);
  const [showQueueDialog, setShowQueueDialog] = useState(false);
  const [queuePosition, setQueuePosition] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [showInfoDialog, setShowInfoDialog] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const recordedAudioRef = useRef<HTMLAudioElement>(null);

  const REFERENCE_TEXT = t('app.referenceText');

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (recordedAudioUrl) URL.revokeObjectURL(recordedAudioUrl);
    };
  }, [recordedAudioUrl]);

  const audioBufferToWav = (buffer: AudioBuffer): Promise<Blob> => {
    return new Promise((resolve) => {
      const numberOfChannels = buffer.numberOfChannels;
      const sampleRate = buffer.sampleRate;
      const format = 1;
      const bitDepth = 16;

      const bytesPerSample = bitDepth / 8;
      const blockAlign = numberOfChannels * bytesPerSample;

      const data = new Float32Array(buffer.length * numberOfChannels);
      for (let channel = 0; channel < numberOfChannels; channel++) {
        const channelData = buffer.getChannelData(channel);
        for (let i = 0; i < buffer.length; i++) {
          data[i * numberOfChannels + channel] = channelData[i];
        }
      }

      const dataLength = data.length * bytesPerSample;
      const bufferLength = 44 + dataLength;
      const arrayBuffer = new ArrayBuffer(bufferLength);
      const view = new DataView(arrayBuffer);

      const writeString = (offset: number, string: string) => {
        for (let i = 0; i < string.length; i++) {
          view.setUint8(offset + i, string.charCodeAt(i));
        }
      };

      writeString(0, 'RIFF');
      view.setUint32(4, 36 + dataLength, true);
      writeString(8, 'WAVE');
      writeString(12, 'fmt ');
      view.setUint32(16, 16, true);
      view.setUint16(20, format, true);
      view.setUint16(22, numberOfChannels, true);
      view.setUint32(24, sampleRate, true);
      view.setUint32(28, sampleRate * blockAlign, true);
      view.setUint16(32, blockAlign, true);
      view.setUint16(34, bitDepth, true);
      writeString(36, 'data');
      view.setUint32(40, dataLength, true);

      let offset = 44;
      for (let i = 0; i < data.length; i++) {
        const sample = Math.max(-1, Math.min(1, data[i]));
        const intSample = sample < 0 ? sample * 0x8000 : sample * 0x7FFF;
        view.setInt16(offset, intSample, true);
        offset += 2;
      }

      resolve(new Blob([arrayBuffer], { type: 'audio/wav' }));
    });
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      let mimeType = 'audio/webm';
      const options: MediaRecorderOptions = {};

      if (MediaRecorder.isTypeSupported('audio/wav')) {
        mimeType = 'audio/wav';
        options.mimeType = 'audio/wav';
      } else if (MediaRecorder.isTypeSupported('audio/webm;codecs=opus')) {
        mimeType = 'audio/webm;codecs=opus';
        options.mimeType = 'audio/webm;codecs=opus';
      }

      const mediaRecorder = new MediaRecorder(stream, options);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: mimeType });

        try {
          const arrayBuffer = await audioBlob.arrayBuffer();
          const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
          const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

          const wavBlob = await audioBufferToWav(audioBuffer);
          const file = new File([wavBlob], 'recorded-audio.wav', { type: 'audio/wav' });
          setRefAudioFile(file);

          const url = URL.createObjectURL(wavBlob);
          setRecordedAudioUrl(url);
        } catch (error) {
          console.error('Error converting to WAV:', error);
          const file = new File([audioBlob], 'recorded-audio.webm', { type: mimeType });
          setRefAudioFile(file);
          const url = URL.createObjectURL(audioBlob);
          setRecordedAudioUrl(url);
        }

        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);

      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);

    } catch (err) {
      setError(t('app.errors.microphoneAccess'));
      console.error('Error accessing microphone:', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };

  const deleteRecording = () => {
    if (recordedAudioUrl) {
      URL.revokeObjectURL(recordedAudioUrl);
      setRecordedAudioUrl(null);
    }
    setRefAudioFile(null);
    setRecordingTime(0);
    fileInputRef.current!.value = '';
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('audio/')) {
        setError(t('app.errors.invalidAudioFile'));
        return;
      }
      if (file.size > 15 * 1024 * 1024) {
        setError(t('app.errors.fileTooLarge'));
        return;
      }
      setRefAudioFile(file);
      setError('');
    }
  };

  const handleRemoveFile = () => {
    setRefAudioFile(null);
    if (recordedAudioUrl) {
      URL.revokeObjectURL(recordedAudioUrl);
      setRecordedAudioUrl(null);
    }
    fileInputRef.current!.value = '';
  };

  const handleGenerateClick = async () => {
    if (!refAudioFile) {
      setError(t('app.errors.noReferenceAudio'));
      return;
    }

    if (!genText.trim()) {
      setError(t('app.errors.noGenerationText'));
      return;
    }

    if (genText.length > 500) {
      setError(t('app.errors.generationTooLong'));
      return;
    }

    try {
      const queueResponse = await fetch('/api/tts/queue-status');
      const queueData = await queueResponse.json();

      if (queueData.queueLength > 0 || queueData.isProcessing) {
        setQueuePosition(queueData.queueLength);
        setShowQueueDialog(true);
      } else {
        handleConfirmGenerate();
      }
    } catch (err) {
      handleConfirmGenerate();
    }
  };

  const handleConfirmGenerate = async () => {
    setShowQueueDialog(false);
    setIsGenerating(true);
    setError('');

    if (generatedAudioUrl) {
      URL.revokeObjectURL(generatedAudioUrl);
      setGeneratedAudioUrl(null);
    }

    try {
      const formData = new FormData();
      formData.append('refAudio', refAudioFile!);
      formData.append('refText', refText);
      formData.append('genText', genText);

      const response = await fetch('/api/tts/synthesize', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: t('app.errors.synthesisError') }));
        throw new Error(errorData.message || t('app.errors.synthesisError'));
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      setGeneratedAudioUrl(audioUrl);

    } catch (err: any) {
      setError(err.message || t('app.errors.synthesisError'));
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (generatedAudioUrl) {
      const a = document.createElement('a');
      a.href = generatedAudioUrl;
      a.download = 'synthesized-audio.wav';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const clearError = useCallback(() => {
    setError('');
  }, []);

  const handleCloseInfoDialog = useCallback(() => {
    setShowInfoDialog(false);
  }, []);

  const handleCloseQueueDialog = useCallback(() => {
    setShowQueueDialog(false);
  }, []);

  return {
    state: {
      refAudioFile,
      refText,
      genText,
      isGenerating,
      error,
      generatedAudioUrl,
      showQueueDialog,
      queuePosition,
      isRecording,
      recordedAudioUrl,
      recordingTime,
      audioRef,
      fileInputRef,
      recordedAudioRef,
      REFERENCE_TEXT,
      showInfoDialog,
    },
    actions: {
      setRefText,
      setGenText,
      startRecording,
      stopRecording,
      deleteRecording,
      formatTime,
      handleFileChange,
      handleRemoveFile,
      handleGenerateClick,
      handleConfirmGenerate,
      handleDownload,
      setShowQueueDialog,
      clearError,
      setShowInfoDialog,
      handleCloseInfoDialog,
      handleCloseQueueDialog,
    },
  };
};
