<script lang='ts'>
	import { cn } from "$lib/utils";
	import { logoVariants, type Events, type Props } from ".";

  type $$Props = Props;
  type $$Events = Events;

  let className: $$Props["class"] = undefined;
  let variant: $$Props["variant"] = "default";
  let size: $$Props["size"] = "default";
  let type: $$Props["type"] = "default";

  export { className as class, variant, size, type };
</script>

<!-- TODO: Add the anchor to either dashboard or website depending on which part of the app the user is -->
<div class={cn(logoVariants({variant, size, type, className}))} on:click on:keydown role="button" aria-label='logo' tabindex="0">
  LOGO
</div>