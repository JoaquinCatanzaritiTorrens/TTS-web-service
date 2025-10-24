import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import useSnackbar from "./use-snackbar";

interface CustomSnackbarProps {
    error: string | null;
    success: string | null;
    onClose: () => void;
}

const CustomSnackbar = ({ error, success, onClose }: CustomSnackbarProps) => {
    const message = error || success;

    if (!message) {
        return null;
    }

    const severity = error ? 'error' : 'success';
    const { open, message: displayMessage, handleClose } = useSnackbar(message, onClose);

    return (
        <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
            <Alert
                onClose={handleClose}
                severity={severity}
                sx={{ width: '100%' }}
            >
                {displayMessage}
            </Alert>
        </Snackbar>
    );
};

export default CustomSnackbar;
