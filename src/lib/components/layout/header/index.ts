import { tv } from 'tailwind-variants';
import Root from './header.svelte';

const headerVariants = tv({
	slots: {
		base: 'flex justify-between items-center h-16 text-foreground p-4'
	}
});

type Props = {
	class?: string;
};
type Events = {};

export {
	// Local
	Root,
	type Props,
	type Events,

	// Global
	Root as Header,
	type Props as HeaderProps,
	type Events as HeaderEvents,
	headerVariants
};
