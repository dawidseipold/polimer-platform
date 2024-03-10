<script lang='ts'>
	import { Input } from "$lib/components/ui/input";
	import { afterUpdate } from "svelte";
  import { type Events, type Props } from ".";
	import type { Writable } from "svelte/store";

  type $$Props = Props;
  type $$Events = Events

  let filterValue: $$Props['filterValue'];
  export { filterValue}
</script>


<Input class='max-w-sm' type='text' bind:value={$filterValue}  {...$$restProps} />
