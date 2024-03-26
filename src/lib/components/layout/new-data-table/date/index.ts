import Root from './date.svelte';
import type { DateValue } from '@internationalized/date';

interface Props {
	value: Date;
}

export {
	// Local
	Root,
	type Props,

	// Global
	Root as DataTableDate,
	type Props as DataTableDateProps
};
