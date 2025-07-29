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

export type Payment = {
 id: string;
 amount: number;
 status: "pending" | "processing" | "success" | "failed";
 email: string;
 date: Date;
};
 
export const columns: ColumnDef<Payment>[] = [
  {
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
  },
 {
  accessorKey: "status",
  header: "Status",
 },
 {
  accessorKey: "email",
  header: ({ column }) => 
      renderComponent(DataTableEmailButton, {
        onclick: column.getToggleSortingHandler(),
      }),
 },
 {
  accessorKey: "amount",
  header: () => {
      const amountHeaderSnippet = createRawSnippet(() => ({
        render: () => `<div class="text-right">Amount</div>`,
      }));
      return renderSnippet(amountHeaderSnippet, "");
    },
    cell: ({ row }) => {
      const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      });
 
      const amountCellSnippet = createRawSnippet<[string]>((getAmount) => {
        const amount = getAmount();
        return {
          render: () => `<div class="text-right font-medium">${amount}</div>`,
        };
      });
      return renderSnippet(
        amountCellSnippet,
        formatter.format(parseFloat(row.getValue("amount")))
      );
    },
 },
 
{
  accessorKey: "date",
  header: "Date", // Or your preferred header setup
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
  {
    id: "actions",
    cell: ({ row }) => {
       // You can pass whatever you need from `row.original` to the component
      return renderComponent(DataTableActions, { id: row.original.id });
    },
  },
];