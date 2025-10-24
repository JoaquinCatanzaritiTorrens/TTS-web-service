import { useEffect, useState } from "react";

const useSnackbar = (message: string | null, onClose?: () => void) => {
    const [open, setOpen] = useState(false);
    const [currentMessage, setCurrentMessage] = useState<string | null>(null);

    useEffect(() => {
        if (message) {
            setCurrentMessage(message);
            setOpen(true);
        }
    }, [message]);

    const handleClose = () => {
        setOpen(false);
        setTimeout(() => {
            setCurrentMessage(null);
            onClose?.();
        }, 600);
    };

    return {
        open,
        message: currentMessage,
        handleClose,
    };
};

export default useSnackbar;
