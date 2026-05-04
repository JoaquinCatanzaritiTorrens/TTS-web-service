import { describe, it, expect, vi } from 'vitest';
import { generateToken, sendTokenAsCookie, isValidEmail } from './auth-helpers';
import { Response } from 'express';
import jwt from 'jsonwebtoken';

vi.mock('jsonwebtoken', () => {
    return {
        default: {
            sign: vi.fn(),
        },
    };
});

describe('Auth Helpers', () => {
    describe('generateToken', () => {
        it('should generate a jwt token for a user', () => {
            const user = { id: 1, email: 'test@example.com' };
            const fakeToken = 'header.payload.signature';
            vi.mocked(jwt.sign).mockReturnValue(fakeToken as any);

            const token = generateToken(user);
            expect(jwt.sign).toHaveBeenCalledWith({ id: user.id, email: user.email }, expect.any(String), { expiresIn: '7d' });
            expect(token).toBe(fakeToken);
        });
    });

    describe('sendTokenAsCookie', () => {
        it('should set the cookie on the response object', () => {
            const mockResponse = {
                cookie: vi.fn(),
            } as unknown as Response;

            sendTokenAsCookie(mockResponse, 'my-token');

            expect(mockResponse.cookie).toHaveBeenCalledWith('token', 'my-token', expect.objectContaining({
                httpOnly: true,
                maxAge: 7 * 24 * 60 * 60 * 1000,
            }));
        });
    });

    describe('isValidEmail', () => {
        it('should return true for a valid email', () => {
            expect(isValidEmail('test@example.com')).toBe(true);
        });

        it('should return false for an invalid email', () => {
            expect(isValidEmail('testexample.com')).toBe(false);
            expect(isValidEmail('test@.com')).toBe(false);
            expect(isValidEmail('test@example')).toBe(false);
        });
    });
});