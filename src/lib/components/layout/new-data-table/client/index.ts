import type { OrderData } from '$lib/constants/schemas/order';
import Root from './client.svelte';

interface Props {
	client: OrderData['client'];
}

export {
	// Local
	Root,
	type Props,

	// Global
	Root as DataTableClient,
	type Props as DataTableClientProps
};
