<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;
</script>

{#if data.payment}
  <h1>Details for {data.payment.details}</h1>
  <p>Status: {data.payment.status}</p>
  <p>Municipality: {data.payment.municipality}</p>
  <p>Email: {data.payment.email}</p>
{:else}
  <p>Item not found.</p>
{/if}