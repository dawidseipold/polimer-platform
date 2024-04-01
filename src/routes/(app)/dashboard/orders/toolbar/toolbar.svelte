<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { ResetButton } from '$lib/components/layout/new-data-table/reset';
	import * as Select from '$lib/components/ui/select';
	import { DataTableSettings } from '$lib/components/layout/new-data-table/settings';
	import { afterUpdate } from 'svelte';
	import { isEqual } from 'lodash-es';
	import { pageSizes, activePageSize } from '$lib/stores/pages';

	// Types
	import type { Props } from '.';
	import { get, writable, type Writable } from 'svelte/store';
	import { clients, statuses } from '$lib/constants';
	import { Settings, Settings2 } from 'lucide-svelte';

	type $$Props = Props;

	let tableViewModel: $$Props['tableViewModel'];

	export { tableViewModel };

	const { pluginStates, flatColumns } = tableViewModel;
	const {
		filterValues
	}: { filterValues: Writable<{ id: string; status: string[]; client: string[] }> } =
		pluginStates.filter;
	const { hiddenColumnIds } = pluginStates.hide;

	const columns = flatColumns.map((col) => ({
		value: col.id,
		label:
			col.id.toString().charAt(0).toUpperCase() +
			col.id
				.toString()
				.slice(1)
				.replace(/([A-Z])/g, ' $1')
				.trim()
	}));

	let hideForColumns = Object.fromEntries(columns.map((col) => [col.value, true]));

	const ignoredColumns = ['id', 'select', 'actions', 'download', 'info'];
	const hideableColumns = columns.filter((column) => !ignoredColumns.includes(column.value));
	let selectedColumns = hideableColumns;

	let initialFilterValues = { id: '', status: [], client: [] };

	$: $hiddenColumnIds = Object.entries(hideForColumns)
		.filter(([, hide]) => !hide)
		.map(([id]) => id);
	$: showReset = !isEqual($filterValues, initialFilterValues);

	afterUpdate(() => {
		console.log('filterValues', $filterValues);
	});
</script>

<header class="flex gap-x-4">
	<Input class="max-w-64" placeholder="Filter orders by id..." bind:value={$filterValues.id} />

	{#if Object.keys($filterValues).length > 0 && showReset}
		<ResetButton on:click={() => ($filterValues = initialFilterValues)} />
	{/if}

	<div class="ml-auto flex gap-x-4">
		<DataTableSettings
			title="Filters"
			description="Lorem ipsum dolor sit amet consectetur adipisicing elit. A, laudantium."
		>
			<svelte:fragment slot="icon">
				<Settings2 class="h-4 w-4" />
			</svelte:fragment>

			<svelte:fragment slot="content">
				<!-- STATUS -->
				<Select.Root
					multiple
					items={statuses}
					selected={$filterValues.status.map((value) => ({ value }))}
					onSelectedChange={(event) => {
						filterValues.update((values) => ({
							...values,
							status: event?.map((item) => item.value) || []
						}));
					}}
				>
					<Select.Trigger>Status</Select.Trigger>

					<Select.Content>
						{#each statuses as status}
							<Select.Item value={status.value}>
								{status.label}
							</Select.Item>
						{/each}
					</Select.Content>
				</Select.Root>

				<!-- CLIENT -->
				<Select.Root
					multiple
					items={clients.map((client) => ({ value: client.id, label: client.name }))}
					selected={$filterValues.client.map((value) => ({ value }))}
					onSelectedChange={(event) => {
						filterValues.update((values) => ({
							...values,
							client: event?.map((item) => item.value) || []
						}));
					}}
				>
					<Select.Trigger>Client</Select.Trigger>

					<Select.Content>
						{#each clients as client}
							<Select.Item value={client.id}>
								{client.name}
							</Select.Item>
						{/each}
					</Select.Content>
				</Select.Root>
			</svelte:fragment>
		</DataTableSettings>

		<DataTableSettings
			title="Settings"
			description="Lorem ipsum dolor sit amet consectetur adipisicing elit. A, laudantium."
		>
			<svelte:fragment slot="icon">
				<Settings class="h-4 w-4" />
			</svelte:fragment>

			<svelte:fragment slot="content">
				<Select.Root bind:selected={$activePageSize}>
					<Select.Trigger>Rows per page</Select.Trigger>

					<Select.Content>
						{#each $pageSizes as pageSize}
							<Select.Item value={pageSize.value}>
								{pageSize.label}
							</Select.Item>
						{/each}
					</Select.Content>
				</Select.Root>

				<Select.Root
					multiple
					items={hideableColumns}
					bind:selected={selectedColumns}
					onSelectedChange={(event) => {
						const selectedIds = event?.map((item) => item.value) || [];

						const missingIds = hideableColumns
							.filter((column) => !selectedIds.includes(column.value))
							.map((column) => column.value);

						$hiddenColumnIds = [...missingIds];
					}}
				>
					<Select.Trigger>Visible columns</Select.Trigger>

					<Select.Content>
						{#each hideableColumns as column}
							<Select.Item value={column.value}>
								{column.label}
							</Select.Item>
						{/each}
					</Select.Content>
				</Select.Root>
			</svelte:fragment>
		</DataTableSettings>
	</div>
</header>
