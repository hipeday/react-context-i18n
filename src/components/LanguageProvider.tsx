import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { LocaleType } from '../types/language';

type NestedTranslations = Record<string, any>;

interface LanguageContextProps {
  currentLocale: LocaleType;
  setLocale: (locale: LocaleType) => void;
  translate: (key: string) => string | undefined; // 翻译函数
}

interface LanguageProviderProps {
  children: ReactNode;
  loadMessages: (locale: LocaleType) => Promise<NestedTranslations>;
  locale: LocaleType;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(
  undefined
);

export const LanguageProvider = ({
  children,
  loadMessages,
  locale,
}: LanguageProviderProps): React.ReactElement => {
  const [currentLocale, setCurrentLocale] = useState<LocaleType>(locale);
  const [messages, setMessages] = useState<NestedTranslations>({});

  const setLanguage = (locale: LocaleType): void => {
    setCurrentLocale(locale);
  };

  useEffect(() => {
    loadMessages(currentLocale).then(setMessages);
  }, [currentLocale]);

  const translate = (key: string): string | undefined => {
    const keys = key.split('.'); // 按 `.` 分割
    let value: any = messages;
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        return undefined; // 如果键不存在，返回 undefined
      }
    }
    return typeof value === 'string' ? value : undefined;
  };

  return (
    <LanguageContext.Provider value={{ currentLocale, setLocale: setLanguage, translate }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};