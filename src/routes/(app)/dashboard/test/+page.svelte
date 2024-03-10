<script lang='ts'>

	import { get,  readable, type Writable } from "svelte/store";

  // Table
	import { Render, Subscribe, createRender, createTable } from "svelte-headless-table";
	import { addColumnFilters, addHiddenColumns, addPagination, addSelectedRows, addSortBy, addTableFilter, textPrefixFilter } from "svelte-headless-table/plugins";
	import { data, statuses, type Order } from "$lib/constants";

  // Components
	import { Button } from "$lib/components/ui/button";
	import DataTable from "$lib/components/layout/data-table/data-table.svelte";
	import { RowActions } from "$lib/components/layout/data-table/row/actions";
	import { DataTableCheckbox } from "$lib/components/layout/data-table/checkbox";
	import { generatePageSizes } from "$lib/utils/table";
	import { DataTablePagination } from "$lib/components/layout/data-table/footer/pagination";
	import { DataTableHeaderRow } from "$lib/components/layout/data-table/header/row";
	import * as Table from "$lib/components/ui/table";
	import { DataTableBodyRow } from "$lib/components/layout/data-table/body/row";
	import { DataTableItemsIndicator } from "$lib/components/layout/data-table/footer/indicator";
	import { DataTableInput } from "$lib/components/layout/data-table/other/input";
  import * as Select from "$lib/components/ui/select";
	import { ChevronDown, Circle, Filter, ListFilter, Plus, Settings, X } from "lucide-svelte";
	import Separator from "$lib/components/ui/separator/separator.svelte";
	import { DataTableRowDownload } from "$lib/components/layout/data-table/row/download";
	import { Badge } from "$lib/components/ui/badge";
	import { DataTableStatusBadge } from "$lib/components/layout/data-table/status-badge";
	import * as Popover from "$lib/components/ui/popover";
	import * as Collapsible from "$lib/components/ui/collapsible";
	import { DataTableFilterDropdown } from "$lib/components/layout/data-table/other/dropdown";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
  // import * as FilterMenu from "$lib/components/layout/data-table/filter-menu";
	import { afterUpdate } from "svelte";
	import { FilterInput } from "$lib/components/layout/data-table/filter";

  const table = createTable(readable(data), {
    page: addPagination(),
    sort: addSortBy(),
    filter: addTableFilter({
      fn: ({filterValue, value}) => {
        return value.toLocaleLowerCase().includes(filterValue.toLowerCase())
      }
    }),
    colFilter: addColumnFilters(),
    hide: addHiddenColumns(),
    select: addSelectedRows()
  })

  const columns = table.createColumns([
    table.display(
      {
        // id: 'select',
        header: (_, { pluginStates }) => {
          const { allPageRowsSelected } = pluginStates.select;

          return createRender(DataTableCheckbox, {
            checked: allPageRowsSelected,
          });
        },
        cell: ({row}, {pluginStates}) => {
          const { getRowState } = pluginStates.select;
          const { isSelected } = getRowState(row);

          return createRender(DataTableCheckbox, {
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
        accessor: 'status',
        id: 'status',
        header: 'Status',
        cell: ({value}) => {
          return createRender(DataTableStatusBadge, {
            status: value,
          }); 
        },
        plugins: {
          sort: { disable: true },
          filter: { exclude: true},
          colFilter: {
            fn: ({filterValue, value}) => {
              if (filterValue.length === 0) return true;
              if (!Array.isArray(filterValue) || typeof value !== 'string') return true;

              return filterValue.some(filter => value.includes(filter));
            },
            initialFilterValue: statuses.map(status => status.value),
            render: ({ filterValue }) => {
              return get(filterValue);
            }
            // render: ({ filterValue, preFilteredValues }) => {
            //   return createRender(DataTableFilterDropdown, {
                
            //   })
            // }
          }
        }
      }
    ),

    table.column(
      {
        id: 'id',
        accessor: 'id',
        header: 'id',
        plugins: {
          sort: { disable: true },
          filter: { exclude: true},
          colFilter: {
            fn: textPrefixFilter,
            initialFilterValue: '',
            render: ({ filterValue }) => {
              return createRender(FilterInput, {
                filterValue
              })
            }
          }
        }
        
      }
    ),

    table.column(
      {
        id: 'amount',
        accessor: 'amount',
        header: 'Amount',
        plugins: {
          sort: { disable: true },
          filter: { exclude: true},
        }
      }
    ),

    table.column(
      {
        id: 'email',
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
        accessor: 'href',
        header: '',
        cell: ({value}) => {return createRender(DataTableRowDownload, {href: value})},
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
    ),
  ])

  const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates, flatColumns, rows } = table.createViewModel(columns);

  const { hasNextPage, hasPreviousPage, pageIndex, pageSize, pageCount,  } = pluginStates.page;

  const { filterValue } = pluginStates.filter;
  const { filterValues } = pluginStates.colFilter as { filterValues: Writable<Record<string, string[]>> };

  const { hiddenColumnIds } = pluginStates.hide;
  const { selectedDataIds } = pluginStates.select;

  const ids = flatColumns.map((column) => column.id);

  let hideForId = Object.fromEntries(ids.map((id) => [id, true]));
  const hidableCols = ['amount', 'status', 'email'];
  
  $: $hiddenColumnIds = Object.entries(hideForId).filter(([_,hide]) => !hide).map(([id,_]) => id);
  
  const pageSizes = generatePageSizes([20, 50, 100, 250, 500]);
  $pageSize = pageSizes[0].value;

  const testData = [1, 2, 3, 4]

  $: showReset = Object.values({ ...$filterValues, $filterValue }).some((v) => v.length > 0);
</script>

<div class="container mx-auto py-10 flex flex-col gap-y-8">
  <div class="flex justify-between mb-8 items-center">
    <div class="flex flex-col gap-y-2 items-center">
      <h1 class="text-foreground text-6xl">Orders</h1>
    </div>
  
    <div class="flex gap-x-2">
      <Button variant='outline'>Print Report</Button>
      <Button variant='default'>+ New Order</Button>
    </div>
  </div>

  <div class="w-full h-64 bg-muted rounded-3xl p-8 flex gap-x-8 items-center justify-around">
      {#each testData as element}
        <div class='flex flex-col gap-y-4 px-8 items-center justify-center'>
          <strong class='text-popover-foreground tracking-wide'>Orders to realize</strong>
          <span class="text-6xl font-bold text-foreground">{data.filter(order => order.status === 'pending').length}</span>
          <span class='text-popover-foreground'>vs last week <span class="text-foreground">4.2%</span></span>
        </div>

        {#if (element !== testData.length  ) }
          <Separator orientation='vertical' class='my-8 bg-popover' />
        {/if}

      {/each}
  </div>

  <DataTable id='data-table'>
    <slot slot="header">
      <div class='flex gap-x-4 w-full'>
        <DataTableInput class='max-w-64 min-w-48' placeholder='Search order by id...' type='text' filterValue={filterValue}  />
        
        <!-- <FilterMenu.Root>
          <FilterMenu.Trigger asChild let:builder>
            <Button builders={[builder]} variant='outline' class='flex gap-x-2'>
              <Plus class='w-4 h-4' />
              Add Filter
            </Button>
          </FilterMenu.Trigger>
          
          <FilterMenu.Content>
            {#each Object.keys($filterValues) as filter}
              <FilterMenu.Item>
                {filter}
              </FilterMenu.Item>
            {/each}
          </FilterMenu.Content>
        </FilterMenu.Root> -->
        
        {#if showReset}
          <Button variant='outline' class='flex gap-x-1' on:click={() => {
            $filterValue = '';
            $filterValues.status = [];
          }}>
            <X class='h-4 w-4' />
              Reset
          </Button>
        {/if}
        
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild let:builder>
            <Button builders={[builder]} variant="outline" class="aspect-square p-2 ml-auto">
              <Settings class='w-4 h-4' />
            </Button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Content>
            <DropdownMenu.Sub>
              <DropdownMenu.SubTrigger>
                Items per page
              </DropdownMenu.SubTrigger>

              <DropdownMenu.SubContent>
                <DropdownMenu.RadioGroup onValueChange={(event) => {
                  if (event) $pageSize = Number(event);
                }}>
                  {#each pageSizes as size}
                    <DropdownMenu.RadioItem checked={$pageSize === size.value} value={String(size.value)}>
                      {size.label}
                    </DropdownMenu.RadioItem>
                  {/each}
                </DropdownMenu.RadioGroup>
              </DropdownMenu.SubContent>
            </DropdownMenu.Sub>
            
            <DropdownMenu.Sub>
              <DropdownMenu.SubTrigger>
                Columns
              </DropdownMenu.SubTrigger>

              <DropdownMenu.SubContent>
                {#each flatColumns as col}
                  {#if hidableCols.includes(col.id)}
                    <DropdownMenu.CheckboxItem bind:checked={hideForId[col.id]}>
                      {col.header}
                    </DropdownMenu.CheckboxItem>
                  {/if}
                {/each}
              </DropdownMenu.SubContent>
            </DropdownMenu.Sub>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </div>

      <!-- {#if Object.keys($filterValues).some(key => $filterValues[key].length > 0)}
        <div>
          {#each Object.keys($filterValues) as filter}
            {#if $filterValues[filter].length > 0}
              <DataTableFilterDropdown bind:filterValues={$filterValues[filter]} title={filter} options={statuses} />
            {/if}
          {/each}
        </div>
      {/if} -->
    </slot>

    <slot slot='table'>
    <!-- TODO: Figure out how to pass correct props and remove the subscribe type error so it can be pased automatically and remove a lot of code boilerplate -->
    <Table.Root {...$tableAttrs} class='overflow-hidden'>
      <Table.Header>
        {#each $headerRows as headerRow}
          <Subscribe rowAttrs={headerRow.attrs()} >
            <Table.Row class='bg-popover hover:bg-popover'>
              {#each headerRow.cells as cell (cell.id)}
                <Subscribe attrs={cell.attrs()} let:attrs props={cell.props()} let:props>
                  <DataTableHeaderRow {cell} {attrs} {props}>
                      {#if props.colFilter?.render}
                        <Render of={props.colFilter.render} />
                      {/if}
                  </DataTableHeaderRow>
                </Subscribe>
              {/each}
            </Table.Row>
          </Subscribe>
        {/each}
      </Table.Header>
  
      <Table.Body {...tableBodyAttrs} class="before:content-['.'] before:text-transparent before:leading-4 before:block">
        {#each $pageRows as row (row.id)}
          <Subscribe rowAttrs={row.attrs()} let:rowAttrs>
            <Table.Row {...rowAttrs} data-state={$selectedDataIds[row.id] && "selected"} selected={$selectedDataIds[row.id]}>
              {#each row.cells as cell (cell.id)}
                <Subscribe attrs={cell.attrs()} let:attrs>
                  <DataTableBodyRow {attrs} {cell} />
                </Subscribe>
              {/each}
            </Table.Row>
          </Subscribe>
        {/each}
      </Table.Body>
    </Table.Root>
    </slot>

    <slot slot="footer">
      <DataTableItemsIndicator page={pageIndex} perPage={pageSize} count={$rows.length}  />

      <DataTablePagination
        onPreviousPage={() => {if ($hasPreviousPage) $pageIndex -= 1}}
        onNextPage={() => {if ($hasNextPage) $pageIndex += 1}} 
        count={$pageCount}
        perPage={$pageSize}
        page={$pageIndex}
        hasPreviousPage={$hasPreviousPage}
        hasNextPage={$hasNextPage} />
    </slot>

  </DataTable>
</div>