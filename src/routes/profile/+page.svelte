<script lang="ts">
  import * as Card from '$lib/components/ui/card'
</script>

<main class="flex justify-center mx-2 md:mx-10 mt-10">
  <div class="flex flex-col w-full max-w-[700px]">
    <div class="flex items-center gap-5">
      <h2 class="text-5xl font-semibold">Chirayu Pancholi</h2>
      <iconify-icon
        icon="mdi:github"
        class="text-4xl text-gray-600 hover:text-black cursor-pointer"
      >
      </iconify-icon>
    </div>

    <div
      class="grid grid-cols-1 md:grid-cols-2 justify-items-center gap-10 mt-16"
    >
      {#each { length: 8 } as _}
        <Card.Root
          class="w-full max-w-[350px] cursor-pointer hover:scale-[1.01]"
        >
          <a href="/project/randomProjectId">
            <Card.Header>
              <Card.Title>Pencil</Card.Title>
              <Card.Description>A Short Description</Card.Description>
            </Card.Header>
          </a>
        </Card.Root>
      {/each}
    </div>
  </div>
</main>
