<script lang='ts'>
  import { type Props } from ".";
	import { Button } from "$lib/components/ui/button";
	import { ExternalLink } from "lucide-svelte";

  type $$Props = Props;

  let id: $$Props['id'];

  export { id };
</script>

<Button variant='ghost' class='relative h-8 w-8 p-0' href={`/order/${id}`}>
  <ExternalLink class="w-4 h-4" />
</Button>