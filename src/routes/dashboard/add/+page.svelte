<script lang="ts">
  import { Button } from '$lib/components/ui/button'
  import { Input } from '$lib/components/ui/input'
  import { Textarea } from '$lib/components/ui/textarea'

  async function subscribe(event: Event) {
    const form = event.target as HTMLFormElement
    const data = new FormData(form)

    const res = await fetch('/api/project', { method: 'POST', body: data })
    const received = await res.json()
    console.log(received)
  }
</script>

<main class="flex flex-col w-full items-center">
  <h1 class="mt-5 text-[42px] font-semibold">Add a New Project</h1>

  <form
    class="flex flex-col w-full max-w-[550px] mt-10 mx-10 gap-2"
    on:submit|preventDefault={subscribe}
  >
    <p class="-ml-2 font-semibold text-base text-gray-600">
      Enter Project Name
    </p>
    <Input type="text" name="title" class="mb-4" placeholder="Project title" />

    <p class="-ml-2 font-semibold text-base text-gray-600">
      Enter Description (in one line)
    </p>
    <Input
      type="text"
      name="description"
      class="mb-4"
      placeholder="Project Description"
    />

    <p class="-ml-2 font-semibold text-base text-gray-600">Enter Github Link</p>
    <Input
      type="text"
      name="github"
      class="mb-4"
      placeholder="Project Github Link"
    />

    <p class="-ml-2 font-semibold text-base text-gray-600">
      Enter Tech Stack (space separated)
    </p>
    <Input type="text" name="techstack" class="mb-4" placeholder="Tech Stack" />

    <p class="-ml-2 font-semibold text-base text-gray-600">About Project</p>
    <Textarea name="about" class="mb-4" placeholder="About Project" />

    <Button type="submit">Submit</Button>
  </form>
</main>
