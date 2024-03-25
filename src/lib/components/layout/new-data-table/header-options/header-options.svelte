<script lang='ts'>
  import type { Props } from '.'
  import * as Dropdown from '$lib/components/ui/dropdown-menu';
	import { Filter } from 'lucide-svelte';

  type $$Props = Props;
  let id: $$Props['id'];
  // let sort: $$Props['sort'];

  export { id, sort }
</script>

<Dropdown.Root>
  <Dropdown.Trigger class='flex gap-x-4 items-center'>
    {id}
    <Filter class='w-4 h-4 fill-white'  />
  </Dropdown.Trigger>

  <Dropdown.Content>
    <Dropdown.RadioGroup onValueChange={(value) => console.log(value)}
     >
      <Dropdown.Label>
        Sort
      </Dropdown.Label>
      
      <Dropdown.RadioItem value='asc'>
        Ascending
      </Dropdown.RadioItem>
      <Dropdown.RadioItem value='desc'>
        Descending
      </Dropdown.RadioItem>
    </Dropdown.RadioGroup>

    <slot />
  </Dropdown.Content>
</Dropdown.Root>