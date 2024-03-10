import Root from './info.svelte';

type Props = {
	id: string;
};

export {
	// Local
	Root,
	type Props,

	// Global
	Root as RowInfo,
	type Props as RowInfoProps
};
