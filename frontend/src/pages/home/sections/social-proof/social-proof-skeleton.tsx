import { Box, Container, Skeleton } from '@mui/material';

const SocialProofSkeleton = () => {
    return (
        <Box sx={{ py: 5, bgcolor: 'rgba(0, 0, 0, 0.1)' }}>
            <Container maxWidth="lg">
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <Skeleton variant="text" height={60} width="60%" sx={{ mx: 'auto', mb: 2 }} />
                    <Skeleton variant="text" height={30} width="40%" sx={{ mx: 'auto' }} />
                </Box>
                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                    gap: 3,
                    alignItems: 'center'
                }}>
                    {[...Array(6)].map((_, index) => (
                        <Skeleton
                            key={index}
                            variant="rectangular"
                            height={80}
                            sx={{ borderRadius: 2 }}
                        />
                    ))}
                </Box>
            </Container>
        </Box>
    );
};

export default SocialProofSkeleton;
