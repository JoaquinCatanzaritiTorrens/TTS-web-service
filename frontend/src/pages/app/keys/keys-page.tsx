import {
    Box,
    Typography,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Switch,
    IconButton,
    Tooltip,
    Skeleton,
    Chip,
} from '@mui/material';
import {
    Add,
    Edit,
    DeleteOutline,
    VpnKey,
} from '@mui/icons-material';
import CustomSnackbar from '../../../components/Snackbar/snackbar';
import { useTranslation } from 'react-i18next';
import { useKeysPage } from './use-keys-page';
import PageLayout from '../../../components/_layouts/PageLayout';
import CreateKeyDialog from './dialogs/create-key-dialog';
import EditKeyDialog from './dialogs/edit-key-dialog';
import DeleteKeyDialog from './dialogs/delete-key-dialog';
const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleString(undefined, {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: '2-digit', minute: '2-digit',
    });
};

const KeysPage = () => {
    const { t } = useTranslation();
    const { state, actions } = useKeysPage();

    return (
        <PageLayout titleKey="pageTitles.apiKeys">
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <VpnKey color="primary" />
                    <Typography variant="h5" fontWeight={700}>
                        {t('app.apiKeys.title')}
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={actions.handleOpenCreate}
                >
                    {t('app.apiKeys.createKey')}
                </Button>
            </Box>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                {t('app.apiKeys.subtitle')}
            </Typography>

            <Paper elevation={2}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 700 }}>{t('app.apiKeys.colName')}</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>{t('app.apiKeys.colKey')}</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>{t('app.apiKeys.colCreated')}</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>{t('app.apiKeys.colUsage')}</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>{t('app.apiKeys.colLastUsed')}</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>{t('app.apiKeys.colEnabled')}</TableCell>
                                <TableCell />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {state.loading ? (
                                Array.from({ length: 3 }).map((_, i) => (
                                    <TableRow key={i}>
                                        <TableCell><Skeleton variant="text" width={80} /></TableCell>
                                        <TableCell><Skeleton variant="text" width={180} /></TableCell>
                                        <TableCell><Skeleton variant="text" width={130} /></TableCell>
                                        <TableCell><Skeleton variant="text" width={30} /></TableCell>
                                        <TableCell><Skeleton variant="text" width={130} /></TableCell>
                                        <TableCell><Skeleton variant="rectangular" width={36} height={20} sx={{ borderRadius: 10 }} /></TableCell>
                                        <TableCell><Skeleton variant="text" width={60} /></TableCell>
                                    </TableRow>
                                ))
                            ) : state.keys.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} align="center" sx={{ py: 6, color: 'text.secondary' }}>
                                        {t('app.apiKeys.emptyState')}
                                    </TableCell>
                                </TableRow>
                            ) : (
                                state.keys.map((key) => (
                                    <TableRow key={key.id} hover>
                                        <TableCell sx={{ fontWeight: 500 }}>{key.name}</TableCell>
                                        <TableCell>
                                            <Chip
                                                label={`${'.'.repeat(3)}${key.keyPreview}`}
                                                size="small"
                                                variant="outlined"
                                                sx={{ fontFamily: 'monospace', letterSpacing: 1 }}
                                            />
                                        </TableCell>
                                        <TableCell>{formatDate(key.createdAt)}</TableCell>
                                        <TableCell>{key.usageCount}</TableCell>
                                        <TableCell>{formatDate(key.lastUsedAt)}</TableCell>
                                        <TableCell>
                                            <Tooltip title={key.enabled ? t('app.apiKeys.disable') : t('app.apiKeys.enable')}>
                                                <Switch
                                                    checked={key.enabled}
                                                    size="small"
                                                    onChange={() => actions.handleToggleKey(key)}
                                                    color="primary"
                                                />
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>
                                            <Tooltip title={t('app.apiKeys.editKey')}>
                                                <IconButton
                                                    size="small"
                                                    onClick={() => actions.handleOpenEdit(key)}
                                                >
                                                    <Edit fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title={t('app.apiKeys.deleteKey')}>
                                                <IconButton
                                                    size="small"
                                                    color="error"
                                                    onClick={() => actions.handleOpenDelete(key)}
                                                >
                                                    <DeleteOutline fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            <CustomSnackbar
                error={state.error ? t(`app.apiKeys.${state.error}`) : null}
                success={state.success ? t(`app.apiKeys.${state.success}`) : null}
                onClose={() => { actions.clearError(); actions.clearSuccess(); }}
            />

            <CreateKeyDialog
                open={state.createDialogOpen}
                createdKey={state.createdKey}
                onClose={actions.handleCloseCreate}
                onCreate={actions.handleCreateKey}
            />
            <EditKeyDialog
                open={state.editDialogOpen}
                target={state.editTarget}
                onClose={() => actions.setEditDialogOpen(false)}
                onEdit={actions.handleEditKey}
            />
            <DeleteKeyDialog
                open={state.deleteDialogOpen}
                target={state.deleteTarget}
                onClose={() => actions.setDeleteDialogOpen(false)}
                onDelete={actions.handleDeleteKey}
            />
        </PageLayout>
    );
};

export default KeysPage;
