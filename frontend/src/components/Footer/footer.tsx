import { Box, Container, Link, Typography, IconButton, Stack, Tooltip } from "@mui/material"
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import './footer.css';

const Footer = () => {
    const { t } = useTranslation();
    const currentYear = new Date().getFullYear();

    return (
        <Box
            component="footer"
            className="footer-root"
            sx={(theme) => ({
                bgcolor: theme.palette.mode === 'dark' ? 'background.default' : 'background.paper',
                color: 'text.primary',
                borderTop: theme.palette.mode === 'dark' ? '1.5px solid #334155' : '1.5px solid #e2e8f0',
                boxShadow: theme.palette.mode === 'dark'
                    ? '0 -4px 24px 0 rgba(96, 165, 250, 0.08)'
                    : '0 -4px 24px 0 rgba(37, 99, 235, 0.06)',
                position: 'relative',
                zIndex: 1200,
                mt: 8,
            })}
        >
            <Box className="footer-separator" sx={{ bgcolor: 'divider', height: '2px', opacity: 0.5 }} />
            <Container maxWidth="xl">
                <Box className="footer-content" sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    py: 2,
                    gap: 2,
                }}>
                    <Box className="footer-text" sx={{ mb: { xs: 2, md: 0 }, textAlign: { xs: 'center', md: 'left' } }}>
                        <Typography variant="body2" color="text.secondary">
                            {t('footer.reservedRights', { year: currentYear })}
                        </Typography>
                    </Box>
                    <Box className="footer-icon-container">
                        <Stack direction="row" spacing={1}>
                            <Tooltip title={t('footer.linkedIn')}>
                                <IconButton
                                    aria-label="linkedin"
                                    href="https://www.linkedin.com/in/joaquin-catanzariti-torrens-730897263/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-icon linkedin-icon"
                                >
                                    <LinkedInIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title={t('footer.gitHub')}>
                                <IconButton
                                    aria-label="github"
                                    href="https://github.com/JoaquinCatanzaritiTorrens"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-icon github-icon"
                                >
                                    <GitHubIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>
                        </Stack>
                    </Box>
                    <Box className="footer-links" sx={{ display: 'flex', gap: 2 }}>
                        <Link component={RouterLink} to="/privacy-policy" color="text.secondary" underline="hover" variant="body2">
                            {t('footer.privacyPolicy')}
                        </Link>
                        <Link component={RouterLink} to="/terms-of-service" color="text.secondary" underline="hover" variant="body2">
                            {t('footer.termsOfService')}
                        </Link>
                        <Link component={RouterLink} to="/cookies-policy" color="text.secondary" underline="hover" variant="body2">
                            {t('footer.cookies')}
                        </Link>
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}

export default Footer

