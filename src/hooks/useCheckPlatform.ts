import { useEffect, useState } from 'react';
import { ValueOf } from '../components/common/types';

export const browserPlatformTypes = {
  ANDROID: 'Android',
  IOS: 'IOS',
  UNKNOWN: 'Unknown',
} as const;

export const useCheckPlatform = (): ValueOf<typeof browserPlatformTypes> => {
  const [browserPlatform, setBrowserPlatform] = useState<ValueOf<typeof browserPlatformTypes>>(
    browserPlatformTypes.UNKNOWN
  );
  const detectBrowser = (): void => {
    const userAgent = navigator.userAgent;

    if (userAgent.match(/android/i)) {
      setBrowserPlatform(browserPlatformTypes.ANDROID);
    } else if (userAgent.match(/iPad|iPhone|iPod/i)) {
      setBrowserPlatform(browserPlatformTypes.IOS);
    }
  };

  useEffect(() => {
    detectBrowser();
  }, []);

  return browserPlatform;
};
