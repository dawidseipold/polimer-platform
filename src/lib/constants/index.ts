// export type Order = {
// 	id: string;
// 	createdAt: Date;
// 	amount: number;
// 	status: 'pending' | 'processing' | 'fulfilled' | 'invoiced' | 'cancelled';
// 	email: string;
// 	href: string;
// };

import type { OrderData } from './schemas/order';

export const statuses = [
	{ value: 'pending', label: 'Pending' },
	{ value: 'processing', label: 'Processing' },
	{ value: 'fulfilled', label: 'Fulfilled' },
	{ value: 'invoiced', label: 'Invoiced' },
	{ value: 'cancelled', label: 'Cancelled' }
];

export const data: OrderData[] = [
	{
		id: '728ed52f',
		createdAt: new Date('2021-06-02T19:24:00'),
		// amount: 100,
		status: 'pending'
		// email: 'test@test.com',
		// href: 'https://dummylink1.com'
	},
	{
		id: '489e1d42',
		createdAt: new Date('2021-06-02T19:24:00'),
		// amount: 125,
		status: 'processing'
		// email: 'test@test.pl',
		// href: 'https://dummylink2.com'
	},
	{
		id: '347283b1',
		createdAt: new Date('2021-06-02T19:24:00'),
		// amount: 160,
		status: 'fulfilled'
		// email: 'test@test.de',
		// href: 'https://dummylink3.com'
	},
	{
		id: '546b7f38',
		createdAt: new Date('2021-06-02T19:24:00'),
		// amount: 110,
		status: 'invoiced'
		// email: 'test@test.gb',
		// href: 'https://dummylink4.com'
	},
	{
		id: 'd6b3d3a1',
		createdAt: new Date('2021-06-02T19:24:00'),
		// amount: 90,
		status: 'cancelled'
		// email: 'test@test.us',
		// href: 'https://dummylink5.com'
	}
];
