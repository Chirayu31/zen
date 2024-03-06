import { db } from '$lib/db.server.js'
import { json } from '@sveltejs/kit'

export async function GET() {
  try {
    const today = new Date()
    const todayStart = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    )
    const todayEnd = new Date(todayStart)
    todayEnd.setDate(todayEnd.getDate() + 1)

    let cotdUser

    const existingCOTD = await db.connectionOfDay.findFirst({
      where: {
        AND: [{ date: { gte: todayStart } }, { date: { lt: todayEnd } }],
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            projects: {
              select: {
                id: true,
                title: true,
                description: true,
              },
            },
          },
        },
      },
    })

    if (existingCOTD) {
      cotdUser = existingCOTD.user
    } else {
      const allUsers = await db.user.findMany({
        select: {
          id: true,
          name: true,
          projects: {
            select: {
              id: true,
              title: true,
              description: true,
            },
          },
        },
      })

      const randomUserIndex = Math.floor(Math.random() * allUsers.length)
      const randomUser = allUsers[randomUserIndex]

      // Create a new COTD entry
      const newCOTD = await db.connectionOfDay.create({
        data: {
          userId: randomUser.id,
        },
      })

      cotdUser = randomUser
    }

    return json(cotdUser)
  } catch (error) {
    console.error('Error getting Connection of the Day:', error)
    return json(
      { message: 'Error getting Connection of the Day' },
      { status: 500 }
    )
  }
}
