import { useState, ChangeEvent, FormEvent } from 'react';
import { useTranslation } from 'react-i18next';

const MAX_NAME = 50;
const MAX_EMAIL = 100;
const MAX_MESSAGE = 1000;

const useContactPageView = () => {
    const { t } = useTranslation();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length <= MAX_NAME) setName(e.target.value);
    };
    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length <= MAX_EMAIL) setEmail(e.target.value);
    };
    const handleMessageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length <= MAX_MESSAGE) setMessage(e.target.value);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(''); setSuccess('');
        if (!name || !email || !message) {
            setError(t('contact.errorFieldsRequired'));
            return;
        }
        setIsSubmitting(true);
        try {
            const res = await fetch(`/api/contact/send-contact-mail`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, message }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || t('contact.errorSending'));
            setSuccess(data.message || t('contact.successMessage'));
            setName(''); setEmail(''); setMessage('');
        } catch (err: any) {
            setError(err.message || t('contact.errorSubmission'));
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSnackbarClose = () => {
        setError('');
        setSuccess('');
    };

    return {
        state: {
            name,
            email,
            message,
            nameLength: name.length,
            emailLength: email.length,
            messageLength: message.length,
            MAX_NAME,
            MAX_EMAIL,
            MAX_MESSAGE,
            isSubmitting,
            error,
            success,
            t
        },
        actions: {
            handleNameChange,
            handleEmailChange,
            handleMessageChange,
            handleSubmit,
            handleSnackbarClose,
        },
    };
};

export default useContactPageView;