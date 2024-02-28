<script lang='ts'>
  import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "$lib/components/ui/collapsible";
  import { Logo } from "$lib/components/ui/logo";
  import { cn } from "$lib/utils";
	import { Button } from "bits-ui";

	import { sidebarVariants } from ".";
  import type {Props, Events} from '.';
	import { setMode } from "mode-watcher";
  import {LayoutGrid, ClipboardList, ChevronUp} from 'lucide-svelte'

  interface SidebarItem {
    title: string;
    icon: any;
    href: string;
    sub?: SidebarItem[];
  }
 
  const DATA: SidebarItem[] = [
    {
      title: 'Dashboard',
      icon: LayoutGrid,
      href: '/dashboard'
    },
    {
      title: 'Orders',
      icon: ClipboardList,
      href: '/dashboard/orders'
    },
    // {
    //   title: 'Test',
    //   icon: ClipboardList,
    //   href: '/dasboard/test',
    //   sub: [
    //     {
    //       title: 'Test',
    //       href: '/dashboard/test'
    //     },
    //     {
    //       title: 'Test',
    //       href: '/dashboard/test'
    //     },
    //     {
    //       title: 'Test',
    //       href: '/dashboard/test'
    //     }
    //   ]

    // },
  ]

  type $$Props = Props;
  type $$Events = Events;

  let className: $$Props["class"] = undefined;
  let pathname: $$Props["pathname"] = '';

  export { className as class, pathname };

  const { base, logo, list, item, collapsible, content } = sidebarVariants()
  const itemWithActive = (active: boolean, additionalStyles?: string) => cn(item(), active && 'bg-popover', additionalStyles)

</script>

<nav class={cn(base({className}))}>
  <Logo class={cn(logo())} />
  
  <ul class={cn(list())}>
    {#each DATA as {title, icon, href, sub}, i} 
      {#if !sub}
      <Button.Root class={itemWithActive(pathname === href)} href={href}>
        <svelte:component this={icon} class="w-4 h-4" />
        
        {title}
      </Button.Root>

      {:else}
        <Collapsible class={cn(collapsible())} >
          <CollapsibleTrigger class={itemWithActive(pathname === href)} let:builder>
            <svelte:component this={icon} class="w-4 h-4" />
            {title}

            <span class={cn("ml-auto", builder["data-state"] === 'open' && 'rotate-180')}>
              <svelte:component this={ChevronUp} class="w-4 h-4" />
            </span>
          </CollapsibleTrigger>
    
          <CollapsibleContent asChild>
            <ul class={cn(content())}>
              {#each sub as {title, href}}
              <Button.Root class={itemWithActive(pathname === href, 'pl-12')} href={href}>
                {title}
              </Button.Root>
            {/each}
            </ul>
            
          </CollapsibleContent>
        </Collapsible>
      {/if}
    {/each}
  </ul>

  <div class="flex gap-x-4 justify-center items-center w-full mt-auto p-4">
    <button on:click={() => setMode('light')}>Light</button>
    <button on:click={() => setMode('dark')}>Dark</button>
    <button on:click={() => setMode('system')}>System</button>
  </div>
</nav>