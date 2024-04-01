<script lang="ts">
	import type { Props } from '.';

	type $$Props = Props;
	let client: $$Props['client'];

	export { client };
</script>

<div>
	<h1>{client.name}</h1>
	<p>{client.employee.name}</p>
</div>
