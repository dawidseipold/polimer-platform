import Root from './status-badge.svelte';

type Props = {
	status: 'pending' | 'processing' | 'fulfilled' | 'invoiced' | 'cancelled';
};

export {
	// Local
	Root,
	type Props,

	// Global
	Root as DataTableStatusBadge,
	type Props as DataTableStatusBadgeProps
};
