<script lang="ts">
  import * as Card from '$lib/components/ui/card';
  import { Button } from '$lib/components/ui/button';
 
  export let data
  const collabRequests = data.collabRequests
</script>

<div class="flex flex-col mx-8 items-center gap-8 mt-10">
  {#each collabRequests as request}
    <Card.Root class="w-full max-w-[550px] cursor-pointer hover:scale-[1.01]">
      <a href={`/project/${request.projectId}`}>
        <Card.Header>
          <Card.Title>{request.project.title}</Card.Title>
          <Card.Description>Requested to {request.project?.user.name}</Card.Description>
        </Card.Header>
        <Card.Content>
          <p>{request.message}</p>

          <p class="mt-2">Status: {request.status}</p>
        </Card.Content>
      </a>
    </Card.Root>
  {/each}

  {#if !collabRequests.length}
    <p class="text-gray-500 text-center">No collaboration requests found.</p>
  {/if}
</div>