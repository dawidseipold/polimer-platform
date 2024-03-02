<script lang="ts">
	import {Render, Subscribe, createTable, createRender} from 'svelte-headless-table'
  import {readable} from "svelte/store";
  import * as Table from "$lib/components/ui/table";
  import { RowActions } from './row-actions';
  import { Checkbox } from './checkbox';
  import { addPagination, addSortBy, addTableFilter, addHiddenColumns, addSelectedRows } from "svelte-headless-table/plugins";
  import { Button } from "$lib/components/ui/button";
	import { DataTableInput } from './filter/input';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
  // import * as Pagination from "$lib/components/ui/pagination";
  import { Pagination } from "bits-ui";
  import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-svelte";
  import { Separator } from "$lib/components/ui/separator";


  // Icons
	import ArrowUpDown from 'lucide-svelte/icons/arrow-up-down';
	import ArrowUp from 'lucide-svelte/icons/arrow-up';
	import ArrowDown from 'lucide-svelte/icons/arrow-down';
	import { ChevronDown } from 'lucide-svelte';
	import { cn } from '$lib/utils';

  import {data} from '$lib/constants';
	import * as Select from '$lib/components/ui/select';
	import { afterUpdate } from 'svelte';
	import { Input } from '$lib/components/ui/input';

  const table = createTable(readable(data), {
    page: addPagination(),
    sort: addSortBy(),
    filter: addTableFilter({
      fn: ({filterValue, value}) => {
        return value.toLocaleLowerCase().includes(filterValue.toLowerCase())
      }
    }),
    hide: addHiddenColumns(),
    select: addSelectedRows()
  })

  const columns = table.createColumns([
    table.display(
      {
        id: 'select',
        header: (_, { pluginStates }) => {
          const { allPageRowsSelected } = pluginStates.select;

          return createRender(Checkbox, {
            checked: allPageRowsSelected,
          });
        },
        cell: ({row}, {pluginStates}) => {
          const { getRowState } = pluginStates.select;
          const { isSelected } = getRowState(row);

          return createRender(Checkbox, {
            checked: isSelected,
          });
        },
        plugins:
          {
            sort: { disable: true },
            filter: { exclude: true }
          }
        }
      ),

    table.column(
      {
        accessor: 'id',
        header: 'id',
        plugins: {
          sort: { disable: true },
          filter: { exclude: false}
        }
      }
    ),

    table.column(
      {
        accessor: 'amount',
        header: 'Amount',
        plugins: {
          sort: { disable: true },
          filter: { exclude: true}
        }
      }
    ),

    table.column(
      {
        accessor: 'status',
        header: 'Status',
        plugins: {
          sort: { disable: true },
          filter: { exclude: true}
        }
      }
    ),

    table.column(
      {
        accessor: 'email',
        header: 'Email',
        plugins: {
          sort: { disable: true },
          filter: { exclude: true}
        }
      }
    ),

    table.column(
      {
        accessor: ({id}) => id,
        header: '',
        cell: ({value}) => {return createRender(RowActions, {id: value})},
        plugins: {
          sort: { disable: true },
          filter: { exclude: true}
        }
      }
    )
  ])

  const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates, flatColumns, rows } = table.createViewModel(columns)
  const { hasNextPage, hasPreviousPage, pageIndex, pageSize, pageCount,  } = pluginStates.page
  const { filterValue } = pluginStates.filter;
  const { hiddenColumnIds } = pluginStates.hide;
  const { selectedDataIds } = pluginStates.select;

  const ids = flatColumns.map((column) => column.id);
  let hideForId = Object.fromEntries(ids.map((id) => [id, true]));

  $: $hiddenColumnIds = Object.entries(hideForId).filter(([_,hide]) => !hide).map(([id,_]) => id)
  const hidableCols = ['amount', 'status', 'email']

  const pageSizes = [
    {value: 20, label: '20 per page'},
    {value: 50, label: '50 per page'},
    {value: 100, label: '100 per page'},
    {value: 250, label: '250 per page'},
    {value: 500, label: '500 per page'},
  ];

  $pageSize = 20
</script>

