<script lang="ts">
 import CheckIcon from "@lucide/svelte/icons/check";
 import ChevronsUpDownIcon from "@lucide/svelte/icons/chevrons-up-down";
 import { tick } from "svelte";
 import * as Command from "$lib/components/ui/command/index.js";
 import * as Popover from "$lib/components/ui/popover/index.js";
 import { Button } from "$lib/components/ui/button/index.js";
 import { cn } from "$lib/utils.js";
 
  const { table } = $props();

 const municipalities = [
  { value: "Abucay", label: "Abucay" },
  { value: "Bagac", label: "Bagac" },
  { value: "Balanga City", label: "Balanga City" },
  { value: "Dinalupihan", label: "Dinalupihan" },
  { value: "Hermosa", label: "Hermosa" },
  { value: "Limay", label: "Limay" },
  { value: "Mariveles", label: "Mariveles" },
  { value: "Morong", label: "Morong" },
  { value: "Orani", label: "Orani" },
  { value: "Orion", label: "Orion" },
  { value: "Pilar", label: "Pilar" },
  { value: "Samal", label: "Samal" },
];
 
 let open = $state(false);
 let value = $state("");
 let triggerRef = $state<HTMLButtonElement>(null!);

 const selectedValue = $derived(
  municipalities.find((f) => f.value === value)?.label
 );
 
 // We want to refocus the trigger button when the user selects
 // an item from the list so users can continue navigating the
 // rest of the form with the keyboard.
 function closeAndFocusTrigger() {
  open = false;
  tick().then(() => {
   triggerRef.focus();
  });
 }
</script>
 
<Popover.Root bind:open>
  <Popover.Trigger bind:ref={triggerRef}>
    {#snippet child({ props })}
      <Button
        {...props}
        variant="outline"
        class="w-[200px] justify-between"
        role="combobox"
        aria-expanded={open}
      >
        {selectedValue || "Select a Municipality..."}
        <ChevronsUpDownIcon class="opacity-50" />
      </Button>
    {/snippet}
  </Popover.Trigger>
  <Popover.Content class="w-[200px] p-0">
    <Command.Root>
      <Command.Input placeholder="Search Municipality..." />
      <Command.List>
        <Command.Empty>No Municipality found.</Command.Empty>
        <Command.Group value="municipalities">
          <Command.Item
            onSelect={() => {
              value = "";
              closeAndFocusTrigger();
              table.getColumn("municipality")?.setFilterValue("");
            }}
          >
            <CheckIcon class={cn(value !== "" && "text-transparent")} />
            All
          </Command.Item>

          {#each municipalities as municipality (municipality.value)}
            <Command.Item
              value={municipality.value}
              onSelect={() => {
                value = municipality.value;
                closeAndFocusTrigger();
                // Add this line to filter the table
                table.getColumn("municipality")?.setFilterValue(municipality.value);
              }}
            >
              <CheckIcon
                class={cn(value !== municipality.value && "text-transparent")}
              />
              {municipality.label}
            </Command.Item>
          {/each}
        </Command.Group>
      </Command.List>
    </Command.Root>
  </Popover.Content>
</Popover.Root>