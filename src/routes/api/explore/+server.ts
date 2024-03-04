import { db } from '$lib/db.server.js'
import { json } from '@sveltejs/kit'

function escapeSearchQuery(searchQuery: string): string {
  return searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export async function POST(event) {
  const { searchQuery } = await event.request.json()
  const escapedQuery = escapeSearchQuery(searchQuery)
  const q = `${escapedQuery}`

  try {
    const projects = await db.project.findMany({
      where: {
        OR: [
          { title: { contains: q, mode: 'insensitive' } },
          { description: { contains: q, mode: 'insensitive' } },
          {
            techStacks: {
              some: { name: { contains: q, mode: 'insensitive' } },
            },
          },
          {
            user: {
              name: { contains: q, mode: 'insensitive' },
            },
          },
        ],
      },
      include: {
        techStacks: true,
        user: true,
      },
    })

    return json(projects)
  } catch (error) {
    console.error(error)
    return json({ message: 'Error fetching projects' }, { status: 500 })
  }
}
