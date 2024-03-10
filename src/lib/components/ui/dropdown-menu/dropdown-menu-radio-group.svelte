<script lang="ts">
	import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";

	type $$Props = DropdownMenuPrimitive.RadioGroupProps;

	export let value: $$Props["value"] = undefined;
</script>

<DropdownMenuPrimitive.RadioGroup class='flex flex-col gap-y-1 p-1' {...$$restProps} bind:value>
	<slot />
</DropdownMenuPrimitive.RadioGroup>
