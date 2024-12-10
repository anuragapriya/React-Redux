import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ModalPopup } from '_components';
import { verifiedRegistrationLabels, notVerifiedRegistrationLabels, genericlabels } from '_utils/labels';
import { registrationActions } from '_store/registration.slice';
import TimerModal from '_components/TimerModal';

const VerifiedRegistration = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const userVerify = useSelector((x) => x.registration?.verifiedUserData);
    const data = userVerify?.Data;
    const isVerified = data?.IsVerified;
    const portalKey = data?.PortalKey || '';
    const isRequiredCompleteRegistration = portalKey.toLowerCase() === 'mc' || portalKey.toLowerCase() === 'sd';

    useEffect(() => {
        const token = new URLSearchParams(location.search).get('token');
        const verifyEmail = async () => {
            try {
                const response = dispatch(registrationActions.getVerifiedUserData(token));
                console.log('Email verified successfully!', response.data);
            }
            catch (error) {
                console.error('Failed to verify email:', error);
            }
        }

        if (token) {
            verifyEmail();
        } else {
            console.error('Email verification token not found!');
        }
    }, [dispatch,location.search]);


    const handleClick = () => {
        if (portalKey.toLowerCase() === 'mc') {
            navigate('/registration/mapCenter');
        }
        else if (portalKey.toLowerCase() === 'sd') {
            navigate('/registration/diversity');
        }

        return;
    };

    const handleSubmit = () => {
        return;
    }

    return (
        <>
            {!(userVerify?.loading || userVerify?.error) && <div>
                {(isVerified && isRequiredCompleteRegistration) && <ModalPopup
                    header={verifiedRegistrationLabels.header}
                    message1={verifiedRegistrationLabels.message1}
                    message2={verifiedRegistrationLabels.message2}
                    btnPrimaryText={verifiedRegistrationLabels.btnPrimaryText}
                    btnSecondaryText={verifiedRegistrationLabels.btnSecondaryText}
                    handlePrimaryClick={handleClick}
                />
                }
                {(isVerified && !isRequiredCompleteRegistration) && <TimerModal
                    timerCountdown={5}
                    header={verifiedRegistrationLabels.header}
                    message1={verifiedRegistrationLabels.message1}
                    message2={verifiedRegistrationLabels.message2}
                    //  btnSecondaryText={verifiedRegistrationLabels.btnSecondaryText}
                    handleBtnSecondaryClick={handleClick}
                //  handlePrimaryClick={handleClick}
                />
                }
                {!isVerified && <ModalPopup
                    header={notVerifiedRegistrationLabels.header}
                    message1={notVerifiedRegistrationLabels.message1}
                    message2={notVerifiedRegistrationLabels.message2}
                    btnPrimaryText={notVerifiedRegistrationLabels.btnPrimaryText}
                    btnSecondaryText={notVerifiedRegistrationLabels.btnSecondaryText}
                    handlePrimaryClick={handleSubmit}
                />
                }
            </div>
            }
            {userVerify?.error &&
                <ModalPopup
                    header={genericlabels.lblError}
                    message1={`Failed to Register: ${userVerify.error}`}
                    btnSecondaryText={genericlabels.lblClose}
                />
            }
        </>);
}

export default VerifiedRegistration;