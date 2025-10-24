import { Box, Container, Skeleton } from '@mui/material';

const FinalCTASkeleton = () => {
    return (
        <Box sx={{ py: 8, bgcolor: 'rgba(0, 0, 0, 0.4)' }}>
            <Container maxWidth="md">
                <Box sx={{ textAlign: 'center' }}>
                    <Skeleton variant="text" height={70} width="80%" sx={{ mx: 'auto', mb: 3 }} />
                    <Skeleton variant="text" height={30} width="60%" sx={{ mx: 'auto', mb: 4 }} />
                    <Box sx={{
                        display: 'flex',
                        gap: 2,
                        justifyContent: 'center',
                        flexDirection: { xs: 'column', sm: 'row' },
                        alignItems: 'center'
                    }}>
                        <Skeleton
                            variant="rectangular"
                            height={56}
                            width={200}
                            sx={{ borderRadius: 2 }}
                        />
                        <Skeleton
                            variant="rectangular"
                            height={56}
                            width={180}
                            sx={{ borderRadius: 2 }}
                        />
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default FinalCTASkeleton;
