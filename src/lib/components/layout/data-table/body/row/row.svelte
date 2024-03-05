<script lang='ts'>
	import { Cell } from "$lib/components/ui/table";
	import { Render } from "svelte-headless-table";
	import type { Props } from ".";
	import { cn } from "$lib/utils";

  type $$Props = Props;

  let cell: $$Props['cell'];
  let attrs: $$Props['attrs'];

  export { cell, attrs }

  // console.log(cell);
</script>

<Cell {...attrs} class={cn("first:pl-4 first:rounded-l-2xl last:pr-4 last:text-end last:rounded-r-2xl group", cell.column.header === '' && 'w-0 p-0 pr-2')}>
  <Render of={cell.render()} />
</Cell>