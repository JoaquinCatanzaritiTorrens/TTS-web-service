import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const usePageTitle = (titleKey: string) => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.title = t(titleKey);
  }, [t, titleKey, i18n.language]);
};
