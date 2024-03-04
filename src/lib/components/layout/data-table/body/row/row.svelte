<script lang='ts'>
	import { Cell } from "$lib/components/ui/table";
	import { Render } from "svelte-headless-table";
	import type { Props } from ".";

  type $$Props = Props;

  let cell: $$Props['cell'];
  let attrs: $$Props['attrs'];

  export { cell, attrs }
</script>

<Cell {...attrs} class="first:pl-4 first:rounded-l-2xl last:pr-4 last:text-end last:rounded-r-2xl">
  <Render of={cell.render()} />
</Cell>