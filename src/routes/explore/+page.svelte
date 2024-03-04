<script lang="ts">
  import { Button } from '$lib/components/ui/button'
  import * as Card from '$lib/components/ui/card'
  import { Input } from '$lib/components/ui/input'

  let searchQuery = '';
  let projects : any = [];

  async function searchProjects(searchQuery: string) {
    const response = await fetch("/api/explore", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ searchQuery }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch projects');
    }

    return await response.json();
  }

  async function handleSearch() {
    if (!searchQuery.trim()) return;

    try {
      projects = await searchProjects(encodeURI(searchQuery));
      console.log(projects)
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  }
</script>

<main class="mx-4 md:mx-10 mt-10">
  <div class="w-full flex justify-center items-center gap-10 my-10">
    <Input
      type="text"
      placeholder="Explore Projects"
      class="max-w-md text-base"
      bind:value={searchQuery}
    />

    <Button on:click={handleSearch}>Search</Button>
  </div>

  <div
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-items-center gap-10 mt-16"
  >
    {#each projects as project}
      <Card.Root class="w-full max-w-[350px] cursor-pointer hover:scale-[1.01]">
        <a href="/project/{project.id}">
          <Card.Header>
            <Card.Title>{project.title}</Card.Title>
            <Card.Description>{project.description}</Card.Description>
          </Card.Header>
        </a>
      </Card.Root>
    {/each}
  </div>
</main>
