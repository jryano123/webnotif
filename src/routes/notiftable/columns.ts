import type { ColumnDef } from "@tanstack/table-core";
import { createRawSnippet } from "svelte";
import { renderSnippet } from "$lib/components/ui/data-table/index.js";
import { renderComponent } from "$lib/components/ui/data-table/index.js";
import { Checkbox } from "$lib/components/ui/checkbox/index.js";
import { Button } from "$lib/components/ui/button"; // AI
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
//import  {selectedCategory} from "$lib/server/db";
export type Payment = {
 id: string;
 municipality: string;
 status: "pending" | "processing" | "success" | "failed";
 email: string;
 date: Date;
 details: string;
};

export const columns: ColumnDef<Payment>[] = [
 {
  accessorKey: "email",
  header:"Name",
 },
 {
  accessorKey: "details",
  header:"Details",
   cell: (info) => {
    const detailsValue = info.getValue() as string;
    const detailsSnippet = createRawSnippet<[string]>((getDetails) => {
      const details = getDetails();
      return {
        render: () => `<a class= "text-blue-600 hover:underline font-medium" href="/details/${details}" target="_blank" rel="noopener noreferrer">${details}</a>`,
      };
    });
    return renderSnippet(detailsSnippet, detailsValue);
  },
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