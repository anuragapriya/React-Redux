import React, { useState, useRef, useEffect } from 'react';
import { useIdleTimer } from 'react-idle-timer';
import SessionTimeoutDialog from './SessionTimeoutDialog';

const SessionTimeout = ({ isAuthenticated, onLogout }) => {
  const [timeoutModalOpen, setTimeoutModalOpen] = useState(false);
  const [timeoutCountdown, setTimeoutCountdown] = useState(0);
  const idleTimerRef = useRef(null);
  const countdownRef = useRef(null);

  const handleOnIdle = () => {
    if (isAuthenticated) {
      setTimeoutModalOpen(true);
      startCountdown();
    }
  };

  const startCountdown = () => {
    let countdown = 10; // 10 seconds countdown
    setTimeoutCountdown(countdown);
    countdownRef.current = setInterval(() => {
      countdown -= 1;
      setTimeoutCountdown(countdown);
      if (countdown <= 0) {
        clearInterval(countdownRef.current);
        onLogout();
      }
    }, 1000);
  };

  const handleStayLoggedIn = () => {
    setTimeoutModalOpen(false);
    clearInterval(countdownRef.current);
    idleTimerRef.current.reset();
  };

  useEffect(() => {
    if (!isAuthenticated) {
      setTimeoutModalOpen(false);
      clearInterval(countdownRef.current);
    }
  }, [isAuthenticated]);

  useIdleTimer({
    ref: idleTimerRef,
    timeout: 1000 * 60 * 10, // 10 minutes
    onIdle: handleOnIdle,
    debounce: 500, // 500 milliseconds
  });

  return (
  
   <SessionTimeoutDialog
      open={timeoutModalOpen}
      countdown={timeoutCountdown}
      onLogout={onLogout}
      onContinue={handleStayLoggedIn}
    />

  );
};

export default SessionTimeout;
