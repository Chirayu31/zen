<script>
  import '../app.css'
  import { page } from '$app/stores'
  import Navbar from '$lib/components/navbar.svelte'
</script>

{#if $page.route.id !== '/'}
  <Navbar />
{/if}

<slot />

<style>
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Orbitron:wght@500;600&family=Space+Mono:wght@400;700&family=Outfit:wght@400;500;600;700&display=swap');

  :root {
    font-family: 'Montserrat', sans-serif;
  }
</style>
