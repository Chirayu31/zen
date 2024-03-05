import type { ServerLoad } from '@sveltejs/kit'

export const load: ServerLoad = async (event) => {
  const response = await event.fetch(`/api/collaboration/sent`)
  const collabRequests = await response.json()
  return { collabRequests }
}
