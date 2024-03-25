// import type { SortByPropSet } from 'svelte-headless-table/plugins';
import Root from './header-options.svelte';

interface Props {
	id: string;
	// sort: SortByPropSet['thead.tr.th'];
}

export {
	// Local
	Root,
	type Props,

	// Global
	Root as HeaderOptions,
	type Props as HeaderOptionsProps
};
