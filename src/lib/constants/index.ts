type Order = {
	id: string;
	amount: number;
	status: 'pending' | 'processing' | 'success' | 'failed';
	email: string;
	href: string;
};

export const data: Order[] = [
	{
		id: '728ed52f',
		amount: 100,
		status: 'pending',
		email: 'test@test.com',
		href: 'https://dummylink1.com'
	},
	{
		id: '489e1d42',
		amount: 125,
		status: 'processing',
		email: 'test@test.pl',
		href: 'https://dummylink2.com'
	}
	// Add more elements with the "href" field here
];
