import { useEffect, useState } from 'react';
import { ValueOf } from '../components/common/types';

export const browserTypes = {
  CHROME: 'Chrome',
  SAFARI: 'Safari',
  YANDEX: 'Yandex',
  SAMSUNG: 'Samsung',
  OPERA: 'Opera',
  FIREFOX: 'Firefox',
  UNKNOWN: 'Unknown',
} as const;

export const useCheckBrowser = (): ValueOf<typeof browserTypes> => {
  const [browserType, setBrowserType] = useState<ValueOf<typeof browserTypes>>(
    browserTypes.UNKNOWN
  );
  const detectBrowser = (): void => {
    const userAgent = navigator.userAgent;

    if (userAgent.match(/chrome|chromium|crios/i)) {
      setBrowserType(browserTypes.CHROME);
    } else if (userAgent.match(/safari/i)) {
      setBrowserType(browserTypes.SAFARI);
    } else if (userAgent.match(/yabrowser/i)) {
      setBrowserType(browserTypes.YANDEX);
    } else if (userAgent.match(/samsung/i)) {
      setBrowserType(browserTypes.SAMSUNG);
    } else if (userAgent.match(/opr\//i)) {
      setBrowserType(browserTypes.OPERA);
    } else if (userAgent.match(/firefox|fxios/i)) {
      setBrowserType(browserTypes.FIREFOX);
    }
  };

  useEffect(() => {
    detectBrowser();
  }, []);

  return browserType;
};
