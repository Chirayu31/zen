import { db } from '$lib/db.server.js';
import { json, redirect } from '@sveltejs/kit'

export async function GET(event) {
    try {
        const userId: string | undefined = event.cookies.get('userId');
        if (!userId) {
            throw redirect(303, '/');
        }

        const project = await db.project.findFirst({
            where: {
                id: event.params.id
            },
            include: {
                techStacks: true,
                milestone: true,
            }
        })

        if (!project) {
            return json({ message: "Project Not Found" }, { status: 404 });
        }

        return json({...project, isOwnProject: project?.userId === userId});
    } catch (error) {
        console.error('Error fetching projects:', error);
        return json({ error: 'Failed to fetch project' }, {status:500});
    }
}

export async function DELETE(event) {
    try {
        const userId: string | undefined = event.cookies.get('userId');
        if (!userId) {
            throw redirect(303, '/');
        }

        await db.project.delete({ where: { id: event.params.id } });

        return json({ message: "Project Deleted Successfully" });
    } catch (error) {
        console.error('Error deleting projects:', error);
        return json({ error: 'Failed to delete project' }, {status:500});
    }
}