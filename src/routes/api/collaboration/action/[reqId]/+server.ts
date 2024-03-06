import { db } from '$lib/db.server.js'
import { json, redirect } from '@sveltejs/kit'

export async function PUT(event) {
  try {
    const reqId: string = event.params.reqId
    const userId: string | undefined = event.cookies.get('userId')
    const { status } = await event.request.json()

    if (!userId) {
      throw redirect(303, '/')
    }

    const existingRequest = await db.collabRequests.findFirst({
      where: {
        id: reqId,
      },
    })

    if (!existingRequest) {
      return json(
        { message: 'Collaboration request not found' },
        { status: 404 }
      )
    }

    await db.collabRequests.update({
      where: {
        id: reqId,
      },
      data: {
        status: status,
      },
    })

    return json({ message: 'Request updated successfully' }, { status: 200 })
  } catch (error) {
    console.error(error)
    return json({ message: 'Error Sending Collab request' }, { status: 500 })
  }
}
