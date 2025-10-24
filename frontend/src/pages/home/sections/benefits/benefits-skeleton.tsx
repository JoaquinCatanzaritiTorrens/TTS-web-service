import { Box, Container, Skeleton } from '@mui/material';

const BenefitsSkeleton = () => {
    return (
        <Box sx={{ py: 5 }}>
            <Container maxWidth="lg">
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <Skeleton variant="text" height={60} width="45%" sx={{ mx: 'auto', mb: 2 }} />
                    <Skeleton variant="text" height={30} width="60%" sx={{ mx: 'auto' }} />
                </Box>
                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: 4,
                    mt: 4
                }}>
                    {[...Array(6)].map((_, index) => (
                        <Box key={index} sx={{ textAlign: 'center' }}>
                            <Box sx={{
                                width: 80,
                                height: 80,
                                borderRadius: '50%',
                                mx: 'auto',
                                mb: 2,
                                bgcolor: 'rgba(59, 130, 246, 0.1)'
                            }}>
                                <Skeleton variant="circular" width={80} height={80} />
                            </Box>
                            <Skeleton variant="text" height={35} width="70%" sx={{ mx: 'auto', mb: 1 }} />
                            <Skeleton variant="text" height={20} width="100%" sx={{ mb: 0.5 }} />
                            <Skeleton variant="text" height={20} width="90%" sx={{ mx: 'auto' }} />
                        </Box>
                    ))}
                </Box>
            </Container>
        </Box>
    );
};

export default BenefitsSkeleton;
