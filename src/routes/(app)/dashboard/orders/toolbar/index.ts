import Root from './toolbar.svelte';

// Types
import type { TableViewModel } from 'svelte-headless-table';
import type { OrderData } from '$lib/constants/schemas/order';
import type { AnyPlugins } from 'svelte-headless-table/plugins';
import type {} from 'svelte-headless-table';
import type { PageSize } from '$lib/utils/table';

// TODO: Dynamic types
type Props = {
	tableViewModel: TableViewModel<any, AnyPlugins>;
};

export {
	// Public
	Root,
	type Props,

	// Global
	Root as DataTableToolbar,
	type Props as DataTableToolbarProps
};
