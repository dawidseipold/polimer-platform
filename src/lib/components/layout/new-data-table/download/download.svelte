<script lang='ts'>
	import { Button } from '$lib/components/ui/button';
	import { ArrowDownToLine } from 'lucide-svelte';
  import {type Props} from '.'

  type $$Props = Props;

  let href: $$Props['href'];

  export { href }
</script>

<Button variant='ghost' class='relative h-8 w-8 p-0' {href} download>
  <ArrowDownToLine class="w-4 h-4" />
</Button>