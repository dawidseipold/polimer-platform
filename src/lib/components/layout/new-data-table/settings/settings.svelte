<script>
	import { Button } from "$lib/components/ui/button";
	import * as Dialog from "$lib/components/ui/dialog";

	import { Settings2 } from "lucide-svelte";

</script>

<Dialog.Root {...$$restProps}>
  <Dialog.Trigger asChild let:builder>
    <Button class='ml-auto' builders={[builder]} variant='outline' >
      <Settings2 class='w-4 h-4' />
    </Button>
  </Dialog.Trigger>

  <Dialog.Content>
    <div class='flex flex-col gap-y-4'>
      <Dialog.Title>
        Settings
      </Dialog.Title>
    
      <Dialog.Description>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. A, laudantium.
      </Dialog.Description>
    </div>

    <slot />
  </Dialog.Content>
</Dialog.Root>