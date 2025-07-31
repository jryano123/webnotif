<script lang="ts" generics="TData, TValue">
 import { type ColumnDef, type PaginationState, type SortingState, type ColumnFiltersState,type VisibilityState, type RowSelectionState, 
  getCoreRowModel, getPaginationRowModel, getSortedRowModel, getFilteredRowModel,} from "@tanstack/table-core";
 import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
 import { Input } from "$lib/components/ui/input/index.js";
 import { createSvelteTable,FlexRender, } from "$lib/components/ui/data-table/index.js";
 import * as Table from "$lib/components/ui/table/index.js";
import type { ComponentProps } from "svelte";
import { Button } from "$lib/components/ui/button"
import Combobox from "$lib/components/Combobox/combobox.svelte";

 type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
 };
 
 //let { columns, data, selectedMunicipality}: DataTableProps<TData, TValue> =$props();
 let { columns, data,}: DataTableProps<TData, TValue> =$props();
 let selectedCategory = $state<'All' |'Daytour' | 'Overnight' | 'CUS'> ('All'); // Default to All

  function selectCategory(category: 'Daytour' | 'Overnight' | 'CUS' | 'All') {
    selectedCategory = category;
    console.log("Selected category:", selectedCategory);
  }
 
 let pagination = $state<PaginationState>({pageIndex: 0, pageSize:10})
 let sorting = $state<SortingState>([]);
 let columnFilters = $state<ColumnFiltersState>([]);
 let columnVisibility = $state<VisibilityState>({});
 let rowSelection = $state<RowSelectionState>({});

 const table = createSvelteTable({
  get data() {
   return data;
  },
  columns,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),

  onPaginationChange: (updater) => {
      if (typeof updater === "function") {
        pagination = updater(pagination);
      } else {
        pagination = updater;
      }
    },
  onSortingChange: (updater) => {
    if (typeof updater === "function") {
        sorting = updater(sorting);
    }else {
        sorting = updater;
    }
  },
  onColumnFiltersChange: (updater) => {
      if (typeof updater === "function") {
        columnFilters = updater(columnFilters);
      } else {
        columnFilters = updater;
      }
    },
     onColumnVisibilityChange: (updater) => {
      if (typeof updater === "function") {
        columnVisibility = updater(columnVisibility);
      } else {
        columnVisibility = updater;
      }
    },
    onRowSelectionChange: (updater) => {
      if (typeof updater === "function") {
        rowSelection = updater(rowSelection);
      } else {
        rowSelection = updater;
      }
    },
     state: {
    get pagination() {
        return pagination;
    },
    get sorting() {
        return sorting;
    },
    get columnFilters() {
      return columnFilters;
    },
     get columnVisibility() {
        return columnVisibility;
      },
       get rowSelection() {
        return rowSelection;
      },
  },
 });
</script>

<div> 
  <div class="flex flex-column items-center py-4">
    <Input
      placeholder="Search Name..."
      value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
      onchange={(e) => {
        table.getColumn("email")?.setFilterValue(e.currentTarget.value);
      }}
      oninput={(e) => {
        table.getColumn("email")?.setFilterValue(e.currentTarget.value);
      }}
      class="max-w-sm"
    />
    <div class="ml-5">
     <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        {#snippet child({ props })}
          <Button {...props} variant="outline" class="ml-auto">Columns</Button>
        {/snippet}
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align="end">
        {#each table
          .getAllColumns()
          .filter((col) => col.getCanHide()) as column (column.id)}
          <DropdownMenu.CheckboxItem
            class="capitalize"
            bind:checked={
              () => column.getIsVisible(), (v) => column.toggleVisibility(!!v)
            }
          >
            {column.id}
          </DropdownMenu.CheckboxItem>
        {/each}
      </DropdownMenu.Content>
    </DropdownMenu.Root> 
  </div>
<div class ="ml-5"> 
   <!-- Combobox for bataan municipalities -->
 <Combobox />
  </div>
  <!---<div class="ml-5 text-white">
    <Button placeholder="ALL"/>
  </div>
-->
<div class="ml-5 inline-flex rounded-lg border border-grey bg-white p-1">
  <Button
    onclick={() => selectCategory('All')}
    class="px-4 py-2 text-sm rounded-hover bg-white text-black hover:bg-gray-100 transition-colors border-r border-grey"
  >
    All
  </Button>
  <Button
    onclick={() => selectCategory('Daytour')}
    class="px-4 py-2 text-sm rounded-hover bg-white text-black hover:bg-gray-100 transition-colors border-r border-grey"
  >
    Daytour
  </Button>
  <Button
    onclick={() => selectCategory('Overnight')}
    class="px-4 py-2 text-sm rounded-hover bg-white text-black hover:bg-gray-100 transition-colors border-r border-grey"
  >
    Overnight
  </Button>
  <Button
    onclick={() => selectCategory('CUS')}
    class="px-4 py-2 text-sm rounded-r-md bg-white text-black hover:bg-gray-100 transition-colors"
  >
    CUS
  </Button>
</div>
  </div>


<div class="rounded-md border">
  <Table.Root>
    <Table.Header>
      {#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
        <Table.Row>
          {#each headerGroup.headers as header (header.id)}
            <Table.Head colspan={header.colSpan}>
              {#if !header.isPlaceholder}
                <FlexRender
                  content={header.column.columnDef.header}
                  context={header.getContext()}
                />
              {/if}
            </Table.Head>
          {/each}
        </Table.Row>
      {/each}
    </Table.Header>
    <Table.Body>
      {#each table.getRowModel().rows as row (row.id)}
        <Table.Row data-state={row.getIsSelected() && "selected"}>
          {#each row.getVisibleCells() as cell (cell.id)}
            <Table.Cell>
              <FlexRender
                content={cell.column.columnDef.cell}
                context={cell.getContext()}
              />
            </Table.Cell>
          {/each}
        </Table.Row>
      {:else}
        <Table.Row>
          <Table.Cell colspan={columns.length} class="h-24 text-center">
            No results.
          </Table.Cell>
        </Table.Row>
      {/each}
    </Table.Body>
  </Table.Root>
</div>

<div class="flex items-center justify-end space-x-2 py-4">
  <div class="text-muted-foreground flex-1 text-sm">
 {table.getFilteredSelectedRowModel().rows.length} of{" "}
 {table.getFilteredRowModel().rows.length} row(s) selected.
 </div>
    <Button
      variant="outline"
      size="sm"
      onclick={() => table.previousPage()}
      disabled={!table.getCanPreviousPage()}
    >
      Previous
    </Button>
    <Button
      variant="outline"
      size="sm"
      onclick={() => table.nextPage()}
      disabled={!table.getCanNextPage()}
    >
      Next
    </Button>
  </div>
</div>
