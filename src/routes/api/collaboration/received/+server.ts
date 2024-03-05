import { db } from '$lib/db.server.js'
import { json, redirect } from '@sveltejs/kit'

export async function GET(event) {
  const userId = event.cookies.get('userId')
  if (!userId) {
    throw redirect(301, '/')
  }

  try {
    const receivedRequests = await db.collabRequests.findMany({
      where: {
        project: {
          userId: userId,
        },
      },
      include: {
        project: true,
        sender: true,
      },
    })
    return json(receivedRequests)
  } catch (error) {
    console.error(error)
    return json({ message: 'Error fetching sent requests' }, { status: 500 })
  }
}
