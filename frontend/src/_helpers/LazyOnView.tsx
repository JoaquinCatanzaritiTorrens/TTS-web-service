import { useInView } from 'react-intersection-observer';
import { Suspense, lazy } from 'react';
import Skeleton from '@mui/material/Skeleton';

const LazyOnView = ({ importFn, skeleton = <Skeleton variant="rectangular" width="100%" height={200} /> }) => {
    const { ref, inView } = useInView({ triggerOnce: true, rootMargin: '200px' });
    const Component = inView ? lazy(importFn) : null;

    return (
        <div ref={ref}>
            {Component ? (
                <Suspense fallback={skeleton}>
                    <Component />
                </Suspense>
            ) : (
                skeleton
            )}
        </div>
    );
};

export default LazyOnView;
