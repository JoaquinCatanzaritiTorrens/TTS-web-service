import { Router, Request, Response } from 'express';
import { AppDataSource } from '../../config/data-source';
import { checkJwt } from '../../__shared__/middleware/checkJWT';
import ApiKeyTypeOrmRepository from './database/typeorm/api-key-typeorm-repository';
import CreateApiKey from '../application/use-cases/create-api-key';
import GetApiKeys from '../application/use-cases/get-api-keys';
import ToggleApiKey from '../application/use-cases/toggle-api-key';
import UpdateApiKeyName from '../application/use-cases/update-api-key-name';
import DeleteApiKey from '../application/use-cases/delete-api-key';

const router = Router();

router.use(checkJwt);

router.post('/', async (req: Request, res: Response) => {
    const { name } = req.body;
    const { id: userId } = (req as any).user;
    if (!name || name.trim() === '') return res.status(400).json({ message: 'Name is required' });

    try {
        const repo = new ApiKeyTypeOrmRepository(AppDataSource);
        const createApiKey = new CreateApiKey(repo);
        const result = await createApiKey.execute(userId, name);
        res.status(201).json(result);
    } catch (error) { res.status(500).json({ message: 'Server error' }); }
});

router.get('/', async (req: Request, res: Response) => {
    const { id: userId } = (req as any).user;
    try {
        const repo = new ApiKeyTypeOrmRepository(AppDataSource);
        const getApiKeys = new GetApiKeys(repo);
        const keys = await getApiKeys.execute(userId);
        res.json(keys);
    } catch (error) { res.status(500).json({ message: 'Server error' }); }
});

router.put('/:id/name', async (req: Request, res: Response) => {
    const { id: userId } = (req as any).user;
    const { name } = req.body;
    if (!name || name.trim() === '') return res.status(400).json({ message: 'Name is required' });

    try {
        const repo = new ApiKeyTypeOrmRepository(AppDataSource);
        const updateName = new UpdateApiKeyName(repo);
        const updated = await updateName.execute(parseInt(req.params.id), userId, name);
        res.json(updated);
    } catch (error) { res.status(404).json({ message: 'Not found or error', error }); }
});

router.put('/:id/toggle', async (req: Request, res: Response) => {
    const { id: userId } = (req as any).user;
    const { enabled } = req.body;
    
    try {
        const repo = new ApiKeyTypeOrmRepository(AppDataSource);
        const toggleKey = new ToggleApiKey(repo);
        const updated = await toggleKey.execute(parseInt(req.params.id), userId, enabled);
        res.json(updated);
    } catch (error) { res.status(404).json({ message: 'Not found or error' }); }
});

router.delete('/:id', async (req: Request, res: Response) => {
    const { id: userId } = (req as any).user;
    try {
        const repo = new ApiKeyTypeOrmRepository(AppDataSource);
        const deleteKey = new DeleteApiKey(repo);
        await deleteKey.execute(parseInt(req.params.id), userId);
        res.status(204).send();
    } catch (error) { res.status(404).json({ message: 'Not found or error' }); }
});

export default router;