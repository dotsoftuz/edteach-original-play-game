import { appWithTranslation } from 'next-i18next';

import 'styles/globals.css';
import Layout from 'components/layout';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default appWithTranslation(MyApp);
