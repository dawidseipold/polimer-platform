<script lang="ts">
	import { cn } from "$utils";
	import type { HTMLTdAttributes } from "svelte/elements";

	type $$Props = HTMLTdAttributes;

	let className: $$Props["class"] = undefined;
	export { className as class };
</script>

<td
	class={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0 first:pl-4 first:rounded-l-2xl last:pr-4 text-start last:rounded-r-2xl group mt-2",
	className)}
	{...$$restProps}
	on:click
	on:keydown
>
	<slot />
</td>
