import type { NextApiRequest, NextApiResponse } from 'next';
import httpProxy, { ProxyResCallback } from 'http-proxy';
import Cookies from 'cookies';
import axios from 'axios';

type Data = {
    message: string;
};

export const config = {
    api: {
        bodyParser: false,
    },
};

const proxy = httpProxy.createProxyServer();

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method !== 'POST') {
        return res.status(400).json({ message: 'method not supported' });
    }
    return new Promise((resolve) => {
        //todo don't send cookies to api server
        req.headers.cookie = '';

        const handleLoginResponse: ProxyResCallback = (proxyRes, req, res) => {
            let body = '';
            proxyRes.on('data', function (chunk) {
                body += chunk;
            });
            proxyRes.on('end', function () {
                try {
                    const { accessToken, expiredAt } = JSON.parse(body);

                    //todo convert token to cookies
                    const cookies = new Cookies(req, res, {
                        secure: process.env.NODE_ENV !== 'development',
                    });

                    cookies.set('access_token', accessToken, {
                        httpOnly: true,
                        sameSite: 'lax',
                        expires: new Date(expiredAt),
                    });
                    //todo ep kieu res  sang NextApiResponse tra ve message login success
                    (res as NextApiResponse).status(200).json({ message: 'login successfully' });
                } catch (error) {
                    (res as NextApiResponse).status(500).json({ message: 'something went wrong' });
                }
            });
            resolve(true);
        };

        proxy.once('proxyRes', handleLoginResponse);
        proxy.web(req, res, {
            target: process.env.API_URL,
            changeOrigin: true,
            selfHandleResponse: true,
        });
    });
}
