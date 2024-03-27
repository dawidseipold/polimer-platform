import type { Readable } from 'svelte/store';
import Root from './indicator.svelte';

type Props = {
	page: Readable<number>;
	perPage: Readable<number>;
	count: number;
};

export {
	// Local
	Root,
	type Props,

	// Global
	Root as DataTableItemsIndicator,
	type Props as DataTableItemsIndicatorProps
};
