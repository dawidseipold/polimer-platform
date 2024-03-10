<script lang='ts'>
	import { Button } from "$lib/components/ui/button";
	import { X } from "lucide-svelte";

  // Props
  import type { Props } from ".";

  type $$Props = Props;
</script>

<Button class='flex gap-x-1 items-center' variant='outline' on:click {...$$restProps}>
  <X class='w-4 h-4' />
  Reset
</Button>