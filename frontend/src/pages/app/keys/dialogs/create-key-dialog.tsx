import { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Alert,
    Box,
    Typography,
    InputAdornment,
    IconButton,
    Tooltip,
    CircularProgress,
} from '@mui/material';
import {
    Visibility,
    VisibilityOff,
    ContentCopy,
    VpnKey,
    CheckCircle,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { ApiKeyItem } from '../use-keys-page';

interface CreateKeyDialogProps {
    open: boolean;
    createdKey: { apiKey: ApiKeyItem; rawKey: string } | null;
    onClose: (wasCreated: boolean) => void;
    onCreate: (name: string) => Promise<{ apiKey: ApiKeyItem; rawKey: string }>;
}

const CreateKeyDialog = ({ open, createdKey, onClose, onCreate }: CreateKeyDialogProps) => {
    const { t } = useTranslation();
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [keyVisible, setKeyVisible] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleClose = () => {
        setName('');
        setError(null);
        setKeyVisible(false);
        setCopied(false);
        onClose(!!createdKey);
    };

    const handleCreate = async () => {
        if (!name.trim()) {
            setError(t('app.apiKeys.errorNameRequired'));
            return;
        }
        setLoading(true);
        setError(null);
        try {
            await onCreate(name.trim());
            setName('');
        } catch (err: any) {
            setError(err.message || t('app.apiKeys.errorCreating'));
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = async () => {
        if (!createdKey) return;
        await navigator.clipboard.writeText(createdKey.rawKey);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <VpnKey color="primary" />
                    {createdKey ? t('app.apiKeys.dialogCreatedTitle') : t('app.apiKeys.dialogCreateTitle')}
                </Box>
            </DialogTitle>

            <DialogContent>
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                {!createdKey ? (
                    /* Step 1: Enter name */
                    <TextField
                        autoFocus
                        fullWidth
                        label={t('app.apiKeys.keyName')}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && !loading && handleCreate()}
                        sx={{ mt: 1 }}
                        disabled={loading}
                        inputProps={{ maxLength: 30 }}
                        helperText={`${name.length}/30 ${t('app.characters')}`}
                    />
                ) : (
                    /* Step 2: Show created key */
                    <Box>
                        <Alert severity="warning" sx={{ mb: 2 }}>
                            <Typography variant="body2" fontWeight={600}>
                                {t('app.apiKeys.singleViewWarning')}
                            </Typography>
                        </Alert>

                        <TextField
                            fullWidth
                            label={t('app.apiKeys.keyName')}
                            value={createdKey.apiKey.name}
                            disabled
                            sx={{ mb: 2 }}
                        />

                        <TextField
                            fullWidth
                            label={t('app.apiKeys.keyValue')}
                            value={keyVisible ? createdKey.rawKey : '•'.repeat(createdKey.rawKey.length - 4) + createdKey.rawKey.slice(-4)}
                            disabled
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Tooltip title={keyVisible ? t('app.apiKeys.hideKey') : t('app.apiKeys.showKey')}>
                                            <IconButton onClick={() => setKeyVisible(!keyVisible)} edge="end">
                                                {keyVisible ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title={copied ? t('app.apiKeys.copied') : t('app.apiKeys.copy')}>
                                            <IconButton onClick={handleCopy} edge="end" color={copied ? 'success' : 'default'}>
                                                {copied ? <CheckCircle /> : <ContentCopy />}
                                            </IconButton>
                                        </Tooltip>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
                )}
            </DialogContent>

            <DialogActions>
                {!createdKey ? (
                    <>
                        <Button onClick={handleClose} disabled={loading}>
                            {t('app.apiKeys.cancel')}
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleCreate}
                            disabled={loading || !name.trim()}
                            startIcon={loading ? <CircularProgress size={16} /> : undefined}
                        >
                            {loading ? t('app.apiKeys.creating') : t('app.apiKeys.create')}
                        </Button>
                    </>
                ) : (
                    <Button variant="contained" onClick={handleClose}>
                        {t('app.apiKeys.done')}
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default CreateKeyDialog;
