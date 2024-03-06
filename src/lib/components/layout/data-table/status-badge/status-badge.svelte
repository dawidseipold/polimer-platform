<script lang='ts'>
	import { cn } from '$lib/utils';
  import { type Props } from '.'

  type $$Props = Props;

  let status: $$Props['status'];
  
  export { status }
</script>

<div class={cn("capitalize font-semibold px-4 py-1 w-max rounded-xl", {
  ['bg-blue-950 text-blue-400']: status === 'pending',
  ['bg-orange-950 text-orange-400']: status === 'processing',
  ['bg-green-950 text-green-400']: status === 'fulfilled',
  ['bg-purple-950 text-purple-400']: status === 'invoiced',
  ['bg-red-950 text-red-400']: status === 'cancelled',
} )}>
  {status}
</div>