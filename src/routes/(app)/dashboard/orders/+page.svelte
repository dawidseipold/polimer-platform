<script lang="ts">
	import { get, readable, writable } from 'svelte/store';
	import { generatePageSizes } from '$lib/utils/table';

	// Table
	import * as Table from '$lib/components/ui/table';
	import { Subscribe, createRender, createTable } from 'svelte-headless-table';
	import {
		addColumnFilters,
		addGridLayout,
		addHiddenColumns,
		addPagination,
		addSelectedRows,
		addSortBy,
		matchFilter,
		textPrefixFilter
	} from 'svelte-headless-table/plugins';
	import { DataTableToolbar } from './toolbar';
	import { Render } from 'svelte-headless-table';
	import { Cell } from '$lib/components/ui/table';

	// Other
	import { data, statuses } from '$lib/constants';
	import { RowCheckbox } from '$lib/components/layout/new-data-table/checkbox';
	import { afterUpdate } from 'svelte';
	import { RowActions } from '$lib/components/layout/new-data-table/actions';
	import { RowDownload } from '$lib/components/layout/new-data-table/download';
	import { cn } from '$lib/utils';
	import { RowInfo } from '$lib/components/layout/new-data-table/info';
	import { HeaderOptions } from '$lib/components/layout/new-data-table/header-options';
	import * as Dropdown from '$lib/components/ui/dropdown-menu';
	import { DataTableStatusBadge } from '$lib/components/layout/new-data-table/status-badge';
	import { DataTableDate } from '$lib/components/layout/new-data-table/date';
	import { Clock } from 'lucide-svelte';
	import Pagination from '$lib/components/layout/new-data-table/pagination/pagination.svelte';
	import { DataTablePagination } from '$lib/components/layout/new-data-table/pagination';
	import { DataTableItemsIndicator } from '$lib/components/layout/new-data-table/indicator';
	import { activePageSize } from '$lib/stores/pages';

	const table = createTable(readable(data), {
		select: addSelectedRows(),
		sort: addSortBy({
			toggleOrder: ['asc', 'desc']
		}),
		pagination: addPagination(),
		filter: addColumnFilters(),
		hide: addHiddenColumns(),
		page: addPagination()
	});

	const columns = table.createColumns([
		table.display({
			id: 'select',
			header: (_, { pluginStates }) => {
				const { allPageRowsSelected } = pluginStates.select;

				return createRender(RowCheckbox, {
					checked: allPageRowsSelected
				});
			},
			cell: ({ row }, { pluginStates }) => {
				const { getRowState } = pluginStates.select;
				const { isSelected } = getRowState(row);

				return createRender(RowCheckbox, {
					checked: isSelected
				});
			},
			plugins: {
				sort: {
					disable: true
				}
			}
		}),
		table.column({
			id: 'createdAt',
			accessor: 'createdAt',
			header: () => {
				return createRender(Clock, { class: 'w-4 h-4' });
			},
			cell: ({ value }) => createRender(DataTableDate, { value: value })
		}),
		table.column({
			id: 'status',
			accessor: 'status',
			header: () => {
				return 'Status';
			},
			plugins: {
				filter: {
					fn: ({ filterValue, value }) => {
						if (filterValue.length === 0) return true;
						if (!Array.isArray(filterValue) || typeof value !== 'string') return true;

						return filterValue.some((filter) => value.includes(filter));
					},
					initialFilterValue: []
				}
			}
		}),
		table.column({
			id: 'id',
			accessor: 'id',
			header: 'Order ID',
			plugins: {
				filter: {
					fn: ({ filterValue, value }) => value.toLowerCase().includes(filterValue.toLowerCase()),
					initialFilterValue: ''
				}
			}
		}),
		table.column({
			id: 'info',
			accessor: ({ id }) => id,
			header: '',
			plugins: {
				sort: { disable: true }
			}
		}),
		table.column({
			id: 'download',
			accessor: ({ id }) => id,
			header: '',
			plugins: {
				sort: { disable: true }
			}
		}),
		table.column({
			id: 'actions',
			accessor: ({ id }) => id,
			header: '',
			plugins: {
				sort: { disable: true }
			}
		})
	]);

	const tableViewModel = table.createViewModel(columns);
	const { headerRows, pageRows, rows, tableAttrs, tableHeadAttrs, tableBodyAttrs, pluginStates } =
		tableViewModel;

	const { hasNextPage, hasPreviousPage, pageIndex, pageSize, pageCount } = pluginStates.page;

	afterUpdate(() => {
		$pageSize = $activePageSize.value;
	});

	// const { sortKeys } = pluginStates.sort;

	// console.log($sortKeys);
