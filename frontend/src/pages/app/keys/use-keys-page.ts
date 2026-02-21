import { useState, useEffect, useCallback } from 'react';

export interface ApiKeyItem {
    id: number;
    name: string;
    keyPreview: string;
    enabled: boolean;
    createdAt: string;
    usageCount: number;
    lastUsedAt: string | null;
}

export const useKeysPage = () => {
    const [keys, setKeys] = useState<ApiKeyItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    // Create dialog state
    const [createDialogOpen, setCreateDialogOpen] = useState(false);
    const [createdKey, setCreatedKey] = useState<{ apiKey: ApiKeyItem; rawKey: string } | null>(null);

    // Edit dialog state
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [editTarget, setEditTarget] = useState<ApiKeyItem | null>(null);

    // Delete dialog state
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState<ApiKeyItem | null>(null);

    const fetchKeys = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/apikeys', { credentials: 'include' });
            if (!res.ok) throw new Error('Failed to fetch API keys');
            setKeys(await res.json());
        } catch {
            setError('errorLoading');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchKeys(); }, [fetchKeys]);

    const handleOpenCreate = () => {
        setCreatedKey(null);
        setCreateDialogOpen(true);
    };

    const handleCreateKey = async (name: string): Promise<{ apiKey: ApiKeyItem; rawKey: string }> => {
        const res = await fetch('/api/apikeys', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name }),
        });
        if (!res.ok) {
            const data = await res.json();
            throw new Error(data.message || 'Error creating API key');
        }
        const data = await res.json();
        setCreatedKey(data);
        return data;
    };

    const handleCloseCreate = (wasCreated: boolean) => {
        setCreateDialogOpen(false);
        setCreatedKey(null);
        if (wasCreated) fetchKeys();
    };

    const handleOpenEdit = (key: ApiKeyItem) => {
        setEditTarget(key);
        setEditDialogOpen(true);
    };

    const handleEditKey = async (id: number, name: string) => {
        const res = await fetch(`/api/apikeys/${id}/name`, {
            method: 'PUT',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name }),
        });
        if (!res.ok) {
            const data = await res.json();
            throw new Error(data.message || 'Error updating API key');
        }
        setKeys(prev => prev.map(k => k.id === id ? { ...k, name } : k));
        setSuccess('successUpdated');
        setEditDialogOpen(false);
    };

    const handleOpenDelete = (key: ApiKeyItem) => {
        setDeleteTarget(key);
        setDeleteDialogOpen(true);
    };

    const handleDeleteKey = async (id: number) => {
        const res = await fetch(`/api/apikeys/${id}`, {
            method: 'DELETE',
            credentials: 'include',
        });
        if (!res.ok) throw new Error('Error deleting API key');
        setKeys(prev => prev.filter(k => k.id !== id));
        setSuccess('successDeleted');
        setDeleteDialogOpen(false);
    };

    const handleToggleKey = async (key: ApiKeyItem) => {
        setKeys(prev => prev.map(k => k.id === key.id ? { ...k, enabled: !k.enabled } : k));
        const res = await fetch(`/api/apikeys/${key.id}/toggle`, {
            method: 'PUT',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ enabled: !key.enabled }),
        });
        // Revert on failure
        if (!res.ok) setKeys(prev => prev.map(k => k.id === key.id ? { ...k, enabled: key.enabled } : k));
    };

    return {
        state: {
            keys,
            loading,
            error,
            success,
            createDialogOpen,
            createdKey,
            editDialogOpen,
            editTarget,
            deleteDialogOpen,
            deleteTarget,
        },
        actions: {
            handleOpenCreate,
            handleCreateKey,
            handleCloseCreate,
            handleOpenEdit,
            handleEditKey,
            handleOpenDelete,
            handleDeleteKey,
            handleToggleKey,
            clearError: () => setError(null),
            clearSuccess: () => setSuccess(null),
            setEditDialogOpen,
            setDeleteDialogOpen,
        },
    };
};
