import Root from './row-actions.svelte';

type Props = {
	id: string;
};

export {
	// Local
	Root,
	type Props,

	// Global
	Root as RowActions,
	type Props as RowActionsProps
};
