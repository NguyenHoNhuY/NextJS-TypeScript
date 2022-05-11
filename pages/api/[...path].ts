import type { NextApiRequest, NextApiResponse } from 'next';
import httpProxy from 'http-proxy';

export const config = {
	api: {
		bodyParser: false,
	},
};

const proxy = httpProxy.createProxyServer();

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
	//todo don't send cookies to api server

	req.headers.cookie = '';

	//* /api/students
	//* https://js-post-api.herokuapp.com/api/students

	proxy.web(req, res, {
		target: process.env.API_URl,
		changeOrigin: true,
		selfHandleResponse: false,
	});
}
