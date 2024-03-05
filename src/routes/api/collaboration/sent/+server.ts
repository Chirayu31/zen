import { db } from '$lib/db.server.js'
import { json, redirect } from '@sveltejs/kit'

export async function GET(event) {
  const userId = event.cookies.get('userId')
  if (!userId) {
    throw redirect(301, '/')
  }

  try {
    const sentRequests = await db.collabRequests.findMany({
      where: {
        senderId: userId,
      },
      include: {
        project: {
          include: {
            user: true,
          },
        },
      },
    })

    return json(sentRequests)
  } catch (error) {
    console.error(error)
    return json({ message: 'Error fetching sent requests' }, { status: 500 })
  }
}
