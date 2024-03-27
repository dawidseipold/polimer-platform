<script lang='ts'>
	import type { Props } from ".";

  type $$Props = Props;
  
  export let page: $$Props['page'];
  export let perPage: $$Props['perPage'];
  export let count: $$Props['count'];
</script>

<div class='text-sm flex gap-x-1.5'>
  <strong>{($page * $perPage) + 1}-{($page + 1) * $perPage > count ? count : ($page + 1) * $perPage}</strong>
  <span>of</span>
  <strong>{count}</strong>
</div>