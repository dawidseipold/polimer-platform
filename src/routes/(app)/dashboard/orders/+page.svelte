<script lang='ts'>
	import { Button } from "$lib/components/ui/button";
	import DataTable from "./data-table/data-table.svelte";

  type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};
 
export const payments: Payment[] = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "489e1d42",
    amount: 125,
    status: "processing",
    email: "example@gmail.com",
  },
  // ...
];
</script>

<div class="flex justify-between items-start p-8 bg-muted border-b-2 border-b-muted-foreground">
  <div class="flex flex-col gap-y-2">
    <h1 class="text-foreground text-4xl">Orders</h1>
  </div>

  <div class="flex gap-x-2">
    <Button variant='outline'>Print Report</Button>
    <Button variant='secondary'>+ New Order</Button>
  </div>
</div>

<div class="container mx-auto py-10">
  <DataTable />
</div>