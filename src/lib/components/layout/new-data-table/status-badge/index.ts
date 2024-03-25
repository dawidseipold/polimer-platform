import Root from './status-badge.svelte';

type Props = {
	status: string;
};

export {
	// Local
	Root,
	type Props,

	// Global
	Root as DataTableStatusBadge,
	type Props as DataTableStatusBadgeProps
};
