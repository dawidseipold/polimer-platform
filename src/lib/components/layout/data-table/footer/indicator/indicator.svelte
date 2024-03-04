<script lang='ts'>
	import type { Props } from ".";

  type $$Props = Props;
  
  export let page: $$Props['pageIndex'];
  export let perPage: $$Props['pageSize'];
  export let count: $$Props['data'];
</script>

<div class='text-sm flex gap-x-1.5'>
  <strong>{($page * $perPage) + 1}-{($page + 1) * $perPage > count ? count : ($page + 1) * $perPage}</strong>
  <span>of</span>
  <strong>{count}</strong>
</div>