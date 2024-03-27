import { generatePageSizes, type PageSize } from '$lib/utils/table';
import { get, readable, writable } from 'svelte/store';

export const pageSizes = readable(generatePageSizes([20, 50, 100, 250, 500]));

export let activePageSize = writable<PageSize>(get(pageSizes)[0]);
