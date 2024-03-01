<script lang="ts">
  import { Button } from '$lib/components/ui/button'
  import * as Card from '$lib/components/ui/card'
  import { Input } from '$lib/components/ui/input'

  export let data
</script>

<main class="mx-4 md:mx-10 mt-10">
  <div class="w-full flex justify-center items-center gap-10 my-10">
    <Input
      type="text"
      placeholder="Search Your Projects"
      class="max-w-md text-base"
    />
    <a href="/dashboard/add">
      <Button>Add New</Button>
    </a>
  </div>

  <div
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-items-center gap-10 mt-16"
  >
    {#each data.projects as project}
      <Card.Root class="w-full max-w-[350px] cursor-pointer hover:scale-[1.01]">
        <a href={`/project/${project.id}`}>
          <Card.Header>
            <Card.Title>{project.title}</Card.Title>
            <Card.Description>{project.description}</Card.Description>
          </Card.Header>
        </a>
      </Card.Root>
    {/each}
  </div>
</main>
