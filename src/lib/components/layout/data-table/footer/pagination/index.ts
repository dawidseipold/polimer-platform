import type { PaginationProps } from 'bits-ui';
import Root from './pagination.svelte';
import { type Writable } from 'svelte/store';

type Props = PaginationProps & {
	// hasPreviousPage: Writable<boolean>;
	// hasNextPage: Writable<boolean>;
	hasPreviousPage: boolean;
	hasNextPage: boolean;
	count: number;
	perPage: number;
	page: number;
	onPreviousPage: () => void;
	onNextPage: () => void;
};

export {
	// Local
	Root,
	type Props,

	// Global
	Root as DataTablePagination,
	type Props as DataTablePaginationProps
};
