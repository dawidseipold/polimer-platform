<script lang="ts">
  import { Checkbox } from "$lib/components/ui/checkbox";
	import type { Props } from ".";

  type $$Props = Props;
 
  export let checked: $$Props['checked'];
</script>
 
<Checkbox bind:checked={$checked} />