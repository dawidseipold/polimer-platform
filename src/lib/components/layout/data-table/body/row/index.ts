import Root from './row.svelte';

type Props = {
	cell: any;
	attrs: any;
};

export {
	// Local
	Root,
	type Props,

	// Global
	Root as DataTableBodyRow,
	type Props as DataTableBodyRowProps
};
