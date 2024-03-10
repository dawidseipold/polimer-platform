<script lang="ts">
	import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";
	import Circle from "lucide-svelte/icons/circle";
	import { cn } from "$utils";

	type $$Props = DropdownMenuPrimitive.RadioItemProps & {
		checked?: boolean;
	};
	type $$Events = DropdownMenuPrimitive.RadioItemEvents;

	let className: $$Props["class"] = undefined;
	let checked: $$Props["checked"] = false;

	export let value: $$Props["value"];
	export { className as class, checked };
</script>

<DropdownMenuPrimitive.RadioItem
	class={cn(
		"relative flex select-none items-center rounded-sm py-2 px-3 pl-6 text-sm text-popover-foreground hover:text-foreground outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-popover data-[highlighted]:text-foreground data-[disabled]:opacity-50 cursor-pointer hover:bg-popover",
		className
	)}
	{value}
	{...$$restProps}
	on:click
	on:keydown
	on:focusin
	on:focusout
	on:pointerdown
	on:pointerleave
	on:pointermove
>
	{#if checked}
		<span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
			<Circle class="h-2 w-2 fill-current" />
		</span>
	{/if}

	<slot />
</DropdownMenuPrimitive.RadioItem>
