import type { Icon, IconNode } from 'lucide-svelte';
import Root from './settings.svelte';

interface Props {
	title: string;
	description: string;
}

export {
	// Local
	Root,
	type Props,

	// Global
	Root as DataTableSettings,
	type Props as DataTableSettingsProps
};
