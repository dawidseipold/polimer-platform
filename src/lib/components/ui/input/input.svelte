<!-- TODO: REMAKE THIS COMPONENT FROM SCRATCH ITS SHIT -->

<script lang="ts">
	import type { HTMLInputAttributes } from "svelte/elements";
	import { cn } from "$utils";
	import type { InputEvents } from ".";

	type $$Props = HTMLInputAttributes;
	type $$Events = InputEvents;

	let className: $$Props["class"] = undefined;
	export let value: $$Props["value"] = undefined;
	export { className as class };
</script>

<input
	class={cn(
		"flex w-full font-medium rounded-xl border border-popover bg-background px-4 py-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-popover-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-popover focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
		className
	)}
	bind:value
	on:blur
	on:change
	on:click
	on:focus
	on:focusin
	on:focusout
	on:keydown
	on:keypress
	on:keyup
	on:mouseover
	on:mouseenter
	on:mouseleave
	on:paste
	on:input
	{...$$restProps}
/>
