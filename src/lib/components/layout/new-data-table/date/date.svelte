<script lang="ts">
	import { DateField } from 'bits-ui';
	import { type Props } from '.';
	import { CalendarDate } from '@internationalized/date';
	import { Calendar } from 'lucide-svelte';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import Button from '$lib/components/ui/button/button.svelte';

	type $$Props = Props;

	let value: $$Props['value'];
	export { value };

	const handleCalendarDate = (date: Date) => {
		const [year, month, day] = [date.getFullYear(), date.getMonth() + 1, date.getDate()];

		return new CalendarDate(year, month, day);
	};
</script>

<Tooltip.Root>
	<Tooltip.Trigger asChild let:builder>
		<Button variant="ghost" builders={[builder]} size="icon" class="relative h-8 w-8 p-0">
			<span class="sr-only">Open Menu</span>
			<Calendar class="h-4 w-4" />
		</Button>
	</Tooltip.Trigger>

	<Tooltip.Content>
		<DateField.Root value={handleCalendarDate(value)} readonly>
			<DateField.Input let:segments class="flex">
				{#each segments as { part, value }}
					<DateField.Segment {part}>{value}</DateField.Segment>
				{/each}
			</DateField.Input>
		</DateField.Root>
	</Tooltip.Content>
</Tooltip.Root>
