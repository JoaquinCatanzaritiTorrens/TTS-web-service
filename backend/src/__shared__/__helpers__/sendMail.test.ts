import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SendEmail } from './sendMail';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

vi.mock('nodemailer');
vi.mock('fs');
vi.mock('path');

describe('SendEmail utility', () => {
    let mockSendMail: any;

    beforeEach(() => {
        vi.clearAllMocks();
        mockSendMail = vi.fn().mockResolvedValue(true);
        vi.mocked(nodemailer.createTransport).mockReturnValue({
            sendMail: mockSendMail,
        } as any);
        
        vi.mocked(path.join).mockImplementation((...args) => args.join('/'));
    });

    describe('loadTemplate & sendEmail explicitly', () => {
        it('should load template and replace variables', async () => {
            vi.mocked(fs.readFileSync).mockReturnValue('Hello {{name}}, your code is {{code}}');
            
            const emailService = new SendEmail();
            await emailService.sendVerificationEmail('test@example.com', '12345');

            expect(fs.readFileSync).toHaveBeenCalled();
            expect(mockSendMail).toHaveBeenCalledWith(expect.objectContaining({
                to: 'test@example.com',
                html: 'Hello {{name}}, your code is 12345',
                subject: 'Verify your email address'
            }));
        });
    });

    describe('sendContactEmail', () => {
         it('should send contact email correctly', async () => {
             vi.mocked(fs.readFileSync).mockReturnValue('Message from {{name}} at {{email}}: {{message}}');
             
             const emailService = new SendEmail();
             await emailService.sendContactEmail('John', 'john@example.com', 'Hello World');

             expect(mockSendMail).toHaveBeenCalledWith(expect.objectContaining({
                to: 'john@example.com',
                html: 'Message from John at john@example.com: Hello World',
                bcc: 'joaquin.catanzariti@gmail.com',
                subject: 'Contact form submission from joaquincatanzariti.com'
             }));
         });
    });
});