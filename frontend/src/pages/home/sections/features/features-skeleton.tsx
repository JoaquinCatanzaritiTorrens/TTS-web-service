import { Box, Container, Skeleton } from '@mui/material';

const FeaturesSkeleton = () => {
    return (
        <Box sx={{ py: 5, bgcolor: 'rgba(0, 0, 0, 0.3)' }}>
            <Container maxWidth="lg">
                <Box sx={{ textAlign: 'center', mb: 4, maxWidth: 800, mx: 'auto' }}>
                    <Skeleton variant="text" height={60} width="50%" sx={{ mx: 'auto', mb: 2 }} />
                    <Skeleton variant="text" height={30} width="80%" sx={{ mx: 'auto', mb: 1 }} />
                    <Skeleton variant="text" height={30} width="60%" sx={{ mx: 'auto' }} />
                </Box>
                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: 1.5,
                    mt: 2
                }}>
                    {[...Array(6)].map((_, index) => (
                        <Box key={index} sx={{
                            bgcolor: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '12px',
                            p: 2,
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            <Box sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                height: 3,
                                bgcolor: 'rgba(59, 130, 246, 0.3)'
                            }} />
                            <Box sx={{ p: '1rem 0.5rem' }}>
                                <Skeleton variant="text" height={35} width="70%" sx={{ mb: 1 }} />
                                <Skeleton variant="text" height={20} width="100%" sx={{ mb: 0.5 }} />
                                <Skeleton variant="text" height={20} width="90%" />
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Container>
        </Box>
    );
};

export default FeaturesSkeleton;
