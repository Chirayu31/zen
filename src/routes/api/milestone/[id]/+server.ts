import { db } from '$lib/db.server.js';
import { json } from '@sveltejs/kit';

export async function PUT(event) {
  const { id } = event.params;

  const data = await event.request.formData();
  const title = data.get('title') as string;
  const description = data.get('description') as string;
  const status = data.get('status') as string;

  if (!id) {
    return json({ error: 'Missing milestone ID' }, { status: 400 });
  }

  try {
    const updatedMilestone = await db.milestone.update({
      where: { id: id },
      data: {
        title,
        description,
        status,
      },
    });

    return json(updatedMilestone);
  } catch (error) {
    console.error('Error updating milestone:', error);
    return json({ error: 'Failed to update milestone' }, { status: 500 });
  }
}