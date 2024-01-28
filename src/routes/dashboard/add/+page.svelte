<script lang="ts">
  import { Button } from '$lib/components/ui/button'
  import { Input } from '$lib/components/ui/input'
  import { Textarea } from '$lib/components/ui/textarea'
</script>

<main class="flex flex-col w-full items-center">
  <h1 class="mt-5 text-[42px] font-semibold">Add a New Project</h1>

  <form class="flex flex-col w-full max-w-[550px] mt-10 mx-10 gap-2">
    <p class="-ml-2 font-semibold text-base text-gray-600">
      Enter Project Name
    </p>
    <Input type="text" class="mb-4" placeholder="Project Name" />

    <p class="-ml-2 font-semibold text-base text-gray-600">
      Enter Description (in one line)
    </p>
    <Input type="text" class="mb-4" placeholder="Project Description" />

    <p class="-ml-2 font-semibold text-base text-gray-600">Enter Github Link</p>
    <Input type="text" class="mb-4" placeholder="Project Github Link" />

    <p class="-ml-2 font-semibold text-base text-gray-600">
      Enter Tech Stack (space separated)
    </p>
    <Input type="text" class="mb-4" placeholder="Tech Stack" />

    <p class="-ml-2 font-semibold text-base text-gray-600">About Project</p>
    <Textarea class="mb-4" placeholder="About Project" />

    <Button>Submit</Button>
  </form>
</main>
