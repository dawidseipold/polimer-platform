<script lang='ts'>
  import type { Props } from '.'
  import * as Dropdown from '$lib/components/ui/dropdown-menu';
	import { Filter } from 'lucide-svelte';

  type $$Props = Props;
  let id: $$Props['id'];

  export { id }
</script>

<Dropdown.Root>
  <Dropdown.Trigger class='flex gap-x-4 items-center'>

    {id}

    <Filter class='w-4 h-4 fill-white'  />
  </Dropdown.Trigger>

  <Dropdown.Content>
    <Dropdown.Item>Option 1</Dropdown.Item>
    <Dropdown.Item>Option 2</Dropdown.Item>
    <Dropdown.Item>Option 3</Dropdown.Item>
  </Dropdown.Content>
</Dropdown.Root>