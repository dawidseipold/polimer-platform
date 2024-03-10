import * as v from 'valibot';

export const OrderSchema = v.object({
	id: v.string(),
	createdAt: v.date(),
	status: v.picklist(['pending', 'processing', 'fulfilled', 'invoiced', 'cancelled'])
});

export type OrderData = v.Output<typeof OrderSchema>;
