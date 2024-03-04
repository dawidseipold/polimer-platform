import type { Writable } from 'svelte/store';
import Root from './checkbox.svelte';

type Props = {
	checked: Writable<boolean>;
};

export {
	// Local
	Root,
	type Props,

	// Global
	Root as DataTableCheckbox,
	type Props as DataTableCheckboxProps
};
