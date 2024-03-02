<script lang="ts">
	import { Sidebar } from "$lib/components/layout/sidebar";
  import { page } from '$app/stores';
	import { Header } from "$lib/components/layout/header";
	import { Button } from "$lib/components/ui/button";
	import { afterUpdate, onMount } from "svelte";

  let pathname = $page.url.pathname;

  afterUpdate(() => {
    pathname = $page.url.pathname;
  });
</script>

<app class="flex w-full">
  <Sidebar pathname={pathname} />

  <main class="flex flex-col w-full">
    <Header />

    <div>
      <slot />
    </div>
  </main>
</app>