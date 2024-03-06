<script lang="ts">
  import * as Card from '$lib/components/ui/card';
  import { Button } from '$lib/components/ui/button';
 
  export let data
  const collabRequests = data.collabRequests

  const reqActionHandler = async (reqId:string, status:string) => {
    const response = await fetch(`/api/collaboration/action/${reqId}`, {
      method:'PUT',
      body: JSON.stringify({ status : status })
    })
    return await response.json()
  }

  async function acceptHandler(reqId : string){
    reqActionHandler(reqId, "accepted")
  }

  async function rejectHandler(reqId : string){
    reqActionHandler(reqId, "declined")
  }

</script>

<a href="/requests/sent">
<Button class="mt-10 ml-4 md:ml-8" variant="secondary">View Sent Requests</Button>
</a>

<div class="flex flex-col mx-8 items-center gap-8 mt-5">
  {#each collabRequests as request}
    <Card.Root class="w-full max-w-[550px] cursor-pointer hover:scale-[1.01]">
      <a href={`/project/${request.projectId}`}>
        <Card.Header>
          <Card.Title>{request.project.title}</Card.Title>
          <Card.Description>Requested by {request.sender?.name}</Card.Description>
        </Card.Header>
        <Card.Content>
          <p>{request.message}</p>
          {#if request.status == 'pending'}
            <Button class="text-lime-600" variant="link" on:click={() => acceptHandler(request.id)}>Accept</Button>
            <Button class="text-red-500" variant="link" on:click={() => rejectHandler(request.id)}>Reject</Button>
            {:else}
            <p class="mt-2">Status: {request.status}</p>
          {/if}
        </Card.Content>
      </a>
    </Card.Root>
  {/each}

  {#if !collabRequests.length}
    <p class="text-gray-500 text-center">No collaboration requests found.</p>
  {/if}
</div>