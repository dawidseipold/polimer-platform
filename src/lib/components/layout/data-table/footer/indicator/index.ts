import type { Readable } from 'svelte/store';
import Root from './indicator.svelte';

type Props = {
	count: Readable<number>;
	perPage: Readable<number>;
	page: Readable<number>;
};

export {
	// Local
	Root,
	type Props,

	// Global
	Root as DataTableItemsIndicator,
	type Props as DataTableItemsIndicatorProps
};
