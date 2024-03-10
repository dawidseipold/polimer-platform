import type { Order, statuses } from '$lib/constants';
import Root from './dropdown.svelte';

type Props = {
	title: string;
	filterValues: string[];
	options: typeof statuses;
};

export {
	// Local
	Root,
	type Props,

	// Global
	Root as DataTableFilterDropdown,
	type Props as DataTableFilterDropdownProps
};
