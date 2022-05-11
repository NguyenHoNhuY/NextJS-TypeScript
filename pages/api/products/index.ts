import type { NextApiRequest, NextApiResponse } from 'next';

type Data =
	| {
			data: any[];
			pagination: any;
	  }
	| { name: string };

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	//* truong hop request ko phai phuong thuc GET
	if (req.method !== 'GET') {
		return res.status(400).json({ name: 'method not supported' });
	}

	//* truong hop request la phuong thuc GET
	const response = await fetch('https://js-post-api.herokuapp.com/api/posts?_page=1&_limit=10');
	const responseJSon = await response.json();

	res.status(200).json(responseJSon);
}
