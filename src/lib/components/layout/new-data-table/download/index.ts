import Root from './download.svelte';

type Props = {
	href: string;
};

export {
	// Local
	Root,
	type Props,

	// Global
	Root as RowDownload,
	type Props as RowDownloadProps
};
