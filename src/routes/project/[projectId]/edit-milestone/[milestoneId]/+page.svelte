<script lang="ts">
  import { Button } from '$lib/components/ui/button'
  import { Input } from '$lib/components/ui/input'
  import * as Select from '$lib/components/ui/select'
  import { Textarea } from '$lib/components/ui/textarea'
  import type { Milestone } from '@prisma/client'
  import { page } from '$app/stores'
  import { goto } from '$app/navigation'

  interface FormErrors {
    title?: string
    description?: string
    status?: string
  }

  export let data

  let errors: FormErrors = {}
  let milestone: Milestone | null = null

  milestone = data.project.milestone.find(
    (m: Milestone) => m.id === $page.params.milestoneId
  )
  if (!milestone) {
    console.error('Milestone not found:', $page.params.milestoneId)
    goto(`/project/${data.project.id}`)
  }

  function validateForm(formData: FormData) {
    errors = {}

    if (
      typeof formData.get('title') === 'string' &&
      formData.get('title') === ''
    ) {
      errors.title = 'Title is required'
    }

    if (
      typeof formData.get('description') === 'string' &&
      formData.get('description') === ''
    ) {
      errors.description = 'Description is required'
    }

    if (!formData.get('status')) {
      errors.status = 'Status is required'
    }
  }

  async function subscribe(event: Event) {
    const form = event.target as HTMLFormElement
    const formData = new FormData(form)

    validateForm(formData)

    if (Object.keys(errors).length > 0) {
      return
    }

    const res = await fetch(`/api/milestone/${$page.params.milestoneId}`, {
      method: 'PUT',
      body: formData,
    })
    const received: Milestone = await res.json()

    data.project.milestone.map((m: Milestone) => {
      if (m.id === $page.params.milestoneId) {
        m.title = received.title
        m.description = received.description
        m.status = received.status
      }
    })

    goto(`/project/${data.project.id}`)
  }
</script>

<main class="flex flex-col w-full items-center">
  <h1 class="mt-5 text-[42px] font-semibold">
    Edit {data.project.title} Milestone
  </h1>

  <form
    class="flex flex-col w-full max-w-[550px] mt-10 mx-10 gap-2"
    on:submit|preventDefault={subscribe}
  >
    <p class="-ml-2 font-semibold text-base text-gray-600">
      Enter Milestone Title
    </p>
    <Input
      type="text"
      name="title"
      class="mb-4"
      placeholder="Milestone title"
      value={milestone?.title}
    />
    {#if errors.title}
      <span class="text-red-500">{errors.title}</span>
    {/if}

    <p class="-ml-2 font-semibold text-base text-gray-600">Enter Description</p>
    <Textarea
      name="description"
      class="mb-4"
      placeholder="Enter Milestone Description"
      value={milestone?.description}
    />
    {#if errors.description}
      <span class="text-red-500">{errors.description}</span>
    {/if}

    <p class="-ml-2 font-semibold text-base text-gray-600">Select Status</p>
    <Select.Root>
      <Select.Trigger>
        <Select.Value placeholder="Status" />
      </Select.Trigger>
      <Select.Content>
        <Select.Item value="active">Active</Select.Item>
        <Select.Item value="futuristic">Futuristic</Select.Item>
        <Select.Item value="completed">Completed</Select.Item>
        <Select.Item value="dropped">Dropped</Select.Item>
      </Select.Content>
      <Select.Input name="status" />
    </Select.Root>
    {#if errors.status}
      <span class="text-red-500">{errors.status}</span>
    {/if}

    <input type="hidden" name="projectId" value={data.project.id} />

    <Button type="submit" class="mt-4">Submit</Button>
  </form>
</main>
