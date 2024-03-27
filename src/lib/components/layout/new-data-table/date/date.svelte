<script lang="ts">
	import { DateField } from 'bits-ui';
	import { type Props } from '.';
	import { CalendarDate, toTime, type DateValue } from '@internationalized/date';
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

	const time = new Intl.DateTimeFormat('en-US', {
		hour: 'numeric',
		minute: 'numeric',
		hour12: false
	}).format(value);
</script>

<!-- <Tooltip.Root>
	<Tooltip.Trigger asChild let:builder>
		<Button variant="ghost" builders={[builder]} size="icon" class="relative h-8 w-8 p-0">
			<span class="sr-only">Open Menu</span>
			<Calendar class="h-4 w-4" />
		</Button>
	</Tooltip.Trigger>

	<Tooltip.Content></Tooltip.Content>
</Tooltip.Root> -->

<DateField.Root value={handleCalendarDate(value)} readonly>
	<DateField.Input let:segments class="flex text-popover-foreground">
		{#each segments as { part, value }}
			{#if part !== 'hour' || part !== 'minute'}
				<DateField.Segment {part}>{value}</DateField.Segment>
			{/if}
		{/each}
	</DateField.Input>

	<div class="font-bold">
		{time}
	</div>
</DateField.Root>
