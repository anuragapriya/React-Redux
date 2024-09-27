

import { store, authActions } from '_store';

const getRefreshToken = ({dispatchCall}) => {
    const dispatch= ()=> dispatchCall;
    const thresholdMinsToRefreshTokenBeforeExpiry = 2; // 5 mins
    // Get new token if and only if existing token is available
    const auth = store.getState().auth.value;
    if (auth) {

        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();

        const tokenExpiryDateTime = new Date(auth?.tokenExpiry);
        tokenExpiryDateTime.setMinutes(tokenExpiryDateTime.getMinutes() - thresholdMinsToRefreshTokenBeforeExpiry);
        const targetHours = tokenExpiryDateTime.getHours();
        const targetMinutes = tokenExpiryDateTime.getMinutes();
        const targetSeconds = tokenExpiryDateTime.getSeconds();

        if (hours === targetHours && minutes === targetMinutes && seconds === targetSeconds) {
            console.log(tokenExpiryDateTime);
            dispatch(authActions.refreshToken());
            console.log(tokenExpiryDateTime);
        }
    }
};

export default getRefreshToken;