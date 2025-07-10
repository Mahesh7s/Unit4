import { useEffect } from 'react';

export default function DailyNotification() {
  useEffect(() => {
    const now = new Date();
    const evening = new Date();
    evening.setHours(20, 0, 0, 0);

    const timeout = evening - now;
    if (timeout > 0) {
      setTimeout(() => {
        alert('Hey! Don’t forget to log today’s study and wellness activities 😊');
      }, timeout);
    }
  }, []);

  return null;
}
