<script lang='ts'>
  import MoreVertical from "lucide-svelte/icons/more-vertical";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
  import { Button } from "$lib/components/ui/button";
	import type { Props } from ".";
	import { Group } from "lucide-svelte";

  type $$Props = Props

  let id: $$Props['id'];

  export { id }
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger asChild let:builder>
    <Button variant='ghost' builders={[builder]} size='icon' class='relative h-8 w-8 p-0'>
      <span class="sr-only">Open Menu</span>
      <MoreVertical class="w-4 h-4" />
    </Button>
  </DropdownMenu.Trigger>

  <DropdownMenu.Content>
    <!-- Make this a custom component -->
    <DropdownMenu.Group>
      <DropdownMenu.Label>Actions</DropdownMenu.Label>

      <DropdownMenu.Item>View customer</DropdownMenu.Item>
      <DropdownMenu.Item>View order details</DropdownMenu.Item>
    </DropdownMenu.Group>
    
    <DropdownMenu.Separator />

    <DropdownMenu.Group>
      <DropdownMenu.Label>Actions</DropdownMenu.Label>

      <DropdownMenu.Item on:click={() => navigator.clipboard.writeText(id)}>Copy Order ID</DropdownMenu.Item>
    </DropdownMenu.Group>
      
  </DropdownMenu.Content>
</DropdownMenu.Root>