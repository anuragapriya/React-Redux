import React from 'react';
import { CircularProgress, Backdrop } from '@mui/material';

const LoadingOverlay = ({ ...props }) => {
    const { loading } = props;
    return (
        <div>
            {loading && (
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={loading}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            )}
        </div>
    )
};

export default LoadingOverlay;
