<script lang="ts">
 import DataTable from "./data-table.svelte";
 import { columns } from "./columns.js";
import Combobox from "$lib/components/Combobox/combobox.svelte";

let { data } = $props();
</script>

<DataTable data={data.payments} {columns} /> 
