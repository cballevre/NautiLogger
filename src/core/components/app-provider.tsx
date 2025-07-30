import { Refine } from '@refinedev/core';
import routerProvider from '@refinedev/react-router';
import { dataProvider } from '@refinedev/supabase';
import { App as AntdApp, ConfigProvider } from 'antd';
import type { FC, PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserRouter } from 'react-router';

import { authProvider } from '@/auth/providers/auth-provider';
import { supabaseClient } from '@/core/utils/supabaseClient';

const AppProvider: FC<PropsWithChildren> = ({ children }) => {
  const { t, i18n } = useTranslation();

  const i18nProvider = {
    translate: (key: string, params: string) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };

  return (
    <BrowserRouter>
      <ConfigProvider>
        <AntdApp>
          <Refine
            dataProvider={dataProvider(supabaseClient)}
            authProvider={authProvider}
            routerProvider={routerProvider}
            i18nProvider={i18nProvider}
          >
            {children}
          </Refine>
        </AntdApp>
      </ConfigProvider>
    </BrowserRouter>
  );
};

export { AppProvider };
