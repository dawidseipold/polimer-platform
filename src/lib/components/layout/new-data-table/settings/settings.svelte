<script lang='ts'>
	import { Button } from "$lib/components/ui/button";
	import * as Dialog from "$lib/components/ui/dialog";
  import { type Props } from ".";

  type $$Props = Props;

  let title: $$Props['title'] = '';
  let description: $$Props['description'] = '';

  export { title, description }
</script>

<Dialog.Root {...$$restProps}>
  <Dialog.Trigger asChild let:builder>
    <Button builders={[builder]} variant='outline' >
      <slot name='icon' />
    </Button>
  </Dialog.Trigger>

  <Dialog.Content>
    <div class='flex flex-col gap-y-4'>
      <Dialog.Title>
        {title}
      </Dialog.Title>
    
      <Dialog.Description>
        {description}
      </Dialog.Description>
    </div>

    <slot name='content' />
  </Dialog.Content>
</Dialog.Root>