<script lang='ts'>
	import { Input } from "$lib/components/ui/input";
  import { ResetButton } from "$lib/components/layout/new-data-table/reset";
  import * as Select from "$lib/components/ui/select";
	import { DataTableSettings } from "$lib/components/layout/new-data-table/settings";
  import {afterUpdate} from 'svelte'

  // Types
	import type { Props } from ".";
	import type { Writable } from "svelte/store";

  type $$Props = Props;

  let tableViewModel: $$Props['tableViewModel'];
  let pageSizes: $$Props['pageSizes'];
  let activePageSize: $$Props['activePageSize'];

  export { tableViewModel, pageSizes, activePageSize };

  const { pluginStates, flatColumns } = tableViewModel;
  const { filterValues }: { filterValues: Writable<{ id: string }> } = pluginStates.filter;
  const { hiddenColumnIds } = pluginStates.hide;

  const columns = flatColumns.map(col => ({
    value: col.id,
    label: col.id.toString().charAt(0).toUpperCase() + col.id.toString().slice(1).replace(/([A-Z])/g, ' $1').trim()
  }));

  let hideForColumns = Object.fromEntries(columns.map((col) => [col.value, true]));

  const ignoredColumns = ['id', 'select', 'actions', 'download', 'info'];
  const hideableColumns = columns.filter(column => !ignoredColumns.includes(column.value));
  let selectedColumns = hideableColumns;

  $: $hiddenColumnIds = Object.entries(hideForColumns).filter(([, hide]) => !hide).map(([id]) => id);
  $: showReset = Object.values({ ...$filterValues }).some((value) => value.length > 0);

  afterUpdate(() => {
    console.log($filterValues);
    
  });
</script>

<header class="flex gap-x-4">
  <Input class='max-w-64' placeholder='Filter orders by id...' type='search' bind:value={ $filterValues.id } />

  {#if showReset}
    <ResetButton on:click={() => {
      $filterValues.id = '';
    }} />
  {/if}

  <DataTableSettings>
    <Select.Root bind:selected={activePageSize}>
      <Select.Trigger>
          Rows per page
      </Select.Trigger>

      <Select.Content>
        {#each pageSizes as pageSize}
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
        const selectedIds = event?.map(item => item.value) || [];

        const missingIds = hideableColumns
          .filter(column => !selectedIds.includes(column.value))
          .map(column => column.value);

        $hiddenColumnIds = [...missingIds]
      }}
    >
      <Select.Trigger>
          Visible columns
      </Select.Trigger>

      <Select.Content>
        {#each hideableColumns as column}
          <Select.Item value={column.value}>
            {column.label}
          </Select.Item>
        {/each}
      </Select.Content>
    </Select.Root>
  </DataTableSettings>
</header>