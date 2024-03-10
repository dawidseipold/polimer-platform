<script lang='ts'>
	import { Input } from "$lib/components/ui/input";
	import { writable, type Writable } from "svelte/store";

	type Props = {
		filterValue: Writable<string>;
	}

	let filterValue: Props['filterValue'] = writable('');

	export { filterValue }
</script>

<Input bind:value={$filterValue} {...$$restProps}  />