</script>

<div class="flex flex-col space-y-4 p-8">
	<DataTableToolbar {tableViewModel} />

	<div class="flex flex-col gap-y-4">
		<table class="w-full p-4" {...$tableAttrs}>
			<thead class="bg-popover" {...$tableHeadAttrs}>
				{#each $headerRows as headerRow (headerRow.id)}
					<Subscribe rowAttrs={headerRow.attrs()} let:rowAttrs>
						<tr {...rowAttrs}>
							{#each headerRow.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()} let:props>
									<th
										class={cn(
											'p-4 text-start first:rounded-l-2xl last:rounded-r-2xl',
											cell.id === 'select' && 'w-1 pr-8',
											cell.id === 'createdAt' && 'w-1 pr-16',
											cell.id === 'status' && 'w-1 pr-4',
											cell.id === 'id' && ''
										)}
										{...attrs}
										{...props}
									>
										{#if cell.id === 'status'}
											<HeaderOptions id={cell.render().toString()}></HeaderOptions>
										{:else}
											<Render of={cell.render()} />
										{/if}
									</th>
								</Subscribe>
							{/each}
						</tr>
						<tr class="flex h-4 bg-background"></tr>
					</Subscribe>
				{/each}
			</thead>

			<tbody {...$tableBodyAttrs}>
				{#each $pageRows as row (row.id)}
					<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
						<tr class="hover:bg-muted" {...rowAttrs}>
							{#each row.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs>
									<td
										class={cn('p-4 first:rounded-l-2xl last:rounded-r-2xl last:pr-4', {
											['w-0 px-2']: cell.column.header === ''
										})}
										{...attrs}
									>
										{#if cell.id === 'actions'}
											<RowActions id={row.id}>
												{row.id}
											</RowActions>
										{:else if cell.id === 'download'}
											<RowDownload href={`https://i.imgur.com/${cell.render()}.jpeg`} />
										{:else if cell.id === 'info'}
											<RowInfo id={cell.render().toString()} />
										{:else if cell.id === 'status'}
											<DataTableStatusBadge status={cell.render().toString()}>
												{cell.render()}
											</DataTableStatusBadge>
										{:else}
											<Render of={cell.render()} />
										{/if}
									</td>
								</Subscribe>
							{/each}
						</tr>
						<!-- Workaround spacing between the rows -->
						<tr class="flex h-2"></tr>
					</Subscribe>
				{/each}
			</tbody>

			<!-- TODO: Put inside a new component Footer or something -->
		</table>

		<div class="flex w-full items-center justify-end gap-x-4">
			<DataTableItemsIndicator
				page={pageIndex}
				perPage={readable($pageSize)}
				count={$rows.length}
			/>

			<DataTablePagination
				onPreviousPage={() => {
					if ($hasPreviousPage) $pageIndex -= 1;
				}}
				onNextPage={() => {
					if ($hasNextPage) $pageIndex += 1;
				}}
				count={$pageCount}
				perPage={Number($pageSize)}
				page={$pageIndex}
				hasPreviousPage={$hasPreviousPage}
				hasNextPage={$hasNextPage}
			/>
		</div>
	</div>
</div>
