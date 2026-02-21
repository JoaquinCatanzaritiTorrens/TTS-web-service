import { Router } from 'express';
import { checkJwt } from '../../__shared__/middleware/checkJWT';
import {
    createApiKey,
    getApiKeys,
    updateApiKeyName,
    toggleApiKey,
    deleteApiKey,
} from './apikey-controller';

const router = Router();

router.post('/', checkJwt, createApiKey);
router.get('/', checkJwt, getApiKeys);
router.put('/:id/name', checkJwt, updateApiKeyName);
router.put('/:id/toggle', checkJwt, toggleApiKey);
router.delete('/:id', checkJwt, deleteApiKey);

export default router;
