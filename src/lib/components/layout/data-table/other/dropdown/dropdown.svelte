<script lang='ts'>
	import { Button } from "$lib/components/ui/button";
	import * as Dropdown from "$lib/components/ui/dropdown-menu";
  import type { Props } from '.';
	import { Separator } from "$lib/components/ui/separator";
	import { Badge } from "$lib/components/ui/badge";
	import { Filter } from "lucide-svelte";
	import { cn } from '$lib/utils';

  type $$Props = Props;

  let title: $$Props['title'];
  let filterValues: $$Props['filterValues'] = [];
  let options: $$Props['options'] = [];

  export { title, filterValues, options }
  

const handleSelect = (value: string) => {
		if (filterValues.includes(value)) {
			filterValues = filterValues.filter(filterValue => filterValue !== value);

			return;
		}

		filterValues = [...filterValues, value];
  }

	const handleBadgeClick = (value: string, event: Event) => {
		event.stopPropagation();
		event as MouseEvent;
		
		handleSelect(value);
	}
</script>

<Dropdown.Root>
	<Dropdown.Trigger asChild let:builder>
		<Button variant='outline' builders={[builder]} class='flex gap-x-2 capitalize'>
			<Filter class='w-4 h-4' />
			{title}

			{#if filterValues.length > 0}
				<Separator orientation='vertical' class='mx-2 bg-popover' />

				<!-- TODO: Remove from the component itself and move to the declaration -->
				{#if filterValues.length < 3}
					<div class='flex gap-x-2'>
						{#each filterValues as filterValue}
							<Badge variant='default' on:click={(event) => handleBadgeClick(filterValue, event)} class={cn("h-full w-max flex gap-x-2 capitalize before:content-[''] before:text-xs before:w-1.5 before:h-1.5 before:flex before:rounded-full pl-1.5",{
								['bg-blue-950 text-blue-400 hover:bg-blue-900 before:bg-blue-400 before:text-blue-900']: filterValue === 'pending',
								['bg-orange-950 text-orange-400 hover:bg-orange-900 before:bg-orange-400 before:text-orange-900']: filterValue === 'processing',
								['bg-green-950 text-green-400 hover:bg-green-900 before:bg-green-400 before:text-green-900']: filterValue === 'fulfilled',
								['bg-purple-950 text-purple-400 hover:bg-purple-900 before:bg-purple-400 before:text-purple-900']: filterValue === 'invoiced',
								['bg-red-950 text-red-400 hover:bg-red-900 before:bg-red-400 before:text-red-900']: filterValue === 'cancelled',
							})}>
								{filterValue}
							</Badge>
						{/each}
					</div>
				{:else}
					<Badge variant='outline'>{filterValues.length} selected</Badge>
				{/if}
			{/if}
		</Button>
	</Dropdown.Trigger>

	<Dropdown.Content>
		<Dropdown.Group>
			{#each options as option (option.value)}
				<Dropdown.CheckboxItem checked={filterValues.includes(option.value)} onCheckedChange={() => handleSelect(option.value)}>
					{option.label}
				</Dropdown.CheckboxItem>
			{/each}
		</Dropdown.Group>
	</Dropdown.Content>
</Dropdown.Root>
