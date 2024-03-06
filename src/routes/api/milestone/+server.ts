import { db } from '$lib/db.server.js'
import { json, redirect } from '@sveltejs/kit'

export async function POST(event) {
  const data = await event.request.formData()
  const projectId: string = data.get('projectId') as string
  const title: string = data.get('title') as string
  const description: string = data.get('description') as string
  const status: string = data.get('status') as string

  if (!projectId) {
    throw redirect(303, '/')
  }

  try {
    const milestone = await db.milestone.create({
      data: {
        title,
        description,
        status,
        project: {
          connect: {
            id: projectId,
          },
        },
      },
    })

    return json(milestone)
  } catch (error) {
    console.error('Error creating milestone:', error)
    return json({ error: 'Failed to create milestone' })
  }
}
