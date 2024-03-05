<script lang="ts">
  import { Button } from '$lib/components/ui/button'
  import { Textarea } from '$lib/components/ui/textarea'
  import { page } from '$app/stores'

  async function sendCollabRequest(event: Event) {
    event.preventDefault()

    const form = event.target as HTMLFormElement;
    const data = new FormData(form)

    try {
      const res = await fetch(`/api/collaboration/${$page.params.projectId}`, {
        method: 'POST',
        body: data
      })

      if (!res.ok) {
        throw new Error('Error sending collab request')
      }

      await res.json();

      form.reset()
    } catch (error) {
      console.error('Error sending collab request:', error)
      alert('Failed to send collab request. Please try again.')
    }
  }

</script>

<main class="flex flex-col w-full items-center">
  <h1 class="mt-5 text-[42px] font-semibold">Send Collaboration Request</h1>

  <form
    class="flex flex-col w-full max-w-[550px] mt-10 mx-10 gap-2"
    on:submit={sendCollabRequest}
  >
    <p class="-ml-2 font-semibold text-base text-gray-600">
      Message
    </p>
    <Textarea
      name="message"
      class="mb-4"
      placeholder="Write your message to the project owner"
    />

    <Button type="submit">Send Request</Button>
  </form>
</main>