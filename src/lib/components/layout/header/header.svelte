<script lang='ts'>
	import * as Avatar from "$lib/components/ui/avatar";
import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	import { Skeleton } from "$lib/components/ui/skeleton";
	import { cn } from "$lib/utils";
	import { headerVariants, type Events, type Props } from ".";
  import {Bell, HelpCircle} from 'lucide-svelte'

  type $$Props = Props;
  type $$Events = Events;

  let className: $$Props["class"] = undefined;

  export { className as class};

  const { base } = headerVariants();
</script>

<header class={cn(base({className}))}>
  <!-- search -->
  SearchBarComponent

  <div class="flex gap-x-4 items-center">
    <Bell class="w-5 h-5" />
    <HelpCircle class="w-5 h-5" />
    
    <DropdownMenu.Root>
      <DropdownMenu.Trigger class='w-8 h-8'>
        <Avatar.Root class="w-8 h-8">
          <Avatar.Image src="https://avatars.githubusercontent.com/u/29647600?v=4" alt="avatar" class='h-8 w-8' />
          <Avatar.Fallback>
            <Skeleton class='rounded-full h-8 w-8' />
          </Avatar.Fallback>
        </Avatar.Root>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content>
        <DropdownMenu.Group>
          <DropdownMenu.Label>My Account</DropdownMenu.Label>
          <DropdownMenu.Separator />
          <DropdownMenu.Item>Profile</DropdownMenu.Item>
          <DropdownMenu.Item>Billing</DropdownMenu.Item>
          <DropdownMenu.Item>Team</DropdownMenu.Item>
          <DropdownMenu.Item>Subscription</DropdownMenu.Item>
        </DropdownMenu.Group>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  </div>
</header>