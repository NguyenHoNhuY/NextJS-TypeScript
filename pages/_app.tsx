import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';
import axiosClient from 'api-client/axios-client';
import { AppPropsWithLayout } from '../models';
import { EmptyLayout } from '@/components/layout';

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const Layout = Component.Layout || EmptyLayout;
    return (
        <SWRConfig
            value={{
                fetcher: (url) => axiosClient.get(url),
                shouldRetryOnError: false,
            }}
        >
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </SWRConfig>
    );
}

export default MyApp;
