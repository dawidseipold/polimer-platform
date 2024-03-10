import type { Writable } from 'svelte/store';
import Root from './checkbox.svelte';
import type { CheckboxProps } from 'bits-ui';

interface Props {
	class?: string;
	checked: Writable<boolean>;
}

export {
	// Local
	Root,
	type Props,

	// Global
	Root as RowCheckbox,
	type Props as RowCheckboxProps
};
