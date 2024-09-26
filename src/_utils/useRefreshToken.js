
import { useCallback } from 'react';
import { store, authActions } from '_store';
import { useDispatch, useSelector } from 'react-redux';

const useRefreshToken = () => {
    const dispatch = useDispatch();
    const auth = useSelector(x => x.auth.value);
    if (auth) {
        const tokenExpiryDateTime = new Date(auth?.tokenExpiry);
        const isValidExpiryDateTime = tokenExpiryDateTime instanceof Date && !isNaN(tokenExpiryDateTime);
        let timeOutToCallRefreshToken = 0 ; //1000 * 60 * 4; // 4 mins by default

        if (isValidExpiryDateTime) {
            const currentTime = Date.now();
            const thresholdMinsToRefreshTokenBeforeExpiry = 2; // 2 mins
            const refreshTokenCallTime = tokenExpiryDateTime.setMinutes(tokenExpiryDateTime.getMinutes() - thresholdMinsToRefreshTokenBeforeExpiry);

            timeOutToCallRefreshToken = refreshTokenCallTime - currentTime;

            setTimeout(() => getToken(), timeOutToCallRefreshToken);
        }
    }
    const getToken = useCallback(async () => {
        // Get new token if and only if existing token is available
        const auth = store.getState().auth.value;
        if (auth) {
            await dispatch(authActions.refreshToken());
        }
    }, []);
}

export default useRefreshToken;