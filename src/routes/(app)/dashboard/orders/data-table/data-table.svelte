<script lang="ts">
	import {Render, Subscribe, createTable, createRender} from 'svelte-headless-table'
  import {readable} from "svelte/store";
  import * as Table from "$lib/components/ui/table";
  import DataTableActions from './data-table-actions.svelte';
  import { addPagination, addSortBy, addTableFilter, addHiddenColumns, addSelectedRows } from "svelte-headless-table/plugins";
  import { Button } from "$lib/components/ui/button";
	import { Input } from '$lib/components/ui/input';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
  import DataTableCheckbox from "./data-table-checkbox.svelte";

  // Icons
	import ArrowUpDown from 'lucide-svelte/icons/arrow-up-down';
	import ArrowUp from 'lucide-svelte/icons/arrow-up';
	import ArrowDown from 'lucide-svelte/icons/arrow-down';
	import { ChevronDown } from 'lucide-svelte';

  type Order = {
    id: string;
    amount: number;
    status: "pending" | "processing" | "success" | "failed";
    email: string;
  }

  const data: Order[] = [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "test@test.com"
    },
    {
      id: "489e1d42",
      amount: 125,
      status: "processing",
      email: "test@test.pl"
    },
    {
      id: "489e1d42",
      amount: 125,
      status: "processing",
      email: "john@doe.com"
    }
  ]

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
    table.column({accessor: 'id', header: (_, { pluginStates }) => {
        const { allPageRowsSelected } = pluginStates.select;

        return createRender(DataTableCheckbox, {
          checked: allPageRowsSelected,
        });
      }, cell: ({row}, {pluginStates}) => {
        const { getRowState } = pluginStates.select;
        const { isSelected } = getRowState(row);

        return createRender(DataTableCheckbox, {
          checked: isSelected,
        });
      }, plugins: { sort: { disable: true }, filter: { exclude: true}}}),
    table.column({accessor: 'amount', header: 'Amount', plugins: { sort: { disable: true }, filter: { exclude: true}}}),
    table.column({accessor: 'status', header: 'Status', plugins: { sort: { disable: true }, filter: { exclude: true}}}),
    table.column({accessor: 'email', header: 'Email', plugins: { sort: { disable: false }, filter: { exclude: false}}}),
    table.column({accessor: ({id}) => id, header: '', cell: ({value}) => {return createRender(DataTableActions, {id: value})}, plugins: {sort: { disable: true }, filter: { exclude: true}}})
  ])

  const {headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates, flatColumns, rows } = table.createViewModel(columns)
  const {hasNextPage, hasPreviousPage, pageIndex, pageSize, pageCount} = pluginStates.page
  const {filterValue} = pluginStates.filter;
  const { hiddenColumnIds } = pluginStates.hide;
  const {selectedDataIds} = pluginStates.select;

  const ids = flatColumns.map((column) => column.id);
  let hideForId = Object.fromEntries(ids.map((id) => [id, true]));

  $: $hiddenColumnIds = Object.entries(hideForId).filter(([_,hide]) => !hide).map(([id,_]) => id)
  const hidableCols = ['amount', 'status', 'email']

  $pageSize = 2
</script>

<div>
  <div class="flex items-center py-4">
    <Input class='max-w-sm' placeholder='Filter emails...' type='text' bind:value={$filterValue} />

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
  </div>

  <Table.Root {...$tableAttrs}>
    <Table.Header>
      {#each $headerRows as headerRow}
        <Subscribe rowAttrs={headerRow.attrs()} >
          <Table.Row>
            {#each headerRow.cells as cell (cell.id)}
              <Subscribe attrs={cell.attrs()} let:attrs props={cell.props()} let:props>
                <Table.Head {...attrs} class="[&:has([role=checkbox])]:pl-3">
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

    <Table.Body {...tableBodyAttrs}>
      {#each $pageRows as row (row.id)}
        <Subscribe rowAttrs={row.attrs()} let:rowAttrs>
          <Table.Row {...rowAttrs} data-state={$selectedDataIds[row.id] && "selected"}>
            {#each row.cells as cell (cell.id)}
              <Subscribe attrs={cell.attrs()} let:attrs>
                <Table.Cell {...attrs} class="[&:has([role=checkbox])]:pl-3">
                  <Render of={cell.render()} />
                </Table.Cell>
              </Subscribe>
            {/each}
          </Table.Row>
        </Subscribe>
      {/each}
    </Table.Body>
  </Table.Root>
</div>

<div>
  <div class="flex-1 text-sm text-muted-foreground">
    {Object.keys($selectedDataIds).length} of{" "}
    {$rows.length} row(s) selected.
  </div>
  <Button variant='outline' size='sm' on:click={() => ($pageIndex = $pageIndex - 1)} disabled={!$hasPreviousPage}>Previous</Button>
  {$pageIndex + 1} of {$pageCount}
  <Button variant='outline' size='sm' on:click={() => ($pageIndex = $pageIndex + 1)} disabled={!$hasNextPage}>Next</Button>
</div>