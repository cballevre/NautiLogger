import { Refine } from '@refinedev/core';
import { dataProvider } from '@refinedev/supabase';
import routerProvider from '@refinedev/react-router';
import { ConfigProvider, App as AntdApp } from 'antd';
import { BrowserRouter } from 'react-router';
import { useTranslation } from 'react-i18next';

import { supabaseClient } from './utils/supabaseClient';
import { authProvider } from './providers/auth-provider.ts';
import { AppRouter } from './app-router.tsx';

function App() {
  const { t, i18n } = useTranslation();

  const i18nProvider = {
    translate: (key: string, params: object) => t(key, params),
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
            <AppRouter />
          </Refine>
        </AntdApp>
      </ConfigProvider>
    </BrowserRouter>
  );
}

export default App;
