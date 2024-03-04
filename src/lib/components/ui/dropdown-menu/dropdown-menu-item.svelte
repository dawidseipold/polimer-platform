<script lang="ts">
	import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";
	import { cn } from "$utils";

	type $$Props = DropdownMenuPrimitive.ItemProps & {
		inset?: boolean;
	};
	type $$Events = DropdownMenuPrimitive.ItemEvents;

	let className: $$Props["class"] = undefined;
	export let inset: $$Props["inset"] = undefined;
	export { className as class };
</script>

<DropdownMenuPrimitive.Item
	class={cn(
		"relative flex select-none items-center rounded-sm py-2 px-3 text-sm text-popover-foreground hover:text-foreground outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-popover data-[highlighted]:text-foreground data-[disabled]:opacity-50 cursor-pointer hover:bg-popover",
		inset && "pl-8",
		className
	)}
	{...$$restProps}
	on:click
	on:keydown
	on:focusin
	on:focusout
	on:pointerdown
	on:pointerleave
	on:pointermove
>
	<slot />
</DropdownMenuPrimitive.Item>
