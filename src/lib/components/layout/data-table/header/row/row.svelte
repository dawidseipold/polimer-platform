<script lang='ts'>
	import { Render } from "svelte-headless-table";
	import type { Props } from ".";
	import { Head } from "$lib/components/ui/table";
	import { Button } from "$lib/components/ui/button";
	import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-svelte";

  type $$Props = Props;

  let cell: $$Props['cell'];
  let props: $$Props['props'];
  let attrs: $$Props['attrs'];

  export { cell, props, attrs }
</script>



<Head {...attrs} {...props} class="first:pl-4 first:rounded-l-2xl last:pr-4 last:rounded-r-2xl py-2">
  {#if cell.id === 'email'}
    <Button variant="ghost" on:click={(e) => {
      props.sort.toggle(e)
    }} class='flex gap-x-4'>
      <Render of={cell.render()} />

      {#if props.sort.order === 'asc'}
      <ArrowUp class="w-4 h-4" />
      {:else if props.sort.order === 'desc'}
      <ArrowDown class="w-4 h-4" />
      {:else}
      <ArrowUpDown class="w-4 h-4" />
      {/if}
    </Button>
  {:else}
  <Render of={cell.render()} />
  {/if}
</Head>