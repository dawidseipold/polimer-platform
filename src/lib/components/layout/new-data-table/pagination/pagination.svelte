<script lang='ts'>
	import { Pagination } from "bits-ui";
  import { type Props } from '.'
	import { ChevronLeft, ChevronRight } from "lucide-svelte";

  type $$Props = Props;

  let hasPreviousPage: $$Props['hasPreviousPage'];
  let onPreviousPage: $$Props['onPreviousPage'];

  let hasNextPage: $$Props['hasNextPage'];
  let onNextPage: $$Props['onNextPage'];
  
  let count: $$Props['count'];
  let perPage: $$Props['perPage'];
  let page: $$Props['page'];

  export { hasPreviousPage, onPreviousPage, hasNextPage, onNextPage, count, perPage, page }

</script>

<Pagination.Root class='flex items-center gap-x-2' {count} {perPage} {page} {...$$restProps} let:pages>
  <Pagination.NextButton disabled={!hasPreviousPage} on:click={onPreviousPage} class='p-2 rounded-xl bg-popover hover:bg-popover/50 disabled:bg-transparent disabled:cursor-not-allowed'>
    <ChevronLeft  />
  </Pagination.NextButton>

  <Pagination.NextButton disabled={!hasNextPage} on:click={onNextPage} class='p-2 rounded-xl bg-popover hover:bg-popover/50 disabled:bg-transparent disabled:cursor-not-allowed'>
    <ChevronRight />
  </Pagination.NextButton>
</Pagination.Root>