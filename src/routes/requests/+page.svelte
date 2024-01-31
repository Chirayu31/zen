<script lang="ts">
  import * as Card from '$lib/components/ui/card'
  import { Button } from '$lib/components/ui/button'
</script>

<div class="flex flex-col mx-8 items-center gap-8 mt-10">
  {#each { length: 8 } as _}
    <Card.Root class="w-full max-w-[550px] cursor-pointer hover:scale-[1.01]">
      <a href="/project/randomProjectId">
        <Card.Header>
          <Card.Title>Pencil</Card.Title>
          <Card.Description>Requested by Chirayu</Card.Description>
        </Card.Header>
        <Card.Content>
          <p>Here goes the body</p>
          <Button class="text-lime-600" variant="link">Accept</Button>
          <Button class="text-red-500" variant="link">Reject</Button>
        </Card.Content>
      </a>
    </Card.Root>
  {/each}
</div>
