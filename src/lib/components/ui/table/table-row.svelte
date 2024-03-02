<script lang="ts">
	import { cn } from "$utils";
	import type { HTMLAttributes } from "svelte/elements";

	type $$Props = HTMLAttributes<HTMLTableRowElement> & {
		"data-state"?: unknown;
	};

	let className: $$Props["class"] = undefined;
	export { className as class };
</script>

	<tr
	class={cn(
		"transition-colors hover:bg-popover/50",
		className
	)}
	{...$$restProps}
	on:click
	on:keydown
>
	<slot />
</tr>
