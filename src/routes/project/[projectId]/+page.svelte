<script lang="ts">
  import { goto } from '$app/navigation'
  import { page } from '$app/stores'
  import { Badge } from '$lib/components/ui/badge'
  import { Button } from '$lib/components/ui/button'
  import { Separator } from '$lib/components/ui/separator'
  import { Edit2Icon } from 'lucide-svelte'

  export let data

  async function deleteProjectHandler(e: Event) {
    e.preventDefault()
    const res = await fetch(`/api/project/${$page.params.projectId}`, {
      method: 'DELETE',
    })
    const received = await res.json()
    console.log(received)
  }

  function handleAddMilestone(e: Event) {
    e.preventDefault()

    goto(`/project/${$page.params.projectId}/add-milestone`)
  }
</script>

<main class="flex justify-center mx-2 md:mx-10 mt-10 mb-10">
  <div class="flex flex-col w-full max-w-[700px]">
    <div class="flex items-center gap-5">
      <h2 class="text-5xl font-semibold">{data.project.title}</h2>
      <a href={data.project.github}>
        <iconify-icon
          icon="mdi:github"
          class="text-4xl text-gray-600 hover:text-black cursor-pointer"
        >
        </iconify-icon>
      </a>
    </div>

    <h4 class="text-gray-700 text-2xl font-semibold mt-4">
      {data.project.description}
    </h4>

    <div class="flex mt-8 flex-col gap-3">
      <h3 class="text-3xl font-bold">About</h3>
      <p class="spacemono text-lg text-gray-700">
        {data.project.about}
      </p>
    </div>

    <div class="flex flex-col mt-10">
      <h3 class="text-3xl font-bold">Tech Stack</h3>
      <div class="flex gap-2 mt-4">
        {#each data.project.techStacks as ts}
          <Badge class="text-[14px]">{ts.name}</Badge>
        {/each}
      </div>
    </div>

    <div class="flex flex-col mt-10">
      <div class="flex gap-4">
        <h3 class="text-3xl font-bold">Milestones</h3>
        {#if data.project.isOwnProject}
          <Button
            variant="outline"
            class="font-bold text-lg"
            on:click={handleAddMilestone}>+</Button
          >
        {/if}
      </div>
      <div class="flex gap-4">
        <Separator class="mt-2" orientation="vertical" />
        {#if data.project.milestone.length > 0}
          {#each data.project.milestone as milestone}
            <div>
              <div class="mt-4">
                <div class="flex gap-4">
                  <h4 class="text-2xl font-semibold">{milestone.title}</h4>
                  <Badge>{milestone.status}</Badge>
                  {#if data.project.isOwnProject}
                    <a
                      href={`/project/${data.project.id}/edit-milestone/${milestone.id}`}
                    >
                      <Edit2Icon />
                    </a>
                  {/if}
                </div>
                <p class="text-gray-700 mt-2 ml-2 spacemono">
                  {milestone.description}
                </p>
              </div>
            </div>
          {/each}
        {:else}
          <p class="mt-4 text-gray-600 font-semibold text-xl">
            Project have no milestones currently
          </p>
        {/if}
      </div>

      <div class="mt-10 flex justify-center">
        {#if data.project.isOwnProject}
          <Button
            variant="destructive"
            class="bg-red-500"
            on:click={deleteProjectHandler}
          >
            Delete Project
          </Button>
        {:else}
          <Button variant="secondary">Send Collaboration Request</Button>
        {/if}
      </div>
    </div>
  </div>
</main>
