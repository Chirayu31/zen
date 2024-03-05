import { db } from '$lib/db.server.js'
import { json, redirect } from '@sveltejs/kit'

export async function POST(event) {
  try {
    const projectId: string = event.params.projectId
    const userId: string | undefined = event.cookies.get('userId')
    const data = await event.request.formData()

    if (!userId) {
      throw redirect(303, '/')
    }

    const existingRequest = await db.collabRequests.findFirst({
      where: {
        AND: [{ projectId }, { senderId: userId }],
      },
    })

    if (existingRequest) {
      return json(
        {
          message:
            'You have already sent a collaboration request for this project.',
        },
        { status: 409 }
      )
    }

    const collabRequest = await db.collabRequests.create({
      data: {
        message: data.get('message') as string,
        status: 'pending',
        sender: {
          connect: {
            id: userId,
          },
        },
        project: {
          connect: {
            id: projectId,
          },
        },
      },
    })

    if (!collabRequest) {
      return json(
        { message: 'Could not create collab request, try again' },
        { status: 400 }
      )
    }

    return json(
      {
        message:
          'You have already sent a collaboration request for this project.',
      },
      { status: 201 }
    )
  } catch (error) {
    console.error(error)
    return json({ message: 'Error Sending Collab request' }, { status: 500 })
  }
}
