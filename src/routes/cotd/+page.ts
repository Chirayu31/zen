import type { ServerLoad } from '@sveltejs/kit'

export const load: ServerLoad = async (event) => {
  const response = await event.fetch(`/api/cotd`)
  const cotd = await response.json()
  return { cotd }
}
