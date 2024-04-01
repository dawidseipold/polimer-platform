<script lang="ts">
	import { cn } from '$utils';
	import type { HTMLAttributes } from 'svelte/elements';

	type $$Props = HTMLAttributes<HTMLTableRowElement> & {
		'data-state'?: unknown;
		selected?: boolean;
	};

	let className: $$Props['class'] = undefined;
	let selected: boolean = false;

	export { className as class, selected };
</script>

<tr
	class={cn('transition-colors hover:bg-popover/50', className, {
		['bg-popover/25']: selected
	})}
	{...$$restProps}
	on:click
	on:keydown
>
	<slot />
</tr>
