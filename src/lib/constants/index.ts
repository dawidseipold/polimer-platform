type Order = {
	id: string;
	amount: number;
	status: 'pending' | 'processing' | 'fulfilled' | 'invoiced' | 'cancelled';
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
	},
	{
		id: '347283b1',
		amount: 160,
		status: 'fulfilled',
		email: 'test@test.de',
		href: 'https://dummylink3.com'
	},
	{
		id: '546b7f38',
		amount: 110,
		status: 'invoiced',
		email: 'test@test.gb',
		href: 'https://dummylink4.com'
	},
	{
		id: 'd6b3d3a1',
		amount: 90,
		status: 'cancelled',
		email: 'test@test.us',
		href: 'https://dummylink5.com'
	}
];
