import * as v from 'valibot';

export const ClientSchema = v.object({
	id: v.string(),
	name: v.string(),
	employee: v.object({
		name: v.string(),
		email: v.string()
	})
});

export const OrderSchema = v.object({
	id: v.string(),
	createdAt: v.date(),
	status: v.picklist(['pending', 'processing', 'fulfilled', 'invoiced', 'cancelled']),
	client: ClientSchema
});

export type OrderData = v.Output<typeof OrderSchema>;
