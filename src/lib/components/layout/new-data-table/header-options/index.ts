import Root from './header-options.svelte';

interface Props {
	id: string;
}

export {
	// Local
	Root,
	type Props,

	// Global
	Root as HeaderOptions,
	type Props as HeaderOptionsProps
};
