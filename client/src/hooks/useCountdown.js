import { useState, useEffect } from 'react';

/**
 * useCountdown
 * Returns { days, hours, minutes, seconds, isDone } until the target date.
 * The target must be a full ISO string with offset (e.g. '2026-11-07T08:00:00+02:00')
 * so every guest counts down to the same moment regardless of their timezone.
 */
export default function useCountdown(targetDate) {
  const getTimeLeft = () => {
    const diff = new Date(targetDate) - new Date();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, isDone: true };
    return {
      days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours:   Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
      isDone: false,
    };
  };

  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    /* Align ticks to the next whole second so we never double-tick */
    let id;
    const schedule = () => {
      const delay = 1000 - (Date.now() % 1000);
      id = setTimeout(() => {
        setTimeLeft(getTimeLeft());
        if (document.visibilityState === 'visible') schedule();
        else id = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
      }, delay);
    };
    schedule();

    const onVisible = () => {
      if (document.visibilityState === 'visible') {
        clearInterval(id);
        setTimeLeft(getTimeLeft());
        schedule();
      }
    };
    document.addEventListener('visibilitychange', onVisible);
    return () => { clearTimeout(id); clearInterval(id); document.removeEventListener('visibilitychange', onVisible); };
  }, [targetDate]);

  return timeLeft;
}
