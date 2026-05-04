import { describe, it, expect, vi, beforeEach } from 'vitest';
import { checkJwt } from './checkJWT';
import jwt from 'jsonwebtoken';

vi.mock('jsonwebtoken');

describe('checkJwt Middleware', () => {
    let mockReq: any;
    let mockRes: any;
    let mockNext: any;

    beforeEach(() => {
        mockReq = {
            cookies: {},
        };
        mockRes = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn(),
        };
        mockNext = vi.fn();
        vi.clearAllMocks();
    });

    it('should return 403 if no token is provided', () => {
        checkJwt(mockReq, mockRes, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(403);
        expect(mockRes.json).toHaveBeenCalledWith({ message: 'Access denied' });
        expect(mockNext).not.toHaveBeenCalled();
    });

    it('should return 401 if token is invalid', () => {
        mockReq.cookies.token = 'invalid-token';
        vi.mocked(jwt.verify).mockImplementation(() => {
            throw new Error('Invalid token');
        });

        checkJwt(mockReq, mockRes, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(401);
        expect(mockRes.json).toHaveBeenCalledWith({ message: 'Invalid token' });
        expect(mockNext).not.toHaveBeenCalled();
    });

    it('should call next and set user info if token is valid', () => {
        mockReq.cookies.token = 'valid-token';
        const decodedToken = { id: 1, email: 'test@example.com' };
        vi.mocked(jwt.verify).mockReturnValue(decodedToken as any);

        checkJwt(mockReq, mockRes, mockNext);

        expect(jwt.verify).toHaveBeenCalledWith('valid-token', process.env.JWT_SECRET || "defaultSecret");
        expect(mockReq.user).toEqual(decodedToken);
        expect(mockReq.userId).toBe(1);
        expect(mockNext).toHaveBeenCalled();
    });
});