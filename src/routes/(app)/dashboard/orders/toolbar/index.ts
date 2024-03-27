import Root from './toolbar.svelte';

// Types
import type { TableViewModel } from 'svelte-headless-table';
import type { OrderData } from '$lib/constants/schemas/order';
import type { AnyPlugins } from 'svelte-headless-table/plugins';
import type { PageSize } from '$lib/utils/table';

type Props = {
	tableViewModel: TableViewModel<OrderData, AnyPlugins>;
};

export {
	// Public
	Root,
	type Props,

	// Global
	Root as DataTableToolbar,
	type Props as DataTableToolbarProps
};
