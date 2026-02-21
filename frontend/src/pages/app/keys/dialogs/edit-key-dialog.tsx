import { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Alert,
    Box,
    CircularProgress,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useTranslation } from 'react-i18next';
import { ApiKeyItem } from '../use-keys-page';

interface EditKeyDialogProps {
    open: boolean;
    target: ApiKeyItem | null;
    onClose: () => void;
    onEdit: (id: number, name: string) => Promise<void>;
}

const EditKeyDialog = ({ open, target, onClose, onEdit }: EditKeyDialogProps) => {
    const { t } = useTranslation();
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (target) setName(target.name);
        setError(null);
    }, [target, open]);

    const handleSave = async () => {
        if (!name.trim()) {
            setError(t('app.apiKeys.errorNameRequired'));
            return;
        }
        if (!target) return;
        setLoading(true);
        setError(null);
        try {
            await onEdit(target.id, name.trim());
        } catch (err: any) {
            setError(err.message || t('app.apiKeys.errorUpdating'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <EditIcon color="primary" />
                    {t('app.apiKeys.dialogEditTitle')}
                </Box>
            </DialogTitle>

            <DialogContent>
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                <TextField
                    autoFocus
                    fullWidth
                    label={t('app.apiKeys.keyName')}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && !loading && handleSave()}
                    sx={{ mt: 1 }}
                    disabled={loading}
                    inputProps={{ maxLength: 30 }}
                    helperText={`${name.length}/30 ${t('app.characters')}`}
                />
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose} disabled={loading}>
                    {t('app.apiKeys.cancel')}
                </Button>
                <Button
                    variant="contained"
                    onClick={handleSave}
                    disabled={loading || !name.trim()}
                    startIcon={loading ? <CircularProgress size={16} /> : undefined}
                >
                    {loading ? t('app.apiKeys.saving') : t('app.apiKeys.save')}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditKeyDialog;
