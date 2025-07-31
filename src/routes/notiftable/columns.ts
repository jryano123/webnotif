import type { ColumnDef } from "@tanstack/table-core";
import { createRawSnippet } from "svelte";
import { renderSnippet } from "$lib/components/ui/data-table/index.js";
import { renderComponent } from "$lib/components/ui/data-table/index.js";
import { Checkbox } from "$lib/components/ui/checkbox/index.js";
import DataTableActions from "./data-table-actions.svelte";
import DataTableEmailButton from "./data-table-email-button.svelte";
import { Button } from "$lib/components/ui/button"; // AI
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
//import  {selectedCategory} from "$lib/server/db";
export type Payment = {
 id: string;
 amount: number;
 municipality: string;
 status: "pending" | "processing" | "success" | "failed";
 email: string;
 date: Date;
 details: string;
};

export const columns: ColumnDef<Payment>[] = [
 /* {
    id: "select",
    header: ({ table }) =>
      renderComponent(Checkbox, {
        checked: table.getIsAllPageRowsSelected(),
        indeterminate:
          table.getIsSomePageRowsSelected() &&
          !table.getIsAllPageRowsSelected(),
        onCheckedChange: (value) => table.toggleAllPageRowsSelected(!!value),
        "aria-label": "Select all",
      }),
    cell: ({ row }) =>
      renderComponent(Checkbox, {
        checked: row.getIsSelected(),
        onCheckedChange: (value) => row.toggleSelected(!!value),
        "aria-label": "Select row",
      }),
    enableSorting: false,
    enableHiding: false,
  }, */

 {
  accessorKey: "email",
  header:"Name",
 },
 {
  accessorKey: "municipality",
  header: () => {
    const municipalityHeaderSnippet = createRawSnippet(() => ({
      render: () => '<div class="">Municipality</div>',
    }));
    return renderSnippet(municipalityHeaderSnippet, "");
 },
},
 {
  accessorKey: "status",
  header: () => {
      const amountHeaderSnippet = createRawSnippet(() => ({
        render: () => `<div class="">Status</div>`,
      }));
      return renderSnippet(amountHeaderSnippet, "");
    },
 },
{
  accessorKey: "date",
  header: "Date", 
  cell: ({ row }) => {
    const dateValue: Date = row.original.date;

    if (!(dateValue instanceof Date) || isNaN(dateValue.getTime())) {
      const invalidDateSnippet = createRawSnippet(() => ({
        render: () => `<span>N/A</span>`,
      }));
      return renderSnippet(invalidDateSnippet, "");
    }
    const formatter = new Intl.DateTimeFormat("en-US", {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      // hour: '2-digit',
      // minute: '2-digit',
    });

    const formattedDate = formatter.format(dateValue);

    const dateCellSnippet = createRawSnippet<[string]>((getFormattedDate) => {
      const dateString = getFormattedDate();
      return {
        render: () => `<span>${dateString}</span>`,
      };
    });

    return renderSnippet(dateCellSnippet, formattedDate);
  },
  enableSorting: true,
},
];