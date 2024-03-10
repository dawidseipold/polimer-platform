<script lang="ts">
	import { Dialog as DialogPrimitive } from "bits-ui";
	import { cn } from "$utils";

	type $$Props = DialogPrimitive.TitleProps;

	let className: $$Props["class"] = undefined;
	export { className as class };
</script>

<DialogPrimitive.Title
	class={cn("text-3xl font-semibold leading-none tracking-tight w-max", className)}
	{...$$restProps}
>
	<slot />
</DialogPrimitive.Title>