<div>
  <div class="flex items-center gap-x-4 py-4">
    <DataTableInput class='max-w-sm' placeholder='Filter emails...' type='text' filterValue={filterValue}  />

    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild let:builder>
        <Button variant="outline" class="ml-auto" builders={[builder]}>
          Columns <ChevronDown class="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenu.Trigger>
      
      <DropdownMenu.Content>
        {#each flatColumns as col}
          {#if hidableCols.includes(col.id)}
            <DropdownMenu.CheckboxItem bind:checked={hideForId[col.id]}>
              {col.header}
            </DropdownMenu.CheckboxItem>
          {/if}
        {/each}
      </DropdownMenu.Content>
    </DropdownMenu.Root>

    <Select.Root items={pageSizes} selected={pageSizes[pageSizes.findIndex(item => item.value === $pageSize)]} onSelectedChange={(e) => {
      if (e) $pageSize = e.value;
    }}>
      <Select.Trigger class='min-w-40 w-max'>
          <Select.Value />
      </Select.Trigger>

      <Select.Content>
        {#each pageSizes as size}
          <Select.Item value={size.value}>{size.label}</Select.Item>
        {/each}
      </Select.Content>
    </Select.Root>
  </div>

  <div class="bg-muted rounded-3xl p-4 flex flex-col space-y-4">
    <Table.Root {...$tableAttrs} class='overflow-hidden'>
      <Table.Header >
        {#each $headerRows as headerRow}
          <Subscribe rowAttrs={headerRow.attrs()} >
            <Table.Row class='bg-popover hover:bg-popover'>
              {#each headerRow.cells as cell (cell.id)}
                <Subscribe attrs={cell.attrs()} let:attrs props={cell.props()} let:props>
                  <Table.Head {...attrs} class="first:pl-4 first:rounded-l-2xl last:pr-4 last:rounded-r-2xl py-2">
                    {#if cell.id === 'email'}
                      <Button variant="ghost" on:click={(e) => {
                        props.sort.toggle(e)
                      }} class='flex gap-x-4'>
                        <Render of={cell.render()} />
    
                        {#if props.sort.order === 'asc'}
                        <ArrowUp class="w-4 h-4" />
                        {:else if props.sort.order === 'desc'}
                        <ArrowDown class="w-4 h-4" />
                        {:else}
                        <ArrowUpDown class="w-4 h-4" />
                        {/if}
                      </Button>
                    {:else}
                    <Render of={cell.render()} />
                    {/if}
                  </Table.Head>
                </Subscribe>
              {/each}
            </Table.Row>
          </Subscribe>
        {/each}
      </Table.Header>

      <Table.Body {...tableBodyAttrs} class="mt-4 before:content-['.'] before:text-transparent before:leading-4 before:block">
        {#each $pageRows as row (row.id)}
          <Subscribe rowAttrs={row.attrs()} let:rowAttrs>
            <Table.Row {...rowAttrs} data-state={$selectedDataIds[row.id] && "selected"}>
              {#each row.cells as cell (cell.id)}
                <Subscribe attrs={cell.attrs()} let:attrs>
                  <Table.Cell {...attrs} class="first:pl-4 first:rounded-l-2xl last:pr-4 last:text-end last:rounded-r-2xl">
                    <Render of={cell.render()} />
                  </Table.Cell>
                </Subscribe>
              {/each}
            </Table.Row>
          </Subscribe>
        {/each}
      </Table.Body>
    </Table.Root>

    <footer class='flex items-center gap-x-8 justify-end'>
      <!-- TODO: SHOWS THE SAME AFTER FILTERING -->
      <div class='text-sm flex gap-x-1.5'>
        <strong>{($pageIndex * $pageSize) + 1}-{($pageIndex + 1) * $pageSize > data.length ? data.length : ($pageIndex + 1) * $pageSize}</strong>
        <span>of</span>
        <strong>{data.length}</strong>
      </div>
  
      <Pagination.Root class='flex items-center gap-x-2' count={$rows.length} perPage={$pageSize} page={$pageIndex + 1} let:pages>
        <Pagination.NextButton disabled={!$hasPreviousPage} on:click={() => {if ($hasPreviousPage) $pageIndex -= 1} } class='p-2 rounded-xl bg-popover hover:bg-popover/50 disabled:bg-transparent disabled:cursor-not-allowed'>
          <ChevronLeft  />
        </Pagination.NextButton>
  
        <Pagination.NextButton disabled={!$hasNextPage} on:click={() => {if ($hasNextPage) $pageIndex += 1} } class='p-2 rounded-xl bg-popover hover:bg-popover/50 disabled:bg-transparent disabled:cursor-not-allowed'>
          <ChevronRight />
        </Pagination.NextButton>
      </Pagination.Root>
    </footer>
  </div>

  

</div>