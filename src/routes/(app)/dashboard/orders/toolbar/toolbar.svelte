<script lang='ts'>
	import { Input } from "$lib/components/ui/input";
  import { ResetButton } from "$lib/components/layout/new-data-table/reset";
  import * as Select from "$lib/components/ui/select";
	import { DataTableSettings } from "$lib/components/layout/new-data-table/settings";
  import { afterUpdate } from 'svelte'
  import { isEqual } from "lodash-es";

  // Types
	import type { Props } from ".";
	import { get, type Writable } from "svelte/store";
	import { statuses } from "$lib/constants";
	import { Settings, Settings2 } from "lucide-svelte";

  type $$Props = Props;

  let tableViewModel: $$Props['tableViewModel'];
  let pageSizes: $$Props['pageSizes'];
  let activePageSize: $$Props['activePageSize'];

  export { tableViewModel, pageSizes, activePageSize };

  const { pluginStates, flatColumns } = tableViewModel;
  const { filterValues }: { filterValues: Writable<{ id: string, status: string[] }> } = pluginStates.filter;
  const { hiddenColumnIds } = pluginStates.hide;

  const columns = flatColumns.map(col => ({
    value: col.id,
    label: col.id.toString().charAt(0).toUpperCase() + col.id.toString().slice(1).replace(/([A-Z])/g, ' $1').trim()
  }));

  let hideForColumns = Object.fromEntries(columns.map((col) => [col.value, true]));

  const ignoredColumns = ['id', 'select', 'actions', 'download', 'info'];
  const hideableColumns = columns.filter(column => !ignoredColumns.includes(column.value));
  let selectedColumns = hideableColumns;

  let initialFilterValues = { id: '', status: [] };

  $: $hiddenColumnIds = Object.entries(hideForColumns).filter(([, hide]) => !hide).map(([id]) => id);
  $: showReset = !isEqual($filterValues, initialFilterValues);
</script>

<header class="flex gap-x-4">
  <Input class='max-w-64' placeholder='Filter orders by id...' bind:value={ $filterValues.id } />

  {#if Object.keys($filterValues).length > 0 && showReset}
    <ResetButton on:click={() => $filterValues = initialFilterValues} />
  {/if}

  <div class='flex gap-x-4 ml-auto'>
    <DataTableSettings title='Filters' description='Lorem ipsum dolor sit amet consectetur adipisicing elit. A, laudantium.'>
      <svelte:fragment slot='icon'>
        <Settings2 class='w-4 h-4' />
      </svelte:fragment>

      <svelte:fragment slot='content'>
        <Select.Root multiple items={statuses} selected={$filterValues.status.map(value => ({ value }))} onSelectedChange={(event) => {
          filterValues.update((values) => ({ ...values, status: event?.map(item => item.value) || [] }));
        }}>
          <Select.Trigger>
              Status
          </Select.Trigger>

          <Select.Content>
            {#each statuses as status}
              <Select.Item value={status.value}>
                {status.label}
              </Select.Item>
            {/each}
          </Select.Content>
        </Select.Root>
      </svelte:fragment>
    </DataTableSettings>
  
    <DataTableSettings title='Settings' description='Lorem ipsum dolor sit amet consectetur adipisicing elit. A, laudantium.'>
      <svelte:fragment slot='icon'>
        <Settings class='w-4 h-4' />
      </svelte:fragment>
      
      <svelte:fragment slot='content'>
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
      </svelte:fragment>
    </DataTableSettings>
  </div>
</header>