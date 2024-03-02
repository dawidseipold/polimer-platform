import type { Input, InputEvents } from '$lib/components/ui/input';
import type { HTMLInputAttributes } from 'svelte/elements';
import Root from './input.svelte';
import type { Writable } from 'svelte/store';

type Props = HTMLInputAttributes & {
	filterValue: Writable<string>;
};

type Events = InputEvents;

export {
	// Local
	Root,
	type Props as Props,
	type Events as Events,

	// Global
	Root as DataTableInput,
	type Props as DataTableInputProps,
	type Events as DataTableInputEvents
};
