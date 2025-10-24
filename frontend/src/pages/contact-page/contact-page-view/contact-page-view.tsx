import { Box, Container, Paper, Stack, TextField, Button } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import useContactPageView from './use-contact-page-view';
import CustomSnackbar from "src/components/Snackbar/snackbar";
import GradientText from "src/components/GradientText/GradientText";
import './contact-page-view.css';

const ContactPageView = () => {
    const {
        state: {
            name, email, message,
            nameLength, emailLength, messageLength,
            MAX_NAME, MAX_EMAIL, MAX_MESSAGE,
            isSubmitting, error, success, t
        },
        actions: {
            handleNameChange, handleEmailChange, handleMessageChange,
            handleSubmit, handleSnackbarClose,
        }
    } = useContactPageView();

    return (
        <>
            <Box
                className="contact"
                sx={{
                    bgcolor: "background.default"
                }}
            >
                <Container maxWidth="sm">
                    <Box sx={{ textAlign: 'center', marginBottom: 6 }}>
                        <GradientText align="center" animated={true}>
                            {t('contact.getInTouch')}
                        </GradientText>
                    </Box>
                    <Paper
                        component="form"
                        elevation={0}
                        sx={{
                            bgcolor: 'background.paper',
                            border: '1px solid',
                            borderColor: 'divider',
                            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
                            '&:hover': {
                                boxShadow: '0 15px 50px rgba(0, 0, 0, 0.15)',
                                transform: 'translateY(-2px)'
                            },
                            transition: 'all 0.3s ease'
                        }}
                        className="contact-form"
                        onSubmit={handleSubmit}
                    >
                        <Stack spacing={3}>
                            <TextField
                                label={t('contact.name')}
                                value={name}
                                onChange={handleNameChange}
                                helperText={`${nameLength}/${MAX_NAME}`}
                                disabled={isSubmitting}
                                fullWidth
                                variant="outlined"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            transform: 'translateY(-1px)'
                                        }
                                    }
                                }}
                            />
                            <TextField
                                label={t('contact.email')}
                                type="email"
                                value={email}
                                onChange={handleEmailChange}
                                helperText={`${emailLength}/${MAX_EMAIL}`}
                                disabled={isSubmitting}
                                fullWidth
                                variant="outlined"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            transform: 'translateY(-1px)'
                                        }
                                    }
                                }}
                            />
                            <TextField
                                label={t('contact.message')}
                                multiline rows={4}
                                value={message}
                                onChange={handleMessageChange}
                                helperText={`${messageLength}/${MAX_MESSAGE}`}
                                disabled={isSubmitting}
                                fullWidth
                                variant="outlined"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            transform: 'translateY(-1px)'
                                        }
                                    }
                                }}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                className="submit-button"
                                disabled={isSubmitting}
                                endIcon={!isSubmitting && <SendIcon />}
                                sx={{
                                    background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
                                    padding: '12px 32px',
                                    borderRadius: '8px',
                                    fontWeight: 600,
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        background: 'linear-gradient(135deg, #1d4ed8 0%, #6d28d9 100%)',
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 6px 25px rgba(37, 99, 235, 0.4)'
                                    },
                                    '&:disabled': {
                                        background: '#6b7280',
                                        transform: 'none',
                                        boxShadow: 'none'
                                    }
                                }}
                            >
                                {isSubmitting ? t('contact.sending') : t('contact.send')}
                            </Button>
                        </Stack>
                    </Paper>
                </Container>
            </Box>
            <CustomSnackbar error={error} success={success} onClose={handleSnackbarClose} />
        </>
    );
};

export default ContactPageView;