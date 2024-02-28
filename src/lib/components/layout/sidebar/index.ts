import { tv, type VariantProps } from 'tailwind-variants';
import Root from './sidebar.svelte';

const sidebarVariants = tv({
	slots: {
		base: 'min-w-64 flex flex-col justify-start items-start gap-y-4 border-r-2 border-r-muted-foreground h-screen bg-muted',
		logo: 'border-b-2 border-b-muted-foreground w-full h-16',
		list: 'flex flex-col w-full gap-y-2 p-4 pt-0',
		item: 'flex justify-start items-center gap-x-2 px-4 py-3 rounded-md text-foreground hover:bg-popover-hover w-full',
		collapsible: 'flex flex-col items-start gap-y-2 w-full',
		content: 'w-full flex flex-col gap-y-2'
	},
	variants: {},
	defaultVariants: {}
});

type Props = {
	pathname: string;
	class?: string;
};

type Events = {};

export {
	// Local
	Root,
	type Props,
	type Events,

	// Global
	Root as Sidebar,
	type Props as SidebarProps,
	type Events as SidebarEvents,
	sidebarVariants
};
