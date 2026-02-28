import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  LinearProgress,
  Alert,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Chip,
  Stack,
  Tooltip,
} from '@mui/material';
import {
  CloudUpload,
  Delete,
  PlayArrow,
  AccessTime,
  Mic,
  Stop,
  FiberManualRecord,
  Info,
  GraphicEq
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import './app-page.css';
import { useAppPage } from './use-app-page';
import CustomSnackbar from '../../components/Snackbar/snackbar';
import PageLayout from '../../components/_layouts/PageLayout';

const AppPage = () => {
  const { t } = useTranslation();
  const { state, actions } = useAppPage();

  return (
    <PageLayout titleKey="pageTitles.tts">
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
          <GraphicEq color="primary" />
          <Typography variant="h4" fontWeight={700}>
            {t('app.title')}
          </Typography>
        </Box>
        <Card className="app-page-card" sx={{ boxShadow: 3, transition: 'none' }}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Typography variant="subtitle1" fontWeight={600} color="text.primary">
                  {t('app.referenceAudio')}
                </Typography>
                <Tooltip title={t('app.viewInstructions')}>
                  <IconButton size="small" onClick={() => actions.setShowInfoDialog(true)} color="primary">
                    <Info fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2 }}>
                <input
                  ref={state.fileInputRef}
                  type="file"
                  accept="audio/*"
                  onChange={actions.handleFileChange}
                  style={{ display: 'none' }}
                  id="audio-upload"
                />
                <label htmlFor="audio-upload" style={{ flex: 1, pointerEvents: (state.isRecording || !!state.refAudioFile) ? 'none' : 'auto' }}>
                  <Button
                    variant={state.refAudioFile && !state.recordedAudioUrl ? 'contained' : 'outlined'}
                    color={state.refAudioFile && !state.recordedAudioUrl ? 'success' : 'primary'}
                    component="span"
                    startIcon={<CloudUpload />}
                    fullWidth
                    disabled={state.isRecording || !!state.refAudioFile}
                    sx={{ py: 1.5 }}
                  >
                    {t('app.uploadAudio')}
                  </Button>
                </label>

                <Button
                  variant={
                    state.isRecording ? 'contained'
                      : (state.refAudioFile && !!state.recordedAudioUrl) ? 'contained'
                        : 'outlined'
                  }
                  color={
                    state.isRecording ? 'error'
                      : (state.refAudioFile && !!state.recordedAudioUrl) ? 'success'
                        : 'primary'
                  }
                  startIcon={state.isRecording ? <Stop /> : <Mic />}
                  onClick={state.isRecording ? actions.stopRecording : actions.startRecording}
                  disabled={!!state.refAudioFile && !state.isRecording}
                  sx={{ flex: 1, py: 1.5 }}
                >
                  {state.isRecording ? `${t('app.stop')} (${actions.formatTime(state.recordingTime)})` : t('app.recordAudio')}
                </Button>
              </Stack>

              {state.isRecording && (
                <Box sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  p: 2,
                  bgcolor: 'error.main',
                  color: 'error.contrastText',
                  borderRadius: 1,
                  mb: 2
                }}>
                  <FiberManualRecord sx={{ animation: 'pulse 1.5s ease-in-out infinite' }} />
                  <Typography variant="body2" fontWeight={600}>
                    {t('app.recording')} {actions.formatTime(state.recordingTime)}
                  </Typography>
                </Box>
              )}

              {state.recordedAudioUrl && !state.isRecording && (
                <Box sx={{ mb: 2 }}>
                  <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    mb: 1
                  }}>
                    <Typography variant="body2" fontWeight={600}>
                      {t('app.recordedAudio')}
                    </Typography>
                    <IconButton size="small" onClick={actions.deleteRecording} color="error">
                      <Delete />
                    </IconButton>
                  </Box>
                  <audio
                    ref={state.recordedAudioRef}
                    src={state.recordedAudioUrl}
                    controls
                    style={{ width: '100%' }}
                  />
                </Box>
              )}

              {state.refAudioFile && !state.recordedAudioUrl && (
                <Box sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  p: 2,
                  bgcolor: 'action.hover',
                  borderRadius: 1
                }}>
                  <Typography variant="body2" sx={{ flex: 1 }}>
                    {state.refAudioFile.name} ({(state.refAudioFile.size / 1024 / 1024).toFixed(2)} MB)
                  </Typography>
                  <IconButton size="small" onClick={actions.handleRemoveFile} color="error">
                    <Delete />
                  </IconButton>
                </Box>
              )}
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom fontWeight={600} color="text.primary">
                {t('app.textToGenerate')}
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={5}
                value={state.genText}
                onChange={(e) => actions.setGenText(e.target.value)}
                placeholder={t('app.textPlaceholder')}
                helperText={`${state.genText.length}/500 ${t('app.characters')}`}
                inputProps={{ maxLength: 500 }}
              />
            </Box>

            <Button
              variant="contained"
              size="large"
              fullWidth
              startIcon={<PlayArrow />}
              onClick={actions.handleGenerateClick}
              disabled={state.isGenerating}
              sx={{ py: 1.5, mb: 2 }}
            >
              {state.isGenerating ? t('app.generating') : t('app.synthesize')}
            </Button>

            {state.isGenerating && (
              <Box sx={{ mb: 3 }}>
                <LinearProgress />
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block', textAlign: 'center' }}>
                  {t('app.generatingMessage')}
                </Typography>
              </Box>
            )}

            {state.generatedAudioUrl && (
              <Box sx={{ mt: 3, p: 3, bgcolor: 'action.hover', borderRadius: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="subtitle1" fontWeight={600} color="text.primary">
                    {t('app.synthesizedAudio')}
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={actions.handleDownload}
                  >
                    {t('app.download')}
                  </Button>
                </Box>
                <audio
                  ref={state.audioRef}
                  src={state.generatedAudioUrl}
                  controls
                  style={{ width: '100%' }}
                />
              </Box>
            )}
          </CardContent>
        </Card>

        <Dialog open={state.showInfoDialog} onClose={actions.handleCloseInfoDialog} maxWidth="sm" fullWidth>
          <DialogTitle>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Info color="primary" />
              {t('app.referenceAudio')}
            </Box>
          </DialogTitle>
          <DialogContent>
            <Alert severity="info" sx={{ mb: 2 }}>
              <Typography variant="body2" fontWeight={600} gutterBottom>
                {t('app.recordInstructions')}
              </Typography>
              <Typography variant="body2" sx={{
                fontStyle: 'italic',
                p: 2,
                bgcolor: 'background.paper',
                borderRadius: 1,
                mt: 1
              }}>
                "{state.REFERENCE_TEXT}"
              </Typography>
              <Typography variant="caption" sx={{ mt: 1, display: 'block', color: 'text.secondary' }}>
                {t('app.supportedFormats')}
              </Typography>
            </Alert>
          </DialogContent>
          <DialogActions>
            <Button onClick={actions.handleCloseInfoDialog} variant="contained">
              {t('app.queueDialog.continue')}
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={state.showQueueDialog} onClose={actions.handleCloseQueueDialog}>
          <DialogTitle>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <AccessTime color="primary" />
              {t('app.queueDialog.title')}
            </Box>
          </DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ mb: 2 }}>
              {t('app.queueDialog.message')}
            </DialogContentText>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Chip
                label={`👥 ${state.queuePosition} ${state.queuePosition === 1 ? t('app.queueDialog.user') : t('app.queueDialog.users')}`}
                color="warning"
                variant="outlined"
              />
              <Chip
                label={t('app.queueDialog.estimatedTime')}
                color="primary"
                variant="outlined"
              />
            </Box>
            <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
              {t('app.queueDialog.description')}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={actions.handleCloseQueueDialog}>
              {t('app.queueDialog.cancel')}
            </Button>
            <Button onClick={actions.handleConfirmGenerate} variant="contained" autoFocus>
              {t('app.queueDialog.continue')}
            </Button>
          </DialogActions>
        </Dialog>
      <CustomSnackbar
        error={state.error || null}
        success={null}
        onClose={actions.clearError}
      />
    </PageLayout>
  );
};

export default AppPage;