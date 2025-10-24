import { Box, Container, Skeleton } from '@mui/material';

const UseCasesSkeleton = () => {
    return (
        <Box sx={{ py: 5, bgcolor: 'rgba(0, 0, 0, 0.2)' }}>
            <Container maxWidth="lg">
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <Skeleton variant="text" height={60} width="50%" sx={{ mx: 'auto', mb: 2 }} />
                    <Skeleton variant="text" height={30} width="70%" sx={{ mx: 'auto' }} />
                </Box>
                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: 2,
                    mt: 2
                }}>
                    {[...Array(4)].map((_, index) => (
                        <Box key={index} sx={{
                            bgcolor: 'rgba(255, 255, 255, 0.05)',
                            borderRadius: 2,
                            p: 3,
                            textAlign: 'center'
                        }}>
                            <Skeleton variant="circular" width={60} height={60} sx={{ mx: 'auto', mb: 2 }} />
                            <Skeleton variant="text" height={40} width="80%" sx={{ mx: 'auto', mb: 1 }} />
                            <Skeleton variant="text" height={20} width="100%" sx={{ mb: 1 }} />
                            <Skeleton variant="text" height={20} width="90%" sx={{ mx: 'auto' }} />
                        </Box>
                    ))}
                </Box>
            </Container>
        </Box>
    );
};

export default UseCasesSkeleton;
