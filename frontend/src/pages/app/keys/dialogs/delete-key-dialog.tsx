import { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    Alert,
    Box,
    CircularProgress,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTranslation } from 'react-i18next';
import { ApiKeyItem } from '../use-keys-page';

interface DeleteKeyDialogProps {
    open: boolean;
    target: ApiKeyItem | null;
    onClose: () => void;
    onDelete: (id: number) => Promise<void>;
}

const DeleteKeyDialog = ({ open, target, onClose, onDelete }: DeleteKeyDialogProps) => {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleDelete = async () => {
        if (!target) return;
        setLoading(true);
        setError(null);
        try {
            await onDelete(target.id);
        } catch (err: any) {
            setError(err.message || t('app.apiKeys.errorDeleting'));
            setLoading(false);
        }
    };

    const handleClose = () => {
        setError(null);
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
            <DialogTitle>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <DeleteIcon color="error" />
                    {t('app.apiKeys.dialogDeleteTitle')}
                </Box>
            </DialogTitle>

            <DialogContent>
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                <DialogContentText>
                    {t('app.apiKeys.dialogDeleteMessage', { name: target?.name ?? '' })}
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose} disabled={loading}>
                    {t('app.apiKeys.cancel')}
                </Button>
                <Button
                    variant="contained"
                    color="error"
                    onClick={handleDelete}
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={16} color="inherit" /> : <DeleteIcon />}
                >
                    {loading ? t('app.apiKeys.deleting') : t('app.apiKeys.delete')}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteKeyDialog;
