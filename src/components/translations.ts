import { useLanguage } from './LanguageProvider';

export const useTranslations = (namespace?: string) => {
  const { translate } = useLanguage();

  return (key: string): string => {
    const fullKey = namespace ? `${namespace}.${key}` : key;
    return translate(fullKey) || fullKey; // 如果没找到翻译，返回 key 本身
  };
};
