<script lang="ts">
  import { Checkbox } from "$lib/components/ui/checkbox";
	import { cn } from "$lib/utils";
	import { type Props } from ".";

  type $$Props = Props;
 
  let className: $$Props['class'] = '';
  let checked: $$Props['checked'];

  export { className as class, checked };
</script>
 
<Checkbox class={cn("translate-y-[2px]", className)} bind:checked={$checked} {...$$restProps} />