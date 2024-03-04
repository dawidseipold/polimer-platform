import type { Readable } from 'svelte/motion';
import Root from './row.svelte';
import type { HeaderRow } from 'svelte-headless-table';

type Props = {
	cell: any;
	props: any;
	attrs: any;
};

export {
	// Local
	Root,
	type Props,

	// Global
	Root as DataTableHeaderRow,
	type Props as DataTableHeaderRowProps
};
