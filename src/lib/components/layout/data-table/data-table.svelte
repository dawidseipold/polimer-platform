<script>
  let id = '';
  export { id };

</script>

<data-table id={id}>
  <header class='flex flex-col gap-y-4 items-start gap-x-4 mb-4'>
    <slot name='header' />
  </header>

  <div>
    <slot name='table' />
  </div>
  
  <footer class='flex items-center gap-x-8 justify-end mt-4'>
    <slot name='footer' />
  </footer>
</data-table>