<script lang="ts">
  import * as Card from '$lib/components/ui/card'

  export let data
</script>

<main class="flex flex-col items-center mt-5">
    <Card.Root class="w-full max-w-[750px] px-5 cursor-pointer">
          <Card.Header>
            <Card.Title>{data.cotd.name}</Card.Title>
            <Card.Description>is our Connection of the Day. Browse their projects and send collaboration request to collaborate with them.</Card.Description>
          </Card.Header>
      </Card.Root>
    <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-items-center gap-10 mt-16"
    >
    {#each data.cotd.projects as project}
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