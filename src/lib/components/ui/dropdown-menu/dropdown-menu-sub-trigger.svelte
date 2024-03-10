<script lang="ts">
	import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";
	import ChevronRight from "lucide-svelte/icons/chevron-right";
	import { cn } from "$utils";

	type $$Props = DropdownMenuPrimitive.SubTriggerProps & {
		inset?: boolean;
	};
	type $$Events = DropdownMenuPrimitive.SubTriggerEvents;

	let className: $$Props["class"] = undefined;
	export let inset: $$Props["inset"] = undefined;
	export { className as class };
</script>

<DropdownMenuPrimitive.SubTrigger
	class={cn(
		// "flex cursor-pointer select-none items-center rounded-sm py-2 px-3 text-sm text-popover-foreground hover:text-foreground outline-none data-[highlighted]:bg-popover data-[state=open]:bg-accent data-[highlighted]:text-foreground data-[state=open]:text-accent-foreground hover:bg-popover",
		"relative flex gap-x-2 select-none items-center rounded-sm py-2 px-3 text-sm text-popover-foreground hover:text-foreground outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-popover data-[highlighted]:text-foreground data-[disabled]:opacity-50 cursor-pointer hover:bg-popover",
		inset && "pl-8",
		className
	)}
	{...$$restProps}
	on:click
	on:keydown
	on:focusin
	on:focusout
	on:pointerleave
	on:pointermove
>
	<slot />
	<ChevronRight class="ml-auto h-4 w-4" />
</DropdownMenuPrimitive.SubTrigger>
