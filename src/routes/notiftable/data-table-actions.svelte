<script lang="ts">
  //import EllipsisIcon from "@lucide/svelte/icons/ellipsis";
  import { Button } from "$lib/components/ui/button/index.js";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
  import { ChevronDown } from 'lucide-svelte';

 
  let { id }: { id: string } = $props();

  interface TableRow{
     notifdetails: string; 
     isDropdownOpen: boolean;
  }

  let tableData: TableRow[] = [
        { notifdetails: 'Details for A', isDropdownOpen: false },
        {  notifdetails: 'Details for B', isDropdownOpen: false },
      ];

      function toggleDropdown(row: TableRow) {
        row.isDropdownOpen = !row.isDropdownOpen;
      }
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger>
    {#snippet child({ props })}
      <Button
        {...props}
        variant="ghost"
        size="icon"
        class="relative size-8 p-0"
      >
        <span class="sr-only">Open menu</span>
        <ChevronDown />
      </Button>
    {/snippet}
  </DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.Group>
      <DropdownMenu.Label>Actions</DropdownMenu.Label>
      <DropdownMenu.Item onclick={() => navigator.clipboard.writeText(id)}>

        Copy payment ID
      </DropdownMenu.Item>
    </DropdownMenu.Group>
    <DropdownMenu.Separator />
    <DropdownMenu.Item>View customer</DropdownMenu.Item>
    <DropdownMenu.Item>View payment details</DropdownMenu.Item>
  </DropdownMenu.Content>
</DropdownMenu.Root>