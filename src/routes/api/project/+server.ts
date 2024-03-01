import { db } from '$lib/db.server.js';
import { json, redirect } from '@sveltejs/kit';

export async function POST(event) {
    const data = await event.request.formData();
    const techstack: string = data.get('techstack') as string;
    const techstackArray: string[] = techstack.split(' ')
    const userId: string | undefined = event.cookies.get('userId');

    if (!userId) {
        throw redirect(303, '/');
    }

    try {   
        const project = await db.project.create({
            data: {
                userId: userId,
                title: data.get('title') as string,
                description: data.get('description') as string,
                github: data.get('github') as string,
                about: data.get('about') as string,
                techStacks: {
                    connectOrCreate: techstackArray.map(ts => {
                        return {
                            where:{ name: ts },
                            create: { name: ts },
                        }
                    })
                }
            }
        });

        return json(project);
    } catch (error) {
        console.error('Error creating project:', error);
        return json({ error: 'Failed to create project' });
    }
}

export async function GET(event) {
    const userId: string | undefined = event.cookies.get('userId');
     if (!userId) {
        throw redirect(303, '/');
    }

    try {
        const projects = await db.project.findMany({
            where: {
                userId: userId
            }
        });
        return json(projects);
    } catch (error) {
        console.error('Error fetching projects:', error);
        return json({ error: 'Failed to fetch projects' }, {status:500});
    }
}