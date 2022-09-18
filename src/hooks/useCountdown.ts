import { useEffect, useState } from "react";

export interface ICountdown {
  raw: number;
  minutes: number;
  seconds: number;
}

export const useCountdown = (
  targetDate: number
): {
  setCountdown: React.Dispatch<React.SetStateAction<number | null>>;
  countdown: ICountdown | null;
} => {
  const [countdown, setCountdown] = useState<number | null>(null);

  useEffect(() => {
    if (targetDate > Date.now()) {
      const interval = setInterval(() => {
        if (targetDate - Date.now() <= 0) {
          setCountdown(0);
          clearInterval(interval);
        } else {
          setCountdown(targetDate - Date.now());
        }
      }, 1000);

      return (): void => clearInterval(interval);
    }
  }, [targetDate]);

  if (countdown === null) {
    return {
      countdown,
      setCountdown,
    };
  }
  return {
    countdown: { raw: countdown, ...formatCountdown(countdown) },
    setCountdown,
  };
};

const formatCountdown = (
  countdown: number
): Pick<ICountdown, "minutes" | "seconds"> => {
  // todo 00:00 format instead of 0:0
  const minutes = Math.floor((countdown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countdown % (1000 * 60)) / 1000);

  return { minutes, seconds };
};
