<script lang="ts">
  import { goto } from '$app/navigation';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Textarea } from '$lib/components/ui/textarea';

  let errors: { [key: string]: string } = {};
  let submitting = false;

  function validateForm(data: any){
    errors = {};

    if (!data.get('title')) {
      errors.title = 'Title is required';
    }

    if (!data.get('description')) {
      errors.description = 'Description is required';
    }

    if (!data.get('github')) {
      errors.github = 'Github link is required';
    }

    if (!data.get('techstack')) {
      errors.techstack = 'Tech Stack is required';
    }

    if (!data.get('about')) {
      errors.about = 'About is required';
    }

    return Object.keys(errors).length === 0;
  }

  async function subscribe(event: Event) {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const data = new FormData(form);

    if(!validateForm(data)) return;

    if (!submitting && Object.keys(errors).length === 0) {
      try {
        submitting = true;
        const res = await fetch('/api/project', { method: 'POST', body: data });
        const received = await res.json();
        // console.log(received);
        goto('/dashboard');
      } catch (error) {
        console.error('Error submitting form:', error);
      } finally {
        submitting = false;
      }
    }
  }
</script>

<main class="flex flex-col w-full items-center mb-10">
  <h1 class="mt-5 text-[42px] font-semibold">Add a New Project</h1>

  <form class="flex flex-col w-full max-w-[550px] mt-10 mx-10 gap-2" on:submit|preventDefault={subscribe}>
    <p class="-ml-2 font-semibold text-base text-gray-600">Enter Project Name</p>
    <Input type="text" name="title" class="mb-4" placeholder="Project title" />
    {#if errors.title}<p class="text-red-500">{errors.title}</p>{/if}

    <p class="-ml-2 font-semibold text-base text-gray-600">Enter Description (in one line)</p>
    <Input type="text" name="description" class="mb-4" placeholder="Project Description" />
    {#if errors.description}<p class="text-red-500">{errors.description}</p>{/if}

    <p class="-ml-2 font-semibold text-base text-gray-600">Enter Github Link</p>
    <Input type="text" name="github" class="mb-4" placeholder="Project Github Link" />
    {#if errors.github}<p class="text-red-500">{errors.github}</p>{/if}

    <p class="-ml-2 font-semibold text-base text-gray-600">Enter Tech Stack (space separated)</p>
    <Input type="text" name="techstack" class="mb-4" placeholder="Tech Stack" />
    {#if errors.techstack}<p class="text-red-500">{errors.techstack}</p>{/if}

    <p class="-ml-2 font-semibold text-base text-gray-600">About Project</p>
    <Textarea name="about" class="mb-4" placeholder="About Project" />
    {#if errors.about}<p class="text-red-500">{errors.about}</p>{/if}

    <Button type="submit" disabled={submitting}>Submit</Button>
  </form>
</main>